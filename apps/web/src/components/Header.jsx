import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Building2, School, Briefcase, Info, Phone, PlusCircle, LogIn, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, currentUser, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/rentals', label: 'Rentals', icon: Building2 },
    { path: '/hostels', label: 'Hostels', icon: School },
    { path: '/commercial', label: 'Commercial Spaces', icon: Briefcase },
    { path: '/about', label: 'About Us', icon: Info },
    { path: '/contact', label: 'Contact Us', icon: Phone },
  ];

  return (
    <header className="bg-[#1E3A8A] text-white sticky top-0 z-50 shadow-lg">
      <div className="section-container">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-[#FF8C42]" />
            <span className="text-xl font-bold">Rent a House</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-white/10 font-semibold'
                    : 'hover:bg-white/5'
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                {currentUser?.role === 'landlord' && (
                  <Link
                    to="/landlord/dashboard"
                    className="bg-[#FF8C42] text-white px-5 py-2.5 rounded-md font-semibold hover:brightness-110 transition-all duration-200 flex items-center gap-2"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Post Property
                  </Link>
                )}
                <Link
                  to={currentUser?.role === 'landlord' ? '/landlord/dashboard' : '/tenant/profile'}
                  className="border border-white px-5 py-2.5 rounded-md font-semibold hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="border border-white px-5 py-2.5 rounded-md font-semibold hover:bg-white/10 transition-all duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth"
                  className="border border-white px-5 py-2.5 rounded-md font-semibold hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Login / Register
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-white/10 rounded-md transition-all duration-200"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-md transition-all duration-200 ${
                  isActive(link.path)
                    ? 'bg-white/10 font-semibold'
                    : 'hover:bg-white/5'
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
            <div className="pt-2 space-y-2">
              {isAuthenticated ? (
                <>
                  {currentUser?.role === 'landlord' && (
                    <Link
                      to="/landlord/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block bg-[#FF8C42] text-white px-4 py-3 rounded-md font-semibold text-center"
                    >
                      Post Property
                    </Link>
                  )}
                  <Link
                    to={currentUser?.role === 'landlord' ? '/landlord/dashboard' : '/tenant/profile'}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block border border-white px-4 py-3 rounded-md font-semibold text-center"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full border border-white px-4 py-3 rounded-md font-semibold"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block border border-white px-4 py-3 rounded-md font-semibold text-center"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}