'use client'
import React, { useState, useCallback, useRef, FC, useMemo } from "react";
import { useClickAway } from "react-use";

interface Option {
   value: string;
   label: string;
}

type SearchableSelectProps = {
   options: Option[];
   value: string;
   placeholder: string;
   className?: string;
   onChange: (value: string) => void;
   searchPlaceholder?: string;
}

const SearchableSelect: FC<SearchableSelectProps> = ({
   options,
   value,
   placeholder,
   className,
   onChange,
   searchPlaceholder = "Search..."
}) => {
   const [open, setOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const ref = useRef<HTMLDivElement | null>(null);
   const searchInputRef = useRef<HTMLInputElement | null>(null);

   const onClose = useCallback(() => {
      setOpen(false);
      setSearchTerm("");
   }, []);

   useClickAway(ref, onClose);

   const currentOption = useMemo(() => 
      options.find(opt => opt.value === value),
      [options, value]
   );

   const filteredOptions = useMemo(() => {
      if (!searchTerm.trim()) {
         // Show first 10 alphabetically sorted options when no search
         return [...options]
            .sort((a, b) => a.label.localeCompare(b.label))
            .slice(0, 10);
      }
      
      // Filter based on search and show max 10 results
      const lowerSearch = searchTerm.toLowerCase();
      return options
         .filter(opt => opt.label.toLowerCase().includes(lowerSearch))
         .sort((a, b) => a.label.localeCompare(b.label))
         .slice(0, 10);
   }, [options, searchTerm]);

   const handleToggle = useCallback(() => {
      setOpen(prev => {
         const newState = !prev;
         if (newState) {
            // Focus search input when opening
            setTimeout(() => searchInputRef.current?.focus(), 50);
         }
         return newState;
      });
   }, []);

   const handleOptionClick = useCallback((optionValue: string) => {
      onChange(optionValue);
      onClose();
   }, [onChange, onClose]);

   return (
      <div
         className={`nice-select form-select-lg ${className || ""} ${open ? "open" : ""}`}
         role="button"
         tabIndex={0}
         onClick={handleToggle}
         onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
               e.preventDefault();
               handleToggle();
            }
         }}
         ref={ref}
         style={{
            textTransform: 'none',
            height: 'auto',
            lineHeight: 'normal',
            padding: '12px 17px',
            paddingLeft: '17px',
            width: '216px',
            boxSizing: 'border-box',
            border: 'none',
         }}
      >
         <span className="current" style={{ textTransform: 'none', fontSize: '13px' }}>{currentOption?.label || placeholder}</span>
         <ul
            className="list"
            role="menubar"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
         >
            {/* Search Input */}
            <li className="search-input-wrapper" style={{ padding: '6px 8px', borderBottom: '1px solid #e5e7eb' }}>
               <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="search-input"
                  style={{
                     width: '100%',
                     padding: '10px 8px',
                     fontSize: '12px',
                     border: '1px solid #d1d5db',
                     borderRadius: '4px',
                     outline: 'none',
                     lineHeight: '1.2',
                     height: '40px',
                     color: '#374151'
                  }}
                  onClick={(e) => e.stopPropagation()}
               />
               <style jsx>{`
                  .search-input::placeholder {
                     color: #9ca3af;
                     opacity: 1;
                     font-size: 12px;s
                  }
               `}</style>
            </li>
            
            {/* Options List */}
            {filteredOptions.length > 0 ? (
               filteredOptions.map((item) => (
                  <li
                     key={item.value}
                     data-value={item.value}
                     className={`option ${item.value === value ? "selected focus" : ""}`}
                     style={{ fontSize: '13px', textTransform: 'none' }}
                     role="menuitem"
                     onClick={() => handleOptionClick(item.value)}
                     onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                           e.preventDefault();
                           handleOptionClick(item.value);
                        }
                     }}
                  >
                     {item.label}
                  </li>
               ))
            ) : (
               <li className="option disabled" style={{ fontSize: '13px', color: '#9ca3af', textTransform: 'none' }}>
                  No results found
               </li>
            )}
         </ul>
      </div>
   );
};

export default SearchableSelect;
