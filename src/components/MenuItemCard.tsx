import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import type { Product, ProductVariation } from '../types';

interface MenuItemCardProps {
  product: Product;
  onAddToCart: (product: Product, variation?: ProductVariation, quantity?: number) => void;
  cartQuantity?: number;
  onUpdateQuantity?: (index: number, quantity: number) => void;
  onProductClick?: (product: Product) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  product,
  onAddToCart,
  cartQuantity = 0,
  onProductClick,
}) => {
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    product.variations && product.variations.length > 0 ? product.variations[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);

  // Calculate current price considering both product and variation discounts
  const currentPrice = selectedVariation
    ? (selectedVariation.discount_active && selectedVariation.discount_price)
      ? selectedVariation.discount_price
      : selectedVariation.price
    : (product.discount_active && product.discount_price)
      ? product.discount_price
      : product.base_price;

  // Check if there's an active discount
  const hasDiscount = selectedVariation
    ? (selectedVariation.discount_active && selectedVariation.discount_price !== null)
    : (product.discount_active && product.discount_price !== null);

  // Get original price for strikethrough
  const originalPrice = selectedVariation ? selectedVariation.price : product.base_price;

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariation, quantity);
    setQuantity(1);
  };

  const availableStock = selectedVariation ? selectedVariation.stock_quantity : product.stock_quantity;

  // Check if product has any available stock (either in variations or product itself)
  const hasAnyStock = product.variations && product.variations.length > 0
    ? product.variations.some(v => v.stock_quantity > 0)
    : product.stock_quantity > 0;

  const incrementQuantity = () => {
    setQuantity(prev => {
      if (prev >= availableStock) {
        alert(`Only ${availableStock} item(s) available in stock.`);
        return prev;
      }
      return prev + 1;
    });
  };

  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  return (
    <div className="bg-white h-full flex flex-col group relative border border-gray-100 rounded shadow-sm hover:border-blush-200 transition-all duration-300 hover:shadow-clinical">
      {/* Click overlay for product details */}
      <div
        onClick={() => onProductClick?.(product)}
        className="absolute inset-x-0 top-0 h-28 sm:h-44 z-10 cursor-pointer"
        title="View details"
      />

      {/* Product Image */}
      <div className="relative h-28 sm:h-44 bg-secondary-50 overflow-hidden border-b border-gray-50">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 bg-blush-50/50">
            <Package className="w-16 h-16 opacity-50" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 pointer-events-none z-20">
          {product.featured && (
            <span className="px-2 py-1 bg-blush-600 text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-1 bg-glow-teal-600 text-white text-[10px] font-bold rounded shadow-sm">
              {Math.round((1 - currentPrice / originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Stock Status Overlay */}
        {(!product.available || !hasAnyStock) && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[1px] flex items-center justify-center z-20">
            <span className="bg-gray-100 text-gray-500 px-3 py-1 text-xs font-bold rounded border border-gray-200 uppercase tracking-wide">
              {!product.available ? 'Unavailable' : 'Out of Stock'}
            </span>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-2.5 sm:p-4 flex-1 flex flex-col">
        <h3 className="font-heading font-bold text-blush-900 text-xs sm:text-base mb-0.5 sm:mb-1 line-clamp-2 tracking-tight">
          {product.name}
        </h3>
        <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3 line-clamp-2 min-h-[1.5rem] sm:min-h-[2.5rem] leading-relaxed">
          {product.description}
        </p>

        {/* Variations (Sizes) */}
        <div className="mb-2 sm:mb-4 min-h-[1.5rem] sm:min-h-[2rem]">
          {product.variations && product.variations.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {product.variations.slice(0, 2).map((variation) => {
                const isOutOfStock = variation.stock_quantity === 0;
                return (
                  <button
                    key={variation.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isOutOfStock) {
                        setSelectedVariation(variation);
                      }
                    }}
                    disabled={isOutOfStock}
                    className={`
                      px-1.5 sm:px-2 py-0.5 sm:py-1 text-[9px] sm:text-[10px] font-medium rounded border transition-all duration-200 relative z-20
                      ${selectedVariation?.id === variation.id && !isOutOfStock
                        ? 'bg-blush-50 border-blush-500 text-blush-900'
                        : isOutOfStock
                          ? 'bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-blush-300 hover:text-blush-600'
                      }
                    `}
                  >
                    {variation.name}
                  </button>
                );
              })}
              {product.variations.length > 2 && (
                <span className="text-[9px] sm:text-[10px] text-gray-400 self-center">
                  +{product.variations.length - 2}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex-1" />

        {/* Price and Cart Actions */}
        <div className="flex flex-col gap-2 sm:gap-3 mt-auto">
          {hasDiscount ? (
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-sm sm:text-lg font-bold text-blush-900">
                ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                ₱{originalPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline">
              <span className="text-sm sm:text-lg font-bold text-blush-900">
                ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1.5 sm:gap-2 relative z-20">
            {/* Quantity Controls */}
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  decrementQuantity();
                }}
                className="p-1 sm:p-1.5 hover:bg-gray-100 transition-colors rounded-l text-gray-600"
                disabled={!hasAnyStock || !product.available}
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 sm:w-8 text-center text-[10px] sm:text-xs font-bold text-blush-900">
                {quantity}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  incrementQuantity();
                }}
                className="p-1 sm:p-1.5 hover:bg-gray-100 transition-colors rounded-r text-gray-600"
                disabled={quantity >= availableStock || !hasAnyStock || !product.available}
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (quantity > availableStock) {
                  alert(`Only ${availableStock} item(s) available in stock.`);
                  setQuantity(availableStock);
                  return;
                }
                handleAddToCart();
              }}
              disabled={!hasAnyStock || availableStock === 0 || !product.available}
              className="flex-1 btn-primary py-1.5 sm:py-2 text-[10px] sm:text-xs flex items-center justify-center gap-1 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              <ShoppingCart className="w-3 h-3" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>

          {/* Cart Status */}
          {cartQuantity > 0 && (
            <div className="text-center text-[10px] text-bio-green font-medium bg-bio-green-light/50 rounded py-1">
              {cartQuantity} in cart
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
