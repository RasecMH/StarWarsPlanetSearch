import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockObj from './mock'

describe('teste end to end', () => {
  beforeEach(async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockObj)
    })
    await act(async () => {
        render(<App />)
    })
  });

test('teste de os elementos de filtro são renderizados', async () => {
 
  const planetsTableEl = screen.getByRole('table');
  expect(planetsTableEl).toBeInTheDocument();
  const planetRowsEl = await screen.findAllByRole('row', {timeout: 5000});
  expect(planetRowsEl).toHaveLength(11);
  const filterNameEl = screen.getByTestId('name-filter');
  userEvent.type(filterNameEl, 'oo');
  const filteredEl = screen.findByText('Naboo');
  userEvent.clear(filterNameEl);
  
  
  const selectByNumberEl = screen.getByTestId('column-filter');
  const surfaceOption = screen.getAllByRole('option', {name: 'surface_water'});
  const comparisonEl = screen.getByTestId('comparison-filter');
  const inputNumberEl = screen.getByTestId('value-filter');
  const sendNumberBtnEl = screen.getByTestId('button-filter');
  userEvent.selectOptions(selectByNumberEl, ['surface_water']);
  userEvent.selectOptions(comparisonEl, ['menor que']);
  userEvent.type(inputNumberEl, '8');
  userEvent.click(sendNumberBtnEl);
  userEvent.selectOptions(selectByNumberEl, ['diameter']);
  userEvent.selectOptions(comparisonEl, ['maior que']);
  userEvent.type(inputNumberEl, '8900');
  userEvent.click(sendNumberBtnEl);
  userEvent.selectOptions(selectByNumberEl, ['rotation_period']);
  userEvent.selectOptions(comparisonEl, ['igual a']);
  userEvent.type(inputNumberEl, '12');
  userEvent.click(sendNumberBtnEl);
  const filterNumberBtn = screen.getByRole('button', {name: 'surface_water menor que 08 x'});
  userEvent.click(filterNumberBtn);
  const removeAllBtn = screen.getByTestId('button-remove-filters');
  userEvent.click(removeAllBtn);

  
  
  const selectOrderEl = screen.getByTestId('column-sort');
  const selectAscEl = screen.getByTestId('column-sort-input-asc');
  const selectDescEl = screen.getByTestId('column-sort-input-desc');
  const orderBtnEl = screen.getByTestId('column-sort-button');
  userEvent.selectOptions(selectOrderEl, ['rotation_period']);
  userEvent.click(selectDescEl);
  userEvent.click(orderBtnEl);
  userEvent.click(selectAscEl);
  userEvent.click(orderBtnEl);
  userEvent.selectOptions(selectOrderEl, ['surface_water']);
  userEvent.click(selectDescEl);
  userEvent.click(orderBtnEl);
  userEvent.click(selectAscEl);
  userEvent.click(orderBtnEl);
  userEvent.selectOptions(selectOrderEl, ['population']);
  userEvent.click(selectDescEl);
  userEvent.click(orderBtnEl);
  userEvent.click(selectAscEl);
  userEvent.click(orderBtnEl);
  userEvent.selectOptions(selectOrderEl, ['diameter']);
  userEvent.click(selectDescEl);
  userEvent.click(orderBtnEl);
  userEvent.click(selectAscEl);
  userEvent.click(orderBtnEl);
  userEvent.selectOptions(selectOrderEl, ['orbital_period']);
  userEvent.click(selectDescEl);
  userEvent.click(orderBtnEl);
  userEvent.click(selectAscEl);
  userEvent.click(orderBtnEl);

});
})