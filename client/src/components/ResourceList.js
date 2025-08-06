import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  // Grondstoffen ophalen bij laden
  const fetchResources = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/resources');
      setResources(res.data);
    } catch (error) {
      console.error('❌ Fout bij ophalen van grondstoffen:', error);
    }
  };

  // Kopen
const handleBuy = async (resourceName) => {
  console.log("🛒 Kopen:", resourceName); // 👈 check of dit correct is
  try {
    await axios.post('http://localhost:3000/api/buy', { name: resourceName });
    fetchResources();
  } catch (error) {
    console.error('❌ Fout bij kopen:', error);
  }
};

const handleSell = async (resourceName) => {
  console.log("📤 Verkopen:", resourceName);
  try {
    await axios.post('http://localhost:3000/api/sell', { name: resourceName });
    fetchResources();
  } catch (error) {
    console.error('❌ Fout bij verkopen:', error);
  }
};


  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div>
      <h2>📦 Grondstoffen</h2>
      {resources.length === 0 ? (
        <p>⏳ Bezig met laden...</p>
      ) : (
        <ul>
          {resources.map((res) => (
            <li key={res._id} style={{ marginBottom: '1rem' }}>
              <strong>{res.name}</strong> — 💰 €{res.price}
              <br />
              📈 Vraag: {res.demand} | 📦 Aanbod: {res.supply}
              <br />
              <button onClick={() => handleBuy(res.name)} style={{ marginRight: '8px' }}>
                Kopen
              </button>
              <button onClick={() => handleSell(res.name)}>
                Verkopen
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResourceList;
