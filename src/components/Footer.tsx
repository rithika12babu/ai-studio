import React, { useState } from 'react';
import { Send, Check, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-[#0b0a08] text-[#9c9386] border-t border-[#23201a] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#1f1d17]">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif-display text-2xl font-semibold text-[#faedd0] tracking-wider block">
              Aura Hearth & Dining
            </span>
            <p className="text-xs text-[#8c8273] leading-relaxed max-w-sm">
              Ancestral 800° white oak woodfire cookery, hand-extruded heritage pastas, and botanical cellar selections.
            </p>
            <div className="pt-2 text-xs text-[#736c60]">
              <span>418 St. Clair Avenue</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>San Francisco Arts District</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#d4cbbe] block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-[#faedd0] transition-colors">
                  Dinner & Cocktails Menu
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-[#faedd0] transition-colors">
                  Table Reservations
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#faedd0] transition-colors">
                  Hearth Story & Purveyors
                </a>
              </li>
              <li>
                <a href="#seating" className="hover:text-[#faedd0] transition-colors">
                  Cellar & Private Dining
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#faedd0] transition-colors">
                  Hours & Complimentary Valet
                </a>
              </li>
            </ul>
          </div>

          {/* Accreditations */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#d4cbbe] block">
              Distinctions
            </span>
            <ul className="space-y-2 text-xs text-[#857c70]">
              <li>Michelin Guide Selected 2025/2026</li>
              <li>James Beard Foundation Nominee</li>
              <li>Wine Spectator Best of Award</li>
              <li>Certified Regenerative Purveyor</li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#d4cbbe] block">
              The Hearth Journal
            </span>
            <p className="text-xs text-[#857c70] leading-relaxed">
              Receive private invitations to seasonal tasting menus, guest chef dinners, and cellar reserve releases.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-lg bg-[#191813] border border-[#302b20] text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are subscribed to the Hearth Journal.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address..."
                  className="flex-1 bg-[#14120f] border border-[#26221b] rounded-lg px-3 py-2 text-xs text-[#ede7de] placeholder-[#6e675c] focus:outline-none focus:border-[#c99742]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#c99742] hover:bg-[#dbaa52] text-[#0d0c0a] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Join</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Legal / Dietary Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6b6458] gap-4">
          <p>
            © {new Date().getFullYear()} Aura Hearth & Dining LLC. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Consuming raw or undercooked meats, seafood, or shellfish may increase risk of foodborne illness.
          </p>
        </div>
      </div>
    </footer>
  );
};
