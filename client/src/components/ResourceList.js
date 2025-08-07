import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [message, setMessage] = useState('');

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/resources');
      setResources(response.data);
    } catch (err) {
      console.error('❌ Fout bij ophalen van resources:', err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleChange = (resourceName, value) => {
    setAmounts({
      ...amounts,
      [resourceName]: parseInt(value),
    });
  };

  const handleBuy = async (resourceName) => {
    const amount = amounts[resourceName] || 1;
    try {
      const res = await axios.post('http://localhost:3000/api/buy', {
        name: resourceName,
        amount,
      });
      setMessage(res.data.message);
      fetchResources();
    } catch (error) {
      console.error('❌ Fout bij kopen:', error);
      setMessage(error.response?.data?.message || 'Fout bij kopen');
    }
  };

  const handleSell = async (resourceName) => {
    const amount = amounts[resourceName] || 1;
    try {
      const res = await axios.post('http://localhost:3000/api/sell', {
        name: resourceName,
        amount,
      });
      setMessage(res.data.message);
      fetchResources();
    } catch (error) {
      console.error('❌ Fout bij verkopen:', error);
      setMessage(error.response?.data?.message || 'Fout bij verkopen');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>📦 Huidige Grondstoffen</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Prijs</th>
            <th>Voorraad</th>
            <th>Vraag</th>
            <th>Aantal</th>
            <th>Acties</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res._id}>
              <td>{res.name}</td>
              <td>€ {res.price}</td>
              <td>{res.supply}</td>
              <td>{res.demand}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={amounts[res.name] || ''}
                  onChange={(e) => handleChange(res.name, e.target.value)}
                  placeholder="Aantal"
                />
              </td>
              <td>
                <button onClick={() => handleBuy(res.name)}>Kopen</button>{' '}
                <button onClick={() => handleSell(res.name)}>Verkopen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceList;
