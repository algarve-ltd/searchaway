export interface Quote {
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

export interface QuoteApiResponse {
  data: Quote[];
  meta: {
    currentPage: number;
    totalPages: number;
    limit: number;
    total: number;
  };
}