import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const IMAGES = {
  hero: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/87x14u9a_Screenshot%202026-01-30%20134758.png",
  aerial: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/lujrcf3u_Screenshot%202026-01-30%20135506.png",
  room1: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/krd9rdnq_Screenshot%202026-01-30%20134915.png",
  room2: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/5yhcklsi_Screenshot%202026-01-30%20134947.png",
  pool: "https://customer-assets.emergentagent.com/job_90af5f01-ade8-433a-b64b-3c2a14dec63c/artifacts/ikclnp1k_Screenshot%202026-01-30%20134846.png",
  wedding: "https://images.unsplash.com/photo-1766393524464-e5eb1b05e4c8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbCUyMHdlZGRpbmclMjByZWNlcHRpb24lMjBvdXRkb29yJTIwZWxlZ2FudHxlbnwwfHx8fDE3Njk3NjUyNjR8MA&ixlib=rb-4.1.0&q=85",
  spa: "https://images.unsplash.com/photo-1758973470049-4514352776eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbCUyMHNwYSUyMG1hc3NhZ2UlMjByZWxheHxlbnwwfHx8fDE3Njk3NjUyNjl8MA&ixlib=rb-4.1.0&q=85",
  dining: "https://images.unsplash.com/photo-1673705988622-18d05a5cf293?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwZmluZSUyMGRpbmluZyUyMHBsYXRlJTIwbHV4dXJ5JTIwaG90ZWwlMjBmb29kfGVufDB8fHx8MTc2OTc2NTI4NHww&ixlib=rb-4.1.0&q=85",
};

const galleryItems = [
  { src: IMAGES.hero, category: "exterior", title: "Main Building" },
  { src: IMAGES.aerial, category: "exterior", title: "Aerial View" },
  { src: IMAGES.pool, category: "pool", title: "Swimming Pool" },
  { src: IMAGES.room1, category: "rooms", title: "Luxury Suite" },
  { src: IMAGES.room2, category: "rooms", title: "Executive Lounge" },
  { src: IMAGES.wedding, category: "events", title: "Wedding Setup" },
  { src: IMAGES.spa, category: "amenities", title: "Spa & Wellness" },
  { src: IMAGES.dining, category: "dining", title: "Fine Dining" },
];

const categories = [
  { id: "all", label: "All" },
  { id: "exterior", label: "Exterior" },
  { id: "rooms", label: "Rooms" },
  { id: "pool", label: "Pool" },
  { id: "amenities", label: "Amenities" },
  { id: "events", label: "Events" },
  { id: "dining", label: "Dining" },
];

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

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <div data-testid="gallery-page">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px]" data-testid="gallery-hero">
        <img src={IMAGES.hero} alt="Gallery" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Visual Tour
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white">
              Gallery
            </h1>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-secondary sticky top-[72px] z-30" data-testid="gallery-filters">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 text-xs uppercase tracking-wider font-semibold transition-all ${
                  activeCategory === category.id
                    ? "bg-navy text-white"
                    : "bg-transparent text-navy hover:bg-navy/10"
                }`}
                data-testid={`filter-${category.id}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16" data-testid="gallery-grid">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -8 }}
                  className="group relative overflow-hidden cursor-pointer aspect-[4/3] shadow-lg hover:shadow-2xl"
                  onClick={() => openLightbox(index)}
                  data-testid={`gallery-item-${index}`}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/60 transition-all duration-300 pointer-events-none" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="text-center">
                      <p className="text-white font-playfair text-xl">{item.title}</p>
                      <p className="text-gold text-xs uppercase tracking-wider mt-1">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            data-testid="gallery-lightbox"
          >
            <div
              className="absolute inset-0 bg-navy/95 backdrop-blur-md"
              onClick={closeLightbox}
            />

            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 text-white hover:text-gold transition-colors z-10"
              data-testid="close-lightbox"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={goPrev}
              className="absolute left-6 p-3 text-white hover:text-gold transition-colors z-10"
              data-testid="lightbox-prev"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={goNext}
              className="absolute right-6 p-3 text-white hover:text-gold transition-colors z-10"
              data-testid="lightbox-next"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl max-h-[80vh] z-10"
            >
              <img
                src={filteredItems[currentIndex]?.src}
                alt={filteredItems[currentIndex]?.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy/80 to-transparent">
                <p className="text-white font-playfair text-xl text-center">
                  {filteredItems[currentIndex]?.title}
                </p>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              {currentIndex + 1} / {filteredItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-24 bg-secondary" data-testid="gallery-cta">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-6">
              Experience It In Person
            </h2>
            <p className="text-gray-600 mb-10">
              Pictures can only capture so much. Visit us to experience the true luxury of Silver Stone Park Resort.
            </p>
            <a
              href="/contact"
              className="inline-block bg-navy text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-navy/90 transition-all"
              data-testid="gallery-contact-btn"
            >
              Plan Your Visit
            </a>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
