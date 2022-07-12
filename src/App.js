import React from 'react';
import './App.css';
import Filter from './components/Filter';
import PlanetsTable from './components/PlanetsTable';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <Filter />
      <PlanetsTable />
    </PlanetsProvider>
  );
}

export default App;
