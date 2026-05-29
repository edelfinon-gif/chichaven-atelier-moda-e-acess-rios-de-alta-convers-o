import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@shared/types';
interface ProductCardProps {
  product: Product;
}
export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
      }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="overflow-hidden border-none shadow-soft hover:shadow-xl transition-all duration-300 bg-card">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button size="icon" variant="secondary" className="rounded-full shadow-lg hover:scale-110 transition-transform">
              <Eye className="h-5 w-5" />
            </Button>
            <Button size="icon" className="rounded-full btn-gradient shadow-lg hover:scale-110 transition-transform">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute top-4 right-4">
             <span className="bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-md text-xs font-bold shadow-sm">
                {product.brand}
             </span>
          </div>
        </div>
        <CardContent className="p-5 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-brand-primary uppercase tracking-wider">{product.category}</p>
              <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>
            </div>
            <span className="text-lg font-display font-bold text-brand-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex gap-1.5 pt-1">
            {product.colors.map((color, idx) => (
              <div 
                key={idx} 
                className="h-3 w-3 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}