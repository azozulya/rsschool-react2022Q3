import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import style from './SearchBar.module.css';

const SearchBar = () => {
  const { searchString, setSearchString } = useGlobalContext();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const el = event.target as HTMLFormElement;
    setSearchString(el.searchString.value);
  };

  return (
    <form onSubmit={submitHandler} className={style.form} data-testid="search-form">
      <input
        name="searchString"
        type="text"
        defaultValue={searchString}
        placeholder="Search"
        className={style.input}
        autoComplete="off"
      />
    </form>
  );
};

export { SearchBar };
