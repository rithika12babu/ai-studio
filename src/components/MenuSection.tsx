import React, { useState, useMemo } from 'react';
import { Search, Flame, Sparkles, Plus, Eye, Check } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem, MenuCategory, DietaryTag } from '../types';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'Complete Collection' },
  { id: 'woodfire', label: 'Woodfire Hearth' },
  { id: 'starters', label: 'Starters & Crudo' },
  { id: 'pastas', label: 'Handcrafted Pastas' },
  { id: 'garden', label: 'Plant-Forward' },
  { id: 'sweets', label: 'Sweets & Fromage' },
  { id: 'beverages', label: 'Cocktails & Cellar' },
];

const DIETARY_FILTERS: { id: DietaryTag; label: string }[] = [
  { id: 'Chef Signature', label: "Chef's Signature" },
  { id: 'Gluten-Free', label: 'Gluten-Free' },
  { id: 'Vegetarian', label: 'Vegetarian' },
  { id: 'Dairy-Free', label: 'Dairy-Free' },
];

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem, onQuickAdd }) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [activeDietary, setActiveDietary] = useState<DietaryTag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItemId, setAddedItemId] = useState<string | null>(null);

  const toggleDietary = (tag: DietaryTag) => {
    setActiveDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Dietary filter (must match all active filters)
      if (
        activeDietary.length > 0 &&
        !activeDietary.every((tag) => item.dietary.includes(tag))
      ) {
        return false;
      }
      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesProv = item.provenance.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesProv) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, activeDietary, searchQuery]);

  const handleQuickAddClick = (item: MenuItem) => {
    if (item.options && item.options.length > 0) {
      onSelectItem(item);
    } else {
      onQuickAdd(item);
      setAddedItemId(item.id);
      setTimeout(() => setAddedItemId(null), 1200);
    }
  };

  return (
    <section id="menu" className="py-24 bg-[#0d0c0a] text-[#ede7de] border-b border-[#28241e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-[#c99742] mb-3">
              <span>Seasonal Autumn / Winter Curation</span>
              <span aria-hidden="true">·</span>
              <span>Updated Daily</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#faedd0] tracking-tight">
              The Hearth Menu & Cellar
            </h2>
          </div>
          <p className="text-sm text-[#a89f92] max-w-md leading-relaxed">
            Every dish is cooked over live California white oak coals or cured with cold-pressed botanical oils. Available for in-house dining or bespoke packaging.
          </p>
        </div>

        {/* Filter & Controls Bar */}
        <div className="mb-10 space-y-4">
          {/* Category Tabs (Segmented Control) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#23201a] scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#c99742] text-[#0d0c0a] shadow-sm'
                    : 'text-[#9c9386] hover:text-[#ede7de] hover:bg-[#1a1814]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sub-bar: Dietary Toggles + Search Input */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            {/* Dietary Tags buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-[#7e766b] mr-1 hidden sm:inline">
                Preferences:
              </span>
              {DIETARY_FILTERS.map((tag) => {
                const isActive = activeDietary.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => toggleDietary(tag.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer border ${
                      isActive
                        ? 'border-[#c99742] text-[#c99742] bg-[#c99742]/10'
                        : 'border-[#28241e] text-[#8e8578] hover:border-[#3d372e] hover:text-[#ded5c7]'
                    }`}
                  >
                    {tag.label}
                  </button>
                );
              })}
              {activeDietary.length > 0 && (
                <button
                  onClick={() => setActiveDietary([])}
                  className="text-xs text-[#9e9587] underline hover:text-[#ede7de] ml-1 cursor-pointer"
                >
                  Clear filters
                </button>
              )}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-[#756d62] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients or dishes..."
                className="w-full bg-[#141310] border border-[#28241e] rounded-lg pl-9 pr-3 py-2 text-xs text-[#ede7de] placeholder-[#6e675b] focus:outline-none focus:border-[#c99742] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#7e766b] hover:text-[#ded5c7]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center border border-[#24201a] rounded-xl bg-[#12110e]">
            <p className="text-[#a1978a] font-serif-display text-xl mb-2">No culinary items match your selection.</p>
            <p className="text-xs text-[#6e675b] mb-4">Try clearing your dietary filters or search terms.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveDietary([]);
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs uppercase tracking-wider text-[#c99742] border border-[#c99742] rounded-lg hover:bg-[#c99742]/10"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="group flex flex-col bg-[#14120f] border border-[#26221b] rounded-xl overflow-hidden hover:border-[#3d372e] transition-all duration-200 hover:-translate-y-1 shadow-sm"
              >
                {/* Image or Styled Fallback Container (60-70% visual lead) */}
                <div 
                  className="relative aspect-[4/3] bg-[#1a1814] overflow-hidden cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    /* High-polish Styled CSS Fallback with Hearth Motif */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#1a1814] to-[#11100e] text-center">
                      <Flame className="w-8 h-8 text-[#c99742]/50 mb-3" />
                      <span className="font-serif-display text-base text-[#d8cfc0] line-clamp-1">
                        {item.name}
                      </span>
                      <span className="text-[11px] text-[#7d7568] tracking-wider uppercase mt-1">
                        {item.category}
                      </span>
                    </div>
                  )}

                  {/* Woodfire Char Note Overlay */}
                  {item.woodfireHeat && (
                    <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-[#0d0c0a]/85 backdrop-blur-xs text-[10px] tracking-wider uppercase font-medium text-[#c99742] border border-[#302a20]">
                      {item.woodfireHeat}
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Unboxed Metadata with Typographic Separators */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#8c8376] mb-2">
                      <span className="uppercase tracking-wider font-semibold text-[#a89e8f]">
                        {item.category}
                      </span>
                      {item.dietary.map((tag) => (
                        <React.Fragment key={tag}>
                          <span aria-hidden="true" className="text-[#4e483d]">·</span>
                          <span className={tag === 'Chef Signature' ? 'text-[#c99742] font-medium' : ''}>
                            {tag}
                          </span>
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Title & Price Header */}
                    <div className="flex items-baseline justify-between gap-2 mb-2">
                      <h3
                        onClick={() => onSelectItem(item)}
                        className="font-serif-display text-xl text-[#faedd0] group-hover:text-[#c99742] transition-colors cursor-pointer leading-snug"
                      >
                        {item.name}
                      </h3>
                      <span className="font-mono text-base font-semibold text-[#f5ebd8] tabular-nums shrink-0">
                        ${item.price}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-[#a89e90] leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>

                    {/* Farm Provenance */}
                    <p className="text-[11px] text-[#787063] italic line-clamp-1 mb-4">
                      {item.provenance}
                    </p>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-[#23201a] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="text-xs text-[#a39a8c] hover:text-[#faedd0] flex items-center gap-1.5 py-1.5 px-2 rounded hover:bg-[#1f1d18] transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{item.options ? 'Customize' : 'Details'}</span>
                    </button>

                    <button
                      onClick={() => handleQuickAddClick(item)}
                      className="px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase bg-[#1f1d18] hover:bg-[#c99742] text-[#d6cdbe] hover:text-[#0d0c0a] border border-[#383329] hover:border-[#c99742] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      {addedItemId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{item.options ? 'Order / Options' : 'Add to Bag'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
