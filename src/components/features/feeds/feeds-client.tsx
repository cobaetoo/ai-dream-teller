"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Globe,
  Sparkles,
  ChevronDown,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const LOAD_MORE = 8;

const getExpertBadgeClass = (expertType: string) => {
  switch (expertType) {
    case '프로이트':
      return 'bg-pink-100 text-pink-700';
    case '칼 융':
      return 'bg-purple-100 text-purple-700';
    case '신경과학':
      return 'bg-sky-100 text-sky-700';
    case '게슈탈트':
      return 'bg-emerald-100 text-emerald-700';
    default:
      return 'bg-slate-100 text-slate-700';
  }
};

export const FeedsClient = () => {
  const [feeds, setFeeds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const supabase = createClient();

  const fetchFeeds = async (pageIndex: number, currentFeeds: any[]) => {
    try {
      const res = await fetch(`/api/feeds?limit=${LOAD_MORE}&page=${pageIndex}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "피드를 불러오는데 실패했습니다.");

      if (data.success && data.data) {
        if (pageIndex === 0) {
          setFeeds(data.data);
        } else {
          setFeeds([...currentFeeds, ...data.data]);
        }
        
        setHasMore(data.pagination.hasMore);
      }
    } catch (e) {
      console.error("Feeds fetch failed:", e);
    }
  };

  useEffect(() => {
    const initFetch = async () => {
      setLoading(true);
      await fetchFeeds(0, []);
      setLoading(false);
    };
    initFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    await fetchFeeds(nextPage, feeds);
    setPage(nextPage);
    setLoadingMore(false);
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] selection:bg-purple-200">
      {/* 피드 상단 헤더 - 네비게이션 바에 빈틈 없이 붙음 */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <h1 className="font-bold text-lg text-slate-900">꿈 해몽 피드</h1>
          </div>
          <p className="text-sm text-slate-500">
            다른 사람들의 신비로운 꿈 이야기
          </p>
        </div>
      </div>

      {/* 피드 리스트 */}
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
          </div>
        ) : feeds.length > 0 ? (
          feeds.map((feed) => (
            <FeedCard key={feed.id} feed={feed} />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-200">
            <p className="text-slate-500 text-lg">아직 공개된 꿈 해몽 결과가 없습니다.</p>
          </div>
        )}

        {/* 더보기 버튼 */}
        {hasMore && feeds.length > 0 && !loading && (
          <div className="flex justify-center pt-4 pb-8">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="rounded-full bg-white hover:bg-slate-50 text-slate-700 border-slate-300 px-8 cursor-pointer"
            >
              {loadingMore ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              더 많은 꿈 이야기 보기
              {!loadingMore && <ChevronDown className="ml-2 w-4 h-4" />}
            </Button>
          </div>
        )}

        {!hasMore && feeds.length > 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">
            모든 꿈 이야기를 확인했습니다 ✨
          </div>
        )}
      </div>
    </div>
  );
};

// ─── 개별 피드 카드 컴포넌트 ────────────────────────────────

interface FeedCardProps {
  feed: any;
}

const FeedCard = ({ feed }: FeedCardProps) => {
  const expertField = feed.orders?.expert_field || "해몽";
  const dreamContent = feed.orders?.dream_content || "";
  const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${feed.orders?.user_id || feed.id}`;
  const timeText = formatDistanceToNow(new Date(feed.created_at), { addSuffix: true, locale: ko });

  return (
    <article className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* 카드 헤더 - 사용자 정보 */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          {/* 아바타 */}
          <Image
            src={avatarUrl}
            alt="프로필"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover border border-slate-200 bg-slate-50"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900 leading-tight">
              익명 사용자
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>{timeText}</span>
              <span>·</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer">
          <MoreHorizontal className="w-5 h-5 text-slate-500" />
        </button>
      </div>

      {/* 분석 뱃지 + 꿈 제목 + 내용 */}
      <div className="px-4 pb-3">
        <span
          className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full mb-2 ${getExpertBadgeClass(expertField)}`}
        >
          {expertField}
        </span>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          🌙 {dreamContent}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
           {dreamContent}
        </p>
      </div>

      {/* 해몽 결과 미리보기 카드 */}
      <Link href={`/dream-result/${feed.order_id}`} className="block cursor-pointer group">
        <div className="mx-4 mb-4 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden group-hover:bg-slate-100 transition-colors">
          {/* 이미지 영역 (있는 경우) */}
          {feed.image_url && (
            <div className="relative w-full aspect-video">
              <Image
                src={feed.image_url}
                alt="AI 시각화 이미지"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          )}
          <div className="p-3">
            <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-1">
              AI 심층 해몽 결과
            </p>
            <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
              {feed.analysis_text.replace(/[#*]/g, '')}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};
