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
    filterByNumericValues: [
      {
        column: '',
        comparison: '',
        value: '',
      },
    ],
  };
  const [state, setState] = useState(INITIAL_STATE);

  const getPlanets = async () => {
    const response = await getPlanetsData();
    const planetsInfo = response.results.map((result) => {
      delete result.residents;
      return result;
    });
    setState((oldState) => ({ ...oldState,
      data: planetsInfo }));
  };

  const filterTableByName = ({ target: { value } }) => {
    setState((oldState) => (
      {
        ...oldState,
        filterByName: { name: value },
      }));
  };

  const addNumericFilter = (obj) => {
    setState((oldState) => ({ ...oldState,
      filterByNumericValues: [...oldState.filterByNumericValues, obj] }));
  };

  const removeNumericFilter = (obj) => {
    setState((oldState) => ({ ...oldState,
      filterByNumericValues: oldState
        .filterByNumericValues.filter((el) => el.column !== obj) }));
  };

  const removeAllNumericFilters = () => {
    setState((oldState) => ({ ...oldState,
      filterByNumericValues: [] }));
  };

  return (
    <planetsContext.Provider
      value={ { ...state,
        getPlanets,
        filterTableByName,
        addNumericFilter,
        removeNumericFilter,
        removeAllNumericFilters } }
    >
      {children}
    </planetsContext.Provider>
  );
};

PlanetsProvider.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PlanetsProvider;
