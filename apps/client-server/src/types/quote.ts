export interface Quote {
  _id?: string;
  agentName: string;
  profilePicture: string;
  quoteNumber: string;
  hotelName: string;
  departingAirport: string | null;
  location: string;
  featuredImage: string;
  timePosted: string;
  guests: number;
  price: number;
  discount: number | null;
  holidayDate: string | null;
  // Additional properties used by listing components
  nights?: number;
  createdAt?: string;
  userId?: {
    agentImage?: string;
    firstName?: string;
    lastName?: string;
  };
  pricing?: {
    totalPrice: number;
    currencySymbol: string;
  };
  totalPrice?: number;
  currencySymbol?: string;
  imageCarousels?: Array<{
    images: Array<{ url: string; alt: string; }>;
  }>;
  holidayInfo?: {
    title: string;
  };
  title?: string;
  hotels?: Array<{
    hotelName: string;
  }>;
  villas?: Array<{
    villaName: string;
  }>;
}

export interface QuoteApiResponse {
  quotes: Quote[];
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalQuotes: number;
    hasMore: boolean;
  };
}