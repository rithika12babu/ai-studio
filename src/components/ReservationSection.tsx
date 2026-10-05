import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, MapPin, CheckCircle2, Sparkles, AlertCircle, X } from 'lucide-react';
import { SEATING_AREAS, RESTAURANT_INFO } from '../data/restaurantData';
import { SeatingArea, ReservationBooking } from '../types';

interface ReservationSectionProps {
  onReservationComplete?: (booking: ReservationBooking) => void;
}

const TIME_SLOTS = [
  { time: '5:00 PM', status: 'Available', service: 'Early Hearth' },
  { time: '5:30 PM', status: 'Available', service: 'Early Hearth' },
  { time: '6:15 PM', status: 'Available', service: 'Prime Dinner' },
  { time: '7:00 PM', status: '2 tables left', service: 'Prime Dinner' },
  { time: '7:30 PM', status: '1 table left', service: 'Prime Dinner' },
  { time: '8:15 PM', status: 'Available', service: 'Prime Dinner' },
  { time: '8:45 PM', status: 'Available', service: 'Late Hearth' },
  { time: '9:30 PM', status: 'Available', service: 'Late Hearth & Cocktails' },
];

export const ReservationSection: React.FC<ReservationSectionProps> = ({
  onReservationComplete,
}) => {
  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  const [partySize, setPartySize] = useState<number>(2);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedTime, setSelectedTime] = useState<string>('7:00 PM');
  const [selectedArea, setSelectedArea] = useState<SeatingArea>('Hearth Main Room');
  const [occasion, setOccasion] = useState<string>('Dinner / Celebration');
  const [dietaryNotes, setDietaryNotes] = useState<string>('');
  
  // Guest Info
  const [guestName, setGuestName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Status
  const [confirmedBooking, setConfirmedBooking] = useState<ReservationBooking | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg('Please enter your full name, contact email, and mobile phone.');
      return;
    }

    const booking: ReservationBooking = {
      id: `AH-${Math.floor(10000 + Math.random() * 90000)}`,
      guestName,
      email,
      phone,
      date: selectedDate,
      timeSlot: selectedTime,
      partySize,
      seatingArea: selectedArea,
      occasion,
      dietaryNotes,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(booking);
    setErrorMsg('');
    if (onReservationComplete) {
      onReservationComplete(booking);
    }
  };

  const handleReset = () => {
    setConfirmedBooking(null);
    setGuestName('');
    setEmail('');
    setPhone('');
    setDietaryNotes('');
  };

  return (
    <section id="reservations" className="py-24 bg-[#11100d] text-[#ede7de] border-b border-[#28241e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase font-medium text-[#c99742] mb-3">
            <span>Dining Room & Cellar Access</span>
            <span aria-hidden="true">·</span>
            <span>Reservations Open 30 Days in Advance</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-normal text-[#faedd0] tracking-tight mb-4">
            Reserve Your Experience
          </h2>
          <p className="text-sm text-[#9c9386] leading-relaxed">
            Choose your preferred dining atmosphere. Tables are held for 15 minutes past reservation time. Valet parking is included.
          </p>
        </div>

        {confirmedBooking ? (
          /* Confirmation Success Card */
          <div className="max-w-2xl mx-auto bg-[#171511] border border-[#363024] rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#c99742]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="text-center pb-8 border-b border-[#28241e]">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#c99742]/20 border border-[#c99742]/50 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-[#c99742]" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#c99742] block mb-1">
                Reservation Confirmed · Reference {confirmedBooking.id}
              </span>
              <h3 className="font-serif-display text-3xl text-[#faedd0]">
                We look forward to hosting you, {confirmedBooking.guestName}
              </h3>
              <p className="text-xs text-[#a39a8c] mt-2">
                A confirmation summary and calendar invite have been dispatched to {confirmedBooking.email}.
              </p>
            </div>

            {/* Booking Details Grid */}
            <div className="py-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-b border-[#28241e]">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#7e7668] block">Date</span>
                <span className="text-sm font-semibold text-[#f0e7d8] mt-0.5 block">{confirmedBooking.date}</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#7e7668] block">Time</span>
                <span className="text-sm font-semibold text-[#c99742] mt-0.5 block">{confirmedBooking.timeSlot}</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#7e7668] block">Party Size</span>
                <span className="text-sm font-semibold text-[#f0e7d8] mt-0.5 block">{confirmedBooking.partySize} Guests</span>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#7e7668] block">Atmosphere</span>
                <span className="text-sm font-semibold text-[#f0e7d8] mt-0.5 block truncate">{confirmedBooking.seatingArea}</span>
              </div>
            </div>

            {/* Practical Notes */}
            <div className="py-5 space-y-2 text-xs text-[#9c9386]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#c99742] shrink-0" />
                <span>{RESTAURANT_INFO.address} ({RESTAURANT_INFO.neighborhood})</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c99742] shrink-0" />
                <span>{RESTAURANT_INFO.dressCode} · {RESTAURANT_INFO.valetNote}</span>
              </div>
            </div>

            {/* Reset Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#c99742] border border-[#c99742]/50 hover:border-[#c99742] rounded-lg transition-colors cursor-pointer"
              >
                Book Another Table or Modify
              </button>
            </div>
          </div>
        ) : (
          /* Interactive Reservation Form */
          <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto bg-[#14120f] border border-[#28241e] rounded-2xl p-6 sm:p-10 shadow-xl space-y-8"
          >
            {errorMsg && (
              <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-800/60 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Step 1: Party Size & Date & Time */}
            <div className="space-y-4">
              <h3 className="font-serif-display text-xl text-[#faedd0]">
                1. Select Party Size & Schedule
              </h3>

              {/* Party Size Selector */}
              <div>
                <label className="text-xs uppercase tracking-wider text-[#8e8578] font-semibold block mb-2">
                  Number of Guests
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setPartySize(size)}
                      className={`w-12 h-10 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center cursor-pointer border ${
                        partySize === size
                          ? 'bg-[#c99742] text-[#0d0c0a] border-[#c99742]'
                          : 'bg-[#1a1814] text-[#b3a99b] border-[#29251e] hover:border-[#3d372e] hover:text-[#ede7de]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                  <span className="text-xs text-[#736c61] ml-2">
                    For parties over 10, see Private Dining below.
                  </span>
                </div>
              </div>

              {/* Date & Quick Presets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e8578] font-semibold block mb-2">
                    Reservation Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      min={todayStr}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-[#1a1814] border border-[#29251e] rounded-lg px-3.5 py-2.5 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e8578] font-semibold block mb-2">
                    Dining Occasion
                  </label>
                  <select
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full bg-[#1a1814] border border-[#29251e] rounded-lg px-3.5 py-2.5 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                  >
                    <option value="Casual Evening Dining">Casual Evening Dining</option>
                    <option value="Birthday Celebration">Birthday Celebration</option>
                    <option value="Anniversary / Romance">Anniversary / Romance</option>
                    <option value="Executive Business Dinner">Executive Business Dinner</option>
                    <option value="Sommelier Wine Tasting">Sommelier Wine Tasting</option>
                  </select>
                </div>
              </div>

              {/* Time Slots */}
              <div className="pt-2">
                <label className="text-xs uppercase tracking-wider text-[#8e8578] font-semibold block mb-2">
                  Seating Time
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-2.5 rounded-lg text-left border transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#c99742] bg-[#c99742]/15 text-[#faedd0]'
                            : 'border-[#29251e] bg-[#1a1814] text-[#a39a8c] hover:border-[#3d372e] hover:text-[#ede7de]'
                        }`}
                      >
                        <div className="font-mono text-xs font-semibold tabular-nums">
                          {slot.time}
                        </div>
                        <div className="text-[10px] text-[#787063] mt-0.5">
                          {slot.status}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Step 2: Seating Area Selection */}
            <div className="space-y-4 pt-4 border-t border-[#23201a]">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-display text-xl text-[#faedd0]">
                  2. Choose Dining Atmosphere
                </h3>
                <span className="text-xs text-[#827a6f]">All seating temperature controlled</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SEATING_AREAS.map((area) => {
                  const isSelected = selectedArea === area.name;
                  return (
                    <button
                      key={area.name}
                      type="button"
                      onClick={() => setSelectedArea(area.name)}
                      className={`p-4 rounded-xl text-left border transition-colors cursor-pointer ${
                        isSelected
                          ? 'border-[#c99742] bg-[#c99742]/10 text-[#faedd0]'
                          : 'border-[#28241e] bg-[#181612] text-[#9c9386] hover:border-[#383329] hover:text-[#ede7de]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif-display text-lg text-[#faedd0]">
                          {area.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#c99742] font-medium">
                          {area.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#8c8273] leading-relaxed mb-2">
                        {area.description}
                      </p>
                      <span className="text-[11px] text-[#6b6458]">
                        Capacity: {area.capacityNote}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Guest Contact & Notes */}
            <div className="space-y-4 pt-4 border-t border-[#23201a]">
              <h3 className="font-serif-display text-xl text-[#faedd0]">
                3. Guest Details & Culinary Requests
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e8578] font-semibold block mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Eleanor Vance"
                    required
                    className="w-full bg-[#1a1814] border border-[#29251e] rounded-lg px-3.5 py-2.5 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e8578] font-semibold block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="eleanor@example.com"
                    required
                    className="w-full bg-[#1a1814] border border-[#29251e] rounded-lg px-3.5 py-2.5 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#8e8578] font-semibold block mb-1.5">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(415) 555-0192"
                    required
                    className="w-full bg-[#1a1814] border border-[#29251e] rounded-lg px-3.5 py-2.5 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#8e8578] font-semibold block mb-1.5">
                  Dietary Restrictions or Table Placement Requests
                </label>
                <input
                  type="text"
                  value={dietaryNotes}
                  onChange={(e) => setDietaryNotes(e.target.value)}
                  placeholder="e.g. Celiac gluten sensitivity, prefer quiet corner table, anniversary champagne on arrival..."
                  className="w-full bg-[#1a1814] border border-[#29251e] rounded-lg px-3.5 py-2.5 text-xs text-[#ede7de] focus:outline-none focus:border-[#c99742]"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-[#23201a] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[#736c61]">
                No cancellation fees up to 6 hours prior to reservation.
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#c99742] hover:bg-[#dbaa52] text-[#0d0c0a] font-semibold text-xs uppercase tracking-widest rounded-lg transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
