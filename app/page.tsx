export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
          Welcome to Our Store
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover amazing products at great prices
        </p>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-2">✅ Header Component Ready!</h2>
          <p className="text-blue-100">
            The header includes a logo, search bar, and cart icon with badge.
            Try searching for products or checking out the cart.
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="font-semibold text-lg mb-2">Search Products</h3>
            <p className="text-gray-600 text-sm">Use the search bar to find products quickly</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="text-3xl mb-3">🛒</div>
            <h3 className="font-semibold text-lg mb-2">Shopping Cart</h3>
            <p className="text-gray-600 text-sm">Cart icon shows the number of items added</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="text-3xl mb-3">👤</div>
            <h3 className="font-semibold text-lg mb-2">User Profile</h3>
            <p className="text-gray-600 text-sm">Access your account and preferences</p>
          </div>
        </div>
      </div>
    </div>
  );
}