import React from 'react';
import { Helmet } from 'react-helmet';
import { Target, Eye, Heart, Users, Shield, Zap } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
export default function AboutUsPage() {
  const values = [{
    icon: Shield,
    title: 'Trust',
    description: 'We verify every listing to protect our users from scams and fake properties.'
  }, {
    icon: Users,
    title: 'Community',
    description: 'Building connections between landlords and tenants across Kenya.'
  }, {
    icon: Zap,
    title: 'Innovation',
    description: 'Using technology to make property search faster and more convenient.'
  }, {
    icon: Heart,
    title: 'Care',
    description: 'We genuinely care about helping people find their perfect home.'
  }];
  return <>
      <Helmet>
        <title>About Us - Rent a House</title>
        <meta name="description" content="Learn about Rent a House, our mission to simplify property search in Kenya, and why thousands trust us." />
      </Helmet>

      <Header />

      <div className="min-h-screen bg-background">
        <div className="bg-primary text-primary-foreground py-20">
          <div className="section-container text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Rent a House</h1>
            <p className="text-lg text-primary-foreground/90 max-w-3xl mx-auto">
              We're on a mission to make finding rental properties in Kenya simple, safe, and stress-free.
            </p>
          </div>
        </div>

        <div className="section-container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="h-10 w-10 text-primary" />
                <h2 className="text-3xl font-semibold">Our mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Finding a place to live shouldn't require walking around neighborhoods for days or dealing with unreliable agents. We created Rent a House to connect tenants directly with landlords, making the search process transparent and efficient.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every property on our platform is verified to protect you from scams. We believe everyone deserves a safe, convenient way to find their next home.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop" alt="Modern apartment building" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=600&h=400&fit=crop" alt="Happy family in new home" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-3 mb-6">
                <Eye className="h-10 w-10 text-primary" />
                <h2 className="text-3xl font-semibold">Our vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We envision a Kenya where finding rental property is as easy as a few taps on your phone. No more wasted time, no more scams, no more unnecessary agent fees.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                By 2030, we aim to be the most trusted property platform in East Africa, helping millions of people find their perfect home.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-center mb-12">Our values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => <div key={index} className="bg-card rounded-xl border p-6 text-center">
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>)}
            </div>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground py-20">
          <div className="section-container text-center">
            <h2 className="text-3xl font-semibold mb-4">Why people trust us</h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Over 10,000 properties listed. Thousands of successful connections. Zero tolerance for scams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div>
                <p className="text-5xl font-bold mb-2">10,000+</p>
                <p className="text-primary-foreground/80">Verified properties</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">5,000+</p>
                <p className="text-primary-foreground/80">Happy tenants</p>
              </div>
              <div>
                <p className="text-5xl font-bold mb-2">1,200+</p>
                <p className="text-primary-foreground/80">Trusted landlords</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>;
}