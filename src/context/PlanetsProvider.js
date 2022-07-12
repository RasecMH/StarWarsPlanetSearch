import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';
import getPlanetsData from '../services/planetsApi';

const PlanetsProvider = ({ children }) => {
  const [data, setData] = useState([{}]);

  const getPlanets = async () => {
    const response = await getPlanetsData();
    const planetsInfo = response.results.map((result) => {
      delete result.residents;
      return result;
    });
    setData(planetsInfo);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <planetsContext.Provider value={ { data, getPlanets } }>
      {children}
    </planetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PlanetsProvider;
