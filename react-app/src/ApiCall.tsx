import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ApiCall: React.FC = () => {
    const [data, setData] = useState<Character[]>([]);
  
    useEffect(() => {
      // Function to make the API call
      const fetchData = async () => {
        try {
          const response = await fetch('https://swapi.dev/api/people/');
          const data = await response.json();
          setData(data.results); // Store the API response (an array of people) in the 'data' state
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Call the function to fetch data when the component mounts
    }, []);
  
    return (
        <div>
          <h1>Star Wars Characters:</h1>
          <ul>
            {data.map((character) => (
              <li key={character.name}>
                <Link to={`/characters/${encodeURIComponent(character.name)}`}>
                  {character.name}
                </Link>
                - {character.height}cm, {character.mass}kg
              </li>
            ))}
          </ul>
        </div>
      );
  };
  
export default ApiCall;