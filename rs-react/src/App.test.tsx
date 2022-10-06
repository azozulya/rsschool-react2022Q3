import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App', () => {
  test('renders navigation', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  test('renders about page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const aboutLink = screen.getByRole('link', { name: /about/i });
    fireEvent.click(aboutLink);
    expect(screen.getByRole('heading').textContent).toEqual('About');
  });

  test('renders not found page', () => {
    window.history.pushState('not found', '404', '/404');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  test('renders form page', () => {
    window.history.pushState('form', 'form', '/form');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/CREATE USER PROFILE/i)).toBeInTheDocument();
  });
});
