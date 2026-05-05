'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Loading from '@/components/Loading/Loading';

interface Character {
  name: string;
  height: string;
  mass: string;
}

export default function CharactersPage() {
  const [data, setData] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${currentPage}`
        );
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="App">
          <h1>Characters:</h1>
          <ul>
            {data.map((character, index) => (
              <li key={index}>
                <Link href={`/characters/${encodeURIComponent(character.name)}`}>
                  {character.name}
                </Link>
                {' '}- {character.height}cm, {character.mass}kg
              </li>
            ))}
          </ul>
          <button onClick={() => setCurrentPage((p) => p - 1)} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={() => setCurrentPage((p) => p + 1)}>Next Page</button>
        </div>
      )}
    </div>
  );
}
