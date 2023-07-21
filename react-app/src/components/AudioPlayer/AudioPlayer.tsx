// AudioPlayer.js

import React from 'react';

const AudioPlayer = () => {
  return (
    <audio controls autoPlay>
      <source src="The Imperial March.mp3" type="audio/mpeg" />
      {/* Add other source elements for different audio formats if needed */}
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;
