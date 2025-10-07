import React from 'react';
import { siteConfig } from '@/config/seo';

interface StructuredDataProps {
  type: 'Organization' | 'WebSite' | 'Article' | 'Product' | 'LocalBusiness';
  data?: Record<string, unknown>;
}

const StructuredData: React.FC<StructuredDataProps> = ({ type, data = {} }) => {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type
    };

    switch (type) {
      case 'Organization':
        return {
          ...baseData,
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          logo: `${siteConfig.url}/assets/img/logo/logo.png`,
          sameAs: [
            `https://twitter.com/${siteConfig.twitterHandle?.replace('@', '')}`,
            `https://facebook.com/searchaway`,
            `https://instagram.com/searchaway`
          ],
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: "English"
          },
          ...data
        };

      case 'WebSite':
        return {
          ...baseData,
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: `${siteConfig.url}/assets/img/logo/logo.png`
          },
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteConfig.url}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          },
          ...data
        };

      case 'Article':
        return {
          ...baseData,
          headline: data.title || siteConfig.name,
          description: data.description || siteConfig.description,
          image: data.image || `${siteConfig.url}${siteConfig.defaultImage}`,
          author: {
            "@type": "Person",
            name: siteConfig.author
          },
          publisher: {
            "@type": "Organization",
            name: siteConfig.name,
            logo: {
              "@type": "ImageObject",
              url: `${siteConfig.url}/assets/img/logo/logo.png`
            }
          },
          datePublished: data.publishedTime || new Date().toISOString(),
          dateModified: data.modifiedTime || new Date().toISOString(),
          ...data
        };

      case 'Product':
        return {
          ...baseData,
          name: data.name || 'Travel Product',
          description: data.description || 'Quality travel product from SearchAway',
          image: data.image || `${siteConfig.url}${siteConfig.defaultImage}`,
          brand: {
            "@type": "Brand",
            name: siteConfig.name
          },
          offers: {
            "@type": "Offer",
            price: data.price || "0",
            priceCurrency: data.currency || "USD",
            availability: "https://schema.org/InStock",
            seller: {
              "@type": "Organization",
              name: siteConfig.name
            }
          },
          ...data
        };

      case 'LocalBusiness':
        return {
          ...baseData,
          "@type": "TravelAgency",
          name: siteConfig.name,
          description: siteConfig.description,
          url: siteConfig.url,
          image: `${siteConfig.url}/assets/img/logo/logo.png`,
          telephone: data.telephone || "+1-800-SEARCH",
          address: {
            "@type": "PostalAddress",
            streetAddress: data.streetAddress || "123 Travel Street",
            addressLocality: data.city || "New York",
            addressRegion: data.state || "NY",
            postalCode: data.postalCode || "10001",
            addressCountry: data.country || "US"
          },
          openingHours: data.openingHours || "Mo-Fr 09:00-18:00",
          priceRange: data.priceRange || "$$",
          ...data
        };

      default:
        return baseData;
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
};

export default StructuredData;