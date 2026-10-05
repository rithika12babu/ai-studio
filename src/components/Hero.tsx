import React from 'react';
import { Calendar, ChevronDown, Clock, MapPin, Sparkles } from 'lucide-react';
import { RESTAURANT_IMAGES, RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onReserveClick: () => void;
  onExploreMenuClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onReserveClick, onExploreMenuClick }) => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-[#28241e]">
      {/* High-fidelity generated imagery with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={RESTAURANT_IMAGES.hero}
          alt="Artisanal open woodfire hearth at Aura dining room"
          className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.08] scale-105 transform animate-fade-in"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrim to guarantee 4.5:1 text legibility across all screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-[#0d0c0a]/65 to-[#0d0c0a]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0d0c0a]/30 to-[#0d0c0a]/80" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Unboxed clean metadata kicker */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm tracking-widest uppercase font-medium text-[#c99742] mb-5">
          <span>White Oak Woodfire Hearth</span>
          <span aria-hidden="true">·</span>
          <span>Botanical Cellar</span>
          <span aria-hidden="true">·</span>
          <span>Michelin Selection 2025–2026</span>
        </div>

        {/* Primary Headline with text-wrap balance */}
        <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-normal tracking-tight text-[#faedd0] max-w-4xl leading-[1.1] mb-6 [text-wrap:balance]">
          Seasonal gastronomy forged in flame and botanical craft.
        </h1>

        {/* Body subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#d4cbbe] font-light max-w-2xl mb-10 leading-relaxed [text-wrap:balance]">
          Ancestral 800° open-fire cookery paired with whole-animal heirloom purveyors and four hundred cellar selections in the downtown Arts District.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onReserveClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#c99742] hover:bg-[#dbaa52] text-[#0d0c0a] font-semibold text-xs uppercase tracking-widest rounded-lg transition-all transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            Reserve a Table
          </button>
          <button
            onClick={onExploreMenuClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#1a1814]/80 hover:bg-[#25221c] text-[#ede7de] border border-[#3f392e] font-semibold text-xs uppercase tracking-widest rounded-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            Explore Dinner Menu
          </button>
        </div>

        {/* Service Status and Location Bar */}
        <div className="mt-14 pt-8 border-t border-[#312c23]/60 w-full max-w-3xl flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-[#a39a8c]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#d8cfc0] font-medium">Tonight&apos;s Hearth:</span>
            <span>Dinner Seating from 5:00 PM</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c99742]" />
            <span>418 St. Clair Avenue · Downtown</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c99742]" />
            <span>Valet Available from 5:00 PM</span>
          </div>
        </div>
      </div>
    </section>
  );
};
