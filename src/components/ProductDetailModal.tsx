import React, { useState } from 'react';
import { X, Package, Beaker, ShoppingCart, Plus, Minus, Sparkles } from 'lucide-react';
import type { Product, ProductVariation } from '../types';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product, variation: ProductVariation | undefined, quantity: number) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose, onAddToCart }) => {
  // Select first available variation, or first variation if all are out of stock
  const getFirstAvailableVariation = () => {
    if (!product.variations || product.variations.length === 0) return undefined;
    const available = product.variations.find(v => v.stock_quantity > 0);
    return available || product.variations[0];
  };

  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | undefined>(
    getFirstAvailableVariation()
  );
  const [quantity, setQuantity] = useState(1);

  const hasDiscount = product.discount_active && product.discount_price;
  const currentPrice = selectedVariation?.price || (hasDiscount ? product.discount_price! : product.base_price);
  const showPurity = Boolean(product.purity_percentage);

  // Check if product has any available stock
  const hasAnyStock = product.variations && product.variations.length > 0
    ? product.variations.some(v => v.stock_quantity > 0)
    : product.stock_quantity > 0;

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const handleAddToCart = () => {
    onAddToCart(product, selectedVariation, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-science-blue-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded sm:rounded shadow-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden my-2 sm:my-8 border border-gray-100">
        {/* Header */}
        <div className="bg-science-blue-900 text-white p-3 sm:p-4 md:p-6 relative border-b border-science-blue-800">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 p-1.5 sm:p-2 hover:bg-white/10 rounded transition-colors text-white/80 hover:text-white"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
          <div className="pr-10 sm:pr-12">
            <h2 className="font-heading text-base sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1.5 sm:mb-2 text-white tracking-tight">{product.name}</h2>
            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap">
              {showPurity && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-tech-teal/20 border border-tech-teal/30 text-tech-teal-light">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {product.purity_percentage}% Pure
                </span>
              )}
              {product.featured && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-science-blue-700 border border-science-blue-600 text-white">
                  Featured
                </span>
              )}
              {hasDiscount && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-bio-green/20 border border-bio-green/30 text-bio-green-light">
                  Sale
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 md:p-6 overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(90vh-280px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Left Column */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Product Image */}
              {product.image_url && (
                <div className="relative h-40 sm:h-48 md:h-56 lg:h-64 bg-secondary-50 rounded overflow-hidden border border-gray-100 shadow-inner">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-science-blue-900 mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2">
                  <Beaker className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-tech-teal" />
                  Product Description
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed font-sans">{product.description}</p>
              </div>

              {/* Complete Set Inclusions */}
              {product.inclusions && product.inclusions.length > 0 && (
                <div className="bg-clinical-blue rounded p-3 sm:p-4 border border-science-blue-100">
                  <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-science-blue-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                    <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-tech-teal" />
                    Kit Inclusions
                  </h3>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {product.inclusions.map((inclusion, idx) => (
                      <li key={idx} className="text-[11px] sm:text-xs md:text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-bio-green font-bold mt-0.5">✓</span>
                        <span className="flex-1">{inclusion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Scientific Details */}
              <div className="bg-gray-50 rounded p-3 sm:p-4 border border-gray-200">
                <h3 className="font-heading text-sm sm:text-base md:text-lg font-bold text-science-blue-900 mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                  <Beaker className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-tech-teal" />
                  Technical Specifications
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  {showPurity && (
                    <div className="flex justify-between">
                      <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm">Purity Analysis:</span>
                      <span className="font-semibold text-science-blue-700 text-[11px] sm:text-xs md:text-sm">{product.purity_percentage}% (HPLC Verified)</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm">Storage:</span>
                    <span className="font-medium text-gray-700 text-[11px] sm:text-xs md:text-sm">{product.storage_conditions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 text-[11px] sm:text-xs md:text-sm">Availability:</span>
                    <span className={`font-medium text-[11px] sm:text-xs md:text-sm ${(product.variations && product.variations.length > 0
                      ? product.variations.some(v => v.stock_quantity > 0)
                      : product.stock_quantity > 0)
                      ? 'text-bio-green'
                      : 'text-red-500'
                      }`}>
                      {product.variations && product.variations.length > 0
                        ? product.variations.reduce((sum, v) => sum + v.stock_quantity, 0)
                        : product.stock_quantity} units
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Purchase Section */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {/* Price */}
              <div className="bg-white rounded p-3 sm:p-4 md:p-6 border border-gray-100 shadow-clinical">
                <div className="text-center mb-3 sm:mb-4">
                  {hasDiscount ? (
                    <>
                      {/* Original Price - Strikethrough */}
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 line-through font-medium">
                          ₱{product.base_price.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-bio-green bg-bio-green-light/30 px-2 py-1 rounded">
                          {Math.round((1 - product.discount_price! / product.base_price) * 100)}% OFF
                        </span>
                      </div>
                      {/* Sale Price */}
                      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-science-blue-900 mb-2">
                        ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                      </div>
                      <div className="inline-block bg-bio-green-light text-bio-green-700 px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 md:py-1 rounded text-[10px] sm:text-xs md:text-sm font-bold border border-bio-green-200">
                        Savings: ₱{(product.base_price - product.discount_price!).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-science-blue-900">
                      ₱{currentPrice.toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                    </div>
                  )}
                </div>

                {/* Size Selection */}
                {product.variations && product.variations.length > 0 && (
                  <div className="mb-3 sm:mb-4">
                    <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2 uppercase tracking-wide">
                      Select Format
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {product.variations.map((variation) => {
                        const isOutOfStock = variation.stock_quantity === 0;
                        const isSelected = selectedVariation?.id === variation.id;
                        return (
                          <button
                            key={variation.id}
                            onClick={() => {
                              if (variation.stock_quantity > 0) {
                                setSelectedVariation(variation);
                              }
                            }}
                            disabled={isOutOfStock}
                            className={`
                                p-3 rounded border text-sm text-left transition-all
                                ${isSelected
                                ? 'border-science-blue-500 bg-science-blue-50 text-science-blue-900 ring-1 ring-science-blue-500'
                                : 'border-gray-200 hover:border-science-blue-300 text-gray-700 bg-white'
                              }
                                ${isOutOfStock ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''}
                              `}
                          >
                            <div className="font-bold">{variation.name}</div>
                            <div className="text-xs opacity-80">₱{variation.price.toLocaleString('en-PH')}</div>
                            {isOutOfStock && <div className="text-xs text-red-500 font-bold mt-1">Out of Stock</div>}
                          </button>
                        )
                      })}
                    </div>
                    {selectedVariation && selectedVariation.stock_quantity === 0 && (
                      <p className="text-xs text-red-600 mt-1.5 font-semibold">
                        This format is currently unavailable.
                      </p>
                    )}
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-3 sm:mb-4">
                  <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 sm:mb-2 uppercase tracking-wide">
                    Quantity
                  </label>
                  <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
                    <button
                      onClick={decrementQuantity}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 rounded transition-all active:scale-95 text-gray-600"
                      disabled={!product.available}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="text-xl sm:text-2xl font-bold text-science-blue-900 min-w-[50px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-gray-300 rounded transition-all active:scale-95 text-gray-600"
                      disabled={!product.available}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gray-50 rounded p-3 mb-4 border border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-medium text-sm">Total Estimate:</span>
                    <span className="text-xl font-bold text-science-blue-900">
                      ₱{(currentPrice * quantity).toLocaleString('en-PH', { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.available || !hasAnyStock || (selectedVariation && selectedVariation.stock_quantity === 0) || (!selectedVariation && product.stock_quantity === 0)}
                  className="w-full btn-primary py-3 md:py-4 text-sm md:text-base flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {!product.available
                    ? 'Unavailable'
                    : (!hasAnyStock || (selectedVariation && selectedVariation.stock_quantity === 0) || (!selectedVariation && product.stock_quantity === 0)
                      ? 'Out of Stock'
                      : 'Add to Cart')}
                </button>
              </div>

              {/* Stock Alert */}
              {product.available && (product.variations && product.variations.length > 0
                ? product.variations.some(v => v.stock_quantity > 0 && v.stock_quantity < 10)
                : product.stock_quantity < 10 && product.stock_quantity > 0) && (
                  <div className="bg-orange-50 border border-orange-100 rounded p-3">
                    <p className="text-xs text-orange-700 font-medium flex items-center gap-2">
                      <span className="font-bold">！</span>
                      Low stock: Only {product.variations && product.variations.length > 0
                        ? product.variations.reduce((sum, v) => sum + v.stock_quantity, 0)
                        : product.stock_quantity} units remaining
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;

