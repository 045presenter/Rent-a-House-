import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, CheckCircle, Home, Calendar, User, Mail } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import pb from '@/lib/pocketbaseClient';
import apiServerClient from '@/lib/apiServerClient';
import { useAuth } from '@/contexts/AuthContext.jsx';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const { isAuthenticated, currentUser } = useAuth();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [inquiryForm, setInquiryForm] = useState({
    message: '',
    inquiryType: 'Call',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await apiServerClient.fetch(`/properties/${id}`);
      const data = await response.json();
      setProperty(data);
    } catch (error) {
      console.error('Failed to fetch property:', error);
      toast.error('Failed to load property details');
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    if (property?.expand?.landlordId?.phone) {
      window.location.href = `tel:${property.expand.landlordId.phone}`;
    }
  };

  const handleWhatsApp = () => {
    if (property?.expand?.landlordId?.phone) {
      const message = encodeURIComponent(`Hi, I'm interested in your property: ${property.title}`);
      window.open(`https://wa.me/${property.expand.landlordId.phone}?text=${message}`, '_blank');
    }
  };

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error('Please login to send an inquiry');
      return;
    }

    setSubmitting(true);
    try {
      const response = await apiServerClient.fetch('/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${pb.authStore.token}`,
        },
        body: JSON.stringify({
          propertyId: property.id,
          message: inquiryForm.message,
          inquiryType: inquiryForm.inquiryType,
        }),
      });

      if (!response.ok) throw new Error('Failed to send inquiry');

      toast.success('Inquiry sent successfully');
      setInquiryForm({ message: '', inquiryType: 'Call' });
    } catch (error) {
      console.error('Failed to send inquiry:', error);
      toast.error('Failed to send inquiry');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
        <Footer />
      </>
    );
  }

  if (!property) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center">
          <Home className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Property not found</h2>
          <Link to="/rentals" className="text-primary hover:underline">
            Browse all properties
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const images = property.images && property.images.length > 0
    ? property.images.map((img) => pb.files.getURL(property, img))
    : ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop'];

  const amenitiesList = property.amenities ? property.amenities.split(',').map((a) => a.trim()) : [];

  return (
    <>
      <Helmet>
        <title>{`${property.title} - Rent a House`}</title>
        <meta name="description" content={property.description || `${property.propertyType} for rent in ${property.location}`} />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-background">
        <div className="section-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="relative h-96 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={images[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Verified
                    </div>
                  )}
                </div>

                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                          currentImageIndex === index ? 'border-primary' : 'border-transparent'
                        }`}
                      >
                        <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-card rounded-xl border p-6 mb-6">
                <h1 className="text-3xl font-bold mb-4">{property.title}</h1>

                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-5 w-5" />
                  <span className="text-lg">{property.location}</span>
                </div>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl font-bold text-primary">
                    KSh {property.rentAmount?.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground">/month</span>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-secondary px-4 py-2 rounded-full font-medium">
                    {property.propertyType}
                  </span>
                  {property.county && (
                    <span className="bg-secondary px-4 py-2 rounded-full font-medium">
                      {property.county}
                    </span>
                  )}
                </div>

                {property.description && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Description</h2>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </div>
                )}

                {amenitiesList.length > 0 && (
                  <div>
                    <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                    <div className="flex flex-wrap gap-2">
                      {amenitiesList.map((amenity, index) => (
                        <span
                          key={index}
                          className="bg-secondary px-3 py-1 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border p-6 mb-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Contact landlord</h2>

                {property.expand?.landlordId && (
                  <div className="mb-6 pb-6 border-b">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{property.expand.landlordId.name || 'Property Owner'}</p>
                        <p className="text-sm text-muted-foreground">Landlord</p>
                      </div>
                    </div>
                    {property.expand.landlordId.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{property.expand.landlordId.phone}</span>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  <button
                    onClick={handleCall}
                    className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <Phone className="h-5 w-5" />
                    Call landlord
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="w-full bg-[#25D366] text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </button>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Inquiry type</label>
                    <select
                      value={inquiryForm.inquiryType}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, inquiryType: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="Call">Call</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                      placeholder="I'm interested in this property..."
                      rows={4}
                      className="input-field resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || !isAuthenticated}
                    className="w-full bg-accent text-accent-foreground px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Sending...' : 'Send inquiry'}
                  </button>
                  {!isAuthenticated && (
                    <p className="text-sm text-muted-foreground text-center">
                      <Link to="/auth" className="text-primary hover:underline">
                        Login
                      </Link>{' '}
                      to send an inquiry
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}