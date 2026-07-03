import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import PlansList from '@/components/PlansList.jsx';

export default function PlansPage() {
  return (
    <>
      <Helmet>
        <title>Pricing Plans - Rent a House</title>
        <meta name="description" content="Choose the right plan for your property listing needs. Free and premium options available." />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-20">
          <div className="section-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Choose your plan</h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Pick the tier that fits how you'll use it. Upgrade or cancel anytime.
            </p>
          </div>
        </div>

        <div className="section-container py-20">
          <PlansList />
        </div>
      </div>

      <Footer />
    </>
  );
}