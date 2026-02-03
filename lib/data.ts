export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  description: string;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: '1',
    title: 'Running Shoes',
    price: 99,
    category: 'Electronics',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    description: 'Professional running shoes with advanced cushioning technology for maximum comfort and performance.',
    rating: 4.5,
    reviews: 128
  },
  {
    id: '2',
    title: 'Wireless Headphones',
    price: 249,
    category: 'Electronics',
    brand: 'Sony',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    rating: 4.8,
    reviews: 342
  },
  {
    id: '3',
    title: 'Backpack',
    brand: 'North Face',
    price: 129,
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    description: 'Durable and spacious backpack perfect for travel and outdoor adventures.',
    rating: 4.6,
    reviews: 89
  },
  {
    id: '4',
    title: 'Smartwatch',
    price: 249,
    category: 'Electronics',
    brand: 'Apple',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    description: 'Advanced smartwatch with health tracking, GPS, and seamless connectivity.',
    rating: 4.7,
    reviews: 456
  },
  {
    id: '5',
    title: 'Sunglasses',
    price: 149,
    category: 'Clothing',
    brand: 'Ray-Ban',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    description: 'Classic sunglasses with UV protection and polarized lenses.',
    rating: 4.4,
    reviews: 234
  },
  {
    id: '6',
    title: 'Digital Camera',
    price: 499,
    category: 'Electronics',
    brand: 'Canon',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
    description: 'Professional-grade digital camera with 4K video recording and advanced autofocus.',
    rating: 4.9,
    reviews: 178
  },
  {
    id: '7',
    title: 'T-shirt',
    price: 29,
    category: 'Clothing',
    brand: 'Uniqlo',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    description: 'Comfortable cotton t-shirt with a modern fit and breathable fabric.',
    rating: 4.3,
    reviews: 567
  },
  {
    id: '8',
    title: 'Smartphone',
    price: 699,
    category: 'Electronics',
    brand: 'Samsung',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    description: 'Latest smartphone with cutting-edge technology, stunning display, and powerful performance.',
    rating: 4.8,
    reviews: 892
  },
  {
    id: '9',
    title: 'Laptop Stand',
    price: 49,
    category: 'Home',
    brand: 'Generic',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    description: 'Ergonomic laptop stand with adjustable height for better posture and comfort.',
    rating: 4.2,
    reviews: 156
  },
  {
    id: '10',
    title: 'Water Bottle',
    price: 25,
    category: 'Home',
    brand: 'Hydro Flask',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
    rating: 4.6,
    reviews: 423
  },
  {
    id: '11',
    title: 'Desk Lamp',
    price: 39,
    category: 'Home',
    brand: 'Philips',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500',
    description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
    rating: 4.5,
    reviews: 298
  },
  {
    id: '12',
    title: 'Yoga Mat',
    price: 35,
    category: 'Home',
    brand: 'Lululemon',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    description: 'Premium yoga mat with superior grip and cushioning for all types of practice.',
    rating: 4.7,
    reviews: 512
  }
];

export const categories = ['All', 'Electronics', 'Clothing', 'Home'];
export const brands = ['All', 'Nike', 'Sony', 'Apple', 'Ray-Ban', 'Canon', 'Samsung', 'Generic', 'North Face', 'Uniqlo', 'Hydro Flask', 'Philips', 'Lululemon'];