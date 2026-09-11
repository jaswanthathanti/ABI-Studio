import React, { useState } from 'react';

interface HubPoint {
  id: string;
  name: string;
  country: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  isFeatured?: boolean;
}

const hubs: HubPoint[] = [
  { id: 'la', name: 'Los Angeles', country: 'United States', x: 18, y: 38 },
  { id: 'ny', name: 'New York', country: 'United States', x: 28, y: 34 },
  { id: 'london', name: 'London', country: 'United Kingdom', x: 48, y: 26 },
  { id: 'dubai', name: 'Dubai', country: 'UAE', x: 62, y: 44, isFeatured: true },
  { id: 'mumbai', name: 'Mumbai', country: 'India', x: 68, y: 48 },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', x: 78, y: 58 },
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', x: 86, y: 36 },
  { id: 'sydney', name: 'Sydney', country: 'Australia', x: 88, y: 78 },
];

export const GlobalMap: React.FC = () => {
  const [activeHub, setActiveHub] = useState<HubPoint | null>(hubs[3]); // Dubai by default

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6 px-4 pb-4 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[220px] bg-electric/15 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* SVG Futuristic Particle Dot Map */}
      <div className="relative aspect-[21/9] w-full max-h-[300px] sm:max-h-[380px] flex items-center justify-center">
        <svg
          viewBox="0 0 1000 480"
          className="w-full h-full opacity-60 transition-opacity duration-500 hover:opacity-85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#00A8FF" fillOpacity="0.25" />
            </pattern>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00A8FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#008CFF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Continents Outline Path (Subtle Stylized Tech Grid) */}
          <g fill="#00A8FF" fillOpacity="0.35" className="transition-all duration-700">
            {/* North America */}
            <path d="M120,120 Q180,90 260,110 T320,170 T290,240 T220,230 T160,190 Z" />
            <path d="M160,80 Q220,60 280,70 T310,110 T250,110 Z" />
            
            {/* South America */}
            <path d="M260,260 Q320,270 340,320 T310,410 T260,400 T240,320 Z" />

            {/* Europe */}
            <path d="M460,110 Q520,95 560,120 T540,180 T470,180 T450,140 Z" />

            {/* Africa */}
            <path d="M470,200 Q560,190 580,260 T540,360 T480,360 T450,260 Z" />

            {/* Asia */}
            <path d="M570,100 Q720,80 840,120 T880,220 T780,270 T660,240 T580,180 Z" />
            <path d="M830,160 Q870,160 880,200 T840,220 Z" />

            {/* Australia */}
            <path d="M780,330 Q860,320 890,360 T850,420 T780,410 T760,360 Z" />
          </g>

          {/* Stylized Connection Arc lines */}
          <path
            d="M280,150 Q480,50 620,210"
            stroke="#00A8FF"
            strokeWidth="1"
            strokeDasharray="4 6"
            strokeOpacity="0.4"
          />
          <path
            d="M620,210 Q740,150 860,170"
            stroke="#00A8FF"
            strokeWidth="1"
            strokeDasharray="4 6"
            strokeOpacity="0.4"
          />
          <path
            d="M620,210 Q700,260 780,280"
            stroke="#00A8FF"
            strokeWidth="1"
            strokeDasharray="4 6"
            strokeOpacity="0.3"
          />

          {/* Global Location Hub Points */}
          {hubs.map((hub) => {
            const cx = (hub.x / 100) * 1000;
            const cy = (hub.y / 100) * 480;
            const isSelected = activeHub?.id === hub.id;

            return (
              <g
                key={hub.id}
                className="cursor-pointer group"
                onClick={() => setActiveHub(hub)}
              >
                {/* Outer pulsing ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 14 : 9}
                  fill="none"
                  stroke="#00A8FF"
                  strokeWidth="1.5"
                  className="animate-ping origin-center opacity-75"
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />

                {/* Subtle outer glow */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 8 : 5}
                  fill="#00A8FF"
                  fillOpacity={isSelected ? 0.8 : 0.4}
                />

                {/* Center Core dot */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 3.5 : 2.5}
                  fill="#FFFFFF"
                  className="shadow-glow-sm"
                />
              </g>
            );
          })}
        </svg>

        {/* Center Floating Glass Tooltip Banner (Matching Reference Image) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-studio-950/80 border border-cyan-500/40 backdrop-blur-md shadow-glow-sm transition-all duration-300 hover:border-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <div className="text-center">
              <p className="text-xs font-semibold tracking-wide text-white flex items-center gap-1.5">
                <span>Creating Visual Impact</span>
                <span className="text-cyan-400 font-bold">Across 60+ Countries</span>
              </p>
              {activeHub && (
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Active Hub: <span className="text-slate-200 font-medium">{activeHub.name}, {activeHub.country}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
