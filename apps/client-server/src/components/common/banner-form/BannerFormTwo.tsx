"use client"
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/contexts/SearchContext";
import DestinationModal from "@/components/common/DestinationModal";

interface DropdownOption {
   value: string;
   label: string;
}

// Top 10 UK Airports by passenger volume
const departureAirportOptions: DropdownOption[] = [
   { value: "", label: "All Airports" },
   { value: "LHR", label: "London Heathrow (LHR)" },
   { value: "LGW", label: "London Gatwick (LGW)" },
   { value: "MAN", label: "Manchester (MAN)" },
   { value: "STN", label: "London Stansted (STN)" },
   { value: "LTN", label: "London Luton (LTN)" },
   { value: "EDI", label: "Edinburgh (EDI)" },
   { value: "BHX", label: "Birmingham (BHX)" },
   { value: "BRS", label: "Bristol (BRS)" },
   { value: "GLA", label: "Glasgow (GLA)" },
   { value: "BFS", label: "Belfast International (BFS)" }
];

const nightsOptions: DropdownOption[] = [
   { value: "", label: "Any Nights" },
   { value: "1", label: "1 Night" },
   { value: "2", label: "2 Nights" },
   { value: "3", label: "3 Nights" },
   { value: "4", label: "4 Nights" },
   { value: "5", label: "5 Nights" },
   { value: "6", label: "6 Nights" },
   { value: "7", label: "7 Nights" },
   { value: "7+", label: "7+ Nights" }
];

const priceRangeOptions: DropdownOption[] = [
   { value: "", label: "Any Price" },
   { value: "0-250", label: "Under £250" },
   { value: "251-500", label: "£251 - £500" },
   { value: "501-750", label: "£501 - £750" },
   { value: "751-1000", label: "£751 - £1000" },
   { value: "1000+", label: "£1000+" }
];

const BannerFormTwo = () => {
   const { filters, updateFilters, searchQuotes } = useSearch();

   const [departureAirportOpen, setDepartureAirportOpen] = useState(false);
   const [destinationModalOpen, setDestinationModalOpen] = useState(false);
   const [nightsOpen, setNightsOpen] = useState(false);
   const [priceOpen, setPriceOpen] = useState(false);

   const departureAirportRef = useRef<HTMLDivElement>(null);
   const nightsRef = useRef<HTMLDivElement>(null);
   const priceRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (departureAirportRef.current && !departureAirportRef.current.contains(event.target as Node)) {
            setDepartureAirportOpen(false);
         }
         if (nightsRef.current && !nightsRef.current.contains(event.target as Node)) {
            setNightsOpen(false);
         }
         if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
            setPriceOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleDepartureAirportSelect = (value: string) => {
      updateFilters({ departureAirport: value });
      setDepartureAirportOpen(false);
   };

   const handleDestinationSave = (selections: {
      countries: string[];
      regions: string[];
      resorts: string[];
   }) => {
      updateFilters({ 
         countries: selections.countries,
         regions: selections.regions,
         resorts: selections.resorts
      });
   };

   const getDestinationLabel = () => {
      const totalSelections = (filters.countries?.length || 0) + (filters.regions?.length || 0) + (filters.resorts?.length || 0);
      if (totalSelections === 0) {
         return "Any Destination";
      }
      return `${totalSelections} destination${totalSelections === 1 ? '' : 's'} selected`;
   };

   const handleNightsSelect = (value: string) => {
      updateFilters({ nights: value });
      setNightsOpen(false);
   };

   const handlePriceSelect = (value: string) => {
      updateFilters({ priceRange: value });
      setPriceOpen(false);
   };

   const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      await searchQuotes();
   };

   const getSelectedLabel = (options: DropdownOption[], value: string, placeholder: string) => {
      // If value is empty string, show the first option (which should be "Any/All")
      if (!value) {
         return options[0]?.label || placeholder;
      }
      const selected = options.find(option => option.value === value);
      return selected ? selected.label : placeholder;
   };



   return (
      <>
      <form onSubmit={handleSearch}>
         <div className="tg-booking-form-input-group d-flex align-items-end justify-content-between">
            {/* Departure Airport Dropdown */}
            <div className="tg-booking-form-parent-inner tg-hero-quantity p-relative mr-15 mb-15">
               <span className="tg-booking-form-title mb-5">Departure Airport:</span>
               <div ref={departureAirportRef} onClick={() => setDepartureAirportOpen(!departureAirportOpen)} className={`tg-booking-add-input-field tg-booking-quantity-toggle ${departureAirportOpen ? "active" : ""}`}>
                  <span className="tg-booking-title-value">{getSelectedLabel(departureAirportOptions, filters.departureAirport, "Select airport...")}</span>
                  <span className="location">
                     <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </span>
               </div>
               <div className={`tg-booking-form-location-list tg-booking-quantity-active ${departureAirportOpen ? "tg-list-open" : ""}`} style={{ overflowX: 'hidden' }}>
                  <ul className="scrool-bar scrool-height pr-5" style={{ overflowX: 'hidden' }}>
                     {departureAirportOptions.map((option) => (
                        <li key={option.value} onClick={() => handleDepartureAirportSelect(option.value)} style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                           <span style={{ whiteSpace: 'nowrap' }}>{option.label}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Destination Dropdown */}
            <div className="tg-booking-form-parent-inner tg-hero-quantity p-relative mr-15 mb-15">
               <span className="tg-booking-form-title mb-5">Destination:</span>
               <div onClick={() => setDestinationModalOpen(true)} className="tg-booking-add-input-field tg-booking-quantity-toggle" style={{ cursor: 'pointer' }}>
                  <span className="tg-booking-title-value">{getDestinationLabel()}</span>
                  <span className="location">
                     <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </span>
               </div>
            </div>

            {/* Nights Dropdown */}
            <div className="tg-booking-form-parent-inner tg-hero-quantity p-relative mr-15 mb-10">
               <span className="tg-booking-form-title mb-5">Nights:</span>
               <div ref={nightsRef} onClick={() => setNightsOpen(!nightsOpen)} className={`tg-booking-add-input-field tg-booking-quantity-toggle ${nightsOpen ? "active" : ""}`}>
                  <span className="tg-booking-title-value">{getSelectedLabel(nightsOptions, filters.nights, "Select nights...")}</span>
                  <span className="location">
                     <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </span>
               </div>
               <div className={`tg-booking-form-location-list tg-booking-quantity-active ${nightsOpen ? "tg-list-open" : ""}`}>
                  <ul className="scrool-bar scrool-height pr-5">
                     {nightsOptions.map((option) => (
                        <li key={option.value} onClick={() => handleNightsSelect(option.value)}>
                           <span>{option.label}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            {/* Price Range Dropdown */}
            <div className="tg-booking-form-parent-inner tg-hero-quantity p-relative mr-15 mb-15">
               <span className="tg-booking-form-title mb-5">Price:</span>
               <div ref={priceRef} onClick={() => setPriceOpen(!priceOpen)} className={`tg-booking-add-input-field tg-booking-quantity-toggle ${priceOpen ? "active" : ""}`}>
                  <span className="tg-booking-title-value">{getSelectedLabel(priceRangeOptions, filters.priceRange, "Select price range...")}</span>
                  <span className="location">
                     <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </span>
               </div>
               <div className={`tg-booking-form-location-list tg-booking-quantity-active ${priceOpen ? "tg-list-open" : ""}`}>
                  <ul className="scrool-bar scrool-height pr-5">
                     {priceRangeOptions.map((option) => (
                        <li key={option.value} onClick={() => handlePriceSelect(option.value)}>
                           <span>{option.label}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>

            <div className="tg-booking-form-search-btn mb-10">
               <button className="bk-search-button" type="submit">Search
                  <span className="ml-5">
                     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_53_103)">
                           <path d="M13.2218 13.2222L10.5188 10.5192M12.1959 6.48705C12.1959 9.6402 9.63977 12.1963 6.48662 12.1963C3.33348 12.1963 0.777344 9.6402 0.777344 6.48705C0.777344 3.3339 3.33348 0.777771 6.48662 0.777771C9.63977 0.777771 12.1959 3.3339 12.1959 6.48705Z" stroke="currentColor" strokeWidth="1.575" strokeLinecap="round" strokeLinejoin="round" />
                        </g>
                        <defs>
                           <clipPath id="clip0_53_103">
                              <rect width="14" height="14" fill="currentColor" />
                           </clipPath>
                        </defs>
                     </svg>
                  </span>
               </button>
            </div>
         </div>
      </form>

      {/* Destination Selection Modal */}
      <DestinationModal
         isOpen={destinationModalOpen}
         onClose={() => setDestinationModalOpen(false)}
         onSave={handleDestinationSave}
         initialSelections={{
            countries: filters.countries || [],
            regions: filters.regions || [],
            resorts: filters.resorts || []
         }}
      />
      </>
   )
}

export default BannerFormTwo
