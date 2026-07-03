import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Plus, Edit, Trash2, Eye, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import apiServerClient from '@/lib/apiServerClient';

export default function LandlordDashboardPage() {
  const { currentUser } = useAuth();
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'Single Room',
    rentAmount: '',
    location: '',
    county: '',
    amenities: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [propertiesRes, inquiriesRes] = await Promise.all([
        apiServerClient.fetch(`/properties?landlordId=${currentUser.id}`),
        apiServerClient.fetch('/inquiries', {
          headers: { 'Authorization': `Bearer ${pb.authStore.token}` },
        }),
      ]);

      const propertiesData = await propertiesRes.json();
      const inquiriesData = await inquiriesRes.json();

      setProperties(propertiesData.items || []);
      setInquiries(inquiriesData.items || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await apiServerClient.fetch('/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${pb.authStore.token}`,
        },
        body: JSON.stringify({
          ...formData,
          rentAmount: parseFloat(formData.rentAmount),
          landlordId: currentUser.id,
        }),
      });

      if (!response.ok) throw new Error('Failed to create property');

      toast.success('Property added successfully');
      setShowAddForm(false);
      setFormData({
        title: '',
        description: '',
        propertyType: 'Single Room',
        rentAmount: '',
        location: '',
        county: '',
        amenities: '',
      });
      fetchData();
    } catch (error) {
      toast.error('Failed to add property');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (propertyId) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;

    try {
      const response = await apiServerClient.fetch(`/properties/${propertyId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${pb.authStore.token}` },
      });

      if (!response.ok) throw new Error('Failed to delete property');

      toast.success('Property deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete property');
    }
  };

  return (
    <>
      <Helmet>
        <title>Landlord Dashboard - Rent a House</title>
        <meta name="description" content="Manage your properties and view inquiries from potential tenants." />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-12">
          <div className="section-container">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Landlord dashboard</h1>
            <p className="text-primary-foreground/90">Manage your properties and inquiries</p>
          </div>
        </div>

        <div className="section-container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card rounded-xl border p-6">
              <p className="text-sm text-muted-foreground mb-2">Total properties</p>
              <p className="text-3xl font-bold">{properties.length}</p>
            </div>
            <div className="bg-card rounded-xl border p-6">
              <p className="text-sm text-muted-foreground mb-2">Total inquiries</p>
              <p className="text-3xl font-bold">{inquiries.length}</p>
            </div>
            <div className="bg-card rounded-xl border p-6">
              <p className="text-sm text-muted-foreground mb-2">Pending inquiries</p>
              <p className="text-3xl font-bold">
                {inquiries.filter((i) => i.status === 'Pending').length}
              </p>
            </div>
          </div>

          <div className="bg-card rounded-xl border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">My properties</h2>
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add property
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={handleSubmit} className="mb-8 p-6 bg-muted rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Add new property</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Property type</label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="Single Room">Single Room</option>
                      <option value="Bedsitter">Bedsitter</option>
                      <option value="Studio Apartment">Studio Apartment</option>
                      <option value="1 Bedroom">1 Bedroom</option>
                      <option value="2 Bedroom">2 Bedroom</option>
                      <option value="3 Bedroom">3 Bedroom</option>
                      <option value="4 Bedroom+">4 Bedroom+</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Shop">Shop</option>
                      <option value="Office Space">Office Space</option>
                      <option value="Warehouse">Warehouse</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Rent amount (KSh)</label>
                    <input
                      type="number"
                      value={formData.rentAmount}
                      onChange={(e) => setFormData({ ...formData, rentAmount: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">County</label>
                    <input
                      type="text"
                      value={formData.county}
                      onChange={(e) => setFormData({ ...formData, county: e.target.value })}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Amenities (comma separated)</label>
                    <input
                      type="text"
                      value={formData.amenities}
                      onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                      placeholder="WiFi, Parking, Security"
                      className="input-field"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="input-field resize-none"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Adding...' : 'Add property'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-6 py-2 border rounded-md hover:bg-muted transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-3">
                    <div className="h-4 bg-muted rounded animate-pulse" />
                    <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <Plus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No properties yet</h3>
                <p className="text-muted-foreground">Add your first property to start receiving inquiries</p>
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map((property) => (
                  <div key={property.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{property.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="font-semibold text-primary">
                            KSh {property.rentAmount?.toLocaleString()}/month
                          </span>
                          <span className="text-muted-foreground">{property.propertyType}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => window.open(`/property/${property.id}`, '_blank')}
                          className="p-2 hover:bg-muted rounded-md transition-all duration-200"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(property.id)}
                          className="p-2 hover:bg-destructive/10 text-destructive rounded-md transition-all duration-200"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-card rounded-xl border p-6">
            <h2 className="text-2xl font-semibold mb-6">Recent inquiries</h2>
            {inquiries.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No inquiries yet</h3>
                <p className="text-muted-foreground">Inquiries from tenants will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.slice(0, 5).map((inquiry) => (
                  <div key={inquiry.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">
                          {inquiry.expand?.propertyId?.title || 'Property'}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          From: {inquiry.expand?.tenantId?.name || 'Tenant'}
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

      <Footer />
    </>
  );
}