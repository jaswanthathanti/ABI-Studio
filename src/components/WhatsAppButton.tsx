import React from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '919440427791',
  defaultMessage = "Hi ABI Studio! I'd like to inquire about wedding photography, films, and LED screen packages.",
}) => {
  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex items-center group">
      {/* Floating Hover Tooltip */}
      <div className="hidden sm:flex items-center mr-3 pointer-events-none opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <div className="px-3.5 py-1.5 rounded-full bg-studio-900/95 border border-[#25D366]/40 text-white text-xs font-semibold backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Chat with us on WhatsApp</span>
        </div>
      </div>

      {/* Circular Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ABI Studio on WhatsApp"
        className="group relative w-13 h-13 sm:w-15 sm:h-15 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] text-white flex items-center justify-center shadow-[0_10px_30px_-5px_rgba(37,211,102,0.5),0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_15px_40px_-5px_rgba(37,211,102,0.7),0_0_30px_rgba(37,211,102,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/25 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50"
      >
        {/* Radar ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping pointer-events-none opacity-75" />

        {/* Ambient background glow */}
        <span className="absolute -inset-1 rounded-full bg-gradient-to-tr from-[#128C7E] to-[#25D366] opacity-30 blur-md group-hover:opacity-60 transition-opacity pointer-events-none" />

        {/* Official WhatsApp SVG Icon */}
        <svg
          viewBox="0 0 24 24"
          className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10 transition-transform duration-300 group-hover:rotate-6"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.952 1.18-.176.2-.351.226-.652.075-.3-.15-1.27-.468-2.42-1.493-.894-.798-1.498-1.784-1.674-2.085-.175-.3-.019-.462.131-.612.136-.135.301-.351.452-.527.15-.175.2-.301.301-.501.1-.2.05-.376-.025-.526-.076-.15-.677-1.632-.928-2.234-.244-.587-.492-.507-.677-.516-.175-.008-.376-.01-.577-.01-.2 0-.527.075-.802.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.078 2.91 1.229 3.111.15.2 2.122 3.24 5.14 4.544.718.31 1.278.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.03-1.429.252-.702.252-1.304.176-1.43-.075-.125-.276-.2-.577-.35z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.101 1.519 5.828L.15 23.473l5.834-1.34A11.936 11.936 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.848 0-3.578-.503-5.068-1.378l-.363-.213-3.46.795.83-3.373-.233-.377A9.78 9.78 0 0 1 2.182 12c0-5.413 4.405-9.818 9.818-9.818 5.413 0 9.818 4.405 9.818 9.818 0 5.413-4.405 9.818-9.818 9.818z" />
        </svg>

        {/* Online green indicator dot */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-studio-950 rounded-full z-20 shadow-sm" />
      </a>
    </div>
  );
};
