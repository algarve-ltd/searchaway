/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Button from "@/components/common/Button"
import Image from "next/image"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addToWishlist } from "@/redux/features/wishlistSlice"
import { useState, useEffect } from "react"
import { Quote, QuoteApiResponse } from "@/types/quote"
import { useSearch } from "@/contexts/SearchContext"

import shape_1 from "@/assets/img/banner/banner-2/shape.png"

const Listing = () => {
   const dispatch = useDispatch();
   const { filters } = useSearch();
   const [quotes, setQuotes] = useState<Quote[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   // Fetch quotes from API
   useEffect(() => {
      const fetchQuotes = async () => {
         try {
            setLoading(true);

            // Build query parameters from search filters
            const queryParams = new URLSearchParams();
            queryParams.append('limit', '8'); // Limit to 8 for the grid layout

            // Add search filters if they exist
            if (filters.nights) queryParams.append('nights', filters.nights);
            if (filters.people) queryParams.append('people', filters.people);
            if (filters.priceRange) queryParams.append('priceRange', filters.priceRange);
            // Note: Country filter is not implemented in API yet as mentioned in requirements

            const response = await fetch(`/api/quotes?${queryParams.toString()}`);

            if (!response.ok) {
               throw new Error(`Failed to fetch quotes: ${response.statusText}`);
            }

            const data: QuoteApiResponse = await response.json();
            setQuotes(data.data);
         } catch (err) {
            console.error('Error fetching quotes:', err);
            setError(err instanceof Error ? err.message : 'Failed to fetch quotes');
         } finally {
            setLoading(false);
         }
      };

      fetchQuotes();
   }, [filters]); // Re-fetch when filters change

   // add to wishlist
   const handleAddToWishlist = (item: any) => {
      dispatch(addToWishlist(item));
   };

   // Helper function to get currency symbol
   const getCurrencySymbol = (currency: string) => {
      switch (currency) {
         case 'USD': return '$';
         case 'EUR': return '€';
         case 'GBP':
         default: return '£';
      }
   };

   // Helper function to get the correct price from quote
   const getQuotePrice = (quote: Quote) => {
      // For builder quotes, check pricing object first
      if (quote.pricing?.totalPrice) {
         return {
            price: quote.pricing.totalPrice,
            currency: quote.pricing.currencySymbol || quote.currencySymbol || 'GBP'
         };
      }

      // For direct quotes or fallback
      if (quote.totalPrice) {
         return {
            price: quote.totalPrice,
            currency: quote.currencySymbol || 'GBP'
         };
      }

      // Default fallback
      return {
         price: null,
         currency: quote.currencySymbol || 'GBP'
      };
   };

   // Helper function to get the first image from image carousels
   const getQuoteImage = (quote: Quote) => {
      if (quote.imageCarousels && quote.imageCarousels.length > 0) {
         const firstCarousel = quote.imageCarousels[0];
         if (firstCarousel.images && firstCarousel.images.length > 0) {
            const imageUrl = firstCarousel.images[0];
            // Use placeholder if image doesn't start with https
            if (imageUrl && imageUrl.startsWith('https')) {
               return imageUrl;
            }
         }
      }
      return 'https://placehold.co/600x400/orange/white?text="';
   };

   // Helper function to get quote display name
   const getQuoteDisplayName = (quote: Quote) => {
      if (quote.holidayInfo?.title) return quote.holidayInfo.title;
      if (quote.title) return quote.title;
      if (quote.hotels && quote.hotels.length > 0 && quote.hotels[0].hotelName) return quote.hotels[0].hotelName;
      if (quote.villas && quote.villas.length > 0 && quote.villas[0].villaName) return quote.villas[0].villaName;
      return `Quote #${quote.quoteNumber}`;
   };

   if (loading) {
      return (
         <div className="tg-listing-area pt-140 pb-105 p-relative z-index-9">
            <Image className="tg-listing-3-shape d-none d-xl-block" src={shape_1} alt="" />
            <div className="container">
               <div className="row align-items-center justify-content-center">
                  <div className="col-lg-12 text-center">
                     <div className="loading-spinner">
                        <p>Loading quotes...</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   if (error) {
      return (
         <div className="tg-listing-area pt-140 pb-105 p-relative z-index-9">
            <Image className="tg-listing-3-shape d-none d-xl-block" src={shape_1} alt="" />
            <div className="container">
               <div className="row align-items-center justify-content-center">
                  <div className="col-lg-12 text-center">
                     <div className="error-message">
                        <p>Error: {error}</p>
                        <button onClick={() => window.location.reload()} className="btn btn-primary">
                           Try Again
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="tg-listing-area pt-140 pb-105 p-relative z-index-9">
         <Image className="tg-listing-3-shape d-none d-xl-block" src={shape_1} alt="" />
         <div className="container">
            <div className="row align-items-end">
               <div className="col-lg-9">
                  <div className="tg-location-section-title mb-40">
                     <h5 className="tg-section-subtitle mb-15 wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".9s">Featured Travel Quotes</h5>
                     <h2 className="mb-15 text-capitalize wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".9s">Our Latest Quotes</h2>
                  </div>
               </div>
               <div className="col-lg-3">
                  <div className="tg-location-3-btn text-end wow fadeInUp mb-40" data-wow-delay=".6s" data-wow-duration=".9s">
                     <Link href="/tour-grid-1" className="tg-btn tg-btn-gray tg-btn-switch-animation">
                        <Button text="See All Quotes" />
                     </Link>
                  </div>
               </div>
            </div>
            <div className="row">
               {quotes.length > 0 ? quotes.map((quote, index) => (
                  <div key={quote._id || quote.quoteNumber || index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp" data-wow-delay=".9s" data-wow-duration=".6s">
                     <div className="modern-quote-card mb-25" style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                     }}>
                        <div className="quote-image-container" style={{ position: 'relative', height: '280px' }}>
                           <Link href={`https://localhost:3002/quote/${quote.quoteNumber}`} target="_blank" rel="noopener noreferrer">
                              <Image
                                 className="w-100"
                                 src={getQuoteImage(quote)}
                                 alt={getQuoteDisplayName(quote)}
                                 width={400}
                                 height={280}
                                 style={{
                                    objectFit: 'cover',
                                    height: '280px',
                                    borderRadius: '20px 20px 0 0'
                                 }}
                              />
                           </Link>
                        </div>

                        <div className="quote-content" style={{ padding: '20px', position: 'relative' }}>
                           <h3 style={{
                              fontSize: '24px',
                              fontWeight: 'bold',
                              color: '#2c3e50',
                              marginBottom: '8px',
                              lineHeight: '1.2',
                              height: '57.6px', // Fixed height for exactly 2 lines (24px * 1.2 * 2)
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              textOverflow: 'ellipsis'
                           }}>
                              <Link href={`https://localhost:3002/quote/${quote.quoteNumber}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                 {getQuoteDisplayName(quote)}
                              </Link>
                           </h3>

                           <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: '15px'
                           }}>
                              <div style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 fontSize: '14px',
                                 color: '#6c757d'
                              }}>
                                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                                    <path d="M5 2V1C5 0.4 4.6 0 4 0S3 0.4 3 1V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2H13V1C13 0.4 12.6 0 12 0S11 0.4 11 1V2H5ZM14 14H2V6H14V14Z" fill="currentColor" />
                                 </svg>
                                 {quote.nights ? `${quote.nights} days` : '7 days'}
                              </div>

                              <div style={{
                                 color: '#2980b9',
                                 fontSize: '14px',
                                 fontWeight: '500'
                              }}>
                                 Great for Families
                              </div>
                           </div>

                           <div style={{ marginBottom: '15px' }}>
                              {(() => {
                                 const { price, currency } = getQuotePrice(quote);
                                 return (
                                    <>
                                       <span style={{
                                          fontSize: '32px',
                                          fontWeight: 'normal',
                                          color: '#e67e22'
                                       }}>
                                          {getCurrencySymbol(currency)}{price || 'Contact for price'}
                                       </span>
                                       <span style={{
                                          fontSize: '16px',
                                          color: '#7c8ba0',
                                          marginLeft: '8px'
                                       }}>
                                          {price ? 'per person' : ''}
                                       </span>
                                    </>
                                 );
                              })()}
                           </div>

                           <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              color: '#2980b9',
                              fontSize: '14px',
                              fontWeight: '500'
                           }}>
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '6px' }}>
                                 <path d="M5 2V1C5 0.4 4.6 0 4 0S3 0.4 3 1V2H2C0.9 2 0 2.9 0 4V14C0 15.1 0.9 16 2 16H14C15.1 16 16 15.1 16 14V4C16 2.9 15.1 2 14 2H13V1C13 0.4 12.6 0 12 0S11 0.4 11 1V2H5ZM14 14H2V6H14V14Z" fill="currentColor" />
                              </svg>
                              {new Date(quote.createdAt).toLocaleDateString('en-GB', {
                                 day: 'numeric',
                                 month: 'long',
                                 year: 'numeric'
                              })}
                           </div>

                           {/* Agent Avatar */}
                           {quote.userId?.agentImage && (
                              <div style={{
                                 position: 'absolute',
                                 bottom: '15px',
                                 right: '15px',
                                 width: '40px',
                                 height: '40px',
                                 borderRadius: '50%',
                                 overflow: 'hidden',
                                 border: '2px solid white',
                                 boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                              }}>
                                 <Image
                                    src={quote.userId.agentImage}
                                    alt={`${quote.userId.firstName} ${quote.userId.lastName}`}
                                    width={40}
                                    height={40}
                                    style={{
                                       objectFit: 'cover',
                                       width: '100%',
                                       height: '100%'
                                    }}
                                 />
                              </div>
                           )}
                        </div>
                     </div>
                  </div>
               )) : (
                  <div className="col-12 text-center">
                     <p>No quotes available at the moment.</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default Listing
