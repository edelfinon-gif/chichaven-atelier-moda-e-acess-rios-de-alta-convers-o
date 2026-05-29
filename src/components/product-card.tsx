import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye, Plus, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@shared/types';
import { toast } from 'sonner';
import { useCartStore } from '@/lib/store';
import { cn } from '@/lib/utils';
interface ProductCardProps {
  product: Product;
}
export const ProductCard = forwardRef<HTMLDivElement, ProductCardProps>(({ product }, ref) => {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useCartStore((s) => s.toggleWishlist);
  const wishlist = useCartStore((s) => s.wishlist);
  const isWishlisted = wishlist.includes(product.id);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} added to bag`);
  };
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };
  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Card className="overflow-hidden border-none shadow-soft hover:shadow-xl transition-all duration-300 bg-card">
        <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button size="icon" variant="secondary" asChild className="rounded-full shadow-lg scale-90 group-hover:scale-100 transition-all duration-300">
              <Link to={`/product/${product.id}`}><Eye className="h-5 w-5" /></Link>
            </Button>
            <Button
              size="icon"
              className="rounded-full btn-gradient shadow-lg scale-90 group-hover:scale-100 transition-all duration-300"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
             <span className="bg-white/90 dark:bg-black/80 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold shadow-sm uppercase tracking-wider text-brand-primary">
                {product.brand}
             </span>
             <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-full backdrop-blur-sm transition-all",
                  isWishlisted ? "bg-brand-primary text-white" : "bg-white/50 text-foreground hover:bg-white"
                )}
                onClick={handleToggleWishlist}
             >
                <Heart className={cn("h-4 w-4", isWishlisted && "fill-current")} />
             </Button>
          </div>
        </Link>
        <CardContent className="p-5 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{product.category}</p>
              <Link to={`/product/${product.id}`} className="hover:text-brand-primary transition-colors">
                <h3 className="text-lg font-bold line-clamp-1">{product.name}</h3>
              </Link>
            </div>
            <span className="text-lg font-display font-bold text-brand-primary">
              ${product.price.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1.5">
              {(product.colors || []).slice(0, 3).map((color, idx) => (
                <div
                  key={idx}
                  className="h-2.5 w-2.5 rounded-full border border-border/50"
                  style={{ backgroundColor: color }}
                />
              ))}
              {(product?.colors?.length ?? 0) > 3 && (
                <span className="text-[8px] font-bold text-muted-foreground">+{product.colors.length - 3}</span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="p-1 rounded-md hover:bg-brand-primary/10 text-muted-foreground hover:text-brand-primary transition-all md:opacity-0 group-hover:opacity-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});
ProductCard.displayName = "ProductCard";