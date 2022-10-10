import React from 'react';
import { Cards } from '../components/Cards';
import { SearchBar } from '../components/SearchBar';
import { CardsData } from '../utils/cards';

export default function Main() {
  return (
    <>
      <h2>Main page</h2>
      <SearchBar />
      <Cards items={[...CardsData, ...CardsData]} />
    </>
  );
}
