import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SubscriptionAccountSection from '@/components/SubscriptionAccountSection.jsx';

export default function SubscriptionsPage() {
  return (
    <>
      <Helmet>
        <title>Your Subscription - Rent a House</title>
        <meta name="description" content="View your current subscription plan and manage billing." />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-12">
          <div className="section-container">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">Your subscription</h1>
            <p className="text-primary-foreground/90">View your current plan and manage billing</p>
          </div>
        </div>

        <div className="section-container py-12">
          <SubscriptionAccountSection />
        </div>
      </div>

      <Footer />
    </>
  );
}