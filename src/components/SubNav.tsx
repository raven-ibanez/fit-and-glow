import React from 'react';
import { Grid, FlaskConical, Sparkles, Leaf, Package, Scale } from 'lucide-react';
import { useCategories } from '../hooks/useCategories';

interface SubNavProps {
  selectedCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const iconMap: { [key: string]: React.ReactElement } = {
  Grid: <Grid className="w-5 h-5" />,
  FlaskConical: <FlaskConical className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />,
  Package: <Package className="w-5 h-5" />,
  Scale: <Scale className="w-5 h-5" />,
};

const SubNav: React.FC<SubNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="bg-white/95 backdrop-blur-xl border-b border-gray-100 hidden md:block">
        <div className="container mx-auto px-4 py-4">
          <div className="flex space-x-3 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="animate-pulse bg-gray-100 h-10 w-32 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className="bg-white/95 backdrop-blur-xl sticky top-[64px] md:top-[80px] lg:top-[88px] z-40 border-b border-gray-100 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-2 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category) => {
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onCategoryClick(category.id)}
                className={`
                  flex items-center space-x-2 px-5 py-2.5 rounded-lg font-bold whitespace-nowrap
                  transition-all duration-300 text-sm uppercase tracking-wider
                  ${isSelected
                    ? 'bg-blush-600 text-white shadow-glow'
                    : 'bg-white text-charcoal-500 hover:text-blush-600 hover:bg-blush-50 border border-blush-100'
                  }
                `}
              >
                <span>
                  {React.cloneElement(iconMap[category.icon] || <Grid className="w-4 h-4" />, {
                    className: `w-4 h-4 ${isSelected ? 'text-white' : 'text-blush-500'}`
                  })}
                </span>
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hide scrollbar for better aesthetics */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
};

export default SubNav;
