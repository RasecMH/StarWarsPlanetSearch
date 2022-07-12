import React, { useContext } from 'react';
import planetsContext from '../context/planetsContext';

const PlanetsTable = () => {
  const { data } = useContext(planetsContext);

  const headers = Object.keys(data[0]);

  return (

    <table>
      <tr>
        {
          headers.map((header) => (
            <th key={ header }>{header}</th>
          ))
        }
      </tr>
      {
        data.map((planet) => (
          <tr key={ planet.name }>
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
    </table>

  );
};

export default PlanetsTable;
