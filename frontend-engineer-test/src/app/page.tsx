"use client";

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Filter from '@/components/Filter';
import CharacterItem from '@/components/CharacterItem';

interface Character {
  id: number;
  name: string;
  homeworld: { name: string; url: string };
  height: string;
  mass: string;
  gender: string;
}

interface Planet {
  name: string;
  url: string;
}

export default function Home() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPlanetName, setSelectedPlanetName] = useState('All Characters');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const API_PLANETS = process.env.NEXT_PUBLIC_API_PLANETS;
  const API_PEOPLE = process.env.NEXT_PUBLIC_API_PEOPLE;

  useEffect(() => {
    const fetchPlanets = async () => {
      const planetResponse = await fetch(`${API_BASE_URL}${API_PLANETS}`);
      const planetData = await planetResponse.json();
      setPlanets(planetData.results);
    };

    fetchPlanets();
  }, [API_BASE_URL, API_PLANETS]);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const characterResponse = await fetch(`${API_BASE_URL}${API_PEOPLE}/?page=${page}`);
      const characterData = await characterResponse.json();

      if (!characterData.results.length) {
        setAllLoaded(true);
        setLoading(false);
        return;
      }

      const charactersWithHomeworld = await Promise.all(
        characterData.results.map(async (character: any, index: number) => {
          const homeworldResponse = await fetch(character.homeworld.replace('http://swapi.dev/api', `${API_BASE_URL}`));
          const homeworldData = await homeworldResponse.json();
          return {
            id: page * 10 + index, // Unique ID based on page and index
            name: character.name,
            homeworld: { name: homeworldData.name, url: character.homeworld },
            height: character.height,
            mass: character.mass,
            gender: character.gender,
          };
        })
      );

      setCharacters((prevCharacters) => [...prevCharacters, ...charactersWithHomeworld]);
      setFilteredCharacters((prevCharacters) => [...prevCharacters, ...charactersWithHomeworld]);
      setLoading(false);
    };

    if (!allLoaded) {
      fetchCharacters();
    }
  }, [page, allLoaded, API_BASE_URL, API_PEOPLE]);

  const handleFilterChange = (planetUrl: string) => {
    if (planetUrl === '') {
      setFilteredCharacters(characters.slice(0, page * 8));
      setSelectedPlanetName('All Characters');
    } else {
      setFilteredCharacters(
        characters.filter((character) => character.homeworld.url === planetUrl).slice(0, page * 8)
      );
      const planet = planets.find((planet) => planet.url === planetUrl);
      setSelectedPlanetName(planet ? planet.name : 'Filtered Characters');
    }
  };

  const handleClearAll = () => {
    setFilteredCharacters(characters.slice(0, page * 8));
    setSelectedPlanetName('All Characters');
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <Header />
      <div className="pt-8">
        <Filter planets={planets} onFilterChange={handleFilterChange} onClearAll={handleClearAll} />
      </div>
      <h2 className="font-helvetica text-34 font-light leading-32 text-primary text-left mt-8 pl-4">
        {selectedPlanetName}
      </h2>
      {loading ? (
        <div className="flex justify-center my-4">
          <div className="loader"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCharacters.map((character) => (
            <CharacterItem key={character.id} character={character} />
          ))}
        </main>
      )}
      {!loading && !allLoaded && (
        <div className="flex justify-center my-4">
          <button
            onClick={handleLoadMore}
            className="load-more-button"
            disabled={allLoaded}
          >
            {allLoaded ? 'No More Characters' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
