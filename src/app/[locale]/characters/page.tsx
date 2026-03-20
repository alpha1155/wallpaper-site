'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ElementFilter } from '@/components/genshin/ElementFilter';
import { CharacterCard } from '@/components/genshin/CharacterCard';
import { mockCharacters } from '@/lib/mock-data';
import { Element } from '@/types/genshin';

export default function CharactersPage() {
  const t = useTranslations('characters');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const filteredCharacters = selectedElement
    ? mockCharacters.filter(c => c.element === selectedElement)
    : mockCharacters;

  // Sort by rarity (5-star first) then by name
  const sortedCharacters = [...filteredCharacters].sort((a, b) => {
    if (a.rarity !== b.rarity) return b.rarity - a.rarity;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-surface-950">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('title')}
          </h1>
          <p className="text-surface-400 text-lg max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <h3 className="text-surface-300 text-sm font-medium mb-3">
            {t('filterByElement')}
          </h3>
          <ElementFilter
            selected={selectedElement}
            onChange={setSelectedElement}
          />
        </div>

        {/* Character Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {sortedCharacters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>

        {sortedCharacters.length === 0 && (
          <div className="text-center py-12">
            <p className="text-surface-400">暂无角色</p>
          </div>
        )}
      </div>
    </div>
  );
}
