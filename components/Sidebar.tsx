'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories, brands } from '@/lib/data';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [customMinPrice, setCustomMinPrice] = useState('0');
  const [customMaxPrice, setCustomMaxPrice] = useState('1000');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category') || 'All';
    const brand = searchParams.get('brand') || 'All';
    const minPrice = searchParams.get('minPrice') || '0';
    const maxPrice = searchParams.get('maxPrice') || '1000';
    
    setSelectedCategory(category);
    setSelectedBrand(brand);
    setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    setCustomMinPrice(minPrice);
    setCustomMaxPrice(maxPrice);
  }, [searchParams]);

  const updateFilters = (category: string, brand: string, minPrice: number, maxPrice: number) => {
    const params = new URLSearchParams();
    
    if (category !== 'All') params.set('category', category);
    if (brand !== 'All') params.set('brand', brand);
    if (minPrice !== 0) params.set('minPrice', minPrice.toString());
    if (maxPrice !== 1000) params.set('maxPrice', maxPrice.toString());
    
    const search = searchParams.get('search');
    if (search) params.set('search', search);
    
    router.push(`/?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateFilters(category, selectedBrand, priceRange[0], priceRange[1]);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand);
    updateFilters(selectedCategory, brand, priceRange[0], priceRange[1]);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setPriceRange([0, value]);
    setCustomMaxPrice(value.toString());
    updateFilters(selectedCategory, selectedBrand, 0, value);
  };

  const handleCustomPriceApply = () => {
    const minPrice = parseInt(customMinPrice) || 0;
    const maxPrice = parseInt(customMaxPrice) || 1000;
    
    // Validate
    if (minPrice < 0 || maxPrice < 0) {
      alert('Price cannot be negative');
      return;
    }
    if (minPrice > maxPrice) {
      alert('Minimum price cannot be greater than maximum price');
      return;
    }
    
    setPriceRange([minPrice, maxPrice]);
    updateFilters(selectedCategory, selectedBrand, minPrice, maxPrice);
  };

  return (
    <aside className="w-full lg:w-64 lg:flex-shrink-0">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full  bg-[#1e4b9f] text-white rounded-lg p-4 flex items-center justify-between mb-4"
      >
        <span className="font-bold text-lg">Filters</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {/* Filters Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} lg:block space-y-4 lg:sticky lg:top-20`}>
        {/* Main Filters Title */}
        <div className=" bg-[#1e4b9f] text-white rounded-lg p-4 lg:p-6">
          <h2 className="text-xl font-bold">Filters</h2>
        <br />

        {/* Category Filter - Separate Div */}
        
          <h3 className="font-semibold mb-3 text-lg">Category</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-1 rounded transition-colors">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Slider - Separate Div */}
        <div className=" bg-[#1e4b9f] text-white rounded-lg p-4 lg:p-6">
          <h3 className="font-semibold mb-3 text-lg">Price</h3>
          
          {/* Slider */}
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="w-full mb-2 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer accent-white"
            style={{
              background: `linear-gradient(to right, white 0%, white ${(priceRange[1] / 1000) * 100}%, rgba(255,255,255,0.3) ${(priceRange[1] / 1000) * 100}%, rgba(255,255,255,0.3) 100%)`
            }}
          />
          <div className="flex justify-between text-sm mb-4">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>

          {/* Custom Price Inputs */}
          <div className="space-y-3">
            <div>
              <label className="text-xs block mb-1">Min Price</label>
              <input
                type="number"
                value={customMinPrice}
                onChange={(e) => setCustomMinPrice(e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
            </div>
            <div>
              <label className="text-xs block mb-1">Max Price</label>
              <input
                type="number"
                value={customMaxPrice}
                onChange={(e) => setCustomMaxPrice(e.target.value)}
                placeholder="1000"
                className="w-full px-3 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
              />
            </div>
            <button
              onClick={handleCustomPriceApply}
              className="w-full bg-white text-[#0369a1] border-none font-semibold py-2 px-4 rounded-md hover:bg-white/90 transition-colors text-sm"
            >
              Apply
            </button>
          </div>
        </div>

        {/* Brand Filter - Separate Div */}
        <div className=" bg-[#1e4b9f] text-white rounded-lg p-4 lg:p-6">
          <h3 className="font-semibold mb-3 text-lg">Brand</h3>
          <div className="space-y-2">
            {brands.slice(0, 5).map((brand) => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-1 rounded transition-colors">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={selectedBrand === brand}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 accent-white cursor-pointer"
                />
                <span className="text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}