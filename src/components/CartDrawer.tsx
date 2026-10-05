import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, CheckCircle2, Clock, MapPin, Truck, Flame } from 'lucide-react';
import { CartItem, PlacedOrder } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [tipPercent, setTipPercent] = useState<number>(20);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [pickupTimeSlot, setPickupTimeSlot] = useState('In 30-40 minutes (ASAP)');
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Checkout flow state
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Pricing Math with Tabular figures
  const subtotal = items.reduce((sum, item) => {
    const extraPrice = item.selectedOptions.reduce((s, o) => s + (o.extraPrice || 0), 0);
    return sum + (item.unitPrice + extraPrice) * item.quantity;
  }, 0);

  const deliveryFee = fulfillmentType === 'delivery' ? (subtotal > 100 ? 0 : 8.5) : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.0925; // 9.25% municipal tax
  const gratuity = (taxableAmount * tipPercent) / 100;
  const total = taxableAmount + tax + gratuity + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'HEARTH10' || promoCode.trim().toUpperCase() === 'AURA') {
      const discount = subtotal * 0.1;
      setDiscountAmount(discount);
      setPromoApplied(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid promo code. Try HEARTH10 for 10% off.');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMessage('Please fill in your name, contact phone, and email.');
      return;
    }
    if (fulfillmentType === 'delivery' && !deliveryAddress.trim()) {
      setErrorMessage('Please provide a delivery street address.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const newOrder: PlacedOrder = {
        orderNumber: `AH-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        items: [...items],
        fulfillmentType,
        customerName,
        customerEmail,
        customerPhone,
        deliveryAddress: fulfillmentType === 'delivery' ? deliveryAddress : undefined,
        pickupTimeSlot: fulfillmentType === 'pickup' ? pickupTimeSlot : undefined,
        subtotal,
        tax,
        gratuity,
        deliveryFee,
        total,
        status: 'in_hearth',
        estimatedMinutes: fulfillmentType === 'delivery' ? 45 : 30,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setPlacedOrder(newOrder);
      setIsSubmitting(false);
      onClearCart();
    }, 800);
  };

  const handleResetOrder = () => {
    setPlacedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-lg bg-[#14120f] border-l border-[#26221b] h-full flex flex-col shadow-2xl relative text-[#ede7de]"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#26221b] flex items-center justify-between bg-[#11100d]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#c99742]" />
            <h2 className="font-serif-display text-2xl text-[#faedd0]">
              {placedOrder ? 'Order Confirmed' : 'Culinary Bag'}
            </h2>
            {!placedOrder && items.length > 0 && (
              <span className="text-xs text-[#8c8273] font-mono tabular-nums">
                ({items.reduce((sum, i) => sum + i.quantity, 0)} items)
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart drawer"
            className="p-2 text-[#998f82] hover:text-[#ede7de] hover:bg-[#1a1814] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {placedOrder ? (
            /* Order Placed Success View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#c99742]/20 border border-[#c99742] flex items-center justify-center">
                <CheckCircle2 className="w-9 h-9 text-[#c99742]" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#c99742] block mb-1">
                  {placedOrder.orderNumber}
                </span>
                <h3 className="font-serif-display text-3xl text-[#faedd0]">
                  Hearth Fire Lit!
                </h3>
                <p className="text-xs text-[#a89e90] mt-1.5 max-w-sm mx-auto">
                  Our brigade has received your order and is firing your selection over oak embers.
                </p>
              </div>

              {/* Live Kitchen Status Step Bar */}
              <div className="p-4 rounded-xl bg-[#171512] border border-[#2b271f] text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#faedd0] flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-[#c99742] animate-pulse" />
                    Status: Firing on Hearth
                  </span>
                  <span className="text-[#c99742] font-mono tabular-nums font-semibold">
                    ~{placedOrder.estimatedMinutes} mins
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-[#26221b] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#c99742] h-full w-2/5 rounded-full" />
                </div>
                <div className="flex justify-between text-[10px] text-[#787063]">
                  <span>Order Placed ({placedOrder.placedAt})</span>
                  <span>Woodfire Prep</span>
                  <span>Packaging</span>
                  <span>{placedOrder.fulfillmentType === 'pickup' ? 'Ready' : 'Delivered'}</span>
                </div>
              </div>

              {/* Order Details & Summary */}
              <div className="p-4 rounded-xl bg-[#171512] border border-[#2b271f] text-left text-xs space-y-2">
                <div className="flex justify-between text-[#8c8273]">
                  <span>Fulfillment:</span>
                  <span className="text-[#ede7de] capitalize font-medium">
                    {placedOrder.fulfillmentType === 'pickup' ? 'Curbside Pickup' : 'Local Delivery'}
                  </span>
                </div>
                {placedOrder.deliveryAddress && (
                  <div className="flex justify-between text-[#8c8273]">
                    <span>Destination:</span>
                    <span className="text-[#ede7de] font-medium text-right max-w-[200px] truncate">
                      {placedOrder.deliveryAddress}
                    </span>
                  </div>
                )}
                {placedOrder.pickupTimeSlot && (
                  <div className="flex justify-between text-[#8c8273]">
                    <span>Pickup Window:</span>
                    <span className="text-[#ede7de] font-medium">{placedOrder.pickupTimeSlot}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#8c8273]">
                  <span>Customer:</span>
                  <span className="text-[#ede7de] font-medium">{placedOrder.customerName} ({placedOrder.customerPhone})</span>
                </div>
                <div className="pt-2 border-t border-[#26221b] flex justify-between font-semibold text-sm text-[#faedd0]">
                  <span>Total Paid:</span>
                  <span className="font-mono tabular-nums text-[#c99742]">${placedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetOrder}
                  className="w-full py-3 bg-[#c99742] hover:bg-[#dbaa52] text-[#0d0c0a] font-semibold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                >
                  Return to Aura Storefront
                </button>
              </div>
            </div>
          ) : items.length === 0 ? (
            /* Empty Cart View */
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <div className="w-16 h-16 rounded-full bg-[#1b1915] border border-[#2c2820] flex items-center justify-center mb-4 text-[#7e7669]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif-display text-2xl text-[#faedd0] mb-2">
                Your Bag is Empty
              </h3>
              <p className="text-xs text-[#8c8273] max-w-xs mb-6">
                Explore our woodfire specialties, fresh handmade pastas, and cellar cocktails to begin your order.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#c99742] hover:bg-[#dbaa52] text-[#0d0c0a] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            /* Active Cart Items & Checkout Form */
            <div className="space-y-6">
              {/* Fulfillment Switcher */}
              <div className="flex p-1 bg-[#171512] rounded-lg border border-[#28241e]">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('pickup')}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    fulfillmentType === 'pickup'
                      ? 'bg-[#c99742] text-[#0d0c0a] shadow-sm'
                      : 'text-[#9c9386] hover:text-[#ede7de]'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  Curbside Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentType('delivery')}
                  className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    fulfillmentType === 'delivery'
                      ? 'bg-[#c99742] text-[#0d0c0a] shadow-sm'
                      : 'text-[#9c9386] hover:text-[#ede7de]'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  White-Glove Delivery
                </button>
              </div>

              {/* Itemized List */}
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8c8273] block">
                  Selected Dishes
                </span>
                {items.map((item) => {
                  const extraPrice = item.selectedOptions.reduce(
                    (s, o) => s + (o.extraPrice || 0),
                    0
                  );
                  const itemLineTotal = (item.unitPrice + extraPrice) * item.quantity;

                  return (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl bg-[#171512] border border-[#26221b] flex items-start justify-between gap-3"
                    >
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between">
                          <h4 className="font-serif-display text-base text-[#faedd0]">
                            {item.name}
                          </h4>
                          <span className="font-mono text-xs font-semibold text-[#faedd0] tabular-nums">
                            ${itemLineTotal.toFixed(2)}
                          </span>
                        </div>

                        {/* Modifiers List */}
                        {item.selectedOptions.length > 0 && (
                          <div className="text-[11px] text-[#8c8273] space-y-0.5 mt-1">
                            {item.selectedOptions.map((opt) => (
                              <div key={opt.groupName}>
                                <span className="text-[#a39a8c]">{opt.choiceLabel}</span>
                                {opt.extraPrice > 0 && (
                                  <span className="font-mono text-[#c99742] ml-1">
                                    (+${opt.extraPrice})
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {item.specialInstructions && (
                          <p className="text-[10px] text-[#736c61] italic mt-1">
                            Note: {item.specialInstructions}
                          </p>
                        )}

                        {/* Quantity Stepper & Remove */}
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-[#28241e] rounded bg-[#11100e]">
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-[#8c8273] hover:text-[#ede7de] hover:bg-[#1f1d18]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center font-mono text-xs font-semibold text-[#ede7de] tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-[#8c8273] hover:text-[#ede7de] hover:bg-[#1f1d18]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.id)}
                            className="text-[11px] text-[#787063] hover:text-red-400 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Customer Delivery / Pickup Form */}
              <div className="pt-2 border-t border-[#23201a] space-y-3">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8c8273] block">
                  {fulfillmentType === 'pickup' ? 'Pickup Contact & Schedule' : 'Delivery Destination'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full bg-[#171512] border border-[#28241e] rounded-lg px-3 py-2 text-xs text-[#ede7de] placeholder-[#6b6458] focus:outline-none focus:border-[#c99742]"
                  />
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Mobile Phone *"
                    className="w-full bg-[#171512] border border-[#28241e] rounded-lg px-3 py-2 text-xs text-[#ede7de] placeholder-[#6b6458] focus:outline-none focus:border-[#c99742]"
                  />
                </div>

                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="Email Receipt Address *"
                  className="w-full bg-[#171512] border border-[#28241e] rounded-lg px-3 py-2 text-xs text-[#ede7de] placeholder-[#6b6458] focus:outline-none focus:border-[#c99742]"
                />

                {fulfillmentType === 'delivery' ? (
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Delivery Street Address, Apt / Suite *"
                    className="w-full bg-[#171512] border border-[#28241e] rounded-lg px-3 py-2 text-xs text-[#ede7de] placeholder-[#6b6458] focus:outline-none focus:border-[#c99742]"
                  />
                ) : (
                  <select
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value)}
                    className="w-full bg-[#171512] border border-[#28241e] rounded-lg px-3 py-2 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                  >
                    <option value="In 30-40 minutes (ASAP)">In 30–40 minutes (ASAP)</option>
                    <option value="Today at 6:00 PM">Today at 6:00 PM</option>
                    <option value="Today at 7:00 PM">Today at 7:00 PM</option>
                    <option value="Today at 8:00 PM">Today at 8:00 PM</option>
                    <option value="Today at 9:00 PM">Today at 9:00 PM</option>
                  </select>
                )}
              </div>

              {/* Hospitality Gratuity Selector */}
              <div className="pt-2 border-t border-[#23201a] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="uppercase tracking-wider font-semibold text-[#8c8273]">
                    Kitchen & Service Gratuity
                  </span>
                  <span className="font-mono tabular-nums text-[#c99742]">
                    ${gratuity.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 18, 20, 25].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => setTipPercent(pct)}
                      className={`py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                        tipPercent === pct
                          ? 'border-[#c99742] bg-[#c99742]/15 text-[#faedd0]'
                          : 'border-[#28241e] bg-[#171512] text-[#8c8273] hover:text-[#ede7de]'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Promo code field */}
              <div className="pt-2 border-t border-[#23201a]">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (try HEARTH10)"
                    disabled={promoApplied}
                    className="flex-1 bg-[#171512] border border-[#28241e] rounded-lg px-3 py-1.5 text-xs text-[#ede7de] placeholder-[#6b6458] focus:outline-none focus:border-[#c99742]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    disabled={promoApplied || !promoCode}
                    className="px-3 py-1.5 text-xs font-medium text-[#c99742] border border-[#c99742]/50 hover:border-[#c99742] rounded-lg disabled:opacity-50 cursor-pointer"
                  >
                    {promoApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p className="text-xs text-red-400 bg-red-950/30 p-2.5 rounded-lg border border-red-900/40">
                  {errorMessage}
                </p>
              )}

              {/* Receipt Summary Breakdown with Tabular Numerals */}
              <div className="pt-3 border-t border-[#26221b] space-y-2 text-xs">
                <div className="flex justify-between text-[#8c8273]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#ede7de]">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Hearth Privilege (10%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {fulfillmentType === 'delivery' && (
                  <div className="flex justify-between text-[#8c8273]">
                    <span>Delivery Courier Fee</span>
                    <span className="font-mono tabular-nums text-[#ede7de]">
                      {deliveryFee === 0 ? 'Complimentary' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-[#8c8273]">
                  <span>Estimated State & Local Tax (9.25%)</span>
                  <span className="font-mono tabular-nums text-[#ede7de]">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#8c8273]">
                  <span>Hospitality Gratuity ({tipPercent}%)</span>
                  <span className="font-mono tabular-nums text-[#ede7de]">${gratuity.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-[#28241e] flex justify-between text-base font-semibold text-[#faedd0]">
                  <span>Final Total</span>
                  <span className="font-mono tabular-nums text-xl text-[#c99742]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#c99742] hover:bg-[#dbaa52] text-[#0d0c0a] font-semibold text-xs uppercase tracking-widest rounded-lg transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg flex items-center justify-between px-4 disabled:opacity-60"
                >
                  <span>{isSubmitting ? 'Firing Order...' : 'Fire & Confirm Order'}</span>
                  <span className="font-mono font-bold text-sm tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </button>
                <p className="text-[10px] text-center text-[#736c61] mt-2">
                  Zero delivery surcharges over $100. Packaged in temperature-stabilized compostable containers.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
