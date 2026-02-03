"use client";

import Link from "next/link";
import { ShoppingCart, Search, User } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/lib/data";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();
  const totalItems = useCartStore((state: any) => state.getTotalItems());
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products based on search
  const searchResults = searchQuery.trim()
    ? products.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/?search=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
    } else {
      router.push("/");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowResults(true);

    // If cleared, go back to home
    if (value === "") {
      router.push("/");
      setShowResults(false);
    }
  };

  const handleProductClick = (productId: string) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(`/product/${productId}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#163d87] shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-display text-2xl font-bold hover:opacity-80 transition-opacity"
          >
            Logo
          </Link>

          {/* Search Bar */}
          <div ref={searchRef} className="flex-1 max-w-2xl mx-8 relative">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/4 -translate-y-1/2 text-gray-400 w-5 h-5 " />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => searchQuery && setShowResults(true)}
                  className="w-full pl-10 pr-4 py-2 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-white/30 text-gray-900"
                />
              </div>
            </form>
          </div>

          {/* Cart and Profile */}
          <Link
            href="/cart"
            className="flex items-center gap-3 bg-[#0b1e44] px-3 py-2 rounded-md hover:opacity-80 transition-opacity"
          >
            {/* Cart Icon with Badge */}
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-scale-in">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Cart Text */}
            <span className="text-stone-50 font-semibold">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
