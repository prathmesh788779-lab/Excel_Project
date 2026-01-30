import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const IMAGES = {
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

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post(`${BACKEND_URL}/api/enquiries/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "General Inquiry",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      lines: ["NH-44, Khapri", "Nagpur, Maharashtra 441108"],
    },
    {
      icon: Phone,
      title: "Phone",
      lines: ["+91 6282427265"],
      link: "tel:+916282427265",
    },
    {
      icon: Mail,
      title: "Email",
      lines: ["info@silverstonepark.com"],
      link: "mailto:info@silverstonepark.com",
    },
    {
      icon: Clock,
      title: "Hours",
      lines: ["Reception: 24/7", "Dining: 7 AM - 11 PM"],
    },
  ];

  return (
    <div data-testid="contact-page">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[350px]" data-testid="contact-hero">
        <img src={IMAGES.hero} alt="Contact" className="w-full h-full object-cover" />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-white">
              Contact Us
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-secondary" data-testid="contact-info">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <AnimatedSection key={info.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 text-center shadow-lg"
                >
                  <info.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                  <h3 className="font-playfair text-navy text-lg mb-3">{info.title}</h3>
                  {info.lines.map((line, i) => (
                    <p key={i} className="text-gray-600 text-sm">
                      {line}
                    </p>
                  ))}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-24" data-testid="contact-form-section">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <AnimatedSection>
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-cormorant">
                Send a Message
              </p>
              <h2 className="text-3xl md:text-4xl font-playfair text-navy mb-8">
                We'd Love to Hear
                <br />
                From You
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors"
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors"
                      data-testid="contact-phone-input"
                    />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                      Subject *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors bg-transparent"
                      data-testid="contact-subject-select"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Reservations">Reservations</option>
                      <option value="Weddings & Events">Weddings & Events</option>
                      <option value="Corporate Bookings">Corporate Bookings</option>
                      <option value="Feedback">Feedback</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border-b border-gray-300 py-3 focus:border-gold focus:outline-none transition-colors resize-none"
                    placeholder="How can we help you?"
                    data-testid="contact-message-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-navy text-white px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-navy/90 transition-all disabled:opacity-50 flex items-center gap-3"
                  data-testid="contact-submit-btn"
                >
                  <Send size={16} />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection>
              <div className="h-full min-h-[400px] bg-gray-200 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.3984929427424!2d79.04611837503694!3d21.095827980553744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c0f7e6e7f3f7%3A0x1234567890abcdef!2sNH-44%2C%20Khapri%2C%20Nagpur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Silver Stone Park Resort Location"
                  data-testid="contact-map"
                />
                <div className="absolute bottom-6 left-6 bg-white p-4 shadow-lg">
                  <p className="font-playfair text-navy text-lg mb-1">Silver Stone Park Resort</p>
                  <p className="text-gray-600 text-sm">NH-44, Khapri, Nagpur</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="py-16 bg-navy" data-testid="contact-directions">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-playfair text-white mb-4">How to Reach Us</h2>
            <p className="text-white/70">Conveniently located on NH-44, minutes from Nagpur</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "From Airport",
                desc: "15 km from Dr. Babasaheb Ambedkar International Airport",
                time: "~25 mins",
              },
              {
                title: "From Railway Station",
                desc: "12 km from Nagpur Junction Railway Station",
                time: "~20 mins",
              },
              {
                title: "From City Center",
                desc: "10 km from Sitabuldi, Nagpur's main commercial area",
                time: "~15 mins",
              },
            ].map((direction, index) => (
              <AnimatedSection key={direction.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 border border-white/10"
                >
                  <h3 className="text-gold font-playfair text-xl mb-2">{direction.title}</h3>
                  <p className="text-white/70 text-sm mb-2">{direction.desc}</p>
                  <p className="text-white font-semibold">{direction.time}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
