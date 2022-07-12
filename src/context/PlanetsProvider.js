import React, { useState } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';
import getPlanetsData from '../services/planetsApi';

const PlanetsProvider = ({ children }) => {
  const INITIAL_STATE = {
    data: [],
    filterByName: {
      name: '',
    },
    filterByNumericValue: [],
  };
  const [state, setState] = useState(INITIAL_STATE);

  const getPlanets = async () => {
    const response = await getPlanetsData();
    const planetsInfo = response.results.map((result) => {
      delete result.residents;
      return result;
    });
    setState((oldState) => ({ ...oldState,
      data: planetsInfo,
      planetsData: planetsInfo }));
  };

  const filterTableByName = ({ target: { value } }) => {
    setState((oldState) => (
      {
        ...oldState,
        data: oldState.planetsData.filter((planet) => planet.name.includes(value)),
        filterByName: { name: value },
      }));
  };

  return (
    <planetsContext.Provider value={ { ...state, getPlanets, filterTableByName } }>
      {children}
    </planetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PlanetsProvider;
