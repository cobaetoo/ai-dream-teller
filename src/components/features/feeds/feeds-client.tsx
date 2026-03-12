"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MoreHorizontal,
  Globe,
  Sparkles,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type FeedItem,
  generateDummyFeeds,
  getExpertBadgeClass,
  getRelativeTime,
} from "@/lib/dummy-feeds";

// 초기 로드 수, 추가 로드 수
const INITIAL_LOAD = 8;
const LOAD_MORE = 4;

// 전체 더미 데이터 풀 (충분히 많이 생성)
const ALL_FEEDS = generateDummyFeeds(40);

export const FeedsClient = () => {
  const [visibleCount, setVisibleCount] = useState(INITIAL_LOAD);
  const visibleFeeds = ALL_FEEDS.slice(0, visibleCount);
  const hasMore = visibleCount < ALL_FEEDS.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE, ALL_FEEDS.length));
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
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
        {visibleFeeds.map((feed) => (
          <FeedCard key={feed.id} feed={feed} />
        ))}

        {/* 더보기 버튼 */}
        {hasMore && (
          <div className="flex justify-center pt-4 pb-8">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="rounded-full bg-white hover:bg-slate-50 text-slate-700 border-slate-300 px-8 cursor-pointer"
            >
              더 많은 꿈 이야기 보기
              <ChevronDown className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {!hasMore && (
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
  feed: FeedItem;
}

const FeedCard = ({ feed }: FeedCardProps) => {
  return (
    <article className="bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] overflow-hidden">
      {/* 카드 헤더 - 사용자 정보 (페이스북 스타일) */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          {/* 아바타 */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={feed.userAvatar}
            alt={`${feed.userName} 프로필`}
            className="w-10 h-10 rounded-full object-cover border border-slate-200"
          />
          <div>
            <p className="text-sm font-semibold text-slate-900 leading-tight">
              {feed.userName}
            </p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>{getRelativeTime(feed.createdAt)}</span>
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
          className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full mb-2 ${getExpertBadgeClass(feed.expertType)}`}
        >
          {feed.expertLabel}
        </span>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          🌙 {feed.dreamTitle}
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {feed.dreamSummary}
        </p>
      </div>

      {/* 해몽 결과 미리보기 카드 */}
      <Link href={`/dream-result/${feed.id}`} className="block cursor-pointer">
        <div className="mx-4 mb-4 bg-slate-50 border border-slate-200 rounded-xl overflow-hidden hover:bg-slate-100 transition-colors">
          {/* 이미지 영역 (있는 경우) */}
          {feed.imageUrl && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={feed.imageUrl}
              alt={`${feed.dreamTitle} 시각화 이미지`}
              className="w-full aspect-video object-cover"
            />
          )}
          <div className="p-3">
            <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-1">
              AI 심층 해몽 결과
            </p>
            <p className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
              {feed.analysisExcerpt}
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
};
