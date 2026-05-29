import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { SearchDialog } from './search-dialog';
import { cn } from '@/lib/utils';
export function SiteHeader() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const headerHeight = useTransform(scrollY, [0, 100], ["5rem", "4rem"]);
  const headerBg = useTransform(scrollY, [0, 100], ["rgba(255,255,255,0.8)", "rgba(255,255,255,0.95)"]);
  const headerBlur = useTransform(scrollY, [0, 100], ["8px", "12px"]);
  return (
    <>
      <motion.header
        style={{ height: headerHeight, backgroundColor: headerBg, backdropFilter: `blur(${headerBlur})` }}
        className="sticky top-0 z-40 w-full border-b border-border transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-10">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="h-10 w-10 bg-brand-primary rounded-xl flex items-center justify-center transition-all group-hover:rotate-12 group-hover:shadow-glow">
                  <ShoppingBag className="text-white h-6 w-6" />
                </div>
                <span className="text-xl font-display font-bold tracking-tight">
                  ChicHaven <span className="text-brand-primary">Atelier</span>
                </span>
              </Link>
              <nav className="hidden lg:flex items-center gap-8">
                {['Shop', 'Categories', 'Collections', 'About'].map((item) => (
                  <Link
                    key={item}
                    to={item === 'Shop' ? '/#shop' : '#'}
                    className={cn(
                      "text-sm font-semibold tracking-wide transition-colors hover:text-brand-primary",
                      location.hash === `#${item.toLowerCase()}` ? "text-brand-primary" : "text-muted-foreground"
                    )}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-1">
              <div className="hidden sm:flex items-center mr-2">
                <Button 
                  variant="ghost" 
                  onClick={() => setSearchOpen(true)}
                  className="relative w-9 h-9 sm:w-40 sm:justify-start sm:px-3 sm:py-2 text-muted-foreground hover:bg-muted/50 rounded-full sm:rounded-lg"
                >
                  <Search className="h-4 w-4 sm:mr-2" />
                  <span className="hidden sm:inline text-xs">Search...</span>
                  <kbd className="hidden sm:inline-flex absolute right-2 pointer-events-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
                    <span className="text-xs">⌘</span>K
                  </kbd>
                </Button>
              </div>
              <ThemeToggle className="static" />
              <Button variant="ghost" size="icon" className="relative group rounded-full">
                <ShoppingBag className="h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="absolute top-1 right-1 h-4 w-4 bg-brand-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-2 ring-background animate-pulse">
                  3
                </span>
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}