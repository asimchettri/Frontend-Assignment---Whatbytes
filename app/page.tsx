'use client';

import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import Sidebar from '@/components/Sidebar';
import ProductGrid from '@/components/ProductGrid';
import { Suspense } from 'react';

function HomeContent() {
  const searchParams = useSearchParams();
  
  // Get filter parameters
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'All';
  const brand = searchParams.get('brand') || 'All';
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '1000');

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    const matchesBrand = brand === 'All' || product.brand === brand;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  return (
    
     
      <div className=" container mt-4 ml-2 mr-2 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Sidebar - Full width on mobile, fixed width on desktop */}
        <div className="w-full lg:w-auto">
          <Sidebar />
        </div>

        {/* Product Grid - Takes remaining space */}
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl lg:text-3xl font-display font-bold mb-6 lg:mb-8 ml-2">Product Listing</h1>
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}