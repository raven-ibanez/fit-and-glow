import React, { useState, useRef } from 'react';
import MenuItemCard from './MenuItemCard';
import Hero from './Hero';
import ProductDetailModal from './ProductDetailModal';
import type { Product, ProductVariation, CartItem, PenType } from '../types';
import { Search, Filter, Package, Plus } from 'lucide-react';

interface MenuProps {
  menuItems: Product[];
  addToCart: (product: Product, variation?: ProductVariation, quantity?: number, penType?: PenType) => void;
  cartItems: CartItem[];
  updateQuantity: (index: number, quantity: number) => void;
}

const Menu: React.FC<MenuProps> = ({ menuItems, addToCart, cartItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'purity'>('name');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const productsRef = useRef<HTMLDivElement | null>(null);

  // Filter products based on search
  const filteredProducts = menuItems.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort products - Featured first (Tirzepatide first among featured), then by selected sort
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    // Tirzepatide always first
    if (a.name === 'Tirzepatide') return -1;
    if (b.name === 'Tirzepatide') return 1;

    // Featured products come before non-featured
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    // Then apply selected sort
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.base_price - b.base_price;
      case 'purity':
        return b.purity_percentage - a.purity_percentage;
      default:
        return 0;
    }
  });

  const getCartQuantity = (productId: string, variationId?: string) => {
    return cartItems
      .filter(item =>
        item.product.id === productId &&
        (variationId ? item.variation?.id === variationId : !item.variation)
      )
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <>
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product, variation, quantity, penType) => {
            addToCart(product, variation, quantity, penType);
          }}
        />
      )}

      <div className="min-h-screen bg-white">
        <Hero
          onShopAll={() => {
            productsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        />

        <div className="container mx-auto px-4 md:px-8 py-24" ref={productsRef}>
          {/* Header & Controls Section */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16">
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blush-50 text-blush-600 border border-blush-100 text-[10px] font-black uppercase tracking-widest mb-4">
                <Package className="w-3 h-3" />
                Laboratory Grade
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-4 tracking-tight">
                Premium Catalog
              </h2>
              <p className="text-slate-500 font-medium leading-relaxed">
                Explore our curated collection of high-purity peptides and medical research supplies.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-[320px] group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blush-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Find your formula..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blush-500/10 focus:border-blush-500 transition-all font-medium text-slate-800 placeholder-slate-400"
                />
              </div>

              <div className="relative w-full sm:w-auto">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'purity')}
                  className="w-full sm:w-auto pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:border-blush-500 transition-all font-bold text-xs text-slate-700 appearance-none cursor-pointer hover:bg-slate-50 shadow-sm uppercase tracking-widest"
                >
                  <option value="name">Sort: Name</option>
                  <option value="price">Sort: Price</option>
                  <option value="purity">Sort: Purity</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <Plus className="w-3 h-3 rotate-45" />
                </div>
              </div>
            </div>
          </div>

          {/* Results Analysis */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-slate-100" />
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Showing {sortedProducts.length} Compounds
            </span>
            <div className="h-[1px] flex-1 bg-slate-100" />
          </div>

          {/* Products Visualization */}
          {sortedProducts.length === 0 ? (
            <div className="text-center py-32 rounded-[3rem] bg-slate-50 border border-dashed border-slate-200">
              <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-soft">
                <Package className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">No Compounds Found</h3>
              <p className="text-slate-500 font-medium mb-8 max-w-xs mx-auto">
                {searchQuery
                  ? `We couldn't find any results for "${searchQuery}". Try a different term?`
                  : 'Our catalog is currently being updated. Please check back soon!'}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-blush-600 font-black text-xs uppercase tracking-widest hover:text-blush-700 active:scale-95 transition-all"
                >
                  Reset Research
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
              {sortedProducts.map((product) => (
                <MenuItemCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  cartQuantity={getCartQuantity(product.id)}
                  onProductClick={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Menu;
