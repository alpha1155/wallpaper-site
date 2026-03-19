"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "bg-surface-200 dark:bg-surface-800 animate-pulse rounded",
        className
      )}
    />
  );
}

export function WallpaperCardSkeleton() {
  return (
    <div className="masonry-item">
      <div className="card overflow-hidden">
        <Skeleton className="w-full aspect-[3/4] sm:aspect-[4/3]" />
        <div className="p-3 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function WallpaperGridSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="masonry-grid">
      {Array.from({ length: count }).map((_, i) => (
        <WallpaperCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function WallpaperDetailSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="w-full aspect-video rounded-xl" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
