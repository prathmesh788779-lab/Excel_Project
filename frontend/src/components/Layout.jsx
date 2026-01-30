import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BookingModal from "./BookingModal";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Rooms", path: "/rooms" },
    { name: "Amenities", path: "/amenities" },
    { name: "Weddings", path: "/weddings" },
    { name: "Corporate", path: "/corporate" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header
        data-testid="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-navy/95 backdrop-blur-md shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
            <div className="text-white">
              <h1 className="text-xl md:text-2xl font-playfair font-semibold tracking-wide">
                Silver Stone Park
              </h1>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">Resort</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" data-testid="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-manrope tracking-wide transition-colors duration-300 underline-animation ${
                  location.pathname === link.path
                    ? "text-gold"
                    : "text-white hover:text-gold"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+919999999999"
              className="flex items-center gap-2 text-white hover:text-gold transition-colors"
              data-testid="phone-link"
            >
              <Phone size={16} />
              <span className="text-sm">+91 99999 99999</span>
            </a>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="bg-gold text-white px-6 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all duration-300 hover:scale-105"
              data-testid="book-now-btn"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-navy/98 backdrop-blur-lg"
              data-testid="mobile-menu"
            >
              <nav className="flex flex-col px-6 py-6 gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-base font-manrope tracking-wide py-2 border-b border-white/10 ${
                      location.pathname === link.path
                        ? "text-gold"
                        : "text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsBookingOpen(true);
                  }}
                  className="mt-4 bg-gold text-white px-6 py-4 text-sm uppercase tracking-widest font-semibold"
                  data-testid="mobile-book-now-btn"
                >
                  Book Your Stay
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-navy text-white" data-testid="main-footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-playfair font-semibold mb-2">
              Silver Stone Park
            </h3>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4">Resort</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nagpur's most iconic luxury resort, offering world-class amenities
              for memorable stays, destination weddings, and corporate events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold uppercase tracking-widest text-xs font-semibold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {["Rooms & Suites", "Weddings", "Corporate Events", "Gallery", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={`/${link.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                      className="text-gray-400 hover:text-gold transition-colors text-sm"
                    >
                      {link}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold uppercase tracking-widest text-xs font-semibold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>NH-44, Khapri, Nagpur</li>
              <li>Maharashtra 441108</li>
              <li className="pt-2">
                <a href="tel:+919999999999" className="hover:text-gold transition-colors">
                  +91 99999 99999
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@silverstonepark.com"
                  className="hover:text-gold transition-colors"
                >
                  info@silverstonepark.com
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-gold uppercase tracking-widest text-xs font-semibold mb-6">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {["Instagram", "Facebook", "YouTube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-gold hover:text-gold transition-all duration-300"
                  data-testid={`social-${social.toLowerCase()}`}
                >
                  <span className="text-xs">{social[0]}</span>
                </a>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-gold text-lg">★</span>
                ))}
              </div>
              <span className="text-white font-semibold">4.8</span>
              <span className="text-gray-400 text-sm">Rating</span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Silver Stone Park Resort. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen noise-overlay">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
