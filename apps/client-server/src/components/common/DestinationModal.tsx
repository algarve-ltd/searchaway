"use client"
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import destinationData from "@/data/DestinationData.json";

interface Resort {
   name: string;
   selected: boolean;
}

interface Region {
   region: string;
   count: number;
   resorts: string[];
   expanded: boolean;
   selected: boolean;
   resortSelections: Resort[];
}

interface Country {
   country: string;
   count: number;
   regions: Region[];
   selected: boolean;
}

interface DestinationModalProps {
   isOpen: boolean;
   onClose: () => void;
   onSave: (selections: {
      countries: string[];
      regions: string[];
      resorts: string[];
   }) => void;
   initialSelections?: {
      countries: string[];
      regions: string[];
      resorts: string[];
   };
}

const DestinationModal = ({ isOpen, onClose, onSave }: DestinationModalProps) => {
   const [countries, setCountries] = useState<Country[]>([]);
   const [mounted, setMounted] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
   }, []);

   // Initialize countries data
   useEffect(() => {
      const initializedCountries = destinationData.map(country => ({
         ...country,
         selected: false,
         regions: country.regions.map(region => ({
            ...region,
            expanded: false,
            selected: false,
            resortSelections: region.resorts.map(resort => ({
               name: resort,
               selected: false
            }))
         }))
      }));
      setCountries(initializedCountries);
   }, []);

   useEffect(() => {
      if (isOpen) {
         document.body.style.overflow = 'hidden';
      } else {
         document.body.style.overflow = 'unset';
      }
      return () => {
         document.body.style.overflow = 'unset';
      };
   }, [isOpen]);

   const toggleCountry = (countryIndex: number) => {
      console.log('toggleCountry called', countryIndex);
      setCountries(prev => {
         const newCountries = JSON.parse(JSON.stringify(prev));
         const country = newCountries[countryIndex];
         const newSelected = !country.selected;
         console.log('Country toggle:', country.country, 'from', country.selected, 'to', newSelected);
         
         country.selected = newSelected;
         country.regions.forEach((region: Region) => {
            region.selected = newSelected;
            region.resortSelections.forEach((resort: Resort) => {
               resort.selected = newSelected;
            });
         });
         
         return newCountries;
      });
   };

   const toggleRegion = (countryIndex: number, regionIndex: number) => {
      console.log('toggleRegion called', countryIndex, regionIndex);
      setCountries(prev => {
         const newCountries = JSON.parse(JSON.stringify(prev));
         const region = newCountries[countryIndex].regions[regionIndex];
         const newSelected = !region.selected;
         console.log('Region toggle:', region.region, 'from', region.selected, 'to', newSelected);
         
         region.selected = newSelected;
         region.resortSelections.forEach((resort: Resort) => {
            resort.selected = newSelected;
         });
         
         // Update country selection state
         const allRegionsSelected = newCountries[countryIndex].regions.every((r: Region) => r.selected);
         newCountries[countryIndex].selected = allRegionsSelected;
         
         return newCountries;
      });
   };

   const toggleResort = (countryIndex: number, regionIndex: number, resortIndex: number) => {
      setCountries(prev => {
         const newCountries = JSON.parse(JSON.stringify(prev));
         const resort = newCountries[countryIndex].regions[regionIndex].resortSelections[resortIndex];
         resort.selected = !resort.selected;
         
         // Update region selection state
         const region = newCountries[countryIndex].regions[regionIndex];
         const allResortsSelected = region.resortSelections.every((r: Resort) => r.selected);
         region.selected = allResortsSelected;
         
         // Update country selection state
         const allRegionsSelected = newCountries[countryIndex].regions.every((r: Region) => r.selected);
         newCountries[countryIndex].selected = allRegionsSelected;
         
         return newCountries;
      });
   };

   const toggleRegionExpanded = (countryIndex: number, regionIndex: number) => {
      setCountries(prev => {
         const newCountries = JSON.parse(JSON.stringify(prev));
         newCountries[countryIndex].regions[regionIndex].expanded = 
            !newCountries[countryIndex].regions[regionIndex].expanded;
         return newCountries;
      });
   };

   const handleSave = () => {
      const selectedCountries: string[] = [];
      const selectedRegions: string[] = [];
      const selectedResorts: string[] = [];

      console.log('Countries state:', countries);

      countries.forEach(country => {
         if (country.selected) {
            selectedCountries.push(country.country);
         }
         country.regions.forEach(region => {
            if (region.selected && !country.selected) {
               selectedRegions.push(region.region);
            }
            region.resortSelections.forEach(resort => {
               if (resort.selected && !region.selected && !country.selected) {
                  selectedResorts.push(resort.name);
               }
            });
         });
      });

      console.log('Saving selections:', { countries: selectedCountries, regions: selectedRegions, resorts: selectedResorts });
      onSave({ countries: selectedCountries, regions: selectedRegions, resorts: selectedResorts });
      onClose();
   };

   const handleClear = () => {
      setCountries(prev => {
         const newCountries = JSON.parse(JSON.stringify(prev));
         newCountries.forEach((country: Country) => {
            country.selected = false;
            country.regions.forEach((region: Region) => {
               region.selected = false;
               region.resortSelections.forEach((resort: Resort) => {
                  resort.selected = false;
               });
            });
         });
         return newCountries;
      });
   };

   // Filter countries based on search term
   const filteredCountries = countries.map(country => {
      if (!searchTerm.trim()) {
         return country;
      }

      const searchLower = searchTerm.toLowerCase();
      const countryMatches = country.country.toLowerCase().includes(searchLower);

      // Filter regions
      const filteredRegions = country.regions.filter(region => {
         const regionMatches = region.region.toLowerCase().includes(searchLower);
         
         // Filter resorts
         const matchingResorts = region.resortSelections.filter(resort => 
            resort.name.toLowerCase().includes(searchLower)
         );

         // Include region if it matches, or if any of its resorts match
         return countryMatches || regionMatches || matchingResorts.length > 0;
      }).map(region => {
         // If country or region matches, show all resorts, otherwise filter
         const regionMatches = region.region.toLowerCase().includes(searchLower);
         if (countryMatches || regionMatches) {
            return region;
         }
         
         return {
            ...region,
            resortSelections: region.resortSelections.filter(resort =>
               resort.name.toLowerCase().includes(searchLower)
            )
         };
      });

      if (filteredRegions.length > 0) {
         return {
            ...country,
            regions: filteredRegions
         };
      }

      return null;
   }).filter(country => country !== null) as Country[];

   if (!isOpen || !mounted) return null;

   const modalContent = (
      <div 
         style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
         }}
         onClick={onClose}
      >
         
         {/* Modal */}
         <div 
            style={{ 
               position: 'relative',
               zIndex: 100000,
               backgroundColor: 'white',
               borderRadius: '8px',
               boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
               width: '100%',
               maxWidth: window.innerWidth <= 768 ? '100%' : '900px',
               maxHeight: window.innerWidth <= 768 ? '85vh' : '70vh',
               display: 'flex',
               flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
         >
            {/* Header */}
            <div style={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
               padding: '16px',
               borderBottom: '1px solid #e2e8f0',
               backgroundColor: '#2563eb',
               borderTopLeftRadius: '8px',
               borderTopRightRadius: '8px'
            }} onClick={(e) => e.stopPropagation()}>
               <h2 style={{ color: 'white', fontWeight: '600', fontSize: '18px', margin: 0 }}>
                  Select Destinations
               </h2>
               <button
                  onClick={onClose}
                  style={{
                     color: 'white',
                     fontSize: '24px',
                     fontWeight: 'bold',
                     lineHeight: 1,
                     width: '32px',
                     height: '32px',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     border: 'none',
                     background: 'transparent',
                     cursor: 'pointer'
                  }}
               >
                  ×
               </button>
            </div>

            {/* Search Input */}
            <div style={{ 
               padding: '16px',
               borderBottom: '1px solid #e2e8f0'
            }} onClick={(e) => e.stopPropagation()}>
               <input
                  type="text"
                  placeholder="Search destinations, regions, or resorts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                     width: '100%',
                     padding: '10px 12px',
                     fontSize: '14px',
                     border: '1px solid #cbd5e1',
                     borderRadius: '6px',
                     outline: 'none',
                     boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                     e.target.style.borderColor = '#2563eb';
                     e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                     e.target.style.borderColor = '#cbd5e1';
                     e.target.style.boxShadow = 'none';
                  }}
               />
            </div>

            {/* Scrollable Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }} onClick={(e) => e.stopPropagation()}>
               {filteredCountries.length === 0 ? (
                  <div style={{
                     textAlign: 'center',
                     padding: '40px 20px',
                     color: '#64748b',
                     fontSize: '14px'
                  }}>
                     No destinations found matching &ldquo;{searchTerm}&rdquo;
                  </div>
               ) : (
                  filteredCountries.map((country) => {
                     // Find the original country index for state updates
                     const originalCountryIndex = countries.findIndex(c => c.country === country.country);
                     
                     return (
                        <div key={country.country} style={{ marginBottom: '12px' }}>
                           {/* Country Level */}
                           <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              padding: '8px 0',
                              borderRadius: '4px'
                           }}>
                              <input
                                 type="checkbox"
                                 checked={country.selected}
                                 onChange={() => {
                                    toggleCountry(originalCountryIndex);
                                 }}
                                 style={{ 
                                    width: '16px',
                                    height: '16px',
                                    cursor: 'pointer',
                                    accentColor: '#2563eb',
                                    pointerEvents: 'auto',
                                    zIndex: 10,
                                    position: 'relative'
                                 }}
                              />
                              <span 
                                 style={{ 
                                    marginLeft: '12px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#1e293b',
                                    cursor: 'pointer',
                                    userSelect: 'none'
                                 }} 
                                 onClick={() => {
                                    toggleCountry(originalCountryIndex);
                                 }}
                              >
                                 {country.country}
                              </span>
                           </div>

                           {/* Regions under Country */}
                           {country.regions.map((region) => {
                              // Find the original region index
                              const originalRegionIndex = countries[originalCountryIndex].regions.findIndex(r => r.region === region.region);
                              
                              return (
                                 <div key={region.region} style={{ marginLeft: '24px', marginBottom: '8px' }}>
                                    {/* Region Level */}
                                    <div style={{
                                       display: 'flex',
                                       alignItems: 'center',
                                       justifyContent: 'space-between',
                                       padding: '6px 0',
                                       borderRadius: '4px'
                                    }}>
                                       <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                          <input
                                             type="checkbox"
                                             checked={region.selected}
                                             onChange={(e) => {
                                                e.stopPropagation();
                                                toggleRegion(originalCountryIndex, originalRegionIndex);
                                             }}
                                             style={{ 
                                                width: '16px',
                                                height: '16px',
                                                cursor: 'pointer',
                                                accentColor: '#2563eb',
                                                pointerEvents: 'auto',
                                                zIndex: 10,
                                                position: 'relative'
                                             }}
                                          />
                                          <span 
                                             style={{ 
                                                marginLeft: '12px',
                                                fontSize: '14px',
                                                color: '#475569',
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                             }} 
                                             onClick={(e) => {
                                                e.stopPropagation();
                                                toggleRegion(originalCountryIndex, originalRegionIndex);
                                             }}
                                          >
                                             {region.region}
                                          </span>
                                       </div>
                                       {region.resorts.length > 0 && (
                                          <button
                                             onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                toggleRegionExpanded(originalCountryIndex, originalRegionIndex);
                                             }}
                                             style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px',
                                                fontSize: '12px',
                                                color: '#64748b',
                                                padding: '4px 8px',
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                userSelect: 'none'
                                             }}
                                          >
                                             <span>{region.resortSelections.length} resort{region.resortSelections.length === 1 ? '' : 's'}</span>
                                             <svg
                                                style={{
                                                   width: '16px',
                                                   height: '16px',
                                                   transform: region.expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                                   transition: 'transform 0.2s',
                                                   pointerEvents: 'none'
                                                }}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                             >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                             </svg>
                                          </button>
                                       )}
                                    </div>

                                    {/* Resorts under Region */}
                                    {region.expanded && region.resortSelections.length > 0 && (
                                       <div style={{ marginLeft: '24px', marginTop: '4px' }}>
                                          {region.resortSelections.map((resort) => {
                                             // Find the original resort index
                                             const originalResortIndex = countries[originalCountryIndex].regions[originalRegionIndex].resortSelections.findIndex(r => r.name === resort.name);
                                             
                                             return (
                                                <div 
                                                   key={resort.name} 
                                                   style={{
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      padding: '4px 0',
                                                      borderRadius: '4px'
                                                   }}
                                                >
                                                   <input
                                                      type="checkbox"
                                                      checked={resort.selected}
                                                      onChange={() => {
                                                         toggleResort(originalCountryIndex, originalRegionIndex, originalResortIndex);
                                                      }}
                                                      style={{ 
                                                         width: '16px',
                                                         height: '16px',
                                                         cursor: 'pointer',
                                                         accentColor: '#2563eb',
                                                         pointerEvents: 'auto',
                                                         zIndex: 10,
                                                         position: 'relative'
                                                      }}
                                                   />
                                                   <span 
                                                      style={{ 
                                                         marginLeft: '12px',
                                                         fontSize: '12px',
                                                         color: '#64748b',
                                                         cursor: 'pointer',
                                                         userSelect: 'none'
                                                      }} 
                                                      onClick={() => {
                                                         toggleResort(originalCountryIndex, originalRegionIndex, originalResortIndex);
                                                      }}
                                                   >
                                                      {resort.name}
                                                   </span>
                                                </div>
                                             );
                                          })}
                                       </div>
                                    )}
                                 </div>
                              );
                           })}
                        </div>
                     );
                  })
               )}
            </div>

            {/* Footer */}
            <div style={{
               display: 'flex',
               justifyContent: 'space-between',
               padding: '16px',
               borderTop: '1px solid #e2e8f0'
            }} onClick={(e) => e.stopPropagation()}>
               <button
                  onClick={handleClear}
                  style={{
                     padding: '8px 16px',
                     color: '#64748b',
                     border: 'none',
                     background: 'transparent',
                     cursor: 'pointer',
                     fontSize: '14px'
                  }}
               >
                  Clear all
               </button>
               <button
                  onClick={handleSave}
                  style={{
                     padding: '8px 24px',
                     backgroundColor: '#2563eb',
                     color: 'white',
                     border: 'none',
                     borderRadius: '4px',
                     cursor: 'pointer',
                     fontWeight: '600',
                     fontSize: '14px'
                  }}
               >
                  Done
               </button>
            </div>
         </div>
      </div>
   );

   return ReactDOM.createPortal(modalContent, document.body);
};

export default DestinationModal;
