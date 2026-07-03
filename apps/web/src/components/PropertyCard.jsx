import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, CheckCircle } from 'lucide-react';
import pb from '@/lib/pocketbaseClient';

export default function PropertyCard({ property }) {
  const imageUrl = property.images && property.images.length > 0
    ? pb.files.getURL(property, property.images[0], { thumb: '400x300' })
    : 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop';

  const handleCall = () => {
    if (property.expand?.landlordId?.phone) {
      window.location.href = `tel:${property.expand.landlordId.phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (property.expand?.landlordId?.phone) {
      const message = encodeURIComponent(`Hi, I'm interested in your property: ${property.title}`);
      window.open(`https://wa.me/${property.expand.landlordId.phone}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="property-card">
      <Link to={`/property/${property.id}`}>
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {property.verified && (
            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Verified
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/property/${property.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors duration-200">
            {property.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
          <MapPin className="h-4 w-4" />
          <span>{property.location}</span>
        </div>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-primary">
            KSh {property.rentAmount?.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground">/month</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span className="bg-secondary px-3 py-1 rounded-full">{property.propertyType}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCall}
            className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Call
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 bg-[#25D366] text-white px-4 py-2 rounded-md font-medium hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}