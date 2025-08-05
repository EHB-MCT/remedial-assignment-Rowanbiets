import React from 'react';
import API from '../api';

function SimulateButton({ onSimulate }) {
  const handleClick = async () => {
    await API.post('/simulate');
    onSimulate(); // refresh
  };

  return <button onClick={handleClick}>▶️ Simuleer Markt</button>;
}

export default SimulateButton;
