import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BANNER_CONTENT,
  CURATED_PIECES,
  filterCatalogPieces,
  validateSignInInput,
} from './bannerData';

test('BANNER_CONTENT matches exact reference text requirements', () => {
  assert.equal(BANNER_CONTENT.brandName, 'DESON');
  assert.equal(BANNER_CONTENT.navItems.searchLabel, 'Search');
  assert.equal(BANNER_CONTENT.navItems.signInLabel, 'Sign in');
  assert.equal(BANNER_CONTENT.headlineLine1, 'Design is intelligence');
  assert.equal(BANNER_CONTENT.headlineLine2, 'made visible.');
  assert.equal(BANNER_CONTENT.ctaLabel, 'Shop Now');
  assert.equal(BANNER_CONTENT.featureCard.kicker, 'FEATURES');
  assert.equal(BANNER_CONTENT.featureCard.titleLine1, 'Elegant');
  assert.equal(BANNER_CONTENT.featureCard.titleLine2, 'Simplicity');
  assert.equal(
    BANNER_CONTENT.featureCard.description,
    'Experience the perfect blend of form and function with our carefully curated selection of contemporary pieces.'
  );
});

test('filterCatalogPieces filters by name, category, and description', () => {
  assert.equal(filterCatalogPieces(CURATED_PIECES, '').length, CURATED_PIECES.length);
  const lighting = filterCatalogPieces(CURATED_PIECES, 'lighting');
  assert.equal(lighting.length, 2);
  const oak = filterCatalogPieces(CURATED_PIECES, 'Kova');
  assert.equal(oak.length, 1);
  assert.equal(oak[0].id, 'sculpted-oak-lounge');
});

test('validateSignInInput validates email and password strictly', () => {
  assert.equal(validateSignInInput('', 'secret123').valid, false);
  assert.equal(validateSignInInput('invalid-email', 'secret123').valid, false);
  assert.equal(validateSignInInput('studio@deson.com', '123').valid, false);
  assert.equal(validateSignInInput('studio@deson.com', 'secret123').valid, true);
});
