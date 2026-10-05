import React, { useState } from 'react';
import { X, Flame, Wine, Plus, Minus, Check } from 'lucide-react';
import { MenuItem, CartItemOptionChoice } from '../types';

interface DishDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedOptions: CartItemOptionChoice[],
    specialInstructions: string
  ) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedChoices, setSelectedChoices] = useState<Record<string, { label: string; extraPrice: number }>>(() => {
    const initial: Record<string, { label: string; extraPrice: number }> = {};
    if (item.options) {
      item.options.forEach((opt) => {
        if (opt.choices.length > 0) {
          initial[opt.name] = {
            label: opt.choices[0].label,
            extraPrice: opt.choices[0].extraPrice || 0,
          };
        }
      });
    }
    return initial;
  });

  const handleChoiceSelect = (groupName: string, label: string, extraPrice: number = 0) => {
    setSelectedChoices((prev) => ({
      ...prev,
      [groupName]: { label, extraPrice },
    }));
  };

  const calculateItemTotal = () => {
    const extras = Object.values(selectedChoices).reduce(
      (sum, c) => sum + (c.extraPrice || 0),
      0
    );
    return (item.price + extras) * quantity;
  };

  const handleAdd = () => {
    const formattedChoices: CartItemOptionChoice[] = Object.entries(selectedChoices).map(
      ([groupName, choice]) => ({
        groupName,
        choiceLabel: choice.label,
        extraPrice: choice.extraPrice,
      })
    );

    onAddToCart(item, quantity, formattedChoices, specialInstructions);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#14120f] border border-[#2b271f] rounded-2xl overflow-hidden shadow-2xl my-8 text-[#ede7de]"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#0d0c0a]/80 text-[#b5aba0] hover:text-white hover:bg-[#0d0c0a] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Media or Fallback Header */}
        <div className="relative aspect-[16/9] w-full bg-[#1b1915]">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover filter brightness-95"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-b from-[#1f1d17] to-[#12110e]">
              <Flame className="w-12 h-12 text-[#c99742]/60 mb-2" />
              <span className="font-serif-display text-2xl text-[#e8ded0]">{item.name}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14120f] via-transparent to-black/30" />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#8c8273] mb-2">
              <span className="uppercase tracking-wider font-semibold text-[#c99742]">
                {item.category}
              </span>
              {item.dietary.map((tag) => (
                <React.Fragment key={tag}>
                  <span aria-hidden="true">·</span>
                  <span>{tag}</span>
                </React.Fragment>
              ))}
              {item.calories && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums font-mono">{item.calories} kcal</span>
                </>
              )}
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#faedd0]">
                {item.name}
              </h3>
              <span className="font-mono text-2xl font-semibold text-[#f5ebd8] tabular-nums">
                ${item.price}
              </span>
            </div>

            <p className="mt-3 text-sm text-[#bab1a3] leading-relaxed">
              {item.description}
            </p>

            <p className="mt-2 text-xs text-[#7e7669] italic">
              Provenance: {item.provenance}
            </p>
          </div>

          {/* Sommelier's Wine Pairing recommendation */}
          {item.winePairing && (
            <div className="p-3.5 rounded-lg bg-[#1a1813] border border-[#2c2820] flex items-start gap-3">
              <Wine className="w-4 h-4 text-[#c99742] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-medium text-[#d9cfc1] block">Sommelier&apos;s Reserve Pairing</span>
                <span className="text-[#9e9587]">{item.winePairing}</span>
              </div>
            </div>
          )}

          {/* Custom Options / Modifiers if available */}
          {item.options && item.options.length > 0 && (
            <div className="space-y-4 pt-2 border-t border-[#26221b]">
              {item.options.map((optionGroup) => (
                <div key={optionGroup.name} className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#a89e8f] block">
                    {optionGroup.name}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {optionGroup.choices.map((choice) => {
                      const isSelected =
                        selectedChoices[optionGroup.name]?.label === choice.label;
                      return (
                        <button
                          key={choice.label}
                          type="button"
                          onClick={() =>
                            handleChoiceSelect(
                              optionGroup.name,
                              choice.label,
                              choice.extraPrice || 0
                            )
                          }
                          className={`p-3 rounded-lg text-left text-xs border transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'border-[#c99742] bg-[#c99742]/10 text-[#faedd0]'
                              : 'border-[#28241e] bg-[#171512] text-[#999083] hover:border-[#383329] hover:text-[#ede7de]'
                          }`}
                        >
                          <span className="font-medium">{choice.label}</span>
                          {choice.extraPrice ? (
                            <span className="font-mono text-[#c99742] tabular-nums">
                              +${choice.extraPrice}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Kitchen Instructions */}
          <div className="space-y-2 pt-2 border-t border-[#26221b]">
            <label className="text-xs uppercase tracking-wider font-semibold text-[#a89e8f] block">
              Culinary Notes / Allergies (Optional)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g. Extra rosemary butter, no raw onions, urgent prep..."
              className="w-full bg-[#171512] border border-[#28241e] rounded-lg px-3.5 py-2.5 text-xs text-[#ede7de] placeholder-[#6e675b] focus:outline-none focus:border-[#c99742]"
            />
          </div>

          {/* Footer Controls: Quantity Stepper & Add Button */}
          <div className="pt-4 border-t border-[#26221b] flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#2f2b23] rounded-lg bg-[#171512] overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2.5 text-[#a89e8f] hover:text-[#faedd0] hover:bg-[#201d17] transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-mono text-sm font-semibold text-[#faedd0] tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2.5 text-[#a89e8f] hover:text-[#faedd0] hover:bg-[#201d17] transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Order Button */}
            <button
              type="button"
              onClick={handleAdd}
              className="flex-1 py-3 px-6 bg-[#c99742] hover:bg-[#dbaa52] text-[#0d0c0a] font-semibold text-xs uppercase tracking-widest rounded-lg transition-colors flex items-center justify-between cursor-pointer shadow-md"
            >
              <span>Add to Order</span>
              <span className="font-mono text-sm font-bold tabular-nums">
                ${calculateItemTotal().toFixed(2)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
