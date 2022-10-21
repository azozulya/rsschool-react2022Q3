import React from 'react';
import userEvent from '@testing-library/user-event';
import Main from './MainPage';
import { render, screen } from '@testing-library/react';
import { API_POPULAR_URL, API_URL } from '../utils/constants';

// global.fetch = jest.fn().mockImplementation(async () => {
//   const response = await Promise.resolve({
//     json: () => Promise.resolve(testMovies),
//   });
//   return response.json;
// });

jest.mock('node-fetch', () => {
  return jest.fn();
});

import fetch from 'node-fetch';
// const { Response } = jest.requireActual('node-fetch');

const QUERY_STRING = 'cars';

describe('Main page', () => {
  test('renders form with empty input', () => {
    render(<Main />);
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeEmptyDOMElement();
  });

  test('renders popular movies', async () => {
    render(<Main />);
    // expect(fetch).toBeCalledTimes(1);
    // expect(fetch).toHaveBeenCalledWith(API_POPULAR_URL);

    const cards = await screen.findAllByTestId('card');
    expect(cards).toBeDefined();
    expect(cards.length).toBeGreaterThan(1);
    expect(await screen.findByText(/popular movies/i)).toBeInTheDocument();
  });

  test('should search movie when input changed', async () => {
    fetch.mockReturnValue(Promise.resolve(new Response('4')));

    render(<Main />);
    const form = screen.getByTestId<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole('textbox');

    //expect(fetch).toHaveBeenCalledTimes(1);

    userEvent.type(inputElement, QUERY_STRING);
    userEvent.click(form);

    // expect(fetch).toHaveBeenCalledTimes(2);
    // expect(fetch).toHaveBeenCalledWith(`${API_URL}&query=${QUERY_STRING}&page=1`);

    const cards = await screen.findAllByTestId('card');
    expect(cards).toBeDefined();
    expect(cards.length).toBeGreaterThan(1);
    expect(await screen.findByText(/find/i)).toBeInTheDocument();
  });
});
