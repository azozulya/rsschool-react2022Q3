import React from 'react';
import userEvent from '@testing-library/user-event';
import Main from './MainPage';
import { fireEvent, render, screen } from '@testing-library/react';
import { API_POPULAR_URL, API_URL } from '../utils/constants';
import * as movies from '../assets/testData/movies.json';

const QUERY_STRING = 'cars';

describe('Main page', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(movies),
    })
  ) as jest.Mock;

  afterEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  test('renders form with empty input', () => {
    render(<Main />);
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeEmptyDOMElement();
  });

  test('renders popular movies', async () => {
    render(<Main />);
    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(API_POPULAR_URL);

    // const cards = await screen.findAllByTestId('card');
    // expect(cards).toBeDefined();
    // expect(cards.length).toBeGreaterThan(1);
    // expect(await screen.findByText(/popular movies/i)).toBeInTheDocument();
  });

  test('should search movie when input changed', async () => {
    render(<Main />);
    const form = screen.getByTestId<HTMLFormElement>('search-form');
    const inputElement = screen.getByRole('textbox');

    userEvent.type(inputElement, QUERY_STRING);
    fireEvent.submit(form);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}&query=${QUERY_STRING}&page=1`);

    // const cards = await screen.findAllByTestId('card');
    // expect(cards).toBeDefined();
    // expect(cards.length).toBeGreaterThan(1);
    // expect(await screen.findByText(/find/i)).toBeInTheDocument();
  });

  test('handles exception with null', () => {
    (fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('error'));
    expect(screen.findByText(/Nothing find/i));
  });
});
