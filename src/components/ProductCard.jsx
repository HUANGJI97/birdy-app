// @ts-ignore;
import React from 'react';
// @ts-ignore;
import { Heart } from 'lucide-react';
// @ts-ignore;
import { Button } from '@/components/ui';

export default function ProductCard({
  product,
  isFavorite,
  onFavoriteToggle
}) {
  return <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <div className="aspect-square bg-gray-100 relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-white rounded-full p-1 shadow" onClick={() => onFavoriteToggle(product.id)}>
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </Button>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1 truncate">{product.category}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-red-500 font-semibold">¥{product.price}</span>
          <Button variant="outline" size="sm">
            加入购物车
          </Button>
        </div>
      </div>
    </div>;
}