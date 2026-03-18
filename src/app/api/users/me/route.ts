import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { profileSchema } from "@/lib/validations/auth";

export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    
    // 1. Zod를 통한 데이터 검증 (XSS 방어 및 유효성 체크 - PRD 8.2 No 6)
    const validation = profileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: "올바르지 않은 닉네임 형식입니다.", 
          details: validation.error.issues.map(i => i.message).join(", ") 
        },
        { status: 400 }
      );
    }

    const { nickname } = validation.data;
    const { id: payloadId } = body;

    // 2. IDOR 방어 (PRD 8.2 No 5)
    // 클라이언트에서 넘긴 'id'가 유효 세션의 uid와 다를 경우 403 처리 또는 무시 후 세션 uid 사용
    if (payloadId && payloadId !== user.id) {
       console.warn(`IDOR Attempt detected: User ${user.id} tried to update User ${payloadId}`);
       return NextResponse.json({ error: "Forbidden: You can only update your own profile." }, { status: 403 });
    }

    // 3. 실제 DB 업데이트 (테이블과 Auth Metadata 양쪽)
    const { error: dbError } = await supabase
      .from("users")
      .update({ nickname })
      .eq("id", user.id);

    if (dbError) {
      console.error("DB update error:", dbError);
      return NextResponse.json({ error: "Failed to update profile in database" }, { status: 500 });
    }

    // Auth Metadata에도 동기화
    await supabase.auth.updateUser({
      data: { nickname, full_name: nickname }
    });

    return NextResponse.json({ success: true, nickname }, { status: 200 });

  } catch (err: any) {
    console.error("Update profile API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
