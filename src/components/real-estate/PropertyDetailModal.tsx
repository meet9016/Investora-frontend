'use client';

import React, { useState } from 'react';
import {
  X,
  Heart,
  Share2,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Compass,
  Building,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageCircle,
  Calculator,
  Car,
  Clock,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';
import { calculateHomeLoanEMI, formatIndianNumber } from '@/utils/formatters';

export default function PropertyDetailModal() {
  const {
    selectedProperty,
    setSelectedProperty,
    wishlist,
    toggleWishlist,
    submitInquiry
  } = useInvestora();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'emi' | 'visit'>('overview');

  // Site visit state
  const [visitDate, setVisitDate] = useState('2026-11-05');
  const [visitSlot, setVisitSlot] = useState('11:00 AM - 01:00 PM');
  const [visitName, setVisitName] = useState('Rahul Sharma');
  const [visitPhone, setVisitPhone] = useState('+91 98200 45678');
  const [visitSuccess, setVisitSuccess] = useState(false);

  // EMI calculator state in modal
  const propertyPrice = selectedProperty?.price || 5000000;
  const [loanAmount, setLoanAmount] = useState(Math.round(propertyPrice * 0.8));
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  if (!selectedProperty) return null;

  const isWishlisted = wishlist.includes(selectedProperty.id);
  const emiCalc = calculateHomeLoanEMI(loanAmount, interestRate, tenureYears);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedProperty.title,
        text: `Check out ${selectedProperty.title} for ${selectedProperty.priceDisplay} on Investora India`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  const handleBookVisit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInquiry({
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title,
      userName: visitName,
      userPhone: visitPhone,
      userEmail: 'rahul.sharma@investora.in',
      inquiryType: 'Site Visit',
      siteVisitDate: visitDate,
      siteVisitSlot: visitSlot
    });
    setVisitSuccess(true);
    setTimeout(() => {
      setVisitSuccess(false);
      setActiveTab('overview');
    }, 2500);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello ${selectedProperty.owner.name}, I am interested in visiting "${selectedProperty.title}" (Ref: ${selectedProperty.uniqueId}) listed for ${selectedProperty.priceDisplay} on Investora.`
    );
    window.open(`https://wa.me/${selectedProperty.owner.whatsapp.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-white/95 backdrop-blur-xs z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {selectedProperty.uniqueId}
            </span>
            {selectedProperty.isReraVerified && (
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                MahaRERA: {selectedProperty.reraNumber}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(selectedProperty.id)}
              className={`p-2 rounded-full border transition ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Save"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProperty(null)}
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-8">
          
          {/* Main Gallery Section */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={selectedProperty.images[activeImageIndex]}
                alt={selectedProperty.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-xl">
                Photo {activeImageIndex + 1} of {selectedProperty.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {selectedProperty.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {selectedProperty.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                      activeImageIndex === idx ? 'border-emerald-600 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Key Title Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  For {selectedProperty.listingType}
                </span>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                  {selectedProperty.subCategory}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                {selectedProperty.title}
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {selectedProperty.location.locality}, {selectedProperty.location.city}, {selectedProperty.location.pincode}
                </span>
              </div>
            </div>

            <div className="text-left md:text-right shrink-0 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
              <p className="text-2xl sm:text-3xl font-bold text-emerald-800">
                {selectedProperty.priceDisplay}
              </p>
              <p className="text-xs text-slate-600 font-medium">
                ₹{selectedProperty.pricePerSqFt.toLocaleString('en-IN')}/sq.ft
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                Est. EMI: ₹{formatIndianNumber(calculateHomeLoanEMI(selectedProperty.price * 0.8, 8.5, 20).monthlyEmi, 0)}/mo
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 gap-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 text-sm font-bold transition border-b-2 flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              Overview & Specs
            </button>
            <button
              onClick={() => setActiveTab('emi')}
              className={`pb-3 text-sm font-bold transition border-b-2 flex items-center gap-2 ${
                activeTab === 'emi'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4" />
              Home Loan EMI
            </button>
            <button
              onClick={() => setActiveTab('visit')}
              className={`pb-3 text-sm font-bold transition border-b-2 flex items-center gap-2 ${
                activeTab === 'visit'
                  ? 'border-emerald-600 text-emerald-700'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Schedule Site Visit
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Configuration</span>
                  <p className="text-base font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <BedDouble className="w-4 h-4 text-emerald-600" />
                    {selectedProperty.bedrooms > 0 ? `${selectedProperty.bedrooms} BHK` : 'Commercial Space'}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Carpet Area</span>
                  <p className="text-base font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <Maximize2 className="w-4 h-4 text-emerald-600" />
                    {selectedProperty.carpetArea} sq.ft
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Floor Position</span>
                  <p className="text-base font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <Building className="w-4 h-4 text-emerald-600" />
                    Floor {selectedProperty.floorNumber} of {selectedProperty.totalFloors}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Facing Direction</span>
                  <p className="text-base font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <Compass className="w-4 h-4 text-emerald-600" />
                    {selectedProperty.facing}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Furnishing</span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {selectedProperty.furnishing}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Parking</span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {selectedProperty.parking}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Ownership</span>
                  <p className="text-sm font-bold text-slate-800 mt-0.5">
                    {selectedProperty.ownership}
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-[11px] text-slate-500 font-semibold uppercase">Possession</span>
                  <p className="text-sm font-bold text-emerald-700 mt-0.5">
                    {selectedProperty.availabilityStatus} ({selectedProperty.possessionDate || 'Immediate'})
                  </p>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2">About this Property</h3>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedProperty.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-3">Amenities & Features</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {selectedProperty.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs font-semibold text-slate-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Owner / Agent Contact Box */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="font-bold text-lg">{selectedProperty.owner.name}</span>
                    {selectedProperty.owner.isVerified && (
                      <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        <ShieldCheck className="w-3 h-3" />
                        Verified {selectedProperty.owner.role}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400">{selectedProperty.owner.companyName || 'Direct Owner'}</p>
                  <p className="text-xs text-emerald-400 font-medium">⚡ Response Rate: {selectedProperty.owner.responseRate}</p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`tel:${selectedProperty.owner.phone}`}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition shadow-md"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>Call Now</span>
                  </a>

                  <button
                    onClick={handleWhatsApp}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition shadow-md shadow-emerald-500/30"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EMI CALCULATOR */}
          {activeTab === 'emi' && (
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Home Loan EMI Estimator</h3>
                  <p className="text-xs text-slate-500">Calculate monthly repayment based on leading Indian bank rates.</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-400">Monthly EMI</span>
                  <p className="text-2xl font-bold text-emerald-700 font-mono">
                    ₹{formatIndianNumber(emiCalc.monthlyEmi, 0)}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Loan Amount */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700">Loan Amount</span>
                    <span className="text-emerald-700 font-mono">₹{formatIndianNumber(loanAmount, 0)}</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={propertyPrice}
                    step={100000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>₹5 Lac</span>
                    <span>Property Price: ₹{formatIndianNumber(propertyPrice, 0)}</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700">Interest Rate (% p.a.)</span>
                    <span className="text-emerald-700 font-mono">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={7.0}
                    max={14.0}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>7.0%</span>
                    <span>Bank Benchmark: ~8.50%</span>
                    <span>14.0%</span>
                  </div>
                </div>

                {/* Tenure */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-slate-700">Loan Tenure</span>
                    <span className="text-emerald-700 font-mono">{tenureYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>5 Yrs</span>
                    <span>20 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>
              </div>

              {/* Total Payment Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-center">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium">Principal Amount</span>
                  <p className="text-sm font-bold text-slate-800 font-mono mt-0.5">
                    ₹{formatIndianNumber(loanAmount, 0)}
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium">Total Interest Payable</span>
                  <p className="text-sm font-bold text-amber-700 font-mono mt-0.5">
                    ₹{formatIndianNumber(emiCalc.totalInterest, 0)}
                  </p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 font-medium">Total Amount Payable</span>
                  <p className="text-sm font-bold text-emerald-800 font-mono mt-0.5">
                    ₹{formatIndianNumber(emiCalc.totalPayment, 0)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SCHEDULE SITE VISIT */}
          {activeTab === 'visit' && (
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80">
              {visitSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Site Visit Booked Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    The builder/owner representative ({selectedProperty.owner.name}) has received your request for {visitDate} ({visitSlot}) and will call you to confirm.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookVisit} className="space-y-4">
                  <div className="border-b border-slate-200 pb-3">
                    <h3 className="text-base font-bold text-slate-900">Book Free Guided Site Visit</h3>
                    <p className="text-xs text-slate-500">
                      Experience this property in person with a certified relationship manager. Zero fees.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        value={visitName}
                        onChange={(e) => setVisitName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
                      <input
                        type="tel"
                        value={visitPhone}
                        onChange={(e) => setVisitPhone(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white font-mono"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                      <select
                        value={visitSlot}
                        onChange={(e) => setVisitSlot(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-800 bg-white"
                      >
                        <option value="10:00 AM - 12:00 PM">Morning (10:00 AM - 12:00 PM)</option>
                        <option value="12:00 PM - 03:00 PM">Afternoon (12:00 PM - 03:00 PM)</option>
                        <option value="03:00 PM - 06:00 PM">Evening (03:00 PM - 06:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition"
                  >
                    Confirm & Request Site Visit
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

