import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PropertyCard from '@/components/PropertyCard.jsx';
import apiServerClient from '@/lib/apiServerClient';

export default function HostelsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    location: searchParams.get('location') || '',
    minRent: searchParams.get('minRent') || '',
    maxRent: searchParams.get('maxRent') || '',
  });

  useEffect(() => {
    fetchProperties();
  }, [currentPage, searchParams]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', '12');
      params.append('propertyType', 'Hostel');
      if (filters.location) params.append('location', filters.location);
      if (filters.minRent) params.append('minRent', filters.minRent);
      if (filters.maxRent) params.append('maxRent', filters.maxRent);

      const response = await apiServerClient.fetch(`/properties?${params.toString()}`);
      const data = await response.json();
      setProperties(data.items || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (filters.location) params.append('location', filters.location);
    if (filters.minRent) params.append('minRent', filters.minRent);
    if (filters.maxRent) params.append('maxRent', filters.maxRent);
    setSearchParams(params);
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Hostels - Rent a House</title>
        <meta name="description" content="Find affordable hostel accommodation for students and young professionals across Kenya." />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-12">
          <div className="section-container">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Hostels</h1>
            <p className="text-primary-foreground/90">Affordable accommodation for students and young professionals</p>
          </div>
        </div>

        <div className="section-container py-8">
          <div className="bg-card rounded-xl border p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold">Filter hostels</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Min Rent (KSh)"
                value={filters.minRent}
                onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Max Rent (KSh)"
                value={filters.maxRent}
                onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
                className="input-field"
              />
              <button
                onClick={handleSearch}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Search className="h-5 w-5" />
                Search
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="rounded-xl border bg-card p-4 space-y-4">
                  <div className="h-48 bg-muted rounded-lg animate-pulse" />
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                </div>
              ))}
            </div>
          ) : properties.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No hostels found</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-md hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}