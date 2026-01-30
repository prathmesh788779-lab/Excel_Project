import { useState } from "react";
import { X, Calendar, Users, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";

const BookingModal = ({ isOpen, onClose }) => {
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);

  const otaLinks = [
    {
      name: "Expedia",
      url: "https://www.expedia.co.in/Nagpur-Hotels-Silver-Stone-Park-Resort.h107797384.Hotel-Information",
      color: "bg-[#00355f]",
    },
    {
      name: "Agoda",
      url: "https://www.agoda.com/silver-stone-park-resort/hotel/khapri-in.html",
      color: "bg-[#5542f6]",
    },
    {
      name: "BedroomVillas",
      url: "https://www.bedroomvillas.com/property/silver-stone-park-resort/EP-107797384",
      color: "bg-[#2d3748]",
    },
  ];

  const handleBooking = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          data-testid="booking-modal"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-navy/90 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-lg bg-white shadow-2xl"
            data-testid="booking-modal-content"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 transition-colors z-10"
              data-testid="close-booking-modal"
            >
              <X size={24} className="text-navy" />
            </button>

            {/* Header */}
            <div className="bg-navy text-white px-8 py-6">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-1 font-cormorant">
                Reserve Your Stay
              </p>
              <h2 className="text-2xl font-playfair">Book Your Experience</h2>
            </div>

            {/* Form */}
            <div className="p-8">
              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block font-manrope">
                    Check In
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full flex items-center gap-2 border border-gray-200 px-4 py-3 hover:border-gold transition-colors text-left"
                        data-testid="checkin-picker"
                      >
                        <Calendar size={18} className="text-gold" />
                        <span className="text-sm">
                          {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block font-manrope">
                    Check Out
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="w-full flex items-center gap-2 border border-gray-200 px-4 py-3 hover:border-gold transition-colors text-left"
                        data-testid="checkout-picker"
                      >
                        <Calendar size={18} className="text-gold" />
                        <span className="text-sm">
                          {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                        </span>
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < (checkIn || new Date())}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Guests */}
              <div className="mb-8">
                <label className="text-xs uppercase tracking-wider text-gray-500 mb-2 block font-manrope">
                  Guests
                </label>
                <div className="flex items-center gap-4 border border-gray-200 px-4 py-3">
                  <Users size={18} className="text-gold" />
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-gold transition-colors"
                    data-testid="decrease-guests"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(10, guests + 1))}
                    className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:border-gold transition-colors"
                    data-testid="increase-guests"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400 uppercase tracking-wider">Book via</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* OTA Buttons */}
              <div className="space-y-3">
                {otaLinks.map((ota) => (
                  <button
                    key={ota.name}
                    onClick={() => handleBooking(ota.url)}
                    className={`w-full ${ota.color} text-white py-4 flex items-center justify-center gap-3 hover:opacity-90 transition-opacity group`}
                    data-testid={`book-via-${ota.name.toLowerCase()}`}
                  >
                    <span className="text-sm font-semibold tracking-wide uppercase">
                      Book via {ota.name}
                    </span>
                    <ExternalLink size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>

              {/* Note */}
              <p className="text-center text-xs text-gray-400 mt-6">
                You will be redirected to our trusted booking partners
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
