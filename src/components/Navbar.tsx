import React, { useState } from 'react';
import { ShoppingBag, Calendar, Menu, X, UtensilsCrossed } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenReservations: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenReservations,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Reservations', href: '#reservations' },
    { label: 'Story & Hearth', href: '#story' },
    { label: 'Seating & Cellar', href: '#seating' },
    { label: 'Hours & Location', href: '#location' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0d0c0a]/90 backdrop-blur-md border-b border-[#28241e] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-wider text-[#faedd0] hover:text-[#e4be78] transition-colors"
        >
          Aura Hearth & Dining
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-[#b8afa3]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#faedd0] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#c99742] hover:after:w-full after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCart}
            aria-label={`View order bag with ${cartCount} items`}
            className="relative p-2.5 rounded-lg text-[#ede7de] hover:bg-[#1f1d18] border border-[#2e2a22] transition-colors flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-[#c99742]" />
            <span className="hidden sm:inline text-xs uppercase tracking-wider font-semibold">
              Bag
            </span>
            {cartCount > 0 && (
              <span className="bg-[#c99742] text-[#0d0c0a] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenReservations}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase bg-[#c99742] text-[#0d0c0a] rounded-lg hover:bg-[#dbaa52] transition-colors whitespace-nowrap shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            Book a Table
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#b8afa3] hover:text-[#ede7de] hover:bg-[#1a1814]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#28241e] bg-[#12110e] px-4 pt-4 pb-6 space-y-3">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#c8bfb3] hover:text-[#faedd0] px-2 py-1.5 rounded transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-[#23201a] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservations();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-[#c99742] text-[#0d0c0a] rounded-lg"
            >
              <Calendar className="w-4 h-4" />
              Reserve a Table
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
