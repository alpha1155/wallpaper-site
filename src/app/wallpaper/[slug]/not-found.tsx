import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-surface-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-white mb-4">
          Wallpaper Not Found
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8 max-w-md mx-auto">
          The wallpaper you&apos;re looking for doesn&apos;t exist or has been removed.
          Try browsing our collection or searching for something else.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Link href="/search" className="btn-secondary">
            <Search className="w-4 h-4 mr-2" />
            Search Wallpapers
          </Link>
        </div>
      </div>
    </div>
  );
}
