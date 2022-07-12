import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

const Filter = () => {
  const { filterByName: { name }, filterTableByName } = useContext(planetsContext);

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        value={ name }
        onChange={ filterTableByName }
      />
    </div>
  );
};

export default Filter;
