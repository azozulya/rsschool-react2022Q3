import React from 'react';
import { fireEvent, createEvent, render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { SEARCH_STRING_LS } from '../../utils/constants'

const localStorageMock = () => {
  let storage = {};
  return {
    getItem: (key = 'key') => storage[key] || '',
    setItem: (key = 'key', value) => storage[key] = value.toString(),
    clear: () => storage = {}
  }
};

describe('SearchBar', () => {
  test('render search input', () => {
    render(<SearchBar />);
    
    const searchInputElement = screen.getByRole('textbox');
    expect(searchInputElement).toBeInTheDocument();
  });

  
  test('save input value to localStorage after unmount', () => {
    localStorage = localStorageMock();
    localStorage.clear();

    const testString = 'test string';
    const {unmount} = render(<SearchBar />);
    const searchInputElement = screen.getByRole('textbox');

    fireEvent.change(searchInputElement, {target: {value: testString}});

    expect(searchInputElement).toContainHTML(testString);

    expect(localStorage.getItem(SEARCH_STRING_LS)).not.toEqual(testString);

    unmount();

    expect(localStorage.getItem(SEARCH_STRING_LS)).toEqual(testString);
  });

  it("should prevent default action on submit", () => {
    render(<SearchBar />);
    const form = screen.getByTestId('search-form');
    const submitEvent = createEvent.submit(form);
     
    fireEvent(form, submitEvent);

    expect(submitEvent.defaultPrevented).toBeTruthy();
  });
})
