import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Users, Mail, Phone, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface PrivateDiningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivateDiningModal: React.FC<PrivateDiningModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guestCount: '12',
    eventType: 'Private Celebration',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-[#14120f] border border-[#2e2920] rounded-2xl p-6 sm:p-8 shadow-2xl text-[#ede7de] my-8"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-[#8c8273] hover:text-[#ede7de] hover:bg-[#1f1d17] rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#c99742]/20 border border-[#c99742] flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#c99742]" />
            </div>
            <h3 className="font-serif-display text-3xl text-[#faedd0]">
              Inquiry Dispatched
            </h3>
            <p className="text-xs text-[#a39a8c] max-w-sm mx-auto leading-relaxed">
              Our Private Dining Director, Julianne Rossi, will review your event date ({formData.date || 'upcoming'}) and contact you within 24 hours with custom seasonal menus and wine pairings.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 bg-[#c99742] hover:bg-[#dbaa52] text-[#0d0c0a] font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c99742] block mb-1">
                Private Salons & Gatherings
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#faedd0]">
                Private Events & Wine Cellar Inquiries
              </h3>
              <p className="text-xs text-[#9c9386] mt-1.5 leading-relaxed">
                Hosting 10 to 65 guests with bespoke custom woodfire tasting courses, dedicated sommeliers, and personalized menus.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8c8273] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Claire Delacroix"
                  className="w-full bg-[#181612] border border-[#29251e] rounded-lg px-3 py-2 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8c8273] block mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="claire@domain.com"
                  className="w-full bg-[#181612] border border-[#29251e] rounded-lg px-3 py-2 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8c8273] block mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(415) 555-0182"
                  className="w-full bg-[#181612] border border-[#29251e] rounded-lg px-3 py-2 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8c8273] block mb-1">
                  Target Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#181612] border border-[#29251e] rounded-lg px-3 py-2 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8c8273] block mb-1">
                  Guest Count
                </label>
                <select
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                  className="w-full bg-[#181612] border border-[#29251e] rounded-lg px-3 py-2 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                >
                  <option value="10-14 Guests">10–14 Guests (Wine Cellar)</option>
                  <option value="15-25 Guests">15–25 Guests (Glass Conservatory)</option>
                  <option value="25-45 Guests">25–45 Guests (Full Hearth Salon)</option>
                  <option value="45-70 Guests">45–70 Guests (Full Buyout)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider font-semibold text-[#8c8273] block mb-1">
                Event Description & Special Requests
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Share any special vision, wine pairing preferences, or corporate AV requirements..."
                className="w-full bg-[#181612] border border-[#29251e] rounded-lg px-3 py-2 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] text-[#736c61]">
                Director Direct: {RESTAURANT_INFO.phone}
              </span>
              <button
                type="submit"
                className="px-6 py-3 bg-[#c99742] hover:bg-[#dbaa52] text-[#0d0c0a] font-semibold text-xs uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
              >
                Send Event Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
