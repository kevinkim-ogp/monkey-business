'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isLoggedIn } from '@/lib/auth';
import { isBugActive } from '@/lib/bugs';
import Sidebar from '@/components/Sidebar';
import ProductCard, { Product, CartItem } from '@/components/ProductCard';

const productsData: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 149.99, image: '🎧', category: 'Electronics' },
  { id: 2, name: 'Leather Backpack', price: 89.99, image: '🎒', category: 'Accessories' },
  { id: 3, name: 'Smart Watch', price: 299.99, image: '⌚', category: 'Electronics' },
  { id: 4, name: 'Running Shoes', price: 129.99, image: '👟', category: 'Footwear' },
  { id: 5, name: 'Coffee Maker', price: 79.99, image: '☕', category: 'Home' },
  { id: 6, name: 'Desk Lamp', price: 49.99, image: '💡', category: 'Home' },
];

export default function ProductsPage() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Bug #7: Repeated Product - All products show the same item
  const bug7Active = isBugActive(7);

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push('/');
    }
  }, [router]);

  const handleAddToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.product.id !== productId);
    });
  };

  const getCartQuantity = (productId: number) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  // If bug 7 is active, show the same product repeatedly
  const displayProducts = bug7Active
    ? Array(productsData.length).fill(productsData[0])
    : productsData;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="flex-1 p-8 pt-20 md:pt-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Browse and add items to your cart</p>
          </div>

          {/* Cart Icon with Hover Tooltip */}
          <div className="relative group">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-3 bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-md transition-all"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hover Tooltip */}
            <div className={`absolute right-0 top-full mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg transition-all duration-200 z-50 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}>
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">
                  Cart {totalItems > 0 && <span className="text-indigo-600">({totalItems})</span>}
                </h3>
              </div>
              <div className="p-4">
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {cart.map(item => (
                        <div key={item.product.id} className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `hsl(${item.product.id * 40}, 70%, 90%)` }}
                          >
                            <span className="text-lg">{item.product.image}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                            <p className="text-xs text-gray-500">${item.product.price.toFixed(2)} x {item.quantity}</p>
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-3 pt-3">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-gray-600">Total</span>
                        <span className="font-semibold text-gray-900">${totalPrice.toFixed(2)}</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                        Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              cardIndex={index}
              cartQuantity={getCartQuantity(product.id)}
              onAddToCart={handleAddToCart}
              onRemoveFromCart={handleRemoveFromCart}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
