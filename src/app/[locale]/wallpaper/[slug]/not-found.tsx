import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface-950 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <p className="text-surface-400 mb-6">壁纸未找到</p>
        <Link
          href="/"
          className="btn-primary"
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
