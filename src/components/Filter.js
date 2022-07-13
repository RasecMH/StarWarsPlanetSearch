import React, { useContext, useState } from 'react';
import planetsContext from '../context/planetsContext';

const Filter = () => {
  const { filterByName: { name },
    filterTableByName, data, addNumericFilter } = useContext(planetsContext);
  const [numericForm, setNumericForm] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const options = data.length
    ? Object.keys(data[0])
      .filter((planetKey) => !Number.isNaN(Number(data[0][planetKey])))
      .reverse()
    : ['passou'];
  // console.log(typeof data[0].rotation_period === 'number');
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
        onClick={ () => addNumericFilter(numericForm) }
      >
        Ok

      </button>
    </div>
  );
};

export default Filter;
