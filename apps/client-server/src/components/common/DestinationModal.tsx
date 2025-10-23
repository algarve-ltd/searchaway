"use client"
import { useState, useEffect, useRef } from "react";
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
   const lastToggleRef = useRef<{ countryIndex: number; regionIndex: number; time: number } | null>(null);

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
      setCountries(prev => {
         const newCountries = [...prev];
         const country = newCountries[countryIndex];
         const newSelected = !country.selected;
         
         country.selected = newSelected;
         country.regions.forEach(region => {
            region.selected = newSelected;
            region.resortSelections.forEach(resort => {
               resort.selected = newSelected;
            });
         });
         
         return newCountries;
      });
   };

   const toggleRegion = (countryIndex: number, regionIndex: number) => {
      setCountries(prev => {
         const newCountries = [...prev];
         const region = newCountries[countryIndex].regions[regionIndex];
         const newSelected = !region.selected;
         
         region.selected = newSelected;
         region.resortSelections.forEach(resort => {
            resort.selected = newSelected;
         });
         
         // Update country selection state
         const allRegionsSelected = newCountries[countryIndex].regions.every(r => r.selected);
         newCountries[countryIndex].selected = allRegionsSelected;
         
         return newCountries;
      });
   };

   const toggleResort = (countryIndex: number, regionIndex: number, resortIndex: number) => {
      setCountries(prev => {
         const newCountries = [...prev];
         const resort = newCountries[countryIndex].regions[regionIndex].resortSelections[resortIndex];
         resort.selected = !resort.selected;
         
         // Update region selection state
         const region = newCountries[countryIndex].regions[regionIndex];
         const allResortsSelected = region.resortSelections.every(r => r.selected);
         region.selected = allResortsSelected;
         
         // Update country selection state
         const allRegionsSelected = newCountries[countryIndex].regions.every(r => r.selected);
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

      onSave({ countries: selectedCountries, regions: selectedRegions, resorts: selectedResorts });
      onClose();
   };

   const handleClear = () => {
      setCountries(prev => prev.map(country => ({
         ...country,
         selected: false,
         regions: country.regions.map(region => ({
            ...region,
            selected: false,
            resortSelections: region.resortSelections.map(resort => ({
               ...resort,
               selected: false
            }))
         }))
      })));
   };

   const getTotalSelections = () => {
      let total = 0;
      countries.forEach(country => {
         if (country.selected) {
            total++;
         } else {
            country.regions.forEach(region => {
               if (region.selected) {
                  total++;
               } else {
                  region.resortSelections.forEach(resort => {
                     if (resort.selected) {
                        total++;
                     }
                  });
               }
            });
         }
      });
      return total;
   };

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
                  {getTotalSelections()} destination{getTotalSelections() === 1 ? '' : 's'} selected
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

            {/* Scrollable Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }} onClick={(e) => e.stopPropagation()}>
               {countries.map((country, countryIndex) => (
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
                              toggleCountry(countryIndex);
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
                              toggleCountry(countryIndex);
                           }}
                        >
                           {country.country}
                        </span>
                     </div>

                     {/* Regions under Country */}
                     {country.regions.map((region, regionIndex) => (
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
                                       toggleRegion(countryIndex, regionIndex);
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
                                       toggleRegion(countryIndex, regionIndex);
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
                                       toggleRegionExpanded(countryIndex, regionIndex);
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
                                    <span>{region.count} resort{region.count === 1 ? '' : 's'}</span>
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
                                 {region.resortSelections.map((resort, resortIndex) => (
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
                                             toggleResort(countryIndex, regionIndex, resortIndex);
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
                                             toggleResort(countryIndex, regionIndex, resortIndex);
                                          }}
                                       >
                                          {resort.name}
                                       </span>
                                    </div>
                                 ))}
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               ))}
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
