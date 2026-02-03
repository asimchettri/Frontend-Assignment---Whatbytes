'use client';

import { Product } from '@/lib/data';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
        
      <div className="col-span-full text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-600 mb-2">No Products Found</h2>
        <p className="text-gray-500">Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}