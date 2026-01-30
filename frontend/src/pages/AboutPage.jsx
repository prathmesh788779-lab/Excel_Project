import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Award, Users, Building, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const IMAGES = {
  hero: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/87x14u9a_Screenshot%202026-01-30%20134758.png",
  aerial: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/lujrcf3u_Screenshot%202026-01-30%20135506.png",
  pool: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/ikclnp1k_Screenshot%202026-01-30%20134846.png",
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

const AboutPage = () => {
  const stats = [
    { icon: Building, value: "50+", label: "Luxury Rooms" },
    { icon: Users, value: "1000+", label: "Happy Guests" },
    { icon: Award, value: "4.8★", label: "Rating" },
    { icon: Clock, value: "10+", label: "Years" },
  ];

  return (
    <div data-testid="about-page">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]" data-testid="about-hero">
        <img src={IMAGES.aerial} alt="Resort" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white">
              About Silver Stone Park
            </h1>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24" data-testid="about-story">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                The Legacy
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6">
                A Vision of Luxury
                <br />
                on NH-44
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Silver Stone Park Resort was born from a vision to create Central India's 
                  most iconic hospitality destination. Our signature blue architecture has 
                  become a landmark on the bustling NH-44, welcoming travelers from across 
                  the nation.
                </p>
                <p>
                  Every element of our resort has been meticulously designed to offer an 
                  unparalleled blend of modern luxury and traditional Indian hospitality. 
                  From our sprawling swimming pools to our elegantly appointed suites, 
                  every corner tells a story of excellence.
                </p>
                <p>
                  We take pride in hosting life's most cherished moments – from intimate 
                  family gatherings to grand destination weddings and prestigious 
                  corporate events. Our dedicated team ensures every guest experiences 
                  the warmth and grandeur that defines Silver Stone Park.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection className="relative">
              <img
                src={IMAGES.hero}
                alt="Resort Architecture"
                className="w-full h-[500px] object-cover shadow-2xl"
              />
              <div className="absolute -bottom-8 -left-8 bg-navy text-white p-8 shadow-xl hidden md:block">
                <p className="text-gold text-xs tracking-[0.3em] uppercase mb-2">Established</p>
                <p className="text-4xl font-playfair">2015</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-navy" data-testid="about-stats">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <AnimatedSection key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                  <p className="text-4xl font-playfair text-white mb-2">{stat.value}</p>
                  <p className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-24 bg-secondary" data-testid="about-architecture">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <img
                src={IMAGES.pool}
                alt="Swimming Pool"
                className="w-full h-[400px] object-cover shadow-2xl"
              />
            </AnimatedSection>

            <AnimatedSection className="order-1 lg:order-2">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                Design Philosophy
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6">
                Iconic Blue Architecture
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Our distinctive blue facade is more than just aesthetics – it represents 
                the depth of our commitment to excellence. The modern glass and concrete 
                structure harmonizes with lush landscaping to create a resort that's both 
                visually stunning and environmentally conscious.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                The architectural design maximizes natural light while offering panoramic 
                views of the surrounding greenery. Every suite and public space has been 
                thoughtfully positioned to provide guests with the perfect balance of 
                privacy and connection with nature.
              </p>
              <Link
                to="/gallery"
                className="inline-block bg-navy text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-navy/90 transition-all"
                data-testid="view-gallery-btn"
              >
                View Gallery
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24" data-testid="about-values">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Our Promise
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy">
              The Silver Stone Experience
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Uncompromising Luxury",
                desc: "Every detail, from the marble flooring to the finest linens, is chosen to deliver an exceptional experience.",
              },
              {
                title: "Warm Hospitality",
                desc: "Our staff is trained to anticipate your needs and make you feel truly at home.",
              },
              {
                title: "Memorable Moments",
                desc: "Whether celebrating a milestone or seeking relaxation, we create memories that last a lifetime.",
              },
            ].map((value, index) => (
              <AnimatedSection key={value.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 border border-gray-200 hover:border-gold transition-colors duration-300"
                >
                  <h3 className="text-xl font-playfair text-navy mb-4">{value.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy" data-testid="about-cta">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-playfair text-white mb-6">
              Experience the Difference
            </h2>
            <p className="text-white/70 mb-10">
              Discover why Silver Stone Park Resort is Nagpur's premier luxury destination.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gold text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all"
              data-testid="about-contact-btn"
            >
              Get in Touch
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
