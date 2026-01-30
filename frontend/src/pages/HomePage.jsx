import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, MapPin, Award, Users, Sparkles } from "lucide-react";
import BookingModal from "../components/BookingModal";

// Image URLs from design guidelines
const IMAGES = {
  hero: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/87x14u9a_Screenshot%202026-01-30%20134758.png",
  aerial: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/lujrcf3u_Screenshot%202026-01-30%20135506.png",
  room1: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/krd9rdnq_Screenshot%202026-01-30%20134915.png",
  room2: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/5yhcklsi_Screenshot%202026-01-30%20134947.png",
  pool: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/ikclnp1k_Screenshot%202026-01-30%20134846.png",
  wedding: "https://images.unsplash.com/photo-1766393524464-e5eb1b05e4c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMHdlZGRpbmclMjByZWNlcHRpb24lMjBvdXRkb29yJTIwZWxlZ2FudHxlbnwwfHx8fDE3Njk3NjUyNjR8MA&ixlib=rb-4.1.0&q=85",
};

const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const HomePage = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const features = [
    { icon: Award, title: "Iconic Architecture", desc: "Signature blue design on NH-44" },
    { icon: Sparkles, title: "Luxury Rooms", desc: "Premium suites with modern amenities" },
    { icon: Users, title: "Grand Events", desc: "Weddings & corporate celebrations" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Wedding Guest",
      text: "Our destination wedding at Silver Stone Park was absolutely magical. The staff went above and beyond!",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      role: "Corporate Client",
      text: "Perfect venue for our annual conference. World-class facilities and impeccable service.",
      rating: 5,
    },
    {
      name: "Anita Deshmukh",
      role: "Family Vacation",
      text: "The swimming pools are amazing! Kids loved it. Truly a luxury experience in Nagpur.",
      rating: 5,
    },
  ];

  return (
    <div data-testid="home-page">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px]" data-testid="hero-section">
        <div className="absolute inset-0">
          <img
            src={IMAGES.hero}
            alt="Silver Stone Park Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold text-sm md:text-base tracking-[0.4em] uppercase mb-4 font-cormorant">
              Welcome to
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white font-playfair font-semibold mb-4 leading-tight">
              Nagpur's Most Iconic
              <br />
              <span className="text-gold">Luxury Resort</span>
            </h1>
            <p className="text-white/80 text-base md:text-lg font-light mb-8 max-w-xl mx-auto">
              Luxury Stays · Destination Weddings · Corporate Offsites
            </p>

            {/* Rating */}
            <div className="flex items-center justify-center gap-2 mb-10">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="text-white font-semibold">4.8</span>
              <span className="text-white/60">Rating</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-gold text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all duration-300 hover:scale-105"
                data-testid="hero-book-stay-btn"
              >
                Book Your Stay
              </button>
              <Link
                to="/weddings"
                className="bg-transparent border-2 border-white text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-navy transition-all duration-300"
                data-testid="hero-plan-event-btn"
              >
                Plan Your Event
              </Link>
            </div>
          </motion.div>

          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/70 text-sm"
          >
            <MapPin size={16} className="text-gold" />
            <span>NH-44, Khapri, Nagpur</span>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-secondary" data-testid="features-section">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                Why Choose Us
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy">
                An Experience Like No Other
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.title} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="text-center p-8 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 hover-glow"
                >
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-6 border border-gold flex items-center justify-center"
                    whileHover={{ rotate: 360, borderColor: "#0A1628" }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="text-gold" size={28} />
                  </motion.div>
                  <h3 className="text-xl font-playfair text-navy mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24" data-testid="about-preview-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div className="relative">
                <img
                  src={IMAGES.aerial}
                  alt="Resort Aerial View"
                  className="w-full h-[500px] object-cover shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-gold text-white p-6 shadow-lg hidden md:block">
                  <p className="text-4xl font-playfair font-bold">10+</p>
                  <p className="text-xs uppercase tracking-wider">Years of Excellence</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection className="lg:pl-8">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                About The Resort
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6 leading-tight">
                A Landmark of Luxury
                <br />
                in Central India
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Silver Stone Park Resort stands as Nagpur's most iconic destination, 
                featuring signature blue architecture that has become a landmark on NH-44. 
                Our resort offers an unparalleled blend of modern luxury and warm hospitality.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                With world-class swimming pools, premium suites, and expansive event spaces, 
                we cater to discerning travelers, couples planning destination weddings, 
                and corporations seeking exceptional offsite venues.
              </p>
              <Link
                to="/about"
                className="inline-block bg-navy text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-navy/90 transition-all duration-300"
                data-testid="about-learn-more-btn"
              >
                Discover Our Story
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="py-24 bg-navy" data-testid="rooms-preview-section">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                Accommodations
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-white">
                Luxury Rooms & Suites
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="group relative overflow-hidden">
                <img
                  src={IMAGES.room1}
                  alt="Luxury Suite"
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-playfair text-white mb-2">Premium Suite</h3>
                  <p className="text-white/70 text-sm mb-4">Marble flooring · Modern amenities · City view</p>
                  <Link
                    to="/rooms"
                    className="text-gold text-xs uppercase tracking-wider hover:text-white transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="group relative overflow-hidden">
                <img
                  src={IMAGES.room2}
                  alt="Executive Room"
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-2xl font-playfair text-white mb-2">Executive Lounge</h3>
                  <p className="text-white/70 text-sm mb-4">Living area · Business amenities · Premium comfort</p>
                  <Link
                    to="/rooms"
                    className="text-gold text-xs uppercase tracking-wider hover:text-white transition-colors"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link
              to="/rooms"
              className="inline-block bg-gold text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all duration-300"
              data-testid="view-all-rooms-btn"
            >
              View All Rooms
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-24" data-testid="experiences-section">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                Experiences
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy">
                Celebrate Life's Moments
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Weddings */}
            <AnimatedSection>
              <div className="group relative h-[500px] overflow-hidden">
                <img
                  src={IMAGES.wedding}
                  alt="Weddings"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Destination</p>
                  <h3 className="text-3xl font-playfair text-white mb-4">Weddings & Celebrations</h3>
                  <p className="text-white/70 text-sm mb-6 max-w-md">
                    Create unforgettable memories with our grand wedding venues, 
                    expert planning, and world-class hospitality.
                  </p>
                  <Link
                    to="/weddings"
                    className="inline-block bg-gold text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all"
                    data-testid="explore-weddings-btn"
                  >
                    Plan Your Wedding
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            {/* Corporate */}
            <AnimatedSection>
              <div className="group relative h-[500px] overflow-hidden">
                <img
                  src={IMAGES.pool}
                  alt="Corporate Events"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Business</p>
                  <h3 className="text-3xl font-playfair text-white mb-4">Corporate Offsites</h3>
                  <p className="text-white/70 text-sm mb-6 max-w-md">
                    Elevate your corporate events with our premium conference facilities, 
                    team-building activities, and executive amenities.
                  </p>
                  <Link
                    to="/corporate"
                    className="inline-block bg-gold text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all"
                    data-testid="explore-corporate-btn"
                  >
                    Plan Your Event
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary" data-testid="testimonials-section">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                Guest Reviews
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy">
                What Our Guests Say
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <AnimatedSection key={testimonial.name} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.span 
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Star className="w-4 h-4 fill-gold text-gold" />
                      </motion.span>
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <p className="font-semibold text-navy">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy relative overflow-hidden" data-testid="cta-section">
        <div className="absolute inset-0 opacity-20">
          <img src={IMAGES.hero} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-cormorant">
              Ready to Experience Luxury?
            </p>
            <h2 className="text-3xl md:text-5xl font-playfair text-white mb-6 leading-tight">
              Book Your Unforgettable
              <br />
              Stay Today
            </h2>
            <p className="text-white/70 mb-10 max-w-xl mx-auto">
              Whether it's a relaxing getaway, a grand celebration, or a productive offsite, 
              Silver Stone Park Resort promises an experience beyond expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-gold text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all duration-300 hover:scale-105"
                data-testid="cta-book-now-btn"
              >
                Book Your Stay
              </button>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-navy transition-all duration-300"
                data-testid="cta-contact-btn"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default HomePage;
