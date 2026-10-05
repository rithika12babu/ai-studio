import React from 'react';
import { Sparkles, Users, ArrowRight } from 'lucide-react';
import { SEATING_AREAS } from '../data/restaurantData';
import { SeatingArea } from '../types';

interface SeatingSectionProps {
  onSelectSeatingArea: (area: SeatingArea) => void;
}

export const SeatingSection: React.FC<SeatingSectionProps> = ({ onSelectSeatingArea }) => {
  return (
    <section id="seating" className="py-24 bg-[#11100d] text-[#ede7de] border-b border-[#28241e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium text-[#c99742] mb-3">
            <span>Spatial Atmosphere</span>
            <span aria-hidden="true">·</span>
            <span>Four Distinct Experiences</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#faedd0] tracking-tight mb-4">
            Curated Dining Environments
          </h2>
          <p className="text-sm text-[#9c9386] leading-relaxed">
            From the raw kinetic energy of the woodfire hearth to subterranean quiet wine vaults, each room offers tailored acoustic and culinary pacing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEATING_AREAS.map((area) => (
            <div
              key={area.name}
              className="p-8 rounded-2xl bg-[#151310] border border-[#28241e] hover:border-[#3d372e] transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#c99742] border border-[#3d3322] px-2.5 py-0.5 rounded">
                    {area.badge}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#8c8273]">
                    <Users className="w-3.5 h-3.5" />
                    <span>{area.capacityNote}</span>
                  </div>
                </div>

                <h3 className="font-serif-display text-2xl text-[#faedd0] group-hover:text-[#c99742] transition-colors mb-2">
                  {area.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#a39a8c] leading-relaxed mb-6">
                  {area.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#23201a] flex items-center justify-between">
                <span className="text-xs text-[#787063]">
                  Host reservations available
                </span>
                <button
                  type="button"
                  onClick={() => onSelectSeatingArea(area.name)}
                  className="text-xs font-semibold uppercase tracking-wider text-[#c99742] hover:text-[#faedd0] flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Select Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
