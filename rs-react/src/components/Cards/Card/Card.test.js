import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { testMovies } from '../../../assets/testData/testMovies';

describe('Card', () => {
  const card1 = testMovies.results[0];
  const card2 = testMovies.results[1];

  test('render 1 card', () => {
    render(<Card item={card1} key={card1.id} />);
    const cardElement = screen.getByTestId('card');
    expect(cardElement).toBeInTheDocument();
  });

  test('render 2 cards', () => {
    render(<Card item={card1} key={card1.id} />);
    render(<Card item={card2} key={card2.id} />);

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toEqual(2);
  });
});
