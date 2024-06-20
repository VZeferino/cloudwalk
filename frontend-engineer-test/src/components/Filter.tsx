"use client";

import { useState, useEffect } from 'react';

interface FilterProps {
  planets: { name: string; url: string }[];
  onFilterChange: (planetUrl: string) => void;
  onClearAll: () => void;
}

const Filter: React.FC<FilterProps> = ({ planets, onFilterChange, onClearAll }) => {
  const [selectedPlanet, setSelectedPlanet] = useState('');

  useEffect(() => {
    onFilterChange(selectedPlanet);
  }, [selectedPlanet, onFilterChange]);

  return (
    <nav className="p-4 bg-white text-left flex items-center justify-between">
      <div className="flex items-center">
        <p className="font-helvetica text-18 font-light leading-32 text-background mr-4">
          Filter By:
        </p>
        <div className="relative">
          <select
            value={selectedPlanet}
            onChange={(e) => setSelectedPlanet(e.target.value)}
            className="p-2 pl-4 pr-16 border-b-2 border-custom-gray text-black rounded-none font-helvetica text-16 font-normal leading-19 bg-white appearance-none select-no-outline"
          >
            <option value="">All</option>
            {planets.map((planet) => (
              <option key={planet.name} value={planet.url}>
                {planet.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="fill-custom-gray"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              width="20"
              height="20"
            >
              <path d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" />
            </svg>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          setSelectedPlanet('');
          onClearAll();
        }}
        className="w-40 h-10 p-1 px-10 border border-custom-light-gray text-custom-light-gray font-helvetica button-clear-all"
      >
        Clear All
      </button>
    </nav>
  );
};

export default Filter;
