"use client"
import Image from "next/image";
import { JSX, useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import Link from "next/link"
import { useSearch } from "@/contexts/SearchContext"
import { transformQuotesToListings, ListingDataType } from "@/utils/quoteTransform"


interface TabData {
   title: string;
   icon: JSX.Element;
   category: string;
}

const tab_title: TabData[] = [
   {
      icon: (
         <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.5 2.5L8.8 10.2M16.5 2.5L11.6 16.5L8.8 10.2M16.5 2.5L2.5 7.4L8.8 10.2" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
         </svg>
      ),
      title: "All",
      category: "*",
   },
   {
      icon: (<><svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1.5 17.5H14.3M11.9 7.1H9.5M12.7 10.3H9.5M12.7 13.5H9.5M3.1 17.5V2.46C3.1 1.8392 3.4768 1.5 4.06 1.5C5.3976 1.5 6.0664 1.5 6.6264 1.588C8.12821 1.82593 9.51614 2.53322 10.5913 3.60848C11.6664 4.68373 12.3735 6.07176 12.6112 7.5736C12.7 8.1336 12.7 8.8024 12.7 10.14V17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg></>),
      title: "Great for Families",
      category: "Great for Families",
   },
   {
      icon: (<><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M6.90217 4.0712L6.90345 3.05744C6.90413 2.37893 7.17414 1.72844 7.65416 1.2489C8.13418 0.769362 8.78494 0.5 9.46345 0.5C10.874 0.5 12.017 1.64304 12.017 3.0536V4.06864C14.0785 4.68298 15.8502 6.01812 17.009 7.83035C18.1677 9.64258 18.6361 11.8111 18.3287 13.94H0.591767C0.284915 11.8118 0.753291 9.64421 1.91147 7.83257C3.06964 6.02094 4.84045 4.68599 6.90089 4.0712H6.90217ZM1.14089 15.22H17.7809C17.9506 15.22 18.1134 15.2874 18.2334 15.4075C18.3535 15.5275 18.4209 15.6903 18.4209 15.86C18.4209 16.0297 18.3535 16.1925 18.2334 16.3125C18.1134 16.4326 17.9506 16.5 17.7809 16.5H1.14089C0.971149 16.5 0.808362 16.4326 0.688339 16.3125C0.568316 16.1925 0.500887 16.0297 0.500887 15.86C0.500887 15.6903 0.568316 15.5275 0.688339 15.4075C0.808362 15.2874 0.971149 15.22 1.14089 15.22ZM1.78089 12.66H17.1409C17.1409 11.6514 16.9422 10.6528 16.5563 9.72099C16.1703 8.78921 15.6046 7.94257 14.8915 7.22942C14.1783 6.51627 13.3317 5.95056 12.3999 5.5646C11.4681 5.17865 10.4694 4.98 9.46089 4.98C8.45234 4.98 7.45366 5.17865 6.52188 5.5646C5.5901 5.95056 4.74346 6.51627 4.03031 7.22942C3.31715 7.94257 2.75145 8.78921 2.36549 9.72099C1.97954 10.6528 1.78089 11.6514 1.78089 12.66ZM10.737 3.7V3.0536C10.737 2.71582 10.6029 2.39188 10.364 2.15303C10.1252 1.91418 9.80123 1.78 9.46345 1.78C9.12419 1.78 8.79881 1.91468 8.5588 2.15445C8.31879 2.39422 8.18379 2.71946 8.18345 3.05872V3.7H10.737Z" fill="currentColor" />
      </svg></>),
      title: "Great for Groups",
      category: "Great for Groups",
   },
   {
      icon: (<><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M6.5 17.5V9.5H11.5V17.5M1.5 7.1L9 1.5L16.5 7.1V15.9C16.5 16.3243 16.3244 16.7313 16.0118 17.0314C15.6993 17.3314 15.2754 17.5 14.8333 17.5H3.16667C2.72464 17.5 2.30072 17.3314 1.98816 17.0314C1.67559 16.7313 1.5 16.3243 1.5 15.9V7.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg></>),
      title: "Great for Couples",
      category: "Great for Couples",
   },
   {
      icon: (<><svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16.5 1.5L10.0227 8.625L6.61364 4.875L1.5 10.5M16.5 1.5H12.4091M16.5 1.5L16.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg></>),
      title: "Romantic Break",
      category: "Romantic Break",
   },
   {
      icon: (<> <svg width="19" height="12" viewBox="0 0 19 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M4.20913 0.5C3.45763 0.5 2.76351 0.8674 2.34557 1.47955L0.781259 3.7659C0.59716 4.03549 0.499257 4.35254 0.50001 4.6767V8.32045C0.498973 8.5646 0.581457 8.80209 0.734344 8.99513C0.887231 9.18817 1.10174 9.32568 1.34376 9.3858L2.80288 9.74715C2.90782 10.2415 3.18344 10.6854 3.58349 11.0046C3.98355 11.3238 4.48369 11.4987 5.00001 11.5C6.04176 11.5 6.91138 10.7955 7.16226 9.85H12.4003C12.6511 10.7955 13.5208 11.5 14.5625 11.5C15.6042 11.5 16.4739 10.7955 16.7247 9.85H17.375C17.9904 9.85 18.5 9.3517 18.5 8.75V6.7392C18.4995 6.24896 18.3314 5.77295 18.0225 5.38681C17.7136 5.00066 17.2816 4.72652 16.7951 4.60795L13.7536 3.8517L11.5565 1.2909C11.3463 1.04361 11.0831 0.844562 10.7854 0.707879C10.4877 0.571197 10.163 0.500226 9.83413 0.5H4.20913ZM4.20913 1.6H6.68751V3.8H2.1172L3.27763 2.0983V2.08125C3.37955 1.93158 3.51808 1.80917 3.68065 1.72513C3.84322 1.64108 4.02525 1.59807 4.20913 1.6ZM7.8125 1.6H9.83413C10.1677 1.6 10.4821 1.7441 10.6953 1.99545L12.2422 3.8H7.8125V1.6ZM1.62501 4.9H13.3672L16.5312 5.6733C16.774 5.73221 16.9894 5.86948 17.1425 6.06291C17.2956 6.25634 17.3776 6.49461 17.375 6.7392V8.75H16.7247C16.4739 7.80455 15.6042 7.1 14.5625 7.1C13.5208 7.1 12.6511 7.80455 12.4003 8.75H7.16226C6.91138 7.80455 6.04176 7.1 5.00001 7.1C4.00269 7.1 3.16513 7.7446 2.8732 8.62955L1.62501 8.321V4.9ZM5.00001 8.2C5.62832 8.2 6.12501 8.68565 6.12501 9.3C6.12501 9.91435 5.62832 10.4 5.00001 10.4C4.37169 10.4 3.87501 9.91435 3.87501 9.3C3.87501 8.68565 4.37169 8.2 5.00001 8.2ZM14.5625 8.2C15.1908 8.2 15.6875 8.68565 15.6875 9.3C15.6875 9.91435 15.1908 10.4 14.5625 10.4C13.9342 10.4 13.4375 9.91435 13.4375 9.3C13.4375 8.68565 13.9342 8.2 14.5625 8.2Z" fill="currentColor" />
      </svg></>),
      title: "Luxury",
      category: "Luxury",
   },
   {
      icon: (<><svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1.5 17.5H14.3M11.9 7.1H9.5M12.7 10.3H9.5M12.7 13.5H9.5M3.1 17.5V2.46C3.1 1.8392 3.4768 1.5 4.06 1.5C5.3976 1.5 6.0664 1.5 6.6264 1.588C8.12821 1.82593 9.51614 2.53322 10.5913 3.60848C11.6664 4.68373 12.3735 6.07176 12.6112 7.5736C12.7 8.1336 12.7 8.8024 12.7 10.14V17.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg></>),
      title: "Great for Adults",
      category: "Great for Adults",
   },
   {
      icon: (<><svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M6.90217 4.0712L6.90345 3.05744C6.90413 2.37893 7.17414 1.72844 7.65416 1.2489C8.13418 0.769362 8.78494 0.5 9.46345 0.5C10.874 0.5 12.017 1.64304 12.017 3.0536V4.06864C14.0785 4.68298 15.8502 6.01812 17.009 7.83035C18.1677 9.64258 18.6361 11.8111 18.3287 13.94H0.591767C0.284915 11.8118 0.753291 9.64421 1.91147 7.83257C3.06964 6.02094 4.84045 4.68599 6.90089 4.0712H6.90217ZM1.14089 15.22H17.7809C17.9506 15.22 18.1134 15.2874 18.2334 15.4075C18.3535 15.5275 18.4209 15.6903 18.4209 15.86C18.4209 16.0297 18.3535 16.1925 18.2334 16.3125C18.1134 16.4326 17.9506 16.5 17.7809 16.5H1.14089C0.971149 16.5 0.808362 16.4326 0.688339 16.3125C0.568316 16.1925 0.500887 16.0297 0.500887 15.86C0.500887 15.6903 0.568316 15.5275 0.688339 15.4075C0.808362 15.2874 0.971149 15.22 1.14089 15.22ZM1.78089 12.66H17.1409C17.1409 11.6514 16.9422 10.6528 16.5563 9.72099C16.1703 8.78921 15.6046 7.94257 14.8915 7.22942C14.1783 6.51627 13.3317 5.95056 12.3999 5.5646C11.4681 5.17865 10.4694 4.98 9.46089 4.98C8.45234 4.98 7.45366 5.17865 6.52188 5.5646C5.5901 5.95056 4.74346 6.51627 4.03031 7.22942C3.31715 7.94257 2.75145 8.78921 2.36549 9.72099C1.97954 10.6528 1.78089 11.6514 1.78089 12.66ZM10.737 3.7V3.0536C10.737 2.71582 10.6029 2.39188 10.364 2.15303C10.1252 1.91418 9.80123 1.78 9.46345 1.78C9.12419 1.78 8.79881 1.91468 8.5588 2.15445C8.31879 2.39422 8.18379 2.71946 8.18345 3.05872V3.7H10.737Z" fill="currentColor" />
      </svg></>),
      title: "Solo",
      category: "Solo",
   },
   {
      icon: (<><svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M6.5 17.5V9.5H11.5V17.5M1.5 7.1L9 1.5L16.5 7.1V15.9C16.5 16.3243 16.3244 16.7313 16.0118 17.0314C15.6993 17.3314 15.2754 17.5 14.8333 17.5H3.16667C2.72464 17.5 2.30072 17.3314 1.98816 17.0314C1.67559 16.7313 1.5 16.3243 1.5 15.9V7.1Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg></>),
      title: "Villa",
      category: "Villa",
   },
   {
      icon: (<><svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M16.5 1.5L10.0227 8.625L6.61364 4.875L1.5 10.5M16.5 1.5H12.4091M16.5 1.5L16.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg></>),
      title: "Cruise",
      category: "Cruise",
   },
];

const Listing = () => {
   const { quotes, loading, error, pagination, filters, updateFilters, loadMore, searchQuotes } = useSearch();
   const isotope = useRef<Isotope | null>(null);
   const [filterKey, setFilterKey] = useState("*");
   const [transformedQuotes, setTransformedQuotes] = useState<ListingDataType[]>([]);
   const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
   const [shouldTriggerSearch, setShouldTriggerSearch] = useState(false);

   // Transform quotes when they change
   useEffect(() => {
      if (quotes && quotes.length > 0) {
         setTransformedQuotes(transformQuotesToListings(quotes));
      } else {
         setTransformedQuotes([]);
      }
   }, [quotes]);



   useEffect(() => {
      if (typeof window !== "undefined" && transformedQuotes.length > 0) {
         isotope.current = new Isotope(".isotope-wrapper", {
            itemSelector: ".isotope-filter-item",
            layoutMode: "fitRows",
         });

         // Cleanup
         return () => {
            isotope.current?.destroy();
         };
      }
   }, [transformedQuotes]);

   // Handling filter key change
   useEffect(() => {
      if (isotope.current) {
         if (filterKey === "*") isotope.current?.arrange?.({ filter: "*" });
         else isotope.current?.arrange?.({ filter: `.${CSS.escape(filterKey)}` });
      }
   }, [filterKey]);

   const [selectedFilter, setSelectedFilter] = useState("*");

   // Sync selectedFilter with context on mount or when holidayType changes from search bar
   useEffect(() => {
      if (filters.holidayType) {
         setSelectedFilter(filters.holidayType);
         setFilterKey(filters.holidayType);
      } else {
         setSelectedFilter("*");
         setFilterKey("*");
      }
   }, [filters.holidayType]);

   // Trigger search after filter update
   useEffect(() => {
      if (shouldTriggerSearch) {
         searchQuotes();
         setShouldTriggerSearch(false);
      }
   }, [filters.holidayType, shouldTriggerSearch, searchQuotes]);

   const handleFilterKeyChange = (key: string) => () => {
      setFilterKey(key);
      setSelectedFilter(key);
      // Update search context with holiday type filter
      const holidayTypeValue = key === "*" ? "" : key;
      updateFilters({ holidayType: holidayTypeValue });
      // Flag to trigger search after filter updates
      setShouldTriggerSearch(true);
   };

   const handleLoadMore = async () => {
      if (pagination.hasMore && !loading) {
         try {
            await loadMore();
         } catch (error) {
            console.error('Load More error:', error);
         }
      }
   };

   const handleImageError = (itemId: string) => {
      setImageErrors(prev => ({ ...prev, [itemId]: true }));
   };

   const getImageSrc = (item: ListingDataType) => {
      // If image has errored, return placeholder from placeholder service
      if (imageErrors[item.id]) {
         return 'https://placehold.co/300x250?text=No+Image+Available';
      }
      // Otherwise return the actual image
      return typeof item.thumb === 'string' ? item.thumb : item.thumb;
   };



   return (
      <div className="tg-listing-area tg-grey-bg pt-120 pb-40 z-index-9">

         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="tg-listing-section-title text-center mb-35">
                     <h5 className="tg-section-subtitle wow fadeInUp" data-wow-delay=".3s" data-wow-duration=".5s">Most Popular Tour Packages </h5>
                     <h2 className="mb-15 wow fadeInUp" data-wow-delay=".4s" data-wow-duration=".6s">Something Amazing Waiting For you</h2>
                  </div>
               </div>
               <div className="col-lg-12">
                  <div className="tg-listing-menu-nav project__menu-nav mb-40 wow fadeInUp" data-wow-delay=".5s" data-wow-duration=".9s">
                     {tab_title.map((item, i) => (
                        <button key={i} className={selectedFilter === item.category ? "active" : ""} onClick={handleFilterKeyChange(item.category)}>
                           <span className="borders"></span>
                           <span className="icon mr-10">{item.icon}</span>
                           <span>{item.title}</span>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
            {error && (
               <div className="row">
                  <div className="col-12">
                     <div className="alert alert-danger text-center">
                        <p>Error loading quotes: {error}</p>
                     </div>
                  </div>
               </div>
            )}

            {!loading && transformedQuotes.length === 0 && (
               <div className="row">
                  <div className="col-12">
                     <div className="text-center py-5">
                        <h4>No quotes found</h4>
                        <p>Try adjusting your search filters to find more results.</p>
                     </div>
                  </div>
               </div>
            )}

            {/* Quote Counter */}
            {transformedQuotes.length > 0 && (
               <div className="row mb-4">
                  <div className="col-12">
                     <div className="text-center">
                        <p className="mb-0">
                           Showing <strong>{transformedQuotes.length}</strong> of <strong>{pagination.totalQuotes}</strong> available quotes
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {/* Pricing Disclaimer */}
            {transformedQuotes.length > 0 && (
               <div className="row mb-4">
                  <div className="col-12">
                     <div className="text-center">
                        <p className="mb-0 text-muted" style={{ fontSize: '14px', fontStyle: 'italic' }}>
                           The prices shown are correct at the time of posting but can change. Contact the agent for the live price.
                        </p>
                     </div>
                  </div>
               </div>
            )}

            <div className="row isotope-wrapper project-active-two">
               {transformedQuotes
                  .map((item) => (
                     <div key={item.id} className={`col-xxl-3 col-xl-4 col-lg-4 col-md-6 grid-item grid-sizer ${item.category?.replace(/\s+/g, '-')} isotope-filter-item mb-4`}>
                        <Link href={`https://app.quoteawayai.com/quote/${item.quoteNumber}`} target="_blank" rel="noopener noreferrer" className="d-block text-decoration-none">
                           <div className="tg-listing-card-item h-100">
                              <div className="tg-listing-card-thumb fix mb-15">
                                 <Image
                                    className="tg-card-border w-100"
                                    src={getImageSrc(item)}
                                    alt="listing"
                                    width={300}
                                    height={200}
                                    style={{ objectFit: 'cover' }}
                                    onError={() => handleImageError(item.id)}
                                 />
                                 {item.tag && <span className="tg-listing-item-price-discount shape">{item.tag}</span>}
                              </div>
                              <div className="tg-listing-card-content">
                                 <h4 className="tg-listing-card-title text-dark" style={{
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                 }}>{item.title}</h4>
                              <div className="tg-listing-card-duration-tour">
                                 <span className="tg-listing-card-duration-map mb-5" style={{
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                 }}>
                                    <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M12.3329 6.7071C12.3329 11.2324 6.55512 15.1111 6.55512 15.1111C6.55512 15.1111 0.777344 11.2324 0.777344 6.7071C0.777344 5.16402 1.38607 3.68414 2.46962 2.59302C3.55316 1.5019 5.02276 0.888916 6.55512 0.888916C8.08748 0.888916 9.55708 1.5019 10.6406 2.59302C11.7242 3.68414 12.3329 5.16402 12.3329 6.7071Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                       <path d="M6.55512 8.64649C7.61878 8.64649 8.48105 7.7782 8.48105 6.7071C8.48105 5.636 7.61878 4.7677 6.55512 4.7677C5.49146 4.7677 4.6292 5.636 4.6292 6.7071C4.6292 7.7782 5.49146 8.64649 6.55512 8.64649Z" stroke="currentColor" strokeWidth="1.15556" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {item.location}
                                 </span>
                                 <span className="tg-listing-card-duration-time">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M8.00175 3.73329V7.99996L10.8462 9.42218M15.1128 8.00003C15.1128 11.9274 11.9291 15.1111 8.00174 15.1111C4.07438 15.1111 0.890625 11.9274 0.890625 8.00003C0.890625 4.07267 4.07438 0.888916 8.00174 0.888916C11.9291 0.888916 15.1128 4.07267 15.1128 8.00003Z" stroke="currentColor" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {item.time}
                                 </span>
                                 {item.guest && (
                                    <span className="tg-listing-card-duration-guests">
                                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M14 14C14 12.5 10.5 11 8 11C5.5 11 2 12.5 2 14M11 5C11 6.65685 9.65685 8 8 8C6.34315 8 5 6.65685 5 5C5 3.34315 6.34315 2 8 2C9.65685 2 11 3.34315 11 5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                       {item.guest}
                                    </span>
                                 )}
                                 {/* Departure Date */}
                                 {item.departure_date && (
                                    <span className="tg-listing-card-departure-date">
                                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M15 8L11 4M15 8L11 12M15 8H1M4 2L8 8L4 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                       {item.departure_date}
                                    </span>
                                 )}
                                 {/* Departure Airport */}
                                 <span className={`tg-listing-card-departure-airport ${!item.departure_airport || item.departure_airport === 'Flights not included' ? 'text-muted' : ''}`}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                       <path d="M15 8L11 4M15 8L11 12M15 8H1M4 2L8 8L4 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    {item.departure_airport ? item.departure_airport : "Flight not included"}
                                 </span>
                                 {/* Resort/Region */}
                                 {(item.destinationResort || item.destinationRegion) && (
                                    <span className="tg-listing-card-resort" style={{
                                       display: 'block',
                                       overflow: 'hidden',
                                       textOverflow: 'ellipsis',
                                       whiteSpace: 'nowrap'
                                    }}>
                                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M8 2L3 6V13H6V10C6 9.46957 6.21071 8.96086 6.58579 8.58579C6.96086 8.21071 7.46957 8 8 8C8.53043 8 9.03914 8.21071 9.41421 8.58579C9.78929 8.96086 10 9.46957 10 10V13H13V6L8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                       {item.destinationResort || item.destinationRegion}
                                    </span>
                                 )}
                                 {/* Country */}
                                 {item.destinationCountry && (
                                    <span className="tg-listing-card-country" style={{
                                       display: 'block',
                                       overflow: 'hidden',
                                       textOverflow: 'ellipsis',
                                       whiteSpace: 'nowrap'
                                    }}>
                                       <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M2 8H14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M8 2C9.5913 3.73835 10.4783 5.82603 10.5 8C10.4783 10.174 9.5913 12.2616 8 14C6.4087 12.2616 5.52168 10.174 5.5 8C5.52168 5.82603 6.4087 3.73835 8 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                       {item.destinationCountry}
                                    </span>
                                 )}
                              </div>
                           </div>
                           <div className="tg-listing-card-price d-flex align-items-end justify-content-between">
                              <div className="tg-listing-card-price-wrap price-bg d-flex align-items-center">
                                 <span className="tg-listing-card-currency-amount mr-5">
                                    {item.delete_price && <del className="tg-listing-card-currency-old">£{Math.round(item.delete_price)}</del>}
                                    <span className="currency-symbol">£</span>{Math.round(item.price)}
                                 </span>
                                 <span className="tg-listing-card-activity-person">/PP</span>
                              </div>
                              {/* Agent Avatar */}
                              {item.agent_avatar && (
                                 <div className="tg-listing-agent-avatar me-3 mb-2">
                                    <Image
                                       className="rounded-circle"
                                       src={typeof item.agent_avatar === 'string' ? item.agent_avatar : item.agent_avatar}
                                       alt="agent"
                                       width={40}
                                       height={40}
                                    />
                                 </div>
                              )}
                           </div>
                        </div>
                        </Link>
                     </div>
                  ))}
            </div>

            {/* Load More Button */}
            {pagination.hasMore && (
               <div className="row">
                  <div className="col-12">
                     <div className="text-center mt-40" style={{ zIndex: 1000, position: 'relative' }}>
                        <button
                           className="tg-btn tg-btn-primary"
                           onClick={handleLoadMore}
                           disabled={loading}
                           style={{ 
                              padding: '12px 30px',
                              fontSize: '16px',
                              cursor: loading ? 'not-allowed' : 'pointer',
                              zIndex: 1001,
                              position: 'relative'
                           }}
                        >
                           {loading ? (
                              <>
                                 <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                 Loading more quotes...
                              </>
                           ) : (
                              <>Load More Quotes ({pagination.totalQuotes - transformedQuotes.length} remaining)</>
                           )}
                        </button>
                        <div className="mt-2">
                           <small className="text-muted">
                              Page {pagination.currentPage} of {pagination.totalPages}
                           </small>
                        </div>
                     </div>
                  </div>
               </div>
            )}

            {/* Show message when all quotes are loaded */}
            {!pagination.hasMore && transformedQuotes.length > 0 && (
               <div className="row">
                  <div className="col-12">
                     <div className="text-center mt-40">
                        <p className="text-muted">
                           You&apos;ve viewed all {pagination.totalQuotes} available quotes
                        </p>
                     </div>
                  </div>
               </div>
            )}

            {/* Loading indicator for initial load */}
            {loading && transformedQuotes.length === 0 && (
               <div className="row">
                  <div className="col-12">
                     <div className="text-center py-5">
                        <div className="spinner-border" role="status">
                           <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading quotes...</p>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default Listing
