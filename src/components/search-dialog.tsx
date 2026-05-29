import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { MOCK_PRODUCTS } from '@shared/mock-data';
export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const navigate = useNavigate();
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange, open]);
  const handleSelect = (id: string) => {
    onOpenChange(false);
    navigate(`/product/${id}`);
  };
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search products, brands, categories..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => navigate('/#shop')}>New Arrivals</CommandItem>
          <CommandItem onSelect={() => navigate('/#shop')}>Best Sellers</CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Products">
          {MOCK_PRODUCTS.map((product) => (
            <CommandItem
              key={product.id}
              value={product.name}
              onSelect={() => handleSelect(product.id)}
              className="flex items-center gap-3"
            >
              <div className="h-8 w-8 rounded overflow-hidden bg-muted">
                <img src={product.imageUrl} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span>{product.name}</span>
                <span className="text-xs text-muted-foreground">{product.category}</span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}