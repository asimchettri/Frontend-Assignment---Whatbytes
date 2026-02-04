"use client";

import { useParams, useRouter } from "next/navigation";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/store";
import { Star, ShoppingCart, Minus, Plus, ArrowLeft } from "lucide-react";
import { useState ,useEffect } from "react";
import Link from "next/link";

export default function ProductDetailPage() {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const params = useParams();
  const router = useRouter();

  const productId = Array.isArray(params.id) ? params.id[0] : params.id;

  const product = products.find((p) => p.id === productId);
 const addItem = useCartStore((state: any) => state.addItem);


  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const [helpfulCounts, setHelpfulCounts] = useState<number[]>([]);

useEffect(() => {
  setHelpfulCounts(
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1)
  );
}, []);

  //  product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            The product you're looking for doesn't exist.
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Searching for ID: {productId}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

 

  const handleAddToCart = () => {
  if (!addItem) return;

  setIsAdding(true);
  for (let i = 0; i < quantity; i++) {
    addItem(product);
  }
  setTimeout(() => {
    setIsAdding(false);
  }, 500);
};


  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-semibold"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Products
      </Link>

      {/* Product Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Side - Image */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Side - Product Details */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="border-t border-b border-gray-200 py-4">
            <p className="text-4xl font-bold text-blue-600">${product.price}</p>
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">
              Category
            </h3>
            <p className="text-lg text-gray-900">{product.category}</p>
          </div>

          {/* Brand */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-1">Brand</h3>
            <p className="text-lg text-gray-900">{product.brand}</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              Quantity
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={decreaseQuantity}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-2xl font-semibold w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={increaseQuantity}
                className="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`w-full py-4 rounded-lg border-none font-semibold text-lg flex items-center justify-center gap-2 transition-colors ${
              isAdding
                ? "bg-green-500 text-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            <ShoppingCart className="w-6 h-6" />
            {isAdding ? "Added to Cart!" : "Add to Cart"}
          </button>

          {/* Additional Info */}
          <div className="bg-gray-50 rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🚚</span>
              <div>
                <p className="font-semibold text-gray-900">Free Delivery</p>
                <p className="text-sm text-gray-600">For orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔄</span>
              <div>
                <p className="font-semibold text-gray-900">30-Day Returns</p>
                <p className="text-sm text-gray-600">Easy return policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <p className="font-semibold text-gray-900">Secure Payment</p>
                <p className="text-sm text-gray-600">
                  100% secure transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section - Two Column Layout */}
      <div className="mt-16">
        <h2 className="text-3xl font-display font-bold mb-8">
          Customer Reviews & Details
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Product Specifications & Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Product Specifications</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Brand:</span>
                  <span className="text-gray-900">{product.brand}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Category:</span>
                  <span className="text-gray-900">{product.category}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Rating:</span>
                  <span className="text-gray-900">{product.rating}/5</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-600 font-semibold">Reviews:</span>
                  <span className="text-gray-900">{product.reviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-semibold">Price:</span>
                  <span className="text-blue-600 font-bold">
                    ${product.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4">Rating Breakdown</h3>
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm font-semibold w-12">
                      {stars} star
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{
                          width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 5 : stars === 2 ? 3 : 2}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {stars === 5
                        ? "70%"
                        : stars === 4
                          ? "20%"
                          : stars === 3
                            ? "5%"
                            : stars === 2
                              ? "3%"
                              : "2%"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-3xl font-bold text-gray-900">
                  {product.rating}
                </p>
                <div className="flex items-center justify-center gap-1 my-2">
                  {renderStars(product.rating)}
                </div>
                <p className="text-sm text-gray-600">
                  Based on {product.reviews} reviews
                </p>
              </div>
            </div>

            {/* Product Features */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Key Features
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-gray-700">High-quality materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-gray-700">
                    Durable and long-lasting
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-gray-700">
                    Easy to use and maintain
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-gray-700">
                    Excellent customer support
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span className="text-gray-700">Backed by warranty</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Customer Reviews */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Sample Reviews */}
              {[
                {
                  name: "John Doe",
                  rating: 5,
                  date: "January 15, 2026",
                  comment:
                    "Excellent product! Exceeded my expectations. Highly recommend!",
                  verified: true,
                },
                {
                  name: "Jane Smith",
                  rating: 4,
                  date: "January 10, 2026",
                  comment:
                    "Great quality and fast shipping. Very satisfied with my purchase.",
                  verified: true,
                },
                {
                  name: "Mike Johnson",
                  rating: 5,
                  date: "January 5, 2026",
                  comment:
                    "Perfect! Exactly what I was looking for. Will buy again.",
                  verified: false,
                },
                {
                  name: "Sarah Williams",
                  rating: 5,
                  date: "January 2, 2026",
                  comment:
                    "Amazing quality and value for money. Delivery was quick too!",
                  verified: true,
                },
                {
                  name: "David Brown",
                  rating: 4,
                  date: "December 28, 2025",
                  comment:
                    "Good product overall. Minor issues but customer service resolved them quickly.",
                  verified: true,
                },
              ].map((review, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">
                            {review.name}
                          </p>
                          {review.verified && (
                            <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-semibold">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.comment}
                  </p>

                  {/* Helpful Button */}
                  <div className="mt-4 pt-4  flex items-center gap-4 text-sm">
                    <button className="text-gray-600 border-none rounded-md hover:text-blue-600 font-semibold flex items-center gap-1">
                      👍 Helpful ({helpfulCounts[index] ?? "—"})
                    </button>
                    <button className="text-gray-600  border-none rounded-md  hover:text-blue-600 font-semibold">
                      Report
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Write a Review Button */}
            <div className="mt-8">
              <button className="w-full border-none bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
