import React from 'react';
import Card from './Card';
import Main from '../../../pages/MainPage';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
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

  test('should click on card', () => {
    const clickHandler = jest.fn();
    render(<Card item={card1} key={card1.id} onClick={clickHandler} />);

    const card = screen.getByTestId('card');
    userEvent.click(card);

    expect(clickHandler).toBeCalledTimes(1);
  });

  test('should open popup', async () => {
    render(<Main />);

    const cards = await screen.findAllByTestId('card');
    act(() => userEvent.click(cards[0]));

    const modal = await screen.findByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toBeVisible();

    userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByTestId('modal')).toBeNull();
  });

  test('should close popup after close button click', async () => {
    render(<Main />);

    const cards = await screen.findAllByTestId('card');
    act(() => userEvent.click(cards[0]));

    expect(await screen.findByTestId('modal')).toBeInTheDocument();

    userEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByTestId('modal')).toBeNull();
  });
});
