'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { Star } from 'lucide-react';
import { Character, ELEMENTS } from '@/types/genshin';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const elementColor = ELEMENTS[character.element].color;

  return (
    <Link
      href={`/character/${character.id}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-xl bg-surface-900 border border-surface-800 hover:border-genshin-gold/30 transition-all duration-300">
        {/* Avatar */}
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={character.avatar_url}
            alt={character.name_cn}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          />
          
          {/* Gradient overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: `linear-gradient(180deg, transparent 50%, ${elementColor} 100%)`
            }}
          />
          
          {/* Element indicator */}
          <div
            className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: `${elementColor}50` }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: elementColor }}
            />
          </div>

          {/* Rarity stars */}
          <div className="absolute top-2 right-2 flex">
            {Array.from({ length: character.rarity }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3 h-3 fill-current",
                  character.rarity === 5 ? "text-genshin-gold" : "text-purple-400"
                )}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-3 text-center">
          <h3 className="text-white font-medium text-sm group-hover:text-genshin-gold transition-colors">
            {character.name_cn}
          </h3>
          <p className="text-surface-400 text-xs mt-0.5">
            {character.name}
          </p>
        </div>
      </div>
    </Link>
  );
}
