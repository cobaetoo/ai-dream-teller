import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/utils/supabase/service";
import { sendTelegramMessage } from "@/utils/telegram";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const maxDuration = 60; // AI 분석이 오래 걸릴 수 있으므로 최대 실행 시간 증가

export async function POST(req: NextRequest) {
  let createdResultId: string | null = null;
  const serviceSupabase = createServiceRoleClient();

  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // 1. 주문 확인
    const { data: order, error: orderError } = await serviceSupabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 2. 이미 해당 주문으로 분석 중이거나 완료된 내역이 있는지 먼저 체크
    const { data: existingResult } = await serviceSupabase
      .from("dream_results")
      .select("id, analysis_status")
      .eq("order_id", orderId)
      .single();

    if (existingResult) {
      if (existingResult.analysis_status === "completed") {
         return NextResponse.json({ success: true, status: "already_completed" });
      }
      createdResultId = existingResult.id;
    } else {
      // 3. Dream Results 생성 (분석 중 상태)
      const { data: newResult, error: resultError } = await serviceSupabase
        .from("dream_results")
        .insert({
          order_id: orderId,
          analysis_status: "processing",
          is_public: false,
        })
        .select()
        .single();

      if (resultError || !newResult) {
        throw new Error(`Failed to create dream_results processing state: ${resultError?.message}`);
      }
      createdResultId = newResult.id;
    }

    // 4. Gemini API 호출 시작 (타임아웃 설정 - PRD 8.2 No 11)
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY is not configured.");
    }
    
    let analysisContent = "";
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 50000); // 50초 내 응답 없을 시 중단
    
    try {
      const genAI = new GoogleGenerativeAI(geminiApiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const prompt = `
        당신은 ${order.expert_field || "심리"} 전문가로서 다음 꿈을 분석하는 전문가입니다.
        사용자의 꿈 내용: "${order.dream_content}"
        
        제시된 전문가의 관점(예: 프로이트, 칼 융, 신경과학 등)을 바탕으로, 꿈에 나타난 상징이나 무의식적 의미를 심층적으로 분석하여 Markdown 형식으로 친절하게 답변해주세요.
      `;

      // 텍스트 생성 (SDK가 AbortSignal을 지원하지 않을 수 있으므로 Promise.race로 강제 타임아웃 처리)
      const aiResponse = await Promise.race([
        model.generateContent(prompt),
        new Promise((_, reject) => 
          setTimeout(() => {
            const error = new Error("Gemini API Timeout");
            error.name = "AbortError";
            reject(error);
          }, 50000)
        )
      ]) as any;

      const response = await aiResponse.response;
      analysisContent = response.text();
    } catch (aiTextError: any) {
      if (aiTextError.name === 'AbortError') {
        throw new Error("[타임아웃] Gemini API 응답이 50초를 초과했습니다.");
      }
      console.error("Gemini AI Text API execution failed:", aiTextError);
      throw new Error(`[텍스트 생성 실패] ${aiTextError.message}`);
    } finally {
      clearTimeout(timeoutId);
    }

    // 5. 이미지 생성 로직 (includes_image가 true일 경우)
    let imageUrl = null;
    if (order.includes_image) {
      const imgController = new AbortController();
      const imgTimeoutId = setTimeout(() => imgController.abort(), 50000);

      try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const translatorModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        
        const promptGenResponse = await translatorModel.generateContent(
          `다음 꿈 내용과 해몽 분석을 바탕으로, AI 이미지 생성기에 넣을 고품질의 영어 프롬프트 딱 1문장만 작성해 줘. 꿈에 등장한 구체적인 장면, 인물, 색상, 분위기를 시각적으로 표현하되 추상적인 심리 용어는 피하고 실제 장면처럼 묘사해. 부가 설명이나 따옴표 없이 프롬프트 문장만 답해라.\n\n꿈 내용: ${order.dream_content}\n\n해몽 분석: ${analysisContent}`
        );
        const imagePrompt = promptGenResponse.response.text().trim().replace(/['"]/g, "").replace(/\n/g, " ");

        const imagenUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-fast-generate-001:predict?key=${geminiApiKey}`;
        const imagenResponse = await fetch(imagenUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: imgController.signal, // 타임아웃 시그널 주입
          body: JSON.stringify({
            instances: [{ prompt: imagePrompt }],
            parameters: { sampleCount: 1, aspectRatio: "1:1" }
          })
        });

        if (!imagenResponse.ok) {
          const errText = await imagenResponse.text();
          throw new Error(errText);
        }

        const imagenData = await imagenResponse.json();
        const base64Image = imagenData?.predictions?.[0]?.bytesBase64Encoded;

        if (!base64Image) {
          throw new Error("Imagen API returned an empty or invalid response.");
        }

        const bucketName = "dream-images";
        const { data: buckets } = await serviceSupabase.storage.listBuckets();
        const bucketExists = buckets?.find((b) => b.name === bucketName);
        if (!bucketExists) {
          await serviceSupabase.storage.createBucket(bucketName, { public: true });
        }

        const buffer = Buffer.from(base64Image, "base64");
        const fileName = `${orderId}_${Date.now()}.png`;

        const { error: uploadError } = await serviceSupabase.storage
          .from(bucketName)
          .upload(fileName, buffer, {
            contentType: "image/png",
            upsert: false
          });

        if (uploadError) {
          throw new Error(`Supabase Storage Upload Error: ${uploadError.message}`);
        }

        const { data: publicUrlData } = serviceSupabase.storage.from(bucketName).getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;

      } catch (imageError: any) {
        if (imageError.name === 'AbortError') {
            throw new Error("[타임아웃] 이미지 생성 API 응답이 50초를 초과했습니다.");
        }
        console.error("Image Generation Phase failed:", imageError);
        throw new Error(`[이미지 생성 실패] ${imageError.message}`);
      } finally {
        clearTimeout(imgTimeoutId);
      }
    }

    // 6. DB 분석 완료로 업데이트
    const { error: updateError } = await serviceSupabase
      .from("dream_results")
      .update({
        analysis_status: "completed",
        analysis_text: analysisContent,
        image_url: imageUrl,
      })
      .eq("id", createdResultId);

    if (updateError) {
      throw new Error(`[DB 최종 업데이트 실패] ${updateError.message}`);
    }

    const shortDreamContent = order.dream_content.length > 20 ? order.dream_content.substring(0, 20) + "..." : order.dream_content;
    const successMsg = `✅ <b>AI 해몽 분석 완료 (Success)</b>\n\n- 주문번호: ${order.order_number}\n- 꿈내용: <i>"${shortDreamContent}"</i>`;
    await sendTelegramMessage(successMsg);

    return NextResponse.json({ success: true, status: "completed" }, { status: 200 });
  } catch (error: any) {
    console.error("AI Generate API Error:", error);

    if (createdResultId) {
      await serviceSupabase
        .from("dream_results")
        .update({ analysis_status: "failed" })
        .eq("id", createdResultId);
    }

    const failMsg = `⚠️ <b>AI 해몽 분석 실패 (Fail)</b>\n\n- Error: ${error.message}`;
    await sendTelegramMessage(failMsg);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
