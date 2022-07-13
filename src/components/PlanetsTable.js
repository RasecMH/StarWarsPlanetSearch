import React, { useContext, useEffect } from 'react';
import planetsContext from '../context/planetsContext';

const PlanetsTable = () => {
  const { data,
    getPlanets,
    filterByNumericValues,
    filterByName: { name } } = useContext(planetsContext);
  const headers = data.length ? Object.keys(data[0]) : [];

  useEffect(() => {
    getPlanets();
  }, []);

  const filterData = () => {
    let filteredData = data;
    filterByNumericValues.forEach((el) => {
      if (el.comparison === 'maior que') {
        filteredData = filteredData.filter((d) => d[el.column] > Number(el.value));
      }
      if (el.comparison === 'menor que') {
        filteredData = filteredData.filter((d) => d[el.column] < Number(el.value));
      }
      if (el.comparison === 'igual a') {
        filteredData = filteredData.filter((d) => d[el.column] === el.value);
      }
    });
    console.log(filteredData);
    return filteredData;
  };

  return (

    <table>
      <thead>
        <tr>
          {
            headers.map((header) => (
              <th key={ header }>{header}</th>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          filterData()
            .filter((planetFilter) => (
              planetFilter.name.includes(name)
            ))
            .map((planet, i) => (
              <tr key={ i }>
                {
                  headers.map((header) => (
                    <td key={ planet[header] }>
                      {planet[header]}
                    </td>
                  ))
                }
              </tr>
            ))
        }
      </tbody>
    </table>

  );
};

export default PlanetsTable;
