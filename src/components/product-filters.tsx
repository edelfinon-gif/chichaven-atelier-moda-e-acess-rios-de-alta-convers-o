import React from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarContent, SidebarMenu, SidebarMenuItem } from '@/components/ui/sidebar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
export function ProductFilters() {
  return (
    <div className="space-y-8 sticky top-24">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Categories</h3>
        <RadioGroup defaultValue="all" className="space-y-3">
          {['All Items', 'Dresses', 'Outerwear', 'Tops', 'Bottoms', 'Knitwear', 'Accessories'].map((cat) => (
            <div key={cat} className="flex items-center space-x-3">
              <RadioGroupItem value={cat.toLowerCase()} id={cat} className="border-brand-primary text-brand-primary" />
              <Label htmlFor={cat} className="text-sm font-medium cursor-pointer hover:text-brand-primary transition-colors">
                {cat}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Price Range</h3>
        <div className="px-2">
          <Slider defaultValue={[0, 500]} max={1000} step={10} className="mb-4" />
          <div className="flex justify-between text-xs text-muted-foreground font-mono">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Colors</h3>
        <div className="flex flex-wrap gap-2">
          {['#000000', '#FFFFFF', '#8B4513', '#A52A2A', '#000080', '#800000', '#F5F5DC'].map((color) => (
            <button 
              key={color}
              className="h-8 w-8 rounded-full border-2 border-transparent hover:border-brand-primary transition-all active:scale-90"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}