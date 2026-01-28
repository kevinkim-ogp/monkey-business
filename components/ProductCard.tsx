'use client';

import { useState } from 'react';
import { isBugActive } from '@/lib/bugs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ProductCardProps {
  product: Product;
  cardIndex: number;
  cartQuantity: number;
  onAddToCart: (product: Product) => void;
  onRemoveFromCart: (productId: number) => void;
}

export default function ProductCard({
  product,
  cardIndex,
  cartQuantity,
  onAddToCart,
  onRemoveFromCart
}: ProductCardProps) {
  const [showErrorToast, setShowErrorToast] = useState(false);

  // Bug #1: Broken Add Button - Second card's button shows error
  const bug1Active = isBugActive(1) && cardIndex === 1;

  // Bug #4: Missing Image - Third card shows broken image
  const bug4Active = isBugActive(4) && cardIndex === 2;

  // Bug #6: Wrong Currency - Half of the products show NaN price
  const bug6Active = isBugActive(6) && cardIndex % 2 === 0;

  const handleAddToCart = () => {
    if (bug1Active) {
      // Bug #1: Show error toast
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
      return;
    }
    onAddToCart(product);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(product.id);
  };

  const displayPrice = bug6Active ? '$NaN' : `$${product.price.toFixed(2)}`;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Product Image */}
        <div className="aspect-square bg-gray-100 relative">
          {bug4Active ? (
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          ) : (
            <div
              className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
              style={{ backgroundColor: `hsl(${product.id * 40}, 70%, 90%)` }}
            >
              <span className="text-4xl">{product.image}</span>
            </div>
          )}
          {/* Quantity badge */}
          {cartQuantity > 0 && (
            <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
              {cartQuantity}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-medium text-gray-900">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <span className="text-lg font-semibold text-gray-900">{displayPrice}</span>
          </div>

          {cartQuantity > 0 ? (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={handleRemoveFromCart}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                -
              </button>
              <span className="flex-1 text-center font-medium text-gray-900">{cartQuantity}</span>
              <button
                onClick={handleAddToCart}
                className="flex-1 px-4 py-2 rounded-lg text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Error Toast */}
      {showErrorToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px]">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium">Error: Failed to add to cart</span>
          </div>
        </div>
      )}
    </>
  );
}
