'use client';

import { useTranslations } from 'next-intl';
import { Element, ELEMENTS } from '@/types/genshin';
import { cn } from '@/lib/utils';

interface ElementFilterProps {
  selected: Element | null;
  onChange: (element: Element | null) => void;
}

export function ElementFilter({ selected, onChange }: ElementFilterProps) {
  const tc = useTranslations('common');
  const te = useTranslations('elements');
  const elements = Object.entries(ELEMENTS) as [Element, typeof ELEMENTS[Element]][];

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "px-4 py-2 rounded-full text-sm font-medium transition-all",
          selected === null
            ? "bg-genshin-gold text-surface-950"
            : "bg-surface-800 text-surface-400 hover:bg-surface-700"
        )}
      >
        {tc('all')}
      </button>
      {elements.map(([key, value]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
            selected === key
              ? "text-white"
              : "bg-surface-800 text-surface-400 hover:bg-surface-700"
          )}
          style={{
            backgroundColor: selected === key ? value.color : undefined,
          }}
        >
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: value.color }}
          />
          {te(key)}
        </button>
      ))}
    </div>
  );
}
