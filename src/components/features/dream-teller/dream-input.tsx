'use client';

import { useState, useCallback, memo } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface DreamInputProps {
  initialValue: string;
  onValueChange: (value: string) => void;
  maxLength?: number;
}

/**
 * 전용 입력 컴포넌트: 장문 텍스트 입력 시 부모 컴포넌트의 전체 리렌더링을 방지하기 위해 
 * 로컬 상태를 별도로 관리하고 필요한 경우에만 부모로 전파합니다.
 */
export const DreamInput = memo(({ initialValue, onValueChange, maxLength = 3000 }: DreamInputProps) => {
  const [localValue, setLocalValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setLocalValue(newVal);
    // 부모의 무거운 로직을 위해 onChange를 즉시 호출하되, 
    // 부모는 React.memo 등으로 최적화된 하위 트리를 가지고 있어야 합니다.
    onValueChange(newVal);
  };

  return (
    <div className="relative group">
      <Textarea
        placeholder="어디서 누구와 있었나요? 어떤 감정을 느꼈나요? 기억나는 파편들을 모두 적어주실수록 분석이 정확해집니다."
        className="min-h-[240px] resize-y p-6 text-lg rounded-2xl border-black/10 bg-white/80 backdrop-blur-sm focus-visible:ring-pink-500/50 focus-visible:border-pink-500 transition-all shadow-xs group-hover:shadow-md"
        value={localValue}
        onChange={handleChange}
        maxLength={maxLength}
      />
      <div className="absolute bottom-4 right-4 text-xs text-slate-400 font-medium bg-white/80 px-2 py-1 rounded-md backdrop-blur-sm pointer-events-none">
        {localValue.length.toLocaleString()} / {maxLength.toLocaleString()}자 (최소 20자 권장)
      </div>
    </div>
  );
});

DreamInput.displayName = 'DreamInput';
