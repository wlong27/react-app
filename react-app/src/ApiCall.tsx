import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const ApiCall: React.FC = () => {

  const [data, setData] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://swapi.dev/api/people/?page=${currentPage}`
        );
        const data = await response.data.results;
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div>
      <h1>Star Wars Characters:</h1>
      <ul>
        {data.map((character, index) => (
          <li key={index}>
            <Link to={`/characters/${encodeURIComponent(character.name)}`}>
              {character.name}
            </Link>
            - {character.height}cm, {character.mass}kg
          </li>
        ))}
      </ul>
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>

  );
};

export default ApiCall;
