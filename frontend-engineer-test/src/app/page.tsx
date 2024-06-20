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

  useEffect(() => {
    const fetchPlanets = async () => {
      const planetResponse = await fetch('/api/planets');
      const planetData = await planetResponse.json();
      setPlanets(planetData.results);
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const characterResponse = await fetch(`/api/people/?page=${page}`);
      const characterData = await characterResponse.json();

      if (!characterData.results.length) {
        setAllLoaded(true);
        setLoading(false);
        return;
      }

      const charactersWithHomeworld = await Promise.all(
        characterData.results.map(async (character: any, index: number) => {
          const homeworldResponse = await fetch(character.homeworld.replace('http://swapi.dev/api', '/api'));
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
  }, [page, allLoaded]);

  const handleFilterChange = (planetUrl: string) => {
    if (planetUrl === '') {
      setFilteredCharacters(characters.slice(0, page * 8));
    } else {
      setFilteredCharacters(
        characters.filter((character) => character.homeworld.url === planetUrl).slice(0, page * 8)
      );
    }
  };

  const handleClearAll = () => {
    setFilteredCharacters(characters.slice(0, page * 8));
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
      {loading ? (
        <div className="flex justify-center my-4">
          <div className="loader"></div> {/* Placeholder for a loading spinner */}
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
