import React from 'react';
import { useParams } from 'react-router-dom';

const CharacterDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();

  return (
    <div>
      <h1>Character Details: {name}</h1>
      {/* Add more details about the character using the SWAPI */}
    </div>
  );
};

export default CharacterDetails;
