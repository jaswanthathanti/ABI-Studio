import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Check, 
  MessageCircle, 
  ArrowRight, 
  Camera, 
  ShieldCheck, 
  ArrowLeft, 
  Clock, 
  PhoneCall 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();

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
    'Corporate / Gala Event',
  ];

  // Read URL query params if sent by owner e.g. /quote?service=Wedding+Photography&name=Priya
  const initialServiceFromQuery = searchParams.get('service');
  const initialNameFromQuery = searchParams.get('name') || '';

  const [selectedServices, setSelectedServices] = useState<string[]>(() => {
    if (initialServiceFromQuery) {
      const match = serviceOptions.find(
        (s) => s.toLowerCase() === initialServiceFromQuery.toLowerCase()
      );
      return match ? [match] : [initialServiceFromQuery];
    }
    return ['Wedding Photography'];
  });

  const [projectScale, setProjectScale] = useState<string>('Medium (100-300 guests)');
  const [formData, setFormData] = useState({
    name: initialNameFromQuery,
    phone: '',
    email: '',
    eventDate: '',
    venue: '',
    notes: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const WHATSAPP_NUMBER = '919440427791'; // Owner's WhatsApp Number

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleService = (srv: string) => {
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const servicesList =
      selectedServices.length > 0
        ? selectedServices.map((s) => `• ${s}`).join('\n')
        : '• General Inquiry';

    const messageText = `✨ *New Client Booking Inquiry - ABI Studio* ✨

👤 *Client Name:* ${formData.name || 'Not provided'}
📞 *Phone / WhatsApp:* ${formData.phone || 'Not provided'}
${formData.email ? `✉️ *Email:* ${formData.email}\n` : ''}${formData.eventDate ? `📅 *Event Date:* ${formData.eventDate}\n` : ''}${formData.venue ? `📍 *Venue / City:* ${formData.venue}\n` : ''}
🎯 *Services Requested:*
${servicesList}

👥 *Estimated Event Scale:*
${projectScale}

📝 *Event Details / Special Notes:*
${formData.notes || 'No extra notes provided'}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
    setWhatsappLink(url);

    // Open WhatsApp directly
    window.open(url, '_blank');

    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#25D366', '#00A8FF', '#008CFF', '#FFB45C'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="min-h-screen bg-studio-950 text-white selection:bg-electric selection:text-white flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient decorative glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-electric/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-20 border-b border-white/10 bg-studio-950/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
          >
            <div className="p-2 rounded-xl bg-studio-900 border border-white/10 group-hover:border-cyan-400/40 transition-colors">
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
            </div>
            <span className="text-xs sm:text-sm font-semibold tracking-wide">Back to Home</span>
          </Link>

          {/* Logo / Title */}
          <Link to="/" className="text-center">
            <span className="text-sm sm:text-base font-black tracking-widest text-white font-display uppercase">
              LED's &amp; ABI <span className="text-cyan-400">STUDIO</span>
            </span>
          </Link>

          {/* Direct WhatsApp Call/Chat */}
          <a
            href="https://wa.me/919440427791"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-all"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">+91 94404 27791</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* Main Form Content */}
      <main className="relative z-10 flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14">
        {/* Card Form Container */}
        <div className="rounded-3xl bg-studio-900/90 border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-white/10 bg-studio-950/70">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                DIRECT WHATSAPP BOOKING
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
              Request Your Event Quote
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
              Select your required services and enter event details. When you submit, our system instantly opens WhatsApp with all your requirements pre-formatted for <strong className="text-white">+91 94404 27791</strong>.
            </p>
          </div>

          {/* Form or Confirmation */}
          <div className="p-6 sm:p-8">
            {isSubmitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 mb-5 shadow-[0_0_30px_rgba(37,211,102,0.3)] animate-bounce">
                  <Check className="w-8 h-8" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Inquiry Ready to Send!
                </h2>

                <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-md leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name || 'valued client'}</strong>! Your booking inquiry has been prepared for <strong className="text-emerald-400 font-mono">+91 94404 27791</strong>.
                </p>

                <p className="mt-2 text-xs text-slate-400 max-w-md">
                  If WhatsApp didn't open automatically on your device, click the button below:
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#128C7E] to-[#25D366] hover:shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center gap-2 border border-emerald-400/40"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Open WhatsApp Chat</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full text-sm font-semibold text-cyan-300 bg-studio-900 border border-cyan-400/30 hover:border-cyan-400 hover:bg-studio-800 transition-all"
                  >
                    Edit Details / Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Services Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      1. Select Services (Choose one or more)
                    </label>
                    <span className="text-[11px] text-cyan-400 font-mono">
                      {selectedServices.length} Selected
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {serviceOptions.map((srv) => {
                      const active = selectedServices.includes(srv);
                      return (
                        <button
                          type="button"
                          key={srv}
                          onClick={() => toggleService(srv)}
                          className={`p-3.5 rounded-2xl text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between border ${
                            active
                              ? 'bg-cyan-950/90 border-cyan-400 text-white shadow-glow-sm'
                              : 'bg-studio-950/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className={`w-2 h-2 rounded-full ${active ? 'bg-cyan-400 shadow-glow-sm' : 'bg-slate-600'}`} />
                            <span>{srv}</span>
                          </div>
                          {active && <Check className="w-4 h-4 text-cyan-400 shrink-0 ml-2" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Event Scale */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                    2. Estimated Guest Count / Event Scale
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {scaleOptions.map((scale) => (
                      <button
                        type="button"
                        key={scale}
                        onClick={() => setProjectScale(scale)}
                        className={`p-3 rounded-xl text-xs font-medium transition-all text-center border ${
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

                {/* 3. Client & Event Details */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                    3. Contact &amp; Event Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">WhatsApp / Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Event Date (Optional)</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={formData.eventDate}
                          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Venue City / Location (Optional)</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Visakhapatnam / Hyderabad"
                          value={formData.venue}
                          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="e.g. yourname@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Event Notes &amp; Special Requirements (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about the ceremonies (e.g. Muhurtham timings, Sangeet night, LED screen requirements, special requests)..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-studio-950 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Submit on WhatsApp Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-[#128C7E] via-[#25D366] to-[#128C7E] hover:shadow-[0_15px_40px_rgba(37,211,102,0.5)] transition-all duration-300 flex items-center justify-center gap-3 border border-emerald-400/50 active:scale-[0.99]"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Send Quote Request on WhatsApp</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                  <p className="text-center text-[11px] text-slate-400 mt-2.5 font-light">
                    Opens WhatsApp directly pre-filled with your details for quick confirmation from <strong className="text-emerald-400 font-mono">+91 94404 27791</strong>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Studio Trust Features Footer */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center sm:text-left">
          <div className="p-4 rounded-2xl bg-studio-900/60 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-400">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Full Spectrum</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Photography, 4K Films &amp; LED Walls</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-studio-900/60 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Fast WhatsApp Response</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">Instant quotes directly with our team</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-studio-900/60 border border-white/10 flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center shrink-0 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">30+ Years Trust</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">30+ Years of Celebrations Preserved</p>
            </div>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="relative z-10 border-t border-white/10 py-6 text-center text-xs text-slate-500 bg-studio-950">
        <p>© {new Date().getFullYear()} LED's &amp; ABI Studio. WhatsApp Contact: +91 94404 27791</p>
      </footer>
    </div>
  );
};
