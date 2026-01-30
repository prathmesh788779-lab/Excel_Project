import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Presentation, Users, Wifi, Coffee, Car, Monitor, Check } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const IMAGES = {
  corporate: "https://images.pexels.com/photos/7534215/pexels-photo-7534215.jpeg",
  conference: "https://images.unsplash.com/photo-1768346564825-6f90c0b89e2e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBjb25mZXJlbmNlJTIwcm9vbSUyMGx1eHVyeSUyMGhvdGVsJTIwbWVldGluZ3xlbnwwfHx8fDE3Njk3NjUyNjh8MA&ixlib=rb-4.1.0&q=85",
  hero: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/87x14u9a_Screenshot%202026-01-30%20134758.png",
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

const CorporatePage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    event_type: "Corporate Offsite",
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
        event_type: "Corporate Offsite",
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

  const facilities = [
    { icon: Presentation, title: "Conference Rooms", desc: "Multiple halls with capacity up to 200" },
    { icon: Monitor, title: "AV Equipment", desc: "State-of-the-art presentation systems" },
    { icon: Wifi, title: "High-Speed WiFi", desc: "Enterprise-grade connectivity" },
    { icon: Coffee, title: "Refreshments", desc: "Tea breaks and catering services" },
    { icon: Users, title: "Team Building", desc: "Outdoor activities and games" },
    { icon: Car, title: "Transportation", desc: "Airport transfers and local transport" },
  ];

  const packages = [
    {
      name: "Day Conference",
      duration: "Full Day",
      features: ["Conference Hall", "AV Equipment", "2 Tea Breaks", "Lunch", "WiFi"],
    },
    {
      name: "Corporate Offsite",
      duration: "2-3 Days",
      features: ["Accommodation", "Meeting Rooms", "All Meals", "Team Activities", "Gala Dinner"],
      featured: true,
    },
    {
      name: "Executive Retreat",
      duration: "Custom",
      features: ["Premium Suites", "Private Meetings", "Spa Access", "Custom Menus", "Dedicated Staff"],
    },
  ];

  return (
    <div data-testid="corporate-page">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]" data-testid="corporate-hero">
        <img src={IMAGES.corporate} alt="Corporate" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Business Events
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white mb-4">
              Corporate Offsites & Events
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Elevate your corporate events with world-class facilities
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24" data-testid="corporate-intro">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <img
                src={IMAGES.conference}
                alt="Conference Room"
                className="w-full h-[400px] object-cover shadow-2xl"
              />
            </AnimatedSection>

            <AnimatedSection>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                Premium Venues
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6">
                Where Business
                <br />
                Meets Luxury
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Silver Stone Park Resort provides the ideal setting for corporate 
                conferences, team offsites, and executive retreats. Our modern 
                facilities combined with luxury amenities create a productive yet 
                relaxing environment.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                From boardroom meetings to large conferences, our versatile spaces 
                can be customized to meet your specific requirements. Let your team 
                recharge while achieving your business objectives.
              </p>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <p className="text-4xl font-playfair text-gold">50+</p>
                  <p className="text-sm text-gray-500">Corporate Events</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-playfair text-gold">200+</p>
                  <p className="text-sm text-gray-500">Max Capacity</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-24 bg-secondary" data-testid="corporate-facilities">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              What We Offer
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy">
              Corporate Facilities
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <AnimatedSection key={facility.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-8 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <facility.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                  <h3 className="text-xl font-playfair text-navy mb-2">{facility.title}</h3>
                  <p className="text-gray-600 text-sm">{facility.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24" data-testid="corporate-packages">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Choose Your Package
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy">
              Corporate Packages
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
                  data-testid={`corporate-package-${index}`}
                >
                  {pkg.featured && (
                    <span className="text-gold text-xs uppercase tracking-wider">Most Popular</span>
                  )}
                  <h3 className={`text-2xl font-playfair mt-2 mb-2 ${pkg.featured ? "text-white" : "text-navy"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`text-sm mb-6 ${pkg.featured ? "text-white/70" : "text-gray-500"}`}>
                    {pkg.duration}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-sm">
                        <Check size={16} className="text-gold" />
                        <span className={pkg.featured ? "text-white/90" : "text-gray-600"}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => document.getElementById("corporate-enquiry-form").scrollIntoView({ behavior: "smooth" })}
                    className={`w-full py-4 text-xs uppercase tracking-widest font-semibold transition-all ${
                      pkg.featured
                        ? "bg-gold text-white hover:bg-gold/90"
                        : "bg-navy text-white hover:bg-navy/90"
                    }`}
                    data-testid={`enquire-corporate-${index}-btn`}
                  >
                    Get Quote
                  </button>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="corporate-enquiry-form" className="py-24 bg-navy" data-testid="corporate-enquiry">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Get Started
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-white mb-4">
              Plan Your Corporate Event
            </h2>
            <p className="text-white/70">
              Fill out the form below and our events team will contact you
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-12 shadow-2xl" data-testid="corporate-enquiry-form">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors"
                    data-testid="corporate-name-input"
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
                    data-testid="corporate-phone-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Company Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors"
                    data-testid="corporate-email-input"
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
                    data-testid="corporate-event-type-select"
                  >
                    <option value="Corporate Offsite">Corporate Offsite</option>
                    <option value="Conference">Conference</option>
                    <option value="Team Building">Team Building</option>
                    <option value="Training Session">Training Session</option>
                    <option value="Product Launch">Product Launch</option>
                    <option value="Annual Meeting">Annual Meeting</option>
                    <option value="Other">Other</option>
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
                    data-testid="corporate-date-input"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Number of Attendees
                  </label>
                  <select
                    value={formData.guest_count}
                    onChange={(e) => setFormData({ ...formData, guest_count: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors bg-transparent"
                    data-testid="corporate-guests-select"
                  >
                    <option value="">Select range</option>
                    <option value="10-25">10 - 25 attendees</option>
                    <option value="25-50">25 - 50 attendees</option>
                    <option value="50-100">50 - 100 attendees</option>
                    <option value="100-200">100 - 200 attendees</option>
                    <option value="200+">200+ attendees</option>
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                  Event Details
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors resize-none"
                  placeholder="Tell us about your event requirements..."
                  data-testid="corporate-message-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gold text-white py-4 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all disabled:opacity-50"
                data-testid="corporate-submit-btn"
              >
                {isSubmitting ? "Submitting..." : "Request Quote"}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default CorporatePage;
