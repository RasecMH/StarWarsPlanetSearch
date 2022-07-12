import React, { useContext, useEffect } from 'react';
import planetsContext from '../context/planetsContext';

const PlanetsTable = () => {
  const { data, getPlanets } = useContext(planetsContext);
  const headers = data.length ? Object.keys(data[0]) : [];

  useEffect(() => {
    getPlanets();
  }, []);

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
          data.map((planet, i) => (
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
