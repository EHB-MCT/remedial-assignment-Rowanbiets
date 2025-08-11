import React from 'react';
import ResourceList from './components/ResourceList';
import SimulateButton from './components/SimulateButton';

function App() {
  const [refresh, setRefresh] = React.useState(false);

  return (
    <div>
      <h1>🛒 Markt Simulatie</h1>
      <SimulateButton onSimulate={() => setRefresh(!refresh)} />
      <ResourceList key={refresh} />
    </div>
  );
}

export default App;
