import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      toast.success('Message sent successfully. We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Rent a House</title>
        <meta name="description" content="Get in touch with Rent a House. We're here to help with any questions about finding or listing properties." />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-20">
          <div className="section-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact us</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out and we'll respond as soon as possible.
            </p>
          </div>
        </div>

        <div className="section-container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="input-field resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : 'Send message'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-6">Direct Contact</h2>
              <div className="space-y-6 mb-8">
                
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

                <div className="flex items-start gap-4 pt-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-muted-foreground">info@rentahouse.co.ke</p>
                    <p className="text-sm text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground">Machakos Town, Kenya</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Follow us</h3>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="p-3 bg-primary/10 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-primary/10 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-primary/10 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-primary/10 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}