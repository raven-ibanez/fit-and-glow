import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Package } from 'lucide-react';
import type { Product, ProductVariation, PenType } from '../types';

interface MenuItemCardProps {
  product: Product;
  onAddToCart: (product: Product, variation?: ProductVariation, quantity?: number, penType?: PenType) => void;
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
  const [imageError, setImageError] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    product.variations && product.variations.length > 0 ? product.variations[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedPenType, setSelectedPenType] = useState<PenType>(null);
  const isInjectableProduct = product.category !== 'supplies';

  // Calculate current price considering both product and variation discounts
  const currentPrice = (() => {
    // If pen type is selected, use that specific price
    if (selectedPenType === 'disposable' && selectedVariation?.disposable_pen_price) {
      return selectedVariation.disposable_pen_price;
    }
    if (selectedPenType === 'reusable' && selectedVariation?.reusable_pen_price) {
      return selectedVariation.reusable_pen_price;
    }

    // Otherwise fall back to variation or product price
    return selectedVariation
      ? (selectedVariation.discount_active && selectedVariation.discount_price)
        ? selectedVariation.discount_price
        : selectedVariation.price
      : (product.discount_active && product.discount_price)
        ? product.discount_price
        : product.base_price;
  })();

  // Check if there's an active discount
  const hasDiscount = selectedVariation
    ? (selectedVariation.discount_active && selectedVariation.discount_price !== null)
    : (product.discount_active && product.discount_price !== null);

  // Get original price for strikethrough
  const originalPrice = selectedVariation ? selectedVariation.price : product.base_price;

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariation, quantity, isInjectableProduct ? selectedPenType : null);
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
    <div className="bg-white/70 backdrop-blur-md h-full flex flex-col group relative border border-white/60 rounded-3xl shadow-soft hover:border-blush-200 transition-all duration-500 hover:shadow-luxury hover:-translate-y-1 overflow-hidden">
      {/* Click overlay for product details */}
      <div
        onClick={() => onProductClick?.(product)}
        className="absolute inset-x-0 top-0 h-32 sm:h-56 z-10 cursor-pointer"
        title="View details"
      />

      {/* Product Image Section */}
      <div className="relative h-32 sm:h-56 bg-slate-50/50 overflow-hidden border-b border-white/40">
        {product.image_url && !imageError ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-200 bg-blush-50/30">
            <Package className="w-12 h-12 sm:w-20 sm:h-20 opacity-40 animate-pulse" />
          </div>
        )}

        {/* Badges System */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none z-20">
          {product.featured && (
            <span className="badge bg-blush-600 text-white shadow-soft font-bold py-1.5 animate-fadeIn">
              Featured
            </span>
          )}
          {hasDiscount && (
            <span className="badge bg-amber-500 text-white shadow-soft font-bold py-1.5 animate-fadeIn">
              -{Math.round((1 - currentPrice / originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Stock Status Backdrop */}
        {(!product.available || !hasAnyStock) && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-20">
            <span className="bg-white/90 text-slate-900 px-4 py-2 text-[10px] font-black rounded-full shadow-lg uppercase tracking-widest border border-white">
              {!product.available ? 'Unavailable' : 'Sold Out'}
            </span>
          </div>
        )}
      </div>

      {/* Product Details Section */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col">
        <div className="mb-3">
          <h3 className="font-heading font-black text-slate-900 text-sm sm:text-lg mb-1 line-clamp-2 leading-tight tracking-tight group-hover:text-blush-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-[13px] text-slate-500 line-clamp-2 min-h-[1.5rem] sm:min-h-[2.5rem] leading-relaxed font-medium opacity-80">
            {product.description}
          </p>
        </div>

        {/* Variations / Sizes Selection */}
        {product.variations && product.variations.length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {product.variations.slice(0, 3).map((variation) => {
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
                      px-3 py-1 text-[10px] font-bold rounded-full border transition-all duration-300 relative z-20
                      ${selectedVariation?.id === variation.id && !isOutOfStock
                        ? 'bg-blush-600 border-blush-600 text-white shadow-glow'
                        : isOutOfStock
                          ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed opacity-50'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-blush-400 hover:text-blush-600'
                      }
                    `}
                  >
                    {variation.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Pen Selection Section */}
        {isInjectableProduct && selectedVariation && (
          <div className="mb-5 p-2 rounded-2xl bg-slate-50/50 border border-slate-100">
            <div className="flex items-center gap-1.5">
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPenType(null); }}
                className={`flex-1 py-1.5 text-[9px] font-black rounded-xl transition-all relative z-20 uppercase tracking-widest border ${selectedPenType === null ? 'bg-white text-blush-700 border-blush-200 shadow-sm' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
              >
                Set
              </button>
              {selectedVariation?.disposable_pen_price && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedPenType('disposable'); }}
                  className={`flex-1 py-1.5 text-[9px] font-black rounded-xl transition-all relative z-20 uppercase tracking-widest border ${selectedPenType === 'disposable' ? 'bg-white text-blush-700 border-blush-200 shadow-sm' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                >
                  Disp
                </button>
              )}
              {selectedVariation?.reusable_pen_price && (
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedPenType('reusable'); }}
                  className={`flex-1 py-1.5 text-[9px] font-black rounded-xl transition-all relative z-20 uppercase tracking-widest border ${selectedPenType === 'reusable' ? 'bg-white text-blush-700 border-blush-200 shadow-sm' : 'text-slate-400 border-transparent hover:text-slate-600'}`}
                >
                  Reus
                </button>
              )}
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Pricing Layout */}
        <div className="mb-5">
          {hasDiscount ? (
            <div className="flex items-center gap-3">
              <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                ₱{currentPrice.toLocaleString()}
              </span>
              <span className="text-sm font-bold text-slate-400 line-through opacity-60">
                ₱{originalPrice.toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              ₱{currentPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 relative z-20">
          <div className="flex items-center bg-slate-100/50 rounded-2xl p-1 border border-slate-200/50">
            <button
              onClick={(e) => { e.stopPropagation(); decrementQuantity(); }}
              className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600 active:scale-90"
              disabled={!hasAnyStock || !product.available}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-xs font-black text-slate-900">
              {quantity}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); incrementQuantity(); }}
              className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-xl transition-all text-slate-600 active:scale-90"
              disabled={quantity >= availableStock || !hasAnyStock || !product.available}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (quantity > availableStock) {
                alert(`Only ${availableStock} available.`);
                setQuantity(availableStock);
                return;
              }
              handleAddToCart();
            }}
            disabled={!hasAnyStock || availableStock === 0 || !product.available}
            className="flex-1 btn-primary py-3 px-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>

        {/* Cart Context Indicator */}
        {cartQuantity > 0 && (
          <div className="mt-3 text-center text-[10px] font-black text-blush-700 bg-blush-50 py-1.5 rounded-xl border border-blush-100/50 uppercase tracking-widest animate-fadeIn">
            {cartQuantity} in your cart
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;
