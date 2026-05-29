import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { ProductFilters } from '@/components/product-filters';
import { Product } from '@shared/types';
import { api } from '@/lib/api-client';
export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await api<{ items: Product[] }>('/api/products');
        setProducts(data.items);
      } catch (err) {
        console.error(err);
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden section-gap">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
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
              <Button size="lg" className="btn-gradient">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline">
                View Lookbook
              </Button>
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
      {/* Product Showcase Section */}
      <section className="section-gap border-t border-border" id="shop">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Filters - Persistent on Desktop */}
          <aside className="w-full md:w-64 shrink-0">
            <ProductFilters />
          </aside>
          {/* Grid */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold">Featured Collection</h2>
              <p className="text-sm text-muted-foreground">{products.length} products</p>
            </div>
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-brand-primary" />
                <p className="text-muted-foreground">Tailoring your experience...</p>
              </div>
            ) : error ? (
              <div className="text-center py-24 text-destructive font-medium">{error}</div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}