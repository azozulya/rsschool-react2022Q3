import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './Card';

const data = [
    {
        image: 'https://images.unsplash.com/photo-1613578723854-972200002cc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        title: 'The horses on the plains of Patagonia with the Torres Del Paine mountains in the background',
        author: {
            name: 'martin bennie',
            link: 'https://unsplash.com/@martinbennie',
        },
        place: 'Torres del Paine, Torres de Paine, Chile',
        category: 'Travel',
    },
    {
        image: 'https://images.unsplash.com/photo-1663219619979-5dd51f7cc8c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1824&q=80',
        title: '',
        author: {
            name: 'Francesco Ungaro',
            link: 'https://unsplash.com/@francesco_ungaro',
        },
        category: 'Travel, Act For Nature',
    }
];

describe('Card', () => {
    test('render 1 card', () => {
        render(<Card item={data[0]}/>);
        
        const cardElement = screen.getByText(data[0].title);
        expect(cardElement).toBeInTheDocument();
      });
      
      test('render 2 cards', () => {
          render(<Card item={data[0]}/>);
          render(<Card item={data[1]}/>);
      
          const cards = screen.getAllByTestId('card');
          expect(cards.length).toEqual(2);
        });
      
});
