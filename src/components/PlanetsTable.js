import React, { useContext, useEffect } from 'react';
import planetsContext from '../context/planetsContext';

const PlanetsTable = () => {
  const NEGATIVE_NUMBER = -1;
  const { data,
    getPlanets,
    filterByNumericValues,
    filterByName: { name },
    order } = useContext(planetsContext);
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
    const sortedDataAlphabetical = [...filteredData].sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      // if (a.name < b.name) {
      //   return NEGATIVE_NUMBER;
      // }
      return NEGATIVE_NUMBER;
    });
    return order.column === 'name' ? sortedDataAlphabetical : filteredData;
  };

  const orderData = (a, b) => {
    if (a === 'unknown' || b === 'unknown') {
      return a !== 'unknown' ? NEGATIVE_NUMBER : 1;
    }

    // return order.sort === 'ASC' ? 1 : NEGATIVE_NUMBER;

    // if (a > b) {
    //   return order.sort === 'ASC' ? 1 : NEGATIVE_NUMBER;
    // }
    // if (a < b) {
    //   return order.sort === 'ASC' ? NEGATIVE_NUMBER : 1;
    // }
    // return 0;
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
            .sort((a, b) => {
              if (Number.isNaN(Number(a[order.column]))
                || Number.isNaN(Number(b[order.column]))) {
                orderData(a[order.column], b[order.column]);
              }

              return order.sort === 'ASC'
                ? a[order.column] - b[order.column]
                : b[order.column] - a[order.column];
            })
            .filter((planetFilter) => (
              planetFilter.name.includes(name)
            ))
            .map((planet, i) => (
              <tr key={ i }>
                {
                  headers.map((header) => (
                    <td
                      key={ planet[header] }
                      data-testid={ header === 'name' ? 'planet-name' : '' }
                    >
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
