"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { Menu, X, Search, Sparkles, Users, Map } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");

  const navigation = [
    { name: t("home"), href: "/", icon: Sparkles },
    { name: t("characters"), href: "/characters", icon: Users },
    { name: t("regions"), href: "/regions", icon: Map },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-genshin-gold/20 bg-surface-950/90 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-genshin-gold to-genshin-gold-dark flex items-center justify-center glow-gold transition-all group-hover:animate-glow-pulse">
              <span className="text-surface-950 text-lg font-bold">G</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-gradient-gold">GenshinWalls</span>
              <p className="text-xs text-surface-400">原神高清壁纸</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-genshin-gold/10 text-genshin-gold"
                      : "text-surface-400 hover:text-genshin-gold hover:bg-genshin-gold/5"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <Link
              href="/search"
              className="p-2 rounded-lg text-surface-400 hover:text-genshin-gold hover:bg-genshin-gold/5 transition-all"
              aria-label="Search wallpapers"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Language switcher */}
            <LanguageSwitcher />

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-surface-400 hover:text-genshin-gold hover:bg-genshin-gold/5 transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-genshin-gold/10 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      isActive
                        ? "bg-genshin-gold/10 text-genshin-gold"
                        : "text-surface-400 hover:text-genshin-gold hover:bg-genshin-gold/5"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
