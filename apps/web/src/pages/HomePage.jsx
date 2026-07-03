import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Home, Building2, School, Briefcase, Store, Warehouse, CheckCircle, Shield, Zap, Clock, Users, ArrowRight, Phone, MessageCircle, MessageSquare } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PropertyCard from '@/components/PropertyCard.jsx';
import apiServerClient from '@/lib/apiServerClient';

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: '',
    minRent: '',
    maxRent: '',
  });

  useEffect(() => {
    fetchFeaturedProperties();
  }, []);

  const fetchFeaturedProperties = async () => {
    try {
      const response = await apiServerClient.fetch('/properties?limit=8');
      const data = await response.json();
      setProperties(data.items || []);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchFilters.location) params.append('location', searchFilters.location);
    if (searchFilters.propertyType) params.append('propertyType', searchFilters.propertyType);
    if (searchFilters.minRent) params.append('minRent', searchFilters.minRent);
    if (searchFilters.maxRent) params.append('maxRent', searchFilters.maxRent);
    window.location.href = `/rentals?${params.toString()}`;
  };

  const categories = [
    { name: 'Single Room', icon: Home, path: '/rentals?propertyType=Single Room' },
    { name: 'Bedsitter', icon: Home, path: '/rentals?propertyType=Bedsitter' },
    { name: 'Studio Apartment', icon: Building2, path: '/rentals?propertyType=Studio Apartment' },
    { name: '1 Bedroom', icon: Building2, path: '/rentals?propertyType=1 Bedroom' },
    { name: '2 Bedroom', icon: Building2, path: '/rentals?propertyType=2 Bedroom' },
    { name: '3 Bedroom', icon: Building2, path: '/rentals?propertyType=3 Bedroom' },
    { name: '4 Bedroom+', icon: Building2, path: '/rentals?propertyType=4 Bedroom+' },
    { name: 'Hostel', icon: School, path: '/hostels' },
    { name: 'Shared Accommodation', icon: Users, path: '/rentals?propertyType=Shared Accommodation' },
    { name: 'Shop', icon: Store, path: '/commercial?propertyType=Shop' },
    { name: 'Office Space', icon: Briefcase, path: '/commercial?propertyType=Office Space' },
    { name: 'Warehouse', icon: Warehouse, path: '/commercial?propertyType=Warehouse' },
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Verified listings',
      description: 'All properties are verified to protect you from scams and fake listings.',
    },
    {
      icon: MapPin,
      title: 'Nearby search',
      description: 'Find properties close to your preferred location with accurate mapping.',
    },
    {
      icon: Users,
      title: 'Direct contact',
      description: 'Connect directly with landlords via call or WhatsApp without middlemen.',
    },
    {
      icon: Zap,
      title: 'Fast and convenient',
      description: 'Browse hundreds of properties from your phone in minutes.',
    },
    {
      icon: Shield,
      title: 'Scam protection',
      description: 'Our verification process ensures you only see legitimate properties.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Search',
      description: 'Use filters to find properties that match your needs and budget.',
    },
    {
      number: '02',
      title: 'Compare listings',
      description: 'View photos, amenities, and prices to find the perfect match.',
    },
    {
      number: '03',
      title: 'Contact landlord',
      description: 'Reach out directly via call or WhatsApp to schedule a viewing.',
    },
    {
      number: '04',
      title: 'Move in',
      description: 'Complete the agreement and move into your new home.',
    },
  ];

  const locations = [
    'Machakos Town',
    'Athi River',
    'Mlolongo',
    'Syokimau',
    'Katani',
    'Tala',
    'Kangundo',
    'Matuu',
  ];

  const testimonials = [
    {
      name: 'Grace Mwangi',
      role: 'Tenant',
      text: 'Found my bedsitter in Mlolongo within two days. The verification badge gave me confidence.',
      rating: 5,
    },
    {
      name: 'David Ochieng',
      role: 'Landlord',
      text: 'Listing my properties here brought me serious tenants. No more time wasters.',
      rating: 5,
    },
    {
      name: 'Sarah Njeri',
      role: 'Tenant',
      text: 'Direct contact with landlords saved me agent fees. Highly recommend this platform.',
      rating: 5,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Rent a House - Find Your Next Home in Kenya</title>
        <meta name="description" content="Search verified rental houses, hostels, apartments, shops, and offices around you. Direct contact with landlords, no agent fees." />
      </Helmet>

      <Header />

      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1643732994186-6755311b4306)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
        </div>

        <div className="relative z-10 section-container text-center text-white py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
          >
            Find your next home without walking around
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 mb-12 mx-auto"
          >
            Search verified rental houses, hostels, apartments, shops, and offices around you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-2xl max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Location (e.g., Mlolongo)"
                value={searchFilters.location}
                onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                className="input-field text-foreground"
              />
              <select
                value={searchFilters.propertyType}
                onChange={(e) => setSearchFilters({ ...searchFilters, propertyType: e.target.value })}
                className="input-field text-foreground"
              >
                <option value="">Property Type</option>
                <option value="Single Room">Single Room</option>
                <option value="Bedsitter">Bedsitter</option>
                <option value="1 Bedroom">1 Bedroom</option>
                <option value="2 Bedroom">2 Bedroom</option>
                <option value="3 Bedroom">3 Bedroom</option>
                <option value="Hostel">Hostel</option>
                <option value="Shop">Shop</option>
                <option value="Office Space">Office Space</option>
              </select>
              <input
                type="number"
                placeholder="Min Rent (KSh)"
                value={searchFilters.minRent}
                onChange={(e) => setSearchFilters({ ...searchFilters, minRent: e.target.value })}
                className="input-field text-foreground"
              />
              <input
                type="number"
                placeholder="Max Rent (KSh)"
                value={searchFilters.maxRent}
                onChange={(e) => setSearchFilters({ ...searchFilters, maxRent: e.target.value })}
                className="input-field text-foreground"
              />
              <button
                onClick={handleSearch}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Browse by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  to={category.path}
                  className="flex flex-col items-center gap-3 p-6 bg-card rounded-xl border hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <category.icon className="h-10 w-10 text-primary" />
                  <span className="font-medium text-center">{category.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-3">Featured properties</h2>
              <p className="text-muted-foreground">Verified listings from trusted landlords</p>
            </div>
            <Link
              to="/rentals"
              className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-200"
            >
              View all
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-xl border bg-card p-4 space-y-4">
                  <div className="h-48 bg-muted rounded-lg animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/rentals"
              className="inline-flex items-center gap-2 text-primary font-semibold"
            >
              View all properties
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Why choose us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200"
              >
                <benefit.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6"
              >
                <div className="text-6xl font-bold text-primary/20" style={{ letterSpacing: '-0.02em' }}>
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Are you a property owner?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 mx-auto max-w-2xl">
              List your properties and reach thousands of potential tenants. Get started today with our free plan.
            </p>
            <Link
              to="/auth"
              className="inline-block bg-[#FF8C42] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:brightness-110 transition-all duration-200"
            >
              Post your property
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Popular locations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locations.map((location, index) => (
              <motion.div
                key={location}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  to={`/rentals?location=${location}`}
                  className="block p-6 bg-card rounded-xl border text-center hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                  <span className="font-medium">{location}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">What our users say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-card rounded-xl p-6 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-[#FF8C42] text-xl">★</span>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{testimonial.text}</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">Need help? Get in touch</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions about a property or need assistance? Reach out to our support team directly.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Primary Phone Card */}
            <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold text-lg mb-1">Primary Support</h3>
              <p className="text-2xl font-bold text-primary mb-5">+254 704 580 769</p>
              <div className="grid grid-cols-3 gap-3">
                <a 
                  href="tel:+254704580769" 
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Call</span>
                </a>
                <a 
                  href="https://wa.me/254704580769" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-200"
                >
                  <MessageCircle className="h-5 w-5 mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wide">WhatsApp</span>
                </a>
                <a 
                  href="sms:+254704580769" 
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary transition-colors duration-200"
                >
                  <MessageSquare className="h-5 w-5 mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wide">SMS</span>
                </a>
              </div>
            </div>

            {/* Alternative Phone Card */}
            <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <h3 className="font-semibold text-lg mb-1">Alternative Support</h3>
              <p className="text-2xl font-bold text-primary mb-5">+254 112 815 676</p>
              <div className="grid grid-cols-3 gap-3">
                <a 
                  href="tel:+254112815676" 
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  <Phone className="h-5 w-5 mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Call</span>
                </a>
                <a 
                  href="https://wa.me/254112815676" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-200"
                >
                  <MessageCircle className="h-5 w-5 mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wide">WhatsApp</span>
                </a>
                <a 
                  href="sms:+254112815676" 
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary transition-colors duration-200"
                >
                  <MessageSquare className="h-5 w-5 mb-2" />
                  <span className="text-xs font-semibold uppercase tracking-wide">SMS</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}