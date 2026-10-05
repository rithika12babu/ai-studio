import React, { useState } from 'react';
import { MapPin, Clock, Phone, Mail, Compass, Car, Sparkles, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const LocationHoursSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${RESTAURANT_INFO.address}, San Francisco, CA`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="location" className="py-24 bg-[#0d0c0a] text-[#ede7de] border-b border-[#28241e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium text-[#c99742] mb-3">
            <span>Visits & Concierge</span>
            <span aria-hidden="true">·</span>
            <span>Arts District Sanctuary</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#faedd0] tracking-tight mb-4">
            Hours & Location
          </h2>
          <p className="text-sm text-[#9c9386] leading-relaxed">
            Conveniently situated in the historic warehouse quarter, minutes from the symphony and modern galleries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Operating Hours Table */}
          <div className="lg:col-span-6 bg-[#14120f] border border-[#28241e] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#242019]">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#c99742]" />
                <h3 className="font-serif-display text-2xl text-[#faedd0]">
                  Service Schedule
                </h3>
              </div>
              <span className="text-xs text-[#8c8273]">
                Hearth fired nightly
              </span>
            </div>

            <div className="space-y-3.5 divide-y divide-[#1f1d17]">
              {RESTAURANT_INFO.hours.map((h) => (
                <div key={h.day} className="pt-3.5 first:pt-0 flex flex-col sm:flex-row sm:items-baseline justify-between text-xs gap-1">
                  <span className="font-medium text-[#faedd0] w-40">{h.day}</span>
                  <div className="text-right sm:text-left text-[#b5ab9e]">
                    <div>{h.dinner}</div>
                    {h.lunch !== 'Closed' && (
                      <div className="text-[#c99742] text-[11px] mt-0.5">{h.lunch}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Practical Guidelines */}
            <div className="pt-4 border-t border-[#242019] space-y-2.5 text-xs text-[#9c9386]">
              <div className="flex items-start gap-2">
                <Car className="w-4 h-4 text-[#c99742] shrink-0 mt-0.5" />
                <span><strong>Valet Service:</strong> {RESTAURANT_INFO.valetNote}</span>
              </div>
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-[#c99742] shrink-0 mt-0.5" />
                <span><strong>Dress Code:</strong> {RESTAURANT_INFO.dressCode}. Smart denim welcomed.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#c99742] font-semibold shrink-0">Corkage:</span>
                <span>{RESTAURANT_INFO.corkagePolicy}</span>
              </div>
            </div>
          </div>

          {/* Interactive Map & Direct Contact Card */}
          <div className="lg:col-span-6 space-y-6">
            {/* Map Simulation Tile */}
            <div className="relative aspect-[16/9] bg-[#1a1814] rounded-2xl overflow-hidden border border-[#28241e] flex flex-col items-center justify-center p-6 text-center group">
              {/* Stylized dark cartographic grid pattern */}
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c99742_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 space-y-3">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#c99742]/15 border border-[#c99742] flex items-center justify-center text-[#c99742]">
                  <MapPin className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-serif-display text-2xl text-[#faedd0]">
                    Aura Hearth & Dining
                  </h4>
                  <p className="text-xs text-[#a39a8c] mt-1">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-[11px] text-[#787063]">
                    Arts District · Corner of 4th & St. Clair
                  </p>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={handleCopyAddress}
                    className="px-4 py-2 bg-[#25221c] hover:bg-[#332e25] border border-[#3d372c] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Address Copied</span>
                      </>
                    ) : (
                      <>
                        <Compass className="w-3.5 h-3.5 text-[#c99742]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Host Stand Contacts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="p-5 rounded-xl bg-[#14120f] border border-[#28241e] hover:border-[#383329] transition-colors flex items-center gap-3.5 group"
              >
                <div className="p-2.5 rounded-lg bg-[#1e1c16] text-[#c99742] group-hover:bg-[#c99742] group-hover:text-[#0d0c0a] transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#736c61] block font-semibold">
                    Host Stand Direct
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#faedd0]">
                    {RESTAURANT_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${RESTAURANT_INFO.email}`}
                className="p-5 rounded-xl bg-[#14120f] border border-[#28241e] hover:border-[#383329] transition-colors flex items-center gap-3.5 group"
              >
                <div className="p-2.5 rounded-lg bg-[#1e1c16] text-[#c99742] group-hover:bg-[#c99742] group-hover:text-[#0d0c0a] transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#736c61] block font-semibold">
                    Concierge Inquiries
                  </span>
                  <span className="text-xs font-semibold text-[#faedd0] truncate block max-w-[170px]">
                    {RESTAURANT_INFO.email}
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
