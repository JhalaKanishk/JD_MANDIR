import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', nameHi: 'मुख्य पृष्ठ', href: '/' },
  { name: 'About', nameHi: 'हमारे बारे में', href: '/about' },
  { name: 'Daily Aarti', nameHi: 'दैनिक आरती', href: '/aarti' },
  { name: 'Gallery', nameHi: 'गैलरी', href: '/gallery' },
  { name: 'Contact', nameHi: 'संपर्क', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const headerClass = isScrolled || !isHome
    ? 'header-solid'
    : 'header-transparent';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerClass}`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center shadow-temple group-hover:shadow-gold transition-shadow duration-300">
              <span className="text-2xl">🙏</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-display text-lg font-bold transition-colors duration-300 ${
                isScrolled || !isHome ? 'text-secondary' : 'text-white'
              }`}>
                श्री जगन्नाथ मंदिर
              </span>
              <span className={`text-xs tracking-widest uppercase transition-colors duration-300 ${
                isScrolled || !isHome ? 'text-muted-foreground' : 'text-white/80'
              }`}>
                Jagdish Temple
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative font-medium text-sm tracking-wide transition-colors duration-300 hover:text-primary group ${
                  isScrolled || !isHome ? 'text-foreground' : 'text-white'
                } ${location.pathname === link.href ? 'text-primary' : ''}`}
              >
                {language === 'en' ? link.name : link.nameHi}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-saffron to-gold transition-all duration-300 ${
                  location.pathname === link.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                isScrolled || !isHome
                  ? 'bg-muted hover:bg-primary/10 text-foreground'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              {language === 'en' ? 'हिंदी' : 'English'}
            </button>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={isScrolled || !isHome ? 'text-foreground' : 'text-white'}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-cream border-l border-primary/20">
                <div className="flex flex-col h-full pt-8">
                  {/* Mobile Logo */}
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-primary/10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron to-gold flex items-center justify-center">
                      <span className="text-xl">🙏</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-display text-lg font-bold text-secondary">
                        श्री जगन्नाथ मंदिर
                      </span>
                    </div>
                  </div>

                  {/* Mobile Nav Links */}
                  <nav className="flex flex-col gap-2">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={link.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                            location.pathname === link.href
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-muted'
                          }`}
                        >
                          {language === 'en' ? link.name : link.nameHi}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>

                  {/* Mobile Language Switcher */}
                  <div className="mt-auto pt-6 border-t border-primary/10">
                    <button
                      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
                      className="w-full px-4 py-3 rounded-lg bg-muted text-foreground font-medium hover:bg-primary/10 transition-colors"
                    >
                      {language === 'en' ? 'हिंदी में देखें' : 'View in English'}
                    </button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
