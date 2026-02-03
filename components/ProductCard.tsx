'use client';

import { Product } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { Star } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state: any) => state.addItem);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product);
    setTimeout(() => setIsAdding(false), 500);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden product-card group">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 text-gray-900 truncate">
          {product.title}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
        </div>

        {/* Price */}
        <p className="text-blue-600 font-bold text-xl mb-3">${product.price}</p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${
            isAdding
              ? 'bg-green-500 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isAdding ? '✓ Added' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}