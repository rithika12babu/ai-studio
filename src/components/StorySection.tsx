import React from 'react';
import { Flame, Sparkles, Award, ShieldCheck, HeartHandshake } from 'lucide-react';
import { RESTAURANT_IMAGES, RESTAURANT_INFO } from '../data/restaurantData';

interface StorySectionProps {
  onOpenPrivateDining: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({ onOpenPrivateDining }) => {
  return (
    <section id="story" className="py-24 bg-[#0d0c0a] text-[#ede7de] border-b border-[#28241e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Split Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with Subtle Accent Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#2b261f] shadow-2xl aspect-[4/3] sm:aspect-[16/10]">
              <img
                src={RESTAURANT_IMAGES.diningInterior}
                alt="Aura Hearth interior dining room in evening candlelight"
                className="w-full h-full object-cover filter brightness-90 hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a]/80 via-transparent to-transparent" />
            </div>

            {/* Inset Credential Badge (Unboxed text with border) */}
            <div className="mt-4 sm:absolute sm:-bottom-6 sm:-right-6 bg-[#171512] border border-[#383226] p-5 rounded-xl shadow-xl max-w-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#c99742] mb-1">
                <Award className="w-4 h-4" />
                <span>Michelin Distinction</span>
              </div>
              <p className="text-xs text-[#a39a8c] leading-relaxed">
                Recognized in the 2025–2026 Guide for mastery in open-fire ancestral cookery and biodynamic cellar curation.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy Prose */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs tracking-widest uppercase font-medium text-[#c99742]">
              <span>Our Hearth Philosophy</span>
              <span aria-hidden="true">·</span>
              <span>Regenerative Purveyors</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#faedd0] tracking-tight leading-tight [text-wrap:balance]">
              Where living fire transforms whole-harvest ingredients.
            </h2>

            <p className="text-sm sm:text-base text-[#b0a79a] leading-relaxed">
              Founded by Executive Chef Julian Vance and Sommelier Elena Rostova, Aura was born from a singular obsession: returning to the elemental hearth without sacrificing modern culinary precision.
            </p>

            <p className="text-sm text-[#9c9386] leading-relaxed">
              We burn aged California white oak and cherrywood embers at temperatures ranging from gentle 200° cold-smoke to intense 800° direct sear. We source exclusively from family-run farms practicing regenerative soil stewardship within 150 miles.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#26221b]">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#faedd0] block">
                  Whole-Animal Butchery
                </span>
                <p className="text-xs text-[#8c8273] leading-relaxed">
                  Honoring the complete animal with house-cured charcuterie, ember roasts, and bone-rich reductions.
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#faedd0] block">
                  Living Cellar Archive
                </span>
                <p className="text-xs text-[#8c8273] leading-relaxed">
                  Over 450 natural, low-intervention and historic vintage bottles stored in subterranean stone arches.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenPrivateDining}
                className="px-6 py-3 bg-[#1a1814] hover:bg-[#25221c] text-[#ede7de] border border-[#3f392e] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Inquire for Private Salons & Dinners
              </button>
            </div>
          </div>
        </div>

        {/* Accolades Bar adjacent to proof */}
        <div className="mt-20 pt-10 border-t border-[#23201a] grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {RESTAURANT_INFO.awards.map((award) => (
            <div key={award.title} className="p-4 rounded-xl bg-[#12110e] border border-[#232019]">
              <span className="text-xs font-mono tracking-wider uppercase text-[#c99742] block mb-1">
                {award.year}
              </span>
              <h4 className="font-serif-display text-xl text-[#faedd0] mb-1">
                {award.title}
              </h4>
              <p className="text-xs text-[#8a8174]">
                {award.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
