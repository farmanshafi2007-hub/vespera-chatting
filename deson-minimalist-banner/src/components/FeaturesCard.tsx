import React from 'react';
import { BANNER_CONTENT } from '../utils/bannerData';

export const FeaturesCard: React.FC = () => {
  const { kicker, titleLine1, titleLine2, description } = BANNER_CONTENT.featureCard;

  return (
    <aside
      aria-label="Features"
      className="relative w-full max-w-[390px] rounded-[28px] border border-white/25 bg-gradient-to-b from-white/[0.08] via-white/[0.05] to-white/[0.03] backdrop-blur-md text-white overflow-hidden"
    >
      {/* Subtle top-right dot matrix pattern from reference image */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-8 right-4 grid grid-cols-5 gap-x-2.5 gap-y-2.5 opacity-25"
      >
        {Array.from({ length: 35 }).map((_, idx) => (
          <span key={idx} className="block w-[2.5px] h-[2.5px] rounded-full bg-white" />
        ))}
      </div>

      {/* Top Compartment: Kicker & Title */}
      <div className="px-10 pt-10 pb-9">
        <p className="text-[14px] font-normal uppercase tracking-[0.18em] text-white mb-6">
          {kicker}
        </p>
        <h2 className="text-[46px] sm:text-[48px] font-normal leading-[1.12] tracking-[-0.015em] text-white">
          <span className="block">{titleLine1}</span>
          <span className="block">{titleLine2}</span>
        </h2>
      </div>

      {/* Horizontal Divider 1 */}
      <div className="border-t border-white/20 px-10 py-10">
        <p className="text-[20px] font-normal leading-[1.52] text-white max-w-[245px]">
          {description}
        </p>
      </div>

      {/* Horizontal Divider 2 + Bottom Split Compartments */}
      <div
        aria-hidden="true"
        className="grid grid-cols-2 h-[136px] border-t border-white/20"
      >
        <div className="border-r border-white/20 h-full bg-white/[0.01]" />
        <div className="h-full bg-white/[0.02]" />
      </div>
    </aside>
  );
};
