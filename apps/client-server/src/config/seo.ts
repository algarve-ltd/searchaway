export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  keywords: string[];
  defaultImage: string;
  author: string;
  twitterHandle?: string;
}

export const siteConfig: SiteConfig = {
  name: "SearchAway - Travel & Tour Booking",
  description: "Discover amazing destinations and book your perfect travel experience with SearchAway. Find tours, hotels, and travel packages worldwide.",
  url: "https://searchaway.com",
  keywords: [
    "travel",
    "tours", 
    "booking",
    "destinations",
    "vacation",
    "hotels",
    "travel packages",
    "adventure tours",
    "holiday booking",
    "travel deals",
    "tour operator",
    "travel agency",
    "vacation packages",
    "guided tours",
    "travel experiences",
    "destination travel",
    "online booking",
    "travel planning",
    "tourism",
    "travel services"
  ],
  defaultImage: "/assets/img/hero/hero-1.jpg",
  author: "SearchAway",
  twitterHandle: "@searchaway"
};

// Social sharing images for different page types
export const socialImages = {
  home: "/assets/img/hero/hero-1.jpg",
  tours: "/assets/img/listing/listing-1.jpg",
  hotels: "/assets/img/location/location.jpg",
  blog: "/assets/img/blog/blog-1.jpg",
  about: "/assets/img/about/about.jpg",
  contact: "/assets/img/cta/banner.jpg",
  shop: "/assets/img/shop/product.jpg",
  team: "/assets/img/team/member.png",
  destinations: "/assets/img/destination/des.jpg",
  default: "/assets/img/hero/hero-1.jpg"
};

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'article' | 'product';
  publishedTime?: string;
  modifiedTime?: string;
  canonical?: string;
  robots?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

// Utility function to generate canonical URLs
export function generateCanonicalUrl(path: string): string {
  // Remove trailing slash and ensure path starts with /
  const cleanPath = path === '/' ? '' : path.replace(/\/$/, '');
  return `${siteConfig.url}${cleanPath}`;
}

// Robots meta tag configurations for different page types
export const robotsConfig = {
  // Standard pages - index and follow
  default: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  
  // User account pages - noindex to protect privacy
  userAccount: "noindex, nofollow",
  
  // Shopping cart and checkout - noindex for security
  ecommerce: "noindex, follow",
  
  // Search results and filters - noindex to avoid duplicate content
  searchResults: "noindex, follow",
  
  // Admin or internal pages - noindex, nofollow
  admin: "noindex, nofollow",
  
  // Temporary or draft content - noindex until ready
  draft: "noindex, nofollow",
  
  // Archive pages - index but with specific settings
  archive: "index, follow, max-snippet:150"
};

// Default page metadata templates
export const defaultPageMetadata = {
  home: {
    title: "SearchAway - Travel & Tour Booking | Discover Amazing Destinations",
    description: "Book your perfect travel experience with SearchAway. Find tours, hotels, and vacation packages to amazing destinations worldwide.",
    keywords: ["travel booking", "tour packages", "vacation deals", "hotel reservations", "online travel booking", "best travel deals", "worldwide destinations", "travel agency online"]
  },
  about: {
    title: "About SearchAway | Your Trusted Travel Partner",
    description: "Learn about SearchAway, your trusted travel partner. Discover our mission to help you find and book amazing travel experiences worldwide.",
    keywords: ["about searchaway", "travel company", "travel services", "trusted travel partner", "travel agency", "travel expertise", "professional travel services"]
  },
  contact: {
    title: "Contact SearchAway | Get in Touch for Travel Support", 
    description: "Contact SearchAway for travel support, booking assistance, or any questions about our tours and travel services.",
    keywords: ["contact", "travel support", "customer service", "travel assistance", "booking help", "travel consultation", "travel inquiries"]
  },
  blog: {
    title: "Travel Blog | SearchAway Travel Tips & Guides",
    description: "Discover travel tips, destination guides, and insider advice from SearchAway's travel experts. Plan your perfect trip with our travel blog.",
    keywords: ["travel blog", "travel tips", "destination guides", "travel advice", "travel inspiration", "travel planning tips", "destination information", "travel insights", "vacation planning"]
  },
  tours: {
    title: "Tours & Activities | SearchAway",
    description: "Browse our collection of amazing tours and activities. Find the perfect adventure for your next trip with SearchAway.",
    keywords: ["tours", "activities", "adventures", "travel experiences", "guided tours", "tour packages", "sightseeing tours", "adventure activities", "cultural tours", "day tours"]
  },
  hotels: {
    title: "Hotels & Accommodation | SearchAway",
    description: "Find and book the perfect accommodation for your trip. Browse hotels, resorts, and unique stays with SearchAway.",
    keywords: ["hotels", "accommodation", "resorts", "booking", "hotel reservations", "luxury hotels", "budget hotels", "vacation rentals", "boutique hotels", "hotel deals"]
  },

  faq: {
    title: "FAQ | SearchAway Travel Questions & Answers",
    description: "Find answers to frequently asked questions about SearchAway's travel services, booking process, and travel policies.",
    keywords: ["faq", "travel questions", "booking help", "travel support", "frequently asked questions", "travel policies", "booking process", "travel assistance", "help center"]
  },
  pricing: {
    title: "Pricing | SearchAway Travel Packages & Rates",
    description: "Explore SearchAway's competitive pricing for travel packages, tours, and booking services. Find the best deals for your next adventure.",
    keywords: ["pricing", "travel packages", "tour rates", "travel deals", "competitive pricing", "package deals", "tour pricing", "travel costs", "affordable travel", "budget travel"]
  },
  team: {
    title: "Our Team | SearchAway Travel Experts",
    description: "Meet the SearchAway team of travel experts and professionals dedicated to making your travel dreams come true.",
    keywords: ["team", "travel experts", "travel professionals", "about us", "travel consultants", "travel specialists", "experienced guides", "travel advisors"]
  },
  terms: {
    title: "Terms and Conditions | SearchAway",
    description: "Read SearchAway's terms and conditions for booking travel services, tours, and travel packages.",
    keywords: ["terms and conditions", "travel policy", "booking terms"]
  },
  // E-commerce pages
  shop: {
    title: "Travel Shop | SearchAway Travel Gear & Accessories",
    description: "Shop for essential travel gear, accessories, and equipment. Find everything you need for your next adventure with SearchAway's curated travel products.",
    keywords: ["travel shop", "travel gear", "travel accessories", "travel equipment", "luggage", "travel essentials", "backpacks", "travel gadgets", "outdoor gear", "travel supplies"]
  },
  shopDetails: {
    title: "Product Details | SearchAway Travel Shop",
    description: "View detailed information about travel products and accessories. Find specifications, reviews, and pricing for your travel gear needs.",
    keywords: ["product details", "travel products", "travel gear specs", "product reviews", "travel equipment details", "gear specifications", "product information", "travel accessories info"]
  },
  cart: {
    title: "Shopping Cart | SearchAway Travel Shop",
    description: "Review your selected travel products and proceed to checkout. Secure shopping cart for all your travel gear and accessories.",
    keywords: ["shopping cart", "travel products cart", "checkout", "secure shopping"]
  },
  checkout: {
    title: "Checkout | SearchAway Travel Shop",
    description: "Complete your purchase of travel gear and accessories. Secure checkout process with multiple payment options for your convenience.",
    keywords: ["checkout", "secure payment", "travel gear purchase", "online shopping"]
  },
  wishlist: {
    title: "Wishlist | SearchAway Travel Shop",
    description: "Save your favorite travel products for later. Keep track of travel gear and accessories you want to purchase with SearchAway.",
    keywords: ["wishlist", "saved products", "travel gear favorites", "product wishlist"]
  },
  // Authentication pages
  login: {
    title: "Login | SearchAway Account Access",
    description: "Sign in to your SearchAway account to access your bookings, manage your travel plans, and enjoy personalized travel recommendations.",
    keywords: ["login", "sign in", "account access", "user login", "travel account"]
  },
  register: {
    title: "Register | Create SearchAway Account",
    description: "Create your SearchAway account to book amazing travel experiences, save your favorite destinations, and get exclusive travel deals.",
    keywords: ["register", "sign up", "create account", "join searchaway", "travel registration"]
  },
  // Alternative home pages
  homeTwo: {
    title: "SearchAway - Premium Travel & Tour Booking",
    description: "Experience premium travel booking with SearchAway. Discover luxury tours, exclusive destinations, and personalized travel experiences worldwide.",
    keywords: ["premium travel", "luxury tours", "exclusive destinations", "personalized travel", "luxury travel booking", "high-end tours", "premium vacation packages", "luxury travel experiences"]
  },
  homeThree: {
    title: "SearchAway - Adventure Travel & Tours",
    description: "Embark on thrilling adventures with SearchAway. Find adventure tours, outdoor activities, and exciting travel experiences for the adventurous spirit.",
    keywords: ["adventure travel", "outdoor activities", "adventure tours", "thrilling experiences", "extreme sports", "hiking tours", "adventure packages", "outdoor adventures", "adrenaline activities"]
  },
  homeFour: {
    title: "SearchAway - Family Travel & Vacation Packages",
    description: "Plan perfect family vacations with SearchAway. Discover family-friendly tours, kid-safe activities, and memorable travel experiences for all ages.",
    keywords: ["family travel", "family vacations", "kid-friendly tours", "family activities", "family vacation packages", "children activities", "family-friendly destinations", "multi-generational travel"]
  },
  homeFive: {
    title: "SearchAway - Romantic Getaways & Couple Tours",
    description: "Create romantic memories with SearchAway's couple tours and romantic getaways. Find intimate destinations and special experiences for two.",
    keywords: ["romantic getaways", "couple tours", "romantic travel", "intimate destinations", "honeymoon packages", "couples vacation", "romantic destinations", "anniversary trips"]
  },
  homeSix: {
    title: "SearchAway - Group Travel & Corporate Tours",
    description: "Organize group travel and corporate tours with SearchAway. Perfect for team building, conferences, and large group adventures.",
    keywords: ["group travel", "corporate tours", "team building", "group adventures", "corporate travel", "business travel", "group bookings", "conference travel", "incentive travel"]
  },
  homeSeven: {
    title: "SearchAway - Eco Travel & Sustainable Tourism",
    description: "Travel responsibly with SearchAway's eco-friendly tours and sustainable tourism options. Discover green travel experiences that protect our planet.",
    keywords: ["eco travel", "sustainable tourism", "green travel", "responsible travel", "eco-friendly tours", "sustainable travel", "environmental tourism", "carbon-neutral travel", "conservation travel"]
  },
  // Other pages
  teamDetails: {
    title: "Team Member Details | SearchAway Travel Experts",
    description: "Learn more about our travel experts and their specialties. Meet the SearchAway team member who can help plan your perfect trip.",
    keywords: ["team member", "travel expert", "travel specialist", "travel consultant"]
  },
  notFound: {
    title: "Page Not Found | SearchAway",
    description: "The page you're looking for doesn't exist. Explore our travel destinations, tours, and booking options to find what you need.",
    keywords: ["404", "page not found", "travel search", "find tours"]
  }
};

// Generate complete metadata object with technical SEO improvements
export function generatePageMetadata(
  pageKey: keyof typeof defaultPageMetadata,
  path: string,
  overrides?: Partial<PageMetadata>
) {
  const pageData = defaultPageMetadata[pageKey];
  const canonical = generateCanonicalUrl(path);
  
  // Determine robots configuration based on page type
  let robots = robotsConfig.default;
  
  // Special robots configuration for specific page types
  if (path.includes('/login') || path.includes('/register') || path.includes('/checkout') || path.includes('/cart')) {
    robots = robotsConfig.ecommerce;
  } else if (path.includes('/wishlist')) {
    robots = robotsConfig.userAccount;
  } else if (path === '/404' || path.includes('not-found')) {
    robots = robotsConfig.draft;
  }
  
  return {
    title: overrides?.title || pageData.title,
    description: overrides?.description || pageData.description,
    keywords: overrides?.keywords?.join(", ") || pageData.keywords?.join(", "),
    
    // Canonical URL
    alternates: {
      canonical: overrides?.canonical || canonical,
    },
    
    // Robots configuration
    robots: {
      index: !overrides?.noindex && !robots.includes('noindex'),
      follow: !overrides?.nofollow && !robots.includes('nofollow'),
      googleBot: {
        index: !overrides?.noindex && !robots.includes('noindex'),
        follow: !overrides?.nofollow && !robots.includes('nofollow'),
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
    
    // Open Graph
    openGraph: {
      title: overrides?.title || pageData.title,
      description: overrides?.description || pageData.description,
      url: canonical,
      siteName: siteConfig.name,
      images: [
        {
          url: overrides?.image || siteConfig.defaultImage,
          width: 1200,
          height: 630,
          alt: overrides?.title || pageData.title,
        },
      ],
      locale: 'en_US',
      type: overrides?.type || 'website',
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: overrides?.title || pageData.title,
      description: overrides?.description || pageData.description,
      images: [overrides?.image || siteConfig.defaultImage],
      creator: siteConfig.twitterHandle,
    },
    
    // Additional metadata
    ...(overrides?.publishedTime && {
      openGraph: {
        ...{
          title: overrides?.title || pageData.title,
          description: overrides?.description || pageData.description,
          url: canonical,
          siteName: siteConfig.name,
          images: [
            {
              url: overrides?.image || siteConfig.defaultImage,
              width: 1200,
              height: 630,
              alt: overrides?.title || pageData.title,
            },
          ],
          locale: 'en_US',
          type: overrides?.type || 'website',
        },
        publishedTime: overrides.publishedTime,
        ...(overrides.modifiedTime && { modifiedTime: overrides.modifiedTime }),
      },
    }),
  };
}