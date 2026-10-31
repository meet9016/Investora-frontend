'use client';

import React from 'react';
import { Property } from '@/types';
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Phone,
  MessageCircle,
  ShieldCheck,
  Check,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useInvestora } from '@/context/InvestoraContext';

interface PropertyCardProps {
  property: Property;
  onSelect?: (property: Property) => void;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  const {
    wishlist,
    toggleWishlist,
    compareProperties,
    toggleCompareProperty,
    setSelectedProperty
  } = useInvestora();

  const isWishlisted = wishlist.includes(property.id);
  const isCompared = compareProperties.includes(property.id);

  const handleCardClick = () => {
    setSelectedProperty(property);
    if (onSelect) onSelect(property);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hi, I am interested in your property "${property.title}" (Ref: ${property.uniqueId}) listed for ${property.priceDisplay} on Investora. Please share more details.`
    );
    window.open(`https://wa.me/${property.owner.whatsapp.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${property.owner.phone}`;
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 overflow-hidden group cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Image Container with Badges */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-black/30 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10">
            <span
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm ${
                property.listingType === 'Buy'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 text-white'
              }`}
            >
              For {property.listingType}
            </span>

            {property.isReraVerified && (
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/95 text-emerald-800 shadow-sm backdrop-blur-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                RERA
              </span>
            )}

            {property.isFeatured && (
              <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-sm">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
          </div>

          {/* Top Right Wishlist & Compare Buttons */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleCompareProperty(property.id);
              }}
              title="Add to Compare"
              className={`p-2 rounded-full shadow-md backdrop-blur-md transition ${
                isCompared
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white/90 text-slate-700 hover:bg-white'
              }`}
            >
              <Check className={`w-3.5 h-3.5 ${isCompared ? 'stroke-[3]' : 'opacity-60'}`} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(property.id);
              }}
              title="Save to Wishlist"
              className={`p-2 rounded-full shadow-md backdrop-blur-md transition ${
                isWishlisted
                  ? 'bg-rose-500 text-white'
                  : 'bg-white/90 text-slate-700 hover:text-rose-500 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Bottom Overlay on Image: Price */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white z-10">
            <div>
              <p className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-md">
                {property.priceDisplay}
              </p>
              <p className="text-[11px] text-slate-200 font-medium">
                ₹{property.pricePerSqFt.toLocaleString('en-IN')}/sq.ft
              </p>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-slate-200">
              {property.subCategory}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5">
          {/* Title */}
          <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition line-clamp-1">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="line-clamp-1">
              {property.location.locality}, {property.location.city}
            </span>
          </div>

          {/* Specifications Pills */}
          <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-slate-100 text-xs text-slate-700">
            {property.bedrooms > 0 ? (
              <div className="flex items-center gap-1.5">
                <BedDouble className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{property.bedrooms} BHK</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">Commercial</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{property.bathrooms} Baths</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-slate-400" />
              <span className="font-semibold">{property.carpetArea} sq.ft</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500">
            <span className="bg-slate-100 px-2 py-0.5 rounded-md font-medium">
              {property.furnishing}
            </span>
            <span className="font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              {property.availabilityStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Contact Actions */}
      <div className="p-4 pt-0 sm:p-5 sm:pt-0">
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={handleCall}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>Call</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}

