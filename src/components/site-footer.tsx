import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react';
export function SiteFooter() {
  return (
    <footer className="bg-muted mt-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-brand-primary h-8 w-8" />
              <span className="text-xl font-display font-bold">ChicHaven</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium fashion and accessories for the modern individual. Quality craftsmanship and timeless design.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, idx) => (
                <a key={idx} href="#" className="text-muted-foreground hover:text-brand-primary transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          {/* Contact Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-brand-primary" />
                <span>123 Fashion Ave, NY 10001, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-primary" />
                <span>+1 (555) 0123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-primary" />
                <span>hello@chichaven.atelier</span>
              </li>
            </ul>
          </div>
          {/* Quick Links Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {['New Arrivals', 'Best Sellers', 'Exclusive Wear', 'Size Guide', 'Shipping Info'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-brand-primary transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Legal Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-brand-primary transition-colors">Terms of Service</Link></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border text-center text-xs text-muted-foreground space-y-2">
          <p>© 2024 ChicHaven Atelier LLC. All rights reserved.</p>
          <p>CNPJ: 00.000.000/0001-00 | Razão Social: ChicHaven Comércio de Vestuário LTDA</p>
        </div>
      </div>
    </footer>
  );
}