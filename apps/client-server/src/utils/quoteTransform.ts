import { Quote } from '@/types/quote';
import { StaticImageData } from 'next/image';
import moment from 'moment';

// Default fallback image
import defaultImage from "@/assets/img/listing/listing-1.jpg";

// Interface matching the public quotes API response from quoteaway
export interface PublicQuoteResponse {
  agentName: string;
  profilePicture: string;
  quoteNumber: string;
  hotelName: string;
  departingAirport: string | null;
  location: string;
  destinationCountry: string;
  destinationRegion: string;
  destinationResort: string;
  featuredImage: string;
  timePosted: string;
  guests: number;
  price: number;
  discount: number | null;
  holidayDate: string | null;
}

export interface ListingDataType {
  id: string;
  quoteNumber: string;
  page: string;
  thumb: StaticImageData | string;
  tag?: string;
  featured?: string;
  time: string;
  guest?: string;
  title: string;
  location: string;
  delete_price?: number;
  price: number;
  review: number;
  total_review?: string;
  country?: string;
  recommended?: string;
  category?: string;
  agent_avatar?: StaticImageData | string;
  agent_name?: string;
  agent_title?: string;
  departure_date?: string;
  departure_airport?: string;
}

export const transformQuoteToListing = (quote: Quote): ListingDataType => {
  // Safety check for quote object
  if (!quote) {
    throw new Error('Quote object is null or undefined');
  }

  // Use the hotel name or location as title, fallback to "Holiday Package"
  const title = quote.hotelName || quote.location || 'Holiday Package';

  // Format tag display from timePosted using moment.js for "time ago" format
  const tagDisplay = moment(quote.timePosted).fromNow();

  // Format time display from holidayDate if available, otherwise show "Date TBC"
  const timeDisplay = quote.holidayDate
    ? moment(quote.holidayDate).format('DD MMM YYYY')
    : 'Date TBC';

  // Get guest display
  const guestDisplay = quote.guests > 0 ? `${quote.guests} Guest${quote.guests !== 1 ? 's' : ''}` : '';

  // Use the unified price (already calculated with discount)
  const totalPrice = quote.price || 0;
  
  // Calculate per person price
  const perPersonPrice = quote.guests > 0 ? totalPrice / quote.guests : totalPrice;

  // Get location - use hotelName if location is empty, or default
  const location = quote.location || quote.hotelName || 'Location TBC';

  // Use the featuredImage (already has placeholder fallback)
  const image: StaticImageData | string = quote.featuredImage || defaultImage;

  // Determine category based on price and guests for filtering
  let category = '';
  if (totalPrice > 3000) {
    category = 'Luxury';
  } else if (quote.guests >= 4) {
    category = 'Great for Groups';
  } else if (quote.guests === 2) {
    category = 'Great for Couples';
  } else if (quote.guests === 1) {
    category = 'Solo';
  } else {
    category = 'Great for Adults';
  }

  return {
    id: quote.quoteNumber || `quote-${Date.now()}-${Math.random()}`, // Use original quote number or generate unique ID
    quoteNumber: quote.quoteNumber, // Preserve original quote number for linking
    page: "home_3", // All quotes will appear on home_3 page
    thumb: image,
    tag: tagDisplay, // Show "time ago" from when quote was posted
    time: timeDisplay, // Show holiday date or "Date TBC"
    guest: guestDisplay,
    title: title,
    location: location,
    price: perPersonPrice,
    review: 4.5, // Default review score - could be enhanced with real reviews
    total_review: "(New)",
    category: category,
    agent_avatar: quote.profilePicture,
    agent_name: quote.agentName,
    agent_title: undefined, // Not available in unified format
    departure_date: undefined, // Could be enhanced if needed
    departure_airport: quote.departingAirport || "Flights not included"
  };
};

export const transformQuotesToListings = (quotes: Quote[]): ListingDataType[] => {
  if (!quotes || !Array.isArray(quotes)) {
    console.warn('Quotes is not a valid array:', quotes);
    return [];
  }

  return quotes.filter(quote => quote).map(transformQuoteToListing);
};