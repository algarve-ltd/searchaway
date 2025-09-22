export interface Quote {
  _id: string;
  quoteNumber: string;
  title: string;
  summary: string;
  nights: number;
  people: number;
  currencySymbol: 'GBP' | 'USD' | 'EUR';
  totalPrice: number;
  createdAt: string;
  holidayInfo?: {
    title: string;
    summary: string;
    nights?: number;
    people?: number;
  };
  pricing?: {
    totalPrice: number;
    pricePerPerson: number;
    currencySymbol: 'GBP' | 'USD' | 'EUR';
    deposit?: number;
    discount?: number;
  };
  imageCarousels?: Array<{
    images: string[];
    order: number;
    minimized: boolean;
    parent: number | null;
  }>;
  hotels?: Array<{
    hotelName: string;
  }>;
  villas?: Array<{
    villaName: string;
  }>;
  userId?: {
    _id: string;
    agentImage: string;
    firstName: string;
    lastName: string;
    company: string;
  };
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