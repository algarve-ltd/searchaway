/**
 * Examples of how to use the SEO utilities
 * This file demonstrates the usage patterns for the SEO configuration and utilities
 */

import { createMetadata, getDefaultPageMetadata, createDynamicMetadata, validateMetadata } from './seo';

// Example 1: Using default page metadata
export const homePageMetadata = createMetadata(getDefaultPageMetadata('home'));

export const aboutPageMetadata = createMetadata(getDefaultPageMetadata('about'));

export const contactPageMetadata = createMetadata(getDefaultPageMetadata('contact'));

// Example 2: Creating dynamic metadata for a tour page
export const tourPageMetadata = createDynamicMetadata(
  'Amazing Paris City Tour',
  'Discover the beauty of Paris with our comprehensive city tour. Visit iconic landmarks, enjoy local cuisine, and create unforgettable memories.',
  ['paris tour', 'city tour', 'france travel', 'sightseeing'],
  '/assets/img/tours/paris-tour.jpg',
  'product'
);

// Example 3: Creating dynamic metadata for a blog post
export const blogPostMetadata = createDynamicMetadata(
  'Top 10 Travel Destinations for 2024',
  'Explore our curated list of the most exciting travel destinations for 2024. From hidden gems to popular hotspots, find your next adventure.',
  ['travel destinations', 'travel guide', '2024 travel', 'vacation ideas'],
  '/assets/img/blog/destinations-2024.jpg',
  'article'
);

// Example 4: Validating metadata
export function exampleValidation() {
  const metadata = getDefaultPageMetadata('home');
  const warnings = validateMetadata(metadata);
  
  if (warnings.length > 0) {
    console.warn('SEO Validation Warnings:', warnings);
  } else {
    console.log('SEO metadata validation passed');
  }
}

// Example usage in a Next.js page:
/*
// In your page.tsx file:
import { createMetadata, getDefaultPageMetadata } from '@/utils/seo';

export const metadata = createMetadata(getDefaultPageMetadata('home'));

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to SearchAway</h1>
      // Your page content
    </div>
  );
}
*/