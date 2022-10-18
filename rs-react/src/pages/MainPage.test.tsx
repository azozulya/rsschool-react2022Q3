import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Main from './MainPage';

describe('Main page', () => {
  test('renders popular movies', async () => {
    render(<Main />);
    const cards = await screen.findAllByTestId('card');

    expect(cards).toBeDefined();
    expect(await screen.findByText(/popular movies/i)).toBeInTheDocument();
  });

  test('renders form with empty input', () => {
    render(<Main />);
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeEmptyDOMElement();
  });

  test('should search movie', () => {
    render(<Main />);
    const form = screen.getByTestId('search-form');
    const inputElement = screen.getByRole('textbox');
    userEvent.type(inputElement, 'cars');
    userEvent.click(form);

    screen.debug();
  });
});
