# WallpaperHD - Commercial Wallpaper Download Site

A modern, production-ready wallpaper download website built with Next.js 14, featuring high-quality static and dynamic wallpapers for desktop and mobile devices.

## Features

- **Grid/Masonry Layout**: Beautiful responsive wallpaper display
- **Filtering**: Filter by device (mobile/desktop) and type (static/dynamic)
- **Preview Modal**: Full-screen preview with download options in multiple resolutions
- **Responsive Design**: Optimized for all screen sizes
- **Dark Mode**: System-aware theme with manual toggle
- **SEO Optimized**: Meta tags, sitemap, robots.txt, and structured data
- **Performance**: Image optimization, lazy loading, and efficient caching

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Storage**: Cloudflare R2
- **State Management**: Zustand
- **Icons**: Lucide React

## Project Structure

```
wallpaper-site/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── desktop/       # Desktop wallpapers page
│   │   ├── mobile/        # Mobile wallpapers page
│   │   ├── search/        # Search page
│   │   ├── wallpaper/     # Individual wallpaper pages
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   ├── sitemap.ts     # Dynamic sitemap
│   │   └── robots.ts      # Robots.txt
│   ├── components/
│   │   ├── layout/        # Header, Footer, ThemeToggle
│   │   ├── providers/     # Theme provider
│   │   ├── ui/            # Skeleton loaders
│   │   └── wallpaper/     # Wallpaper components
│   ├── lib/
│   │   ├── r2/            # Cloudflare R2 integration
│   │   ├── supabase/      # Supabase client and queries
│   │   ├── mock-data.ts   # Development mock data
│   │   └── utils.ts       # Utility functions
│   ├── store/             # Zustand state management
│   └── types/             # TypeScript types
└── supabase/
    ├── schema.sql         # Database schema
    └── seed.sql           # Sample data
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for production)
- Cloudflare R2 account (for production)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wallpaper-site
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment template:
```bash
cp .env.example .env.local
```

4. Configure environment variables (see [Environment Variables](#environment-variables))

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key-id
R2_SECRET_ACCESS_KEY=your-secret-access-key
R2_BUCKET_NAME=wallpapers
R2_PUBLIC_URL=https://your-r2-public-url.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://yoursite.com
NEXT_PUBLIC_SITE_NAME=WallpaperHD
```

## Database Setup

### Using Supabase

1. Create a new Supabase project
2. Go to SQL Editor
3. Run the schema file:
   ```sql
   -- Copy contents from supabase/schema.sql
   ```
4. (Optional) Run the seed file for sample data:
   ```sql
   -- Copy contents from supabase/seed.sql
   ```

### Schema Overview

The `wallpapers` table includes:
- `id` - UUID primary key
- `title` - Wallpaper title
- `slug` - URL-friendly slug
- `type` - 'static' or 'dynamic'
- `device` - 'mobile', 'desktop', or 'both'
- `thumbnail_url` - Small preview image
- `preview_url` - Large preview image
- `download_urls` - JSON with resolution URLs
- `tags` - Array of tags
- `featured` - Boolean for featured wallpapers
- `views` / `downloads` - Analytics counters
- `created_at` / `updated_at` - Timestamps

## Cloudflare R2 Setup

1. Create an R2 bucket in your Cloudflare dashboard
2. Create API tokens with R2 read/write permissions
3. Configure public access or use signed URLs
4. Update environment variables with your credentials

### File Structure in R2

```
wallpapers/
├── {slug}/
│   ├── thumbnail.webp
│   ├── preview.webp
│   ├── 1920x1080.webp
│   ├── 2560x1440.webp
│   ├── 3840x2160.webp
│   └── (or .mp4 for dynamic)
```

## Development

### Running with Mock Data

The site works out-of-the-box with mock data for development. No database setup required for initial testing.

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- AWS Amplify
- Docker container
- Self-hosted Node.js server

## API Routes (Future)

Reserved routes for API functionality:
- `POST /api/download` - Track downloads
- `POST /api/view` - Track views
- `GET /api/wallpapers` - Fetch wallpapers with filters

## SEO Features

- Dynamic meta tags per page
- Open Graph tags for social sharing
- Twitter Card support
- Auto-generated sitemap
- Robots.txt configuration
- Structured data ready

## Performance Optimizations

- Next.js Image optimization
- Lazy loading with Intersection Observer
- CSS-in-JS with Tailwind (purged unused styles)
- Static generation where possible
- Efficient state management with Zustand

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and feature requests, please use the GitHub issue tracker.
