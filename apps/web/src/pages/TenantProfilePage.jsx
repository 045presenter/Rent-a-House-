import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { User, Mail, Phone, Home } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import apiServerClient from '@/lib/apiServerClient';

export default function TenantProfilePage() {
  const { currentUser } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const response = await apiServerClient.fetch('/inquiries', {
        headers: {
          'Authorization': `Bearer ${pb.authStore.token}`,
        },
      });
      const data = await response.json();
      setInquiries(data.items || []);
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>My Profile - Rent a House</title>
        <meta name="description" content="View your profile and inquiry history on Rent a House." />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-12">
          <div className="section-container">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">My profile</h1>
            <p className="text-primary-foreground/90">Manage your account and view your inquiries</p>
          </div>
        </div>

        <div className="section-container py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{currentUser?.name || 'Tenant'}</h2>
                  <p className="text-sm text-muted-foreground capitalize">{currentUser?.role || 'tenant'}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{currentUser?.email}</span>
                  </div>
                  {currentUser?.phone && (
                    <div className="flex items-center gap-3 text-sm">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{currentUser.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-2xl font-semibold mb-6">My inquiries</h2>

                {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4 space-y-3">
                        <div className="h-4 bg-muted rounded animate-pulse" />
                        <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="text-center py-12">
                    <Home className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No inquiries yet</h3>
                    <p className="text-muted-foreground">Start browsing properties and send inquiries to landlords</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">
                              {inquiry.expand?.propertyId?.title || 'Property'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {inquiry.expand?.propertyId?.location}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              inquiry.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : inquiry.status === 'Responded'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {inquiry.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{inquiry.message}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Type: {inquiry.inquiryType}</span>
                          <span>
                            {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}