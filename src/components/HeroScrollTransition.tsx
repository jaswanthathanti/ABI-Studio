import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Hero } from './Hero';
import { TrustSection } from './TrustSection';

interface HeroScrollTransitionProps {
  onExploreClick: () => void;
  onShowreelClick: () => void;
}

export const HeroScrollTransition: React.FC<HeroScrollTransitionProps> = ({
  onExploreClick,
  onShowreelClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progression through the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Hero transform values (scale down, darken, subtle blur)
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.94]);
  const heroBrightness = useTransform(scrollYProgress, [0, 0.75], [1, 0.62]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.75], [0, 3]);

  // Dark Trust Card Panel upward slide:
  // Starts near bottom (90%), sliding up over hero to 0%
  const panelY = useTransform(scrollYProgress, [0, 0.75], ['90%', '0%']);

  return (
    <div ref={containerRef} className="relative w-full h-[220vh] bg-studio-950">
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Layer 1: The Hero Behind */}
        <motion.div
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            scale: heroScale,
            filter: useTransform(
              [heroBrightness, heroBlur],
              ([bright, blur]) => `brightness(${bright}) blur(${blur}px)`
            ),
          }}
        >
          <Hero onExploreClick={onExploreClick} onShowreelClick={onShowreelClick} />
        </motion.div>

        {/* Anchor for smooth scroll jump */}
        <div id="trust-anchor" className="absolute top-[35%] pointer-events-none" />

        {/* Layer 2: The Sliding Dark Glass Trust Panel (Apple-Style Overlay) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 top-0 will-change-transform z-30 flex flex-col justify-start overflow-y-auto hide-scrollbar"
          style={{
            y: panelY,
          }}
        >
          {/* The Physical Sliding Card Container */}
          <div className="w-full min-h-screen rounded-t-[44px] sm:rounded-t-[60px] bg-studio-900/96 backdrop-blur-3xl border-t border-cyan-400/40 shadow-[0_-25px_60px_-15px_rgba(0,168,255,0.35)] relative overflow-hidden flex flex-col justify-between">
            {/* Top Cyan Rim Glow Line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
            
            {/* Ambient Radial Lighting within Card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-cyan-500/10 blur-3xl pointer-events-none -z-0" />

            {/* Content of the Trust Section */}
            <div className="relative z-10 w-full">
              <TrustSection />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
