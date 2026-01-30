import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Waves, Dumbbell, Utensils, Sparkles, Car, Wifi, Coffee, Users } from "lucide-react";
import { Link } from "react-router-dom";

const IMAGES = {
  pool: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/ikclnp1k_Screenshot%202026-01-30%20134846.png",
  hero: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/87x14u9a_Screenshot%202026-01-30%20134758.png",
  spa: "https://images.unsplash.com/photo-1758973470049-4514352776eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMHNwYSUyMG1hc3NhZ2UlMjByZWxheHxlbnwwfHx8fDE3Njk3NjUyNjl8MA&ixlib=rb-4.1.0&q=85",
  dining: "https://images.unsplash.com/photo-1673705988622-18d05a5cf293?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZmluZSUyMGRpbmluZyUyMHBsYXRlJTIwbHV4dXJ5JTIwaG90ZWwlMjBmb29kfGVufDB8fHx8MTc2OTc2NTI4NHww&ixlib=rb-4.1.0&q=85",
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

const AmenitiesPage = () => {
  const amenities = [
    {
      icon: Waves,
      title: "Swimming Pools",
      desc: "Multiple outdoor pools including a competition-size pool and leisure pool with water features",
      features: ["Olympic-size Pool", "Kids Pool", "Poolside Cabanas", "Pool Bar"],
    },
    {
      icon: Sparkles,
      title: "Spa & Wellness",
      desc: "Rejuvenate your senses with our world-class spa treatments and wellness services",
      features: ["Massage Therapy", "Sauna", "Steam Room", "Yoga Sessions"],
    },
    {
      icon: Dumbbell,
      title: "Fitness Center",
      desc: "State-of-the-art equipment and personal training services",
      features: ["Modern Equipment", "Personal Trainers", "24/7 Access", "Group Classes"],
    },
    {
      icon: Utensils,
      title: "Fine Dining",
      desc: "Multiple restaurants offering local and international cuisines",
      features: ["Multi-cuisine Restaurant", "Pool Cafe", "Room Service", "Private Dining"],
    },
    {
      icon: Car,
      title: "Parking & Transport",
      desc: "Complimentary parking and airport transfer services",
      features: ["Free Valet Parking", "Airport Shuttle", "Car Rental", "EV Charging"],
    },
    {
      icon: Users,
      title: "Event Spaces",
      desc: "Versatile venues for weddings, conferences, and celebrations",
      features: ["Banquet Halls", "Conference Rooms", "Outdoor Venues", "AV Equipment"],
    },
  ];

  return (
    <div data-testid="amenities-page">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]" data-testid="amenities-hero">
        <img src={IMAGES.pool} alt="Swimming Pool" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Facilities
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white">
              Pool & Amenities
            </h1>
          </div>
        </div>
      </section>

      {/* Pool Section */}
      <section className="py-24" data-testid="pool-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                Signature Feature
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6">
                World-Class Swimming Pools
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our resort features multiple swimming pools designed for both recreation 
                and competitive swimming. The main pool spans Olympic dimensions, while 
                our leisure pools offer water features and relaxation areas.
              </p>
              <ul className="space-y-3 mb-8">
                {["Olympic-size Competition Pool", "Family-friendly Leisure Pool", "Kids' Splash Zone", "Poolside Cabanas & Sun Loungers", "Pool Bar & Refreshments"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-gray-600">
                    <span className="w-2 h-2 bg-gold rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500">
                Pool Hours: 6:00 AM - 9:00 PM | Towels provided
              </p>
            </AnimatedSection>

            <AnimatedSection>
              <img
                src={IMAGES.pool}
                alt="Main Pool"
                className="w-full h-[500px] object-cover shadow-2xl"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Spa & Dining Grid */}
      <section className="py-24 bg-secondary" data-testid="spa-dining-section">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Indulge
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy">
              Spa & Dining
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="relative group overflow-hidden h-[400px]">
                <img
                  src={IMAGES.spa}
                  alt="Spa"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-playfair text-white mb-2">Spa & Wellness</h3>
                  <p className="text-white/70 text-sm">
                    Relax and rejuvenate with our signature treatments
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative group overflow-hidden h-[400px]">
                <img
                  src={IMAGES.dining}
                  alt="Dining"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-2xl font-playfair text-white mb-2">Fine Dining</h3>
                  <p className="text-white/70 text-sm">
                    Culinary excellence with local and international cuisines
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* All Amenities Grid */}
      <section className="py-24" data-testid="all-amenities-section">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Everything You Need
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy">
              Resort Amenities
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {amenities.map((amenity, index) => (
              <AnimatedSection key={amenity.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 border border-gray-200 hover:border-gold transition-colors duration-300 group"
                  data-testid={`amenity-card-${index}`}
                >
                  <amenity.icon className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-playfair text-navy mb-3">{amenity.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{amenity.desc}</p>
                  <ul className="space-y-2">
                    {amenity.features.map((feature) => (
                      <li key={feature} className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-gold rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="py-20 bg-navy" data-testid="quick-services">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Wifi, label: "Free WiFi" },
              { icon: Car, label: "Free Parking" },
              { icon: Coffee, label: "24/7 Service" },
              { icon: Users, label: "Concierge" },
            ].map((service, index) => (
              <AnimatedSection key={service.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <service.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                  <p className="text-white text-sm">{service.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary" data-testid="amenities-cta">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6">
              Experience Our World-Class Facilities
            </h2>
            <p className="text-gray-600 mb-10">
              Every amenity at Silver Stone Park Resort is designed to enhance your stay.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-navy text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-navy/90 transition-all"
              data-testid="amenities-contact-btn"
            >
              Make an Enquiry
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AmenitiesPage;
