import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [amounts, setAmounts] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/resources');
      setResources(response.data);
      setError('');
    } catch (err) {
      setError('Fout bij ophalen van resources');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleChange = (resourceName, value) => {
    if (value < 1) return;
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
      setError('');
      fetchResources();
    } catch (error) {
      setError(error.response?.data?.message || 'Fout bij kopen');
      setMessage('');
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
      setError('');
      fetchResources();
    } catch (error) {
      setError(error.response?.data?.message || 'Fout bij verkopen');
      setMessage('');
    }
  };

  return (
    <div style={{ 
      ...styles.container, 
      background: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)',
      minHeight: '90vh',
      borderRadius: 10,
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      padding: '2rem',
    }}>
      <h2 style={styles.heading}>📦 Huidige Grondstoffen</h2>
      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.error}>{error}</p>}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Naam</th>
            <th style={styles.th}>Prijs (€)</th>
            <th style={styles.th}>Voorraad</th>
            <th style={styles.th}>Vraag</th>
            <th style={styles.th}>Aantal</th>
            <th style={styles.th}>Acties</th>
          </tr>
        </thead>
        <tbody>
          {resources.map((res) => (
            <tr key={res._id} style={styles.tr}>
              <td style={styles.td}>{res.name}</td>
              <td style={styles.td}>{res.price}</td>
              <td style={styles.td}>{res.supply}</td>
              <td style={styles.td}>{res.demand}</td>
              <td style={styles.td}>
                <input
                  type="number"
                  min="1"
                  value={amounts[res.name] || ''}
                  onChange={(e) => handleChange(res.name, e.target.value)}
                  style={styles.input}
                  placeholder="Aantal"
                />
              </td>
              <td style={styles.td}>
                <button style={styles.buyButton} onClick={() => handleBuy(res.name)}>Kopen</button>{' '}
                <button style={styles.sellButton} onClick={() => handleSell(res.name)}>Verkopen</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 900,
    margin: '2rem auto',
    padding: '1rem',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    color: '#222',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontWeight: '700',
  },
  message: {
    color: '#2e7d32',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  error: {
    color: '#c62828',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '1rem',
  },
  th: {
    borderBottom: '2px solid #bbb',
    padding: '10px',
    backgroundColor: '#b2ebf2',
  },
  tr: {
    borderBottom: '1px solid #ccc',
    transition: 'background-color 0.2s ease',
  },
  td: {
    padding: '10px',
    textAlign: 'center',
  },
  input: {
    width: 70,
    padding: '6px',
    fontSize: '1rem',
    borderRadius: 4,
    border: '1px solid #ccc',
    textAlign: 'center',
  },
  buyButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    padding: '6px 14px',
    cursor: 'pointer',
    borderRadius: 4,
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  sellButton: {
    backgroundColor: '#e53935',
    color: 'white',
    border: 'none',
    padding: '6px 14px',
    cursor: 'pointer',
    borderRadius: 4,
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
};

export default ResourceList;
