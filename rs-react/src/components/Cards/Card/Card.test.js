import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';
import { cardsData } from '../../../assets/data/testCards';

describe('Card', () => {
  test('render 1 card', () => {
    render(<Card item={cardsData[0]} key={cardsData[0].id} />);
    const cardElement = screen.getByText(cardsData[0].title);
    expect(cardElement).toBeInTheDocument();
  });
  test('render 2 cards', () => {
    render(<Card item={cardsData[0]} key={cardsData[0].id} />);
    render(<Card item={cardsData[1]} key={cardsData[1].id} />);

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toEqual(2);
  });
});
