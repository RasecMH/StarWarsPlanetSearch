import React, { useContext, useState } from 'react';
import planetsContext from '../context/planetsContext';

const Filter = () => {
  const { filterByName: { name },
    filterTableByName,
    addNumericFilter,
    removeNumericFilter,
    removeAllNumericFilters,
    changeOrder } = useContext(planetsContext);
  const [numericForm, setNumericForm] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [options, setOptions] = useState([
    'population',
    'surface_water',
    'diameter',
    'orbital_period',
    'rotation_period',
  ]);
  const [filterButtons, setFilterButtons] = useState([]);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  console.log(options);
  console.log(filterButtons);

  const handleSubmit = () => {
    addNumericFilter(numericForm);
    setFilterButtons((oldState) => ([...oldState, numericForm]));
    setOptions((oldState) => (
      [...oldState.filter((option) => option !== numericForm.column)]
    ));
    setNumericForm((oldState) => (
      { ...oldState, column: options[0] }
    ));
  };

  const handleChange = ({ target }) => {
    setOrder((oldState) => (
      { ...oldState, [target.name]: target.value }
    ));
  };

  const removeFilter = ({ target: { value } }) => {
    console.log(value);
    removeNumericFilter(value);
    setOptions((oldState) => (
      [...oldState, value]
    ));
    setFilterButtons((oldState) => ([...oldState.filter((btn) => btn.column !== value)]));
  };

  const removeAllFilters = () => {
    removeAllNumericFilters();
    setOptions([
      'population',
      'surface_water',
      'diameter',
      'orbital_period',
      'rotation_period',
    ]);
    setFilterButtons([]);
    setNumericForm((oldState) => (
      { ...oldState, column: options[0] }
    ));
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ filterTableByName }
      />
      <select
        data-testid="column-filter"
        onChange={
          ({ target: { value } }) => setNumericForm((oldState) => (
            { ...oldState, column: value }
          ))
        }
      >
        {
          options.map((option) => (
            <option key={ option } value={ option }>{option}</option>
          ))
        }
      </select>
      <select
        data-testid="comparison-filter"
        name="select"
        onChange={
          ({ target: { value } }) => setNumericForm((oldState) => (
            { ...oldState, comparison: value }
          ))
        }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        value={ numericForm.value }
        onChange={
          ({ target: { value } }) => setNumericForm((oldState) => (
            { ...oldState, value }
          ))
        }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ handleSubmit }
      >
        Ok

      </button>
      {
        filterButtons.map((btn) => (
          <div data-testid="filter" key={ btn.column }>
            <button
              type="button"
              onClick={ removeFilter }
              value={ btn.column }
            >
              {`${btn.column} ${btn.comparison} ${btn.value} x`}
            </button>
          </div>
        ))
      }

      {
        filterButtons.length > 0 && (
          <button
            type="button"
            onClick={ removeAllFilters }
            data-testid="button-remove-filters"
          >
            Remove All

          </button>
        )
      }
      <select
        name="column"
        data-testid="column-sort"
        onChange={ handleChange }
      >
        {
          options.map((header) => (
            <option key={ header } value={ header }>
              {header}
            </option>
          ))
        }
      </select>
      <label htmlFor="asc">
        <input
          id="asc"
          name="sort"
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={ handleChange }
        />
        ASC
      </label>
      <label htmlFor="desc">
        <input
          id="desc"
          name="sort"
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ handleChange }
        />
        DESC
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => changeOrder(order) }
      >
        Order

      </button>
    </div>
  );
};

export default Filter;
