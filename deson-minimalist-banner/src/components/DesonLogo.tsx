import React from 'react';
import { BANNER_CONTENT } from '../utils/bannerData';

export const DesonLogo: React.FC = () => {
  return (
    <a
      href="#top"
      aria-label={BANNER_CONTENT.brandName}
      className="inline-flex items-center gap-3.5 text-white no-underline select-none whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
    >
      {/* Rounded diamond mark matching the reference image */}
      <span
        aria-hidden="true"
        className="inline-block w-[35px] h-[35px] bg-white rounded-[8px] rotate-45 shrink-0"
      />
      <span className="text-[27px] font-bold tracking-[0.015em] text-white uppercase leading-none">
        {BANNER_CONTENT.brandName}
      </span>
    </a>
  );
};
