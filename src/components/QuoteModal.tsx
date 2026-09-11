import React, { useState, useEffect } from 'react';
import { X, Check, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialService,
}) => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [projectScale, setProjectScale] = useState<string>('Medium (100-300 guests)');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const WHATSAPP_NUMBER = '919440427791'; // Owner's WhatsApp Number

  // Reset to form fields every time the modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setFormData((prev) => ({ ...prev, notes: '' }));
      if (initialService) {
        setSelectedServices([initialService]);
      }
    }
  }, [isOpen, initialService]);

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setFormData((prev) => ({ ...prev, notes: '' }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const serviceOptions = [
    'Wedding Photography',
    'Wedding Film & Videography',
    'Pre-Wedding Shoot',
    'LED Screen Rental',
    'Photo Album & Prints',
    'Event Coverage',
  ];

  const scaleOptions = [
    'Intimate (up to 100 guests)',
    'Medium (100-300 guests)',
    'Grand (300+ guests)',
    'Corporate Event',
  ];

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      setSelectedServices(selectedServices.filter((s) => s !== srv));
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Format professional WhatsApp message for the business owner
    const servicesList =
      selectedServices.length > 0
        ? selectedServices.map((s) => `• ${s}`).join('\n')
        : '• General Inquiry';

    const messageText = `✨ *New Booking Inquiry - ABI Studio* ✨

👤 *Client Name:* ${formData.name || 'Not provided'}
📞 *Phone Number:* ${formData.phone || 'Not provided'}
✉️ *Email:* ${formData.email || 'Not provided'}

🎯 *Services Requested:*
${servicesList}

👥 *Event Scale / Size:*
${projectScale}

📝 *Event Details / Venue / Date:*
${formData.notes || 'No additional notes provided'}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    setWhatsappLink(url);

    // Open WhatsApp in a new tab
    window.open(url, '_blank');

    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#25D366', '#00A8FF', '#008CFF', '#FFB45C'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-studio-950/90 backdrop-blur-2xl animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-2xl max-h-[90vh] rounded-3xl bg-studio-900 border border-cyan-500/30 shadow-[0_0_60px_-15px_rgba(0,168,255,0.35)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-white/10 flex items-center justify-between bg-studio-950/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase">
                DIRECT WHATSAPP BOOKING
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Request a Quote
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2.5 rounded-full bg-studio-800 text-slate-400 hover:text-white hover:bg-studio-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[70vh]">
          {isSubmitted ? (
            <div className="py-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 mb-5 shadow-[0_0_30px_rgba(37,211,102,0.3)] animate-bounce">
                <Check className="w-8 h-8" />
              </div>

              <h4 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Inquiry Sent to WhatsApp!
              </h4>

              <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
                Thank you, <strong className="text-white">{formData.name || 'there'}</strong>! Your inquiry details have been forwarded directly to our team at{' '}
                <strong className="text-emerald-400 font-mono">+91 94404 27791</strong> on WhatsApp.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#128C7E] to-[#25D366] hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Chat</span>
                </a>

                <button
                  onClick={handleResetForm}
                  className="w-full sm:w-auto px-5 py-3 rounded-full text-sm font-semibold text-cyan-300 bg-studio-900 border border-cyan-400/30 hover:border-cyan-400 hover:bg-studio-800 transition-all"
                >
                  Send Another Inquiry
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-6 py-3 rounded-full text-sm font-semibold text-slate-300 bg-studio-800 hover:bg-studio-700 hover:text-white transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Select Services */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  1. What do you need?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {serviceOptions.map((srv) => {
                    const active = selectedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`p-3 rounded-xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                          active
                            ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-glow-sm'
                            : 'bg-studio-950/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span>{srv}</span>
                        {active && <Check className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Event Scale */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  2. Event Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {scaleOptions.map((scale) => (
                    <button
                      type="button"
                      key={scale}
                      onClick={() => setProjectScale(scale)}
                      className={`p-2.5 rounded-xl text-xs font-medium transition-all text-center border ${
                        projectScale === scale
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-glow-sm'
                          : 'bg-studio-950/60 border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  3. Your Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Phone / WhatsApp Number *"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email Address (Optional)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your event — date, venue location, special rituals or requirements..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit on WhatsApp Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-[#128C7E] to-[#25D366] hover:from-[#0f7a6e] hover:to-[#22bf5b] shadow-[0_10px_25px_-5px_rgba(37,211,102,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(37,211,102,0.6)] transition-all duration-300 flex items-center justify-center gap-2.5 border border-emerald-400/40 active:scale-[0.99]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Send Quote Request on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
                <p className="text-center text-[11px] text-slate-400 mt-2 font-light">
                  Opens WhatsApp directly with your event details pre-filled for +91 94404 27791
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
