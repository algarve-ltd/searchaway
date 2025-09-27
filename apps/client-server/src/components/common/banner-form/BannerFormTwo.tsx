"use client"
import { useEffect, useRef, useState } from "react";
import { useSearch } from "@/contexts/SearchContext";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

interface DropdownOption {
   value: string;
   label: string;
}

const nightsOptions: DropdownOption[] = [
   { value: "1", label: "1 Night" },
   { value: "2", label: "2 Nights" },
   { value: "3", label: "3 Nights" },
   { value: "4", label: "4 Nights" },
   { value: "5", label: "5 Nights" },
   { value: "6", label: "6 Nights" },
   { value: "7", label: "7 Nights" },
   { value: "7+", label: "7+ Nights" }
];



const countryOptions: DropdownOption[] = [
   { value: "germany", label: "Germany" },
   { value: "france", label: "France" },
   { value: "italy", label: "Italy" },
   { value: "spain", label: "Spain" },
   { value: "poland", label: "Poland" },
   { value: "romania", label: "Romania" },
   { value: "netherlands", label: "Netherlands" },
   { value: "belgium", label: "Belgium" },
   { value: "greece", label: "Greece" },
   { value: "czechia", label: "Czechia" }
];

const priceRangeOptions: DropdownOption[] = [
   { value: "0-250", label: "Under £250" },
   { value: "251-500", label: "£251 - £500" },
   { value: "501-750", label: "£501 - £750" },
   { value: "751-1000", label: "£751 - £1000" },
   { value: "1000+", label: "£1000+" }
];

const BannerFormTwo = () => {
   const { filters, updateFilters, searchQuotes } = useSearch();

   const [nightsOpen, setNightsOpen] = useState(false);
   const [countryOpen, setCountryOpen] = useState(false);
   const [priceOpen, setPriceOpen] = useState(false);

   const nightsRef = useRef<HTMLDivElement>(null);
   const countryRef = useRef<HTMLDivElement>(null);
   const priceRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (nightsRef.current && !nightsRef.current.contains(event.target as Node)) {
            setNightsOpen(false);
         }
         if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
            setCountryOpen(false);
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

   const handleNightsSelect = (value: string) => {
      updateFilters({ nights: value });
      setNightsOpen(false);
   };

   const handleDateChange = (selectedDates: Date[]) => {
      if (selectedDates.length > 0) {
         const dateString = selectedDates[0].toISOString().split('T')[0];
         updateFilters({ departureDate: dateString });
      }
   };

   const handleCountrySelect = (value: string) => {
      updateFilters({ country: value });
      setCountryOpen(false);
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
      const selected = options.find(option => option.value === value);
      return selected ? selected.label : placeholder;
   };

   const formatDate = (dateString: string) => {
      if (!dateString) return "Select departure date...";
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', {
         day: 'numeric',
         month: 'short',
         year: 'numeric'
      });
   };

   return (
      <form onSubmit={handleSearch}>
         <div className="tg-booking-form-input-group d-flex align-items-end justify-content-between">
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

            {/* Departure Date Picker */}
            <div className="tg-booking-form-parent-inner mr-15 mb-15">
               <span className="tg-booking-form-title mb-5">Departure Date:</span>
               <div className="tg-booking-add-input-date p-relative">
                  <span>
                     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.76501 0.777771V3.26668M4.23413 0.777771V3.26668M0.777344 5.75548H13.2218M2.16006 2.02211H11.8391C12.6027 2.02211 13.2218 2.57927 13.2218 3.26656V11.9778C13.2218 12.6651 12.6027 13.2222 11.8391 13.2222H2.16006C1.39641 13.2222 0.777344 12.6651 0.777344 11.9778V3.26656C0.777344 2.57927 1.39641 2.02211 2.16006 2.02211Z" stroke="currentColor" strokeWidth="0.977778" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </span>
                  <Flatpickr
                     value={filters.departureDate ? new Date(filters.departureDate) : undefined}
                     onChange={handleDateChange}
                     options={{
                        dateFormat: 'd/m/Y',
                        minDate: 'today',
                        maxDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
                     }}
                     className="input"
                     placeholder="dd/mm/yyyy"
                  />
                  <span className="angle-down">
                     <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.6665 1L6.99984 6.33333L12.3332 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </span>
               </div>
            </div>

            {/* Country Dropdown */}
            <div className="tg-booking-form-parent-inner tg-hero-quantity p-relative mr-15 mb-15">
               <span className="tg-booking-form-title mb-5">Destination:</span>
               <div ref={countryRef} onClick={() => setCountryOpen(!countryOpen)} className={`tg-booking-add-input-field tg-booking-quantity-toggle ${countryOpen ? "active" : ""}`}>
                  <span className="tg-booking-title-value">{getSelectedLabel(countryOptions, filters.country, "Select country...")}</span>
                  <span className="location">
                     <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                  </span>
               </div>
               <div className={`tg-booking-form-location-list tg-booking-quantity-active ${countryOpen ? "tg-list-open" : ""}`}>
                  <ul className="scrool-bar scrool-height pr-5">
                     {countryOptions.map((option) => (
                        <li key={option.value} onClick={() => handleCountrySelect(option.value)}>
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
   )
}

export default BannerFormTwo
