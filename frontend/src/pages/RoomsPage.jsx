import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Wifi, Car, Coffee, Tv, Bath, Wind, Utensils, Users } from "lucide-react";
import BookingModal from "../components/BookingModal";

const IMAGES = {
  hero: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/87x14u9a_Screenshot%202026-01-30%20134758.png",
  room1: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/krd9rdnq_Screenshot%202026-01-30%20134915.png",
  room2: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/5yhcklsi_Screenshot%202026-01-30%20134947.png",
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

const RoomsPage = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const rooms = [
    {
      name: "Deluxe Room",
      image: IMAGES.room1,
      description: "Elegant comfort with modern amenities and city views",
      size: "350 sq ft",
      guests: 2,
      amenities: ["King Bed", "City View", "Rain Shower", "Work Desk"],
      price: "₹6,500",
    },
    {
      name: "Premium Suite",
      image: IMAGES.room1,
      description: "Spacious luxury with marble flooring and premium furnishings",
      size: "500 sq ft",
      guests: 3,
      amenities: ["King Bed", "Living Area", "Bathtub", "Mini Bar"],
      price: "₹9,500",
    },
    {
      name: "Executive Suite",
      image: IMAGES.room2,
      description: "Ultimate luxury with separate living space and executive amenities",
      size: "700 sq ft",
      guests: 4,
      amenities: ["King Bed", "Living Room", "Dining Area", "Jacuzzi"],
      price: "₹14,500",
    },
    {
      name: "Presidential Suite",
      image: IMAGES.room2,
      description: "The pinnacle of luxury with panoramic views and butler service",
      size: "1200 sq ft",
      guests: 4,
      amenities: ["Master Bedroom", "Private Pool", "Butler Service", "Personal Chef"],
      price: "₹25,000",
    },
  ];

  const allAmenities = [
    { icon: Wifi, name: "High-Speed WiFi" },
    { icon: Car, name: "Free Parking" },
    { icon: Coffee, name: "Coffee Maker" },
    { icon: Tv, name: "Smart TV" },
    { icon: Bath, name: "Premium Bath" },
    { icon: Wind, name: "Climate Control" },
    { icon: Utensils, name: "Room Service" },
    { icon: Users, name: "Concierge" },
  ];

  return (
    <div data-testid="rooms-page">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]" data-testid="rooms-hero">
        <img src={IMAGES.room1} alt="Luxury Room" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Accommodations
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white">
              Rooms & Suites
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-secondary" data-testid="rooms-intro">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Luxury Living
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6">
              Experience Unparalleled Comfort
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Each room at Silver Stone Park Resort is a sanctuary of luxury, featuring 
              contemporary design, premium amenities, and thoughtful touches that ensure 
              your stay is nothing short of exceptional.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Rooms Grid */}
      <section className="py-24" data-testid="rooms-grid">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {rooms.map((room, index) => (
              <AnimatedSection key={room.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white shadow-lg hover:shadow-2xl transition-shadow duration-500"
                  data-testid={`room-card-${index}`}
                >
                  <div className="relative overflow-hidden h-[300px]">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-navy text-white px-4 py-2">
                      <span className="text-gold font-playfair">{room.price}</span>
                      <span className="text-white/60 text-xs"> /night</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <span>{room.size}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Users size={14} /> Up to {room.guests} guests
                      </span>
                    </div>
                    <h3 className="text-2xl font-playfair text-navy mb-3">{room.name}</h3>
                    <p className="text-gray-600 mb-6">{room.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.amenities.map((amenity) => (
                        <span
                          key={amenity}
                          className="text-xs bg-secondary text-navy px-3 py-1"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setIsBookingOpen(true)}
                      className="w-full bg-navy text-white py-4 text-xs uppercase tracking-widest font-semibold hover:bg-navy/90 transition-all"
                      data-testid={`book-room-${index}-btn`}
                    >
                      Book This Room
                    </button>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* All Amenities */}
      <section className="py-24 bg-navy" data-testid="rooms-amenities">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Included
            </p>
            <h2 className="text-3xl md:text-4xl font-playfair text-white">
              Room Amenities
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {allAmenities.map((amenity, index) => (
              <AnimatedSection key={amenity.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-center p-6 border border-white/10 hover:border-gold/50 transition-colors"
                >
                  <amenity.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                  <p className="text-white text-sm">{amenity.name}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary" data-testid="rooms-cta">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-gray-600 mb-10">
              Book your stay now and discover the comfort of Silver Stone Park Resort.
            </p>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="inline-block bg-gold text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-gold/90 transition-all"
              data-testid="rooms-cta-book-btn"
            >
              Check Availability
            </button>
          </AnimatedSection>
        </div>
      </section>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </div>
  );
};

export default RoomsPage;
