import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Temple', href: '/about' },
  { name: 'Daily Aarti', href: '/aarti' },
  { name: 'Photo Gallery', href: '/gallery' },
  { name: 'Contact Us', href: '/contact' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Decorative Top Border */}
      <div className="h-1 bg-gradient-to-r from-saffron via-gold to-saffron" />

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Temple Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center shadow-gold">
                <span className="text-2xl">🙏</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold">श्री जगन्नाथ मंदिर</h3>
                <p className="text-sm text-secondary-foreground/70">Jagdish Temple</p>
              </div>
            </div>
            <p className="text-secondary-foreground/80 leading-relaxed mb-6 max-w-md">
              A sacred sanctuary dedicated to Lord Krishna, offering devotees a place for spiritual 
              worship, meditation, and community gatherings. Experience divine blessings and inner peace.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-saffron hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-secondary-foreground/80 hover:text-gold transition-colors duration-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-6 text-gold">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-saffron flex-shrink-0 mt-0.5" />
                <span className="text-secondary-foreground/80">
                  Jagdish Chowk<br />
                  Udaipur, Rajasthan, India - 313001
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-saffron flex-shrink-0" />
                <a href="tel:+911234567890" className="text-secondary-foreground/80 hover:text-gold transition-colors">
                  +91 7878512551
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-saffron flex-shrink-0" />
                <a href="mailto:kanishkrajsinghjhala@gmail.com" className="text-secondary-foreground/80 hover:text-gold transition-colors">
                  kanishkrajsinghjhala@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-secondary-foreground/60 text-center md:text-left">
              © {new Date().getFullYear()} Jagdish Temple Trust. All rights reserved.
            </p>
            <p className="text-sm text-secondary-foreground/60">
              Made with 🙏 for devotees worldwide by Kanishk Raj Singh Jhala
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
