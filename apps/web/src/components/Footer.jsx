import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1E3A8A] text-white">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-[#FF8C42]" />
              <span className="text-xl font-bold">Rent a House</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Find your next home without walking around. Search verified rental properties across Kenya.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-white/80 hover:text-[#FF8C42] transition-colors duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-[#FF8C42] transition-colors duration-200">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/rentals" className="text-white/80 hover:text-[#FF8C42] transition-colors duration-200">
                  Browse Rentals
                </Link>
              </li>
              <li>
                <Link to="/plans" className="text-white/80 hover:text-[#FF8C42] transition-colors duration-200">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-white/80">Privacy Policy</span>
              </li>
              <li>
                <span className="text-white/80">Terms and Conditions</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacts</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4 text-[#FF8C42]" />
                <span>+254704580769</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4 text-[#FF8C42]" />
                <span>+254112815676</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4 text-[#FF8C42]" />
                <span>info@rentahouse.co.ke</span>
              </li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="p-2 bg-white/10 rounded-md hover:bg-[#FF8C42] transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-md hover:bg-[#FF8C42] transition-colors duration-200">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-md hover:bg-[#FF8C42] transition-colors duration-200">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 bg-white/10 rounded-md hover:bg-[#FF8C42] transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Rent a House. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
