import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Camera, Music, Utensils, Users, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const IMAGES = {
  wedding: "https://images.unsplash.com/photo-1766393524464-e5eb1b05e4c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMHdlZGRpbmclMjByZWNlcHRpb24lMjBvdXRkb29yJTIwZWxlZ2FudHxlbnwwfHx8fDE3Njk3NjUyNjR8MA&ixlib=rb-4.1.0&q=85",
  wedding2: "https://images.unsplash.com/photo-1766393195987-912865cbb81b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHdlZGRpbmclMjByZWNlcHRpb24lMjBvdXRkb29yJTIwZWxlZ2FudHxlbnwwfHx8fDE3Njk3NjUyNjR8MA&ixlib=rb-4.1.0&q=85",
  hero: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/lujrcf3u_Screenshot%202026-01-30%20135506.png",
};

const AnimatedSection = ({ children, className = "" }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const WeddingsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    event_type: "Wedding",
    event_date: "",
    guest_count: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/api/enquiries/event`, formData);
      toast.success("Enquiry submitted successfully! Our team will contact you shortly.");
      setFormData({
        name: "",
        phone: "",
        email: "",
        event_type: "Wedding",
        event_date: "",
        guest_count: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to submit enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { icon: Heart, title: "Wedding Planning", desc: "Dedicated wedding planners for your special day" },
    { icon: Camera, title: "Photography", desc: "Professional photography and videography services" },
    { icon: Music, title: "Entertainment", desc: "DJ, live bands, and traditional music arrangements" },
    { icon: Utensils, title: "Catering", desc: "Multi-cuisine menus customized to your preferences" },
    { icon: Users, title: "Guest Management", desc: "Accommodation for up to 500+ guests" },
    { icon: Sparkles, title: "Decor & Design", desc: "Stunning floral arrangements and themed decor" },
  ];

  const packages = [
    {
      name: "Intimate Celebration",
      guests: "Up to 100 Guests",
      features: ["Garden Venue", "Basic Decor", "2 Menus", "Photography"],
    },
    {
      name: "Grand Wedding",
      guests: "Up to 300 Guests",
      features: ["Banquet Hall", "Premium Decor", "5 Menus", "Photo + Video", "DJ Night"],
      featured: true,
    },
    {
      name: "Royal Affair",
      guests: "Up to 500+ Guests",
      features: ["Full Resort Booking", "Luxury Decor", "Custom Menus", "Full Media Coverage", "3-Day Package"],
    },
  ];

  return (
    <div data-testid="weddings-page">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px]" data-testid="weddings-hero">
        <img src={IMAGES.wedding} alt="Wedding" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Destination Weddings
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-4">
              Weddings & Celebrations
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Create unforgettable memories at Nagpur's premier wedding destination
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24" data-testid="weddings-intro">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                Your Dream Wedding
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6">
                Where Love Stories
                <br />
                Become Legends
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Silver Stone Park Resort offers the perfect backdrop for your dream wedding. 
                Our iconic blue architecture, sprawling lawns, and luxurious banquet halls 
                provide versatile venues for celebrations of every scale.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From intimate gatherings to grand celebrations with 500+ guests, our 
                dedicated wedding planners ensure every detail is perfect, allowing you 
                to focus on what matters most – celebrating your love.
              </p>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-4xl font-playfair text-gold">200+</p>
                  <p className="text-sm text-gray-500">Weddings Hosted</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-playfair text-gold">500+</p>
                  <p className="text-sm text-gray-500">Guest Capacity</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <img
                src={IMAGES.wedding2}
                alt="Wedding Setup"
                className="w-full h-[500px] object-cover shadow-2xl"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-secondary" data-testid="weddings-services">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy">
              Wedding Services
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <service.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-playfair text-navy mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24" data-testid="weddings-packages">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Choose Your Package
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy">
              Wedding Packages
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <AnimatedSection key={pkg.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-8 ${
                    pkg.featured
                      ? "bg-navy text-white border-2 border-gold"
                      : "bg-white border border-gray-200"
                  } transition-all hover:shadow-xl`}
                  data-testid={`wedding-package-${index}`}
                >
                  {pkg.featured && (
                    <span className="text-gold text-xs uppercase tracking-wider">Most Popular</span>
                  )}
                  <h3 className={`text-2xl font-playfair mt-2 mb-2 ${pkg.featured ? "text-white" : "text-navy"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm mb-6 ${pkg.featured ? "text-white/70" : "text-gray-500"}`}>
                    {pkg.guests}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <Check size={16} className={pkg.featured ? "text-gold" : "text-gold"} />
                        <span className={pkg.featured ? "text-white/90" : "text-gray-600"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => document.getElementById("enquiry-form").scrollIntoView({ behavior: "smooth" })}
                    className={`w-full py-4 text-xs uppercase tracking-widest font-semibold transition-all ${
                      pkg.featured
                        ? "bg-gold text-white hover:bg-gold/90"
                        : "bg-navy text-white hover:bg-navy/90"
                    }`}
                    data-testid={`enquire-package-${index}-btn`}
                  >
                    Enquire Now
                  </button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" className="py-24 bg-navy" data-testid="weddings-enquiry">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Get Started
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-white mb-4">
              Plan Your Wedding
            </h2>
            <p className="text-white/70">
              Fill out the form below and our wedding specialists will contact you
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-2xl" data-testid="wedding-enquiry-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors"
                    data-testid="wedding-name-input"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors"
                    data-testid="wedding-phone-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors"
                    data-testid="wedding-email-input"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Event Type *
                  </label>
                  <select
                    required
                    value={formData.event_type}
                    onChange={(e) => setFormData({ ...formData, event_type: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors bg-transparent"
                    data-testid="wedding-event-type-select"
                  >
                    <option value="Wedding">Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Reception">Reception</option>
                    <option value="Mehendi/Sangeet">Mehendi/Sangeet</option>
                    <option value="Anniversary">Anniversary</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Other">Other Celebration</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors"
                    data-testid="wedding-date-input"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Expected Guest Count
                  </label>
                  <select
                    value={formData.guest_count}
                    onChange={(e) => setFormData({ ...formData, guest_count: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors bg-transparent"
                    data-testid="wedding-guests-select"
                  >
                    <option value="">Select range</option>
                    <option value="50-100">50 - 100 guests</option>
                    <option value="100-200">100 - 200 guests</option>
                    <option value="200-300">200 - 300 guests</option>
                    <option value="300-500">300 - 500 guests</option>
                    <option value="500+">500+ guests</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                  Additional Details
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your vision..."
                  data-testid="wedding-message-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-white py-4 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all disabled:opacity-50"
                data-testid="wedding-submit-btn"
              >
                {isSubmitting ? "Submitting..." : "Check Date Availability"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default WeddingsPage;
