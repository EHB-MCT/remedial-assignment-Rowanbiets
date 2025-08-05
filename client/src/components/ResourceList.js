import React, { useEffect, useState } from 'react';
import API from '../api';

function ResourceList() {
  const [resources, setResources] = useState([]);

  const fetchResources = async () => {
    const res = await API.get('/resources');
    setResources(res.data);
  };

  const handleBuy = async (id) => {
    await API.post(`/resources/${id}/buy`);
    fetchResources();
  };

  const handleSell = async (id) => {
    await API.post(`/resources/${id}/sell`);
    fetchResources();
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div>
      <h2>Marktplaats</h2>
      {resources.map((r) => (
        <div key={r._id} style={{ marginBottom: '10px' }}>
          <strong>{r.name}</strong> - Prijs: {r.price} - Vraag: {r.demand} - Aanbod: {r.supply}
          <br />
          <button onClick={() => handleBuy(r._id)}>Koop</button>
          <button onClick={() => handleSell(r._id)}>Verkoop</button>
        </div>
      ))}
    </div>
  );
}

export default ResourceList;
