/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DesonLogo } from './components/DesonLogo';
import { FeaturesCard } from './components/FeaturesCard';
import { SearchModal, SignInModal, ShopModal } from './components/ActionModals';
import { BANNER_CONTENT, CatalogItem } from './utils/bannerData';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [signedInUser, setSignedInUser] = useState<string | null>(null);
  const [selectedPieces, setSelectedPieces] = useState<CatalogItem[]>([]);

  const handleTogglePiece = (piece: CatalogItem) => {
    setSelectedPieces((prev) =>
      prev.some((p) => p.id === piece.id)
        ? prev.filter((p) => p.id !== piece.id)
        : [...prev, piece]
    );
  };

  const handleSelectFromSearch = (piece: CatalogItem) => {
    setSelectedPieces((prev) =>
      prev.some((p) => p.id === piece.id) ? prev : [...prev, piece]
    );
    setIsShopOpen(true);
  };

  return (
    <div
      id="top"
      className="min-h-screen w-full bg-black text-white flex flex-col justify-between px-8 sm:px-16 lg:px-24 pt-10 sm:pt-14 pb-12 sm:pb-16 select-none"
    >
      {/* Top Header Navigation */}
      <header className="w-full max-w-[1280px] mx-auto flex items-center justify-between gap-8">
        <DesonLogo />

        <nav
          aria-label="Primary Navigation"
          className="flex items-center gap-10 sm:gap-16 lg:pr-8"
        >
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="text-[17px] sm:text-[18px] font-normal text-white hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {BANNER_CONTENT.navItems.searchLabel}
          </button>
          <button
            type="button"
            onClick={() => setIsSignInOpen(true)}
            className="text-[17px] sm:text-[18px] font-normal text-white hover:opacity-80 transition-opacity whitespace-nowrap shrink-0 cursor-pointer bg-transparent border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {BANNER_CONTENT.navItems.signInLabel}
          </button>
        </nav>
      </header>

      {/* Main Banner Body */}
      <main className="w-full max-w-[1280px] mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch pt-12 sm:pt-16 lg:pt-16">
        {/* Left Column: Display Headline at Top, Shop Now Button at Bottom */}
        <div className="lg:col-span-7 flex flex-col justify-between items-start">
          <h1 className="text-[46px] sm:text-[66px] lg:text-[78px] font-normal leading-[1.12] tracking-[-0.02em] text-white">
            <span className="block">{BANNER_CONTENT.headlineLine1}</span>
            <span className="block">{BANNER_CONTENT.headlineLine2}</span>
          </h1>

          <div className="mt-16 lg:mt-0 lg:pb-4 sm:pl-2">
            <button
              type="button"
              onClick={() => setIsShopOpen(true)}
              className="rounded-full bg-[#171717] border border-white/15 px-14 sm:px-16 py-5 sm:py-5.5 text-[24px] sm:text-[27px] font-medium text-white tracking-[-0.01em] hover:bg-[#222222] hover:border-white/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {BANNER_CONTENT.ctaLabel}
            </button>
          </div>
        </div>

        {/* Right Column: Glassmorphic Features Card aligned from second headline line to bottom */}
        <div className="lg:col-span-5 flex lg:justify-end items-end lg:pt-24">
          <FeaturesCard />
        </div>
      </main>

      {/* Interactive Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPiece={handleSelectFromSearch}
      />
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        signedInUser={signedInUser}
        onSignInSuccess={(email) => setSignedInUser(email)}
        onSignOut={() => setSignedInUser(null)}
      />
      <ShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        selectedPieces={selectedPieces}
        onTogglePiece={handleTogglePiece}
      />
    </div>
  );
}
