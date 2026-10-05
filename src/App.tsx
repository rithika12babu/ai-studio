import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { DishDetailModal } from './components/DishDetailModal';
import { ReservationSection } from './components/ReservationSection';
import { CartDrawer } from './components/CartDrawer';
import { StorySection } from './components/StorySection';
import { SeatingSection } from './components/SeatingSection';
import { PrivateDiningModal } from './components/PrivateDiningModal';
import { LocationHoursSection } from './components/LocationHoursSection';
import { Footer } from './components/Footer';

import { MenuItem, CartItem, CartItemOptionChoice, SeatingArea, ReservationBooking } from './types';
import { Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isPrivateDiningOpen, setIsPrivateDiningOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Cart operations
  const handleQuickAdd = (item: MenuItem) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (ci) => ci.menuItemId === item.id && ci.selectedOptions.length === 0
      );
      if (existing) {
        return prev.map((ci) =>
          ci.id === existing.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      const newItem: CartItem = {
        id: `${item.id}-${Date.now()}`,
        menuItemId: item.id,
        name: item.name,
        unitPrice: item.price,
        quantity: 1,
        selectedOptions: [],
        image: item.image,
      };
      return [...prev, newItem];
    });
    showToast(`Added "${item.name}" to Bag`);
  };

  const handleAddToCartWithOptions = (
    item: MenuItem,
    quantity: number,
    selectedOptions: CartItemOptionChoice[],
    specialInstructions: string
  ) => {
    const newItem: CartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItemId: item.id,
      name: item.name,
      unitPrice: item.price,
      quantity,
      selectedOptions,
      specialInstructions,
      image: item.image,
    };
    setCartItems((prev) => [...prev, newItem]);
    showToast(`Added ${quantity}x "${item.name}" to Bag`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((ci) => (ci.id === cartItemId ? { ...ci, quantity: newQuantity } : ci))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSeatingArea = (area: SeatingArea) => {
    scrollToSection('reservations');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0d0c0a] text-[#ede7de] font-sans-body flex flex-col selection:bg-[#c99742]/30 selection:text-[#faedd0]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1d1a15] border border-[#3b3427] text-[#faedd0] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-[#c99742] text-[#0d0c0a] flex items-center justify-center font-bold">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Contract (3 zones) */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenReservations={() => scrollToSection('reservations')}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onReserveClick={() => scrollToSection('reservations')}
          onExploreMenuClick={() => scrollToSection('menu')}
        />

        {/* Menu & Curations */}
        <MenuSection
          onSelectItem={(item) => setSelectedDish(item)}
          onQuickAdd={handleQuickAdd}
        />

        {/* Story, Culinary Craft & Accolades */}
        <StorySection
          onOpenPrivateDining={() => setIsPrivateDiningOpen(true)}
        />

        {/* Seating Environments */}
        <SeatingSection
          onSelectSeatingArea={handleSelectSeatingArea}
        />

        {/* Interactive Reservation System */}
        <ReservationSection />

        {/* Location, Hours & Concierge */}
        <LocationHoursSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Dish Detail & Customization Modal */}
      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCartWithOptions}
      />

      {/* Order & Checkout Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Private Events Inquiry Modal */}
      <PrivateDiningModal
        isOpen={isPrivateDiningOpen}
        onClose={() => setIsPrivateDiningOpen(false)}
      />
    </div>
  );
}
