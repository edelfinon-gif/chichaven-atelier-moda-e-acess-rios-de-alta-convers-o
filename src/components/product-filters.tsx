import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { X, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
interface ProductFiltersProps {
  category: string;
  onCategoryChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  brand: string;
  onBrandChange: (value: string) => void;
  color: string;
  onColorChange: (value: string) => void;
  onClear: () => void;
}
export function ProductFilters({
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  brand,
  onBrandChange,
  color,
  onColorChange,
  onClear
}: ProductFiltersProps) {
  const isFiltered = category !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 1000 || brand !== 'all' || color !== 'all';
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider">Filters</h3>
        {isFiltered && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 px-2 text-xs text-brand-primary hover:text-brand-primary/80">
            <RotateCcw className="mr-1 h-3 w-3" /> Clear All
          </Button>
        )}
      </div>
      <div>
        <h4 className="text-xs font-semibold mb-4 text-muted-foreground uppercase">Categories</h4>
        <RadioGroup value={category} onValueChange={onCategoryChange} className="space-y-2.5">
          {['All', 'Dresses', 'Outerwear', 'Tops', 'Bottoms', 'Knitwear', 'Accessories'].map((cat) => (
            <div key={cat} className="flex items-center space-x-3">
              <RadioGroupItem value={cat.toLowerCase()} id={`cat-${cat}`} className="border-brand-primary text-brand-primary" />
              <Label htmlFor={`cat-${cat}`} className="text-sm font-medium cursor-pointer hover:text-brand-primary transition-colors">
                {cat}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />
      <div>
        <h4 className="text-xs font-semibold mb-4 text-muted-foreground uppercase">Price Range</h4>
        <div className="px-2">
          <Slider 
            value={[priceRange[0], priceRange[1]]} 
            max={1000} 
            step={10} 
            onValueChange={(vals) => onPriceRangeChange(vals as [number, number])}
            className="mb-4" 
          />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="text-xs font-semibold mb-4 text-muted-foreground uppercase">Colors</h4>
        <div className="flex flex-wrap gap-2.5">
          {['#000000', '#FFFFFF', '#8B4513', '#A52A2A', '#000080', '#800000', '#F5F5DC'].map((c) => (
            <button
              key={c}
              onClick={() => onColorChange(color === c ? 'all' : c)}
              className={cn(
                "h-8 w-8 rounded-full border transition-all hover:scale-110 active:scale-95",
                color === c ? "ring-2 ring-brand-primary ring-offset-2 scale-110" : "border-border"
              )}
              style={{ backgroundColor: c }}
              title={c}
            />
          ))}
        </div>
      </div>
    </div>
  );
}