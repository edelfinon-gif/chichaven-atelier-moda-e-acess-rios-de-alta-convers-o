import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Loader2, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters';
import { MobileFilters } from '@/components/mobile-filters';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from '@shared/types';
import { api } from '@/lib/api-client';
export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Filter States
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [brand, setBrand] = useState('all');
  const [color, setColor] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // Build query params
        const params = new URLSearchParams();
        if (category !== 'all') params.append('category', category);
        if (priceRange[0] > 0) params.append('priceMin', priceRange[0].toString());
        if (priceRange[1] < 1000) params.append('priceMax', priceRange[1].toString());
        const data = await api<{ items: Product[] }>(`/api/products?${params.toString()}`);
        // Final frontend filtering for client-side only properties (like color)
        let filtered = data.items;
        if (color !== 'all') {
          filtered = filtered.filter(p => p.colors.includes(color));
        }
        // Sort logic
        if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
        if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);
        setProducts(filtered);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [category, priceRange, color, sortBy]);
  const clearFilters = () => {
    setCategory('all');
    setPriceRange([0, 1000]);
    setBrand('all');
    setColor('all');
  };
  const filterProps = {
    category, onCategoryChange: setCategory,
    priceRange, onPriceRangeChange: setPriceRange,
    brand, onBrandChange: setBrand,
    color, onColorChange: setColor,
    onClear: clearFilters
  };
  return (
    <MainLayout>
      <section className="relative overflow-hidden section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-brand-primary/10 text-brand-primary ring-1 ring-inset ring-brand-primary/20">
              New Collection 2024
            </div>
            <h1 className="text-display-lg">
              Elegance Reimagined <br />
              <span className="text-gradient">ChicHaven Atelier</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Discover a curated selection of high-fashion clothing and accessories designed for those who appreciate the finer details of style and quality.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="btn-gradient" onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}>
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">View Lookbook</Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-2xl shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
              alt="Luxury Fashion"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>
      <section className="section-gap border-t border-border" id="shop">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Desktop Filters */}
          <aside className="hidden md:block w-64 shrink-0 sticky top-24 h-fit">
            <ProductFilters {...filterProps} />
          </aside>
          {/* Grid Area */}
          <div className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Our Collection</h2>
                <p className="text-sm text-muted-foreground mt-1">Showing {products.length} products</p>
              </div>
              <div className="flex items-center gap-3">
                <MobileFilters {...filterProps} resultsCount={products.length} />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex gap-2">
                      Sort by: {sortBy.replace('-', ' ')} <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy('newest')}>Newest</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-low')}>Price: Low to High</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('price-high')}>Price: High to Low</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-24 text-destructive font-medium bg-destructive/5 rounded-2xl border border-destructive/10">
                {error}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-32 bg-muted/30 rounded-2xl border border-dashed border-border">
                <p className="text-lg font-medium">No products match your criteria</p>
                <Button variant="link" onClick={clearFilters} className="text-brand-primary">Reset all filters</Button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                <AnimatePresence mode="popLayout">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}