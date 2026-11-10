import React, { useState } from 'react';
import {
  CURATED_PIECES,
  CatalogItem,
  filterCatalogPieces,
  validateSignInInput,
} from '../utils/bannerData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPiece: (piece: CatalogItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPiece,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filtered = filterCatalogPieces(CURATED_PIECES, query);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search Catalog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
    >
      <div className="w-full max-w-xl rounded-[24px] border border-white/25 bg-[#0a0a0a] p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-medium text-white">Search Collection</h2>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border border-white/20 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="catalog-search-input" className="sr-only">
            Search contemporary pieces
          </label>
          <input
            id="catalog-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by piece, material, or category..."
            autoFocus
            className="w-full rounded-xl border border-white/25 bg-black px-4 py-3 text-base text-white placeholder:text-white/50 focus:outline-none focus:border-white"
          />
        </div>

        <div className="space-y-3 max-h-[320px] overflow-y-auto pr-1">
          {filtered.length === 0 ? (
            <p className="text-sm text-white py-6 text-center">
              No matching pieces found for &ldquo;{query}&rdquo;.
            </p>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/[0.03] p-4 hover:bg-white/[0.07] transition-colors"
              >
                <div>
                  <p className="text-base font-medium text-white">{item.name}</p>
                  <p className="text-xs text-white mt-0.5">
                    {item.category} · {item.dimensions}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-medium tabular-nums text-white">
                    ${item.price.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPiece(item);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-full border border-white/25 text-xs font-medium text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    Select
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  signedInUser: string | null;
  onSignInSuccess: (email: string) => void;
  onSignOut: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  signedInUser,
  onSignInSuccess,
  onSignOut,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateSignInInput(email, password);
    if (!validation.valid) {
      setError(validation.error || 'Invalid credentials.');
      return;
    }
    setError(null);
    onSignInSuccess(email.trim());
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Sign in to DESON"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
    >
      <div className="w-full max-w-md rounded-[24px] border border-white/25 bg-[#0a0a0a] p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-medium text-white">
            {signedInUser ? 'Account' : 'Sign in'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border border-white/20 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        {signedInUser ? (
          <div className="space-y-6">
            <p className="text-base text-white">
              Signed in as <span className="font-semibold">{signedInUser}</span>
            </p>
            <button
              type="button"
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="w-full rounded-full border border-white/25 bg-white/10 py-3 text-sm font-medium text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
            >
              Sign out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="signin-email" className="block text-sm text-white mb-1.5">
                Email Address
              </label>
              <input
                id="signin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@deson.com"
                className="w-full rounded-xl border border-white/25 bg-black px-4 py-3 text-base text-white placeholder:text-white/50 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label htmlFor="signin-password" className="block text-sm text-white mb-1.5">
                Password
              </label>
              <input
                id="signin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                className="w-full rounded-xl border border-white/25 bg-black px-4 py-3 text-base text-white placeholder:text-white/50 focus:outline-none focus:border-white"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-white border border-white/30 rounded-lg px-3 py-2 bg-white/5">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-full bg-white py-3.5 text-base font-medium text-black hover:bg-white/90 transition-colors cursor-pointer mt-2"
            >
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

interface ShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPieces: CatalogItem[];
  onTogglePiece: (piece: CatalogItem) => void;
}

export const ShopModal: React.FC<ShopModalProps> = ({
  isOpen,
  onClose,
  selectedPieces,
  onTogglePiece,
}) => {
  if (!isOpen) return null;

  const isSelected = (id: string) => selectedPieces.some((p) => p.id === id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Curated Contemporary Pieces"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-6"
    >
      <div className="w-full max-w-2xl rounded-[24px] border border-white/25 bg-[#0a0a0a] p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white mb-1">
              DESON COLLECTION
            </p>
            <h2 className="text-2xl font-medium text-white">
              Contemporary Pieces ({selectedPieces.length} selected)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full border border-white/20 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
          {CURATED_PIECES.map((piece) => {
            const added = isSelected(piece.id);
            return (
              <div
                key={piece.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.03] p-5"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-white">
                    <span>{piece.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{piece.dimensions}</span>
                  </div>
                  <h3 className="text-lg font-medium text-white">{piece.name}</h3>
                  <p className="text-sm text-white leading-relaxed">
                    {piece.description}
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-base font-medium tabular-nums text-white">
                    ${piece.price.toLocaleString()}
                  </span>
                  <button
                    type="button"
                    onClick={() => onTogglePiece(piece)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      added
                        ? 'bg-white text-black'
                        : 'border border-white/25 text-white hover:bg-white/10'
                    }`}
                  >
                    {added ? 'Selected' : 'Add Piece'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
