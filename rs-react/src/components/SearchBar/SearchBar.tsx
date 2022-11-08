import React from 'react';
import { getData } from '../../api/getData';
import { useDispatch } from '../../state/dispatchContext';
import { useGlobalState } from '../../state/globalStateContext';
import style from './SearchBar.module.css';

const SearchBar = () => {
  const { searchString } = useGlobalState();
  const { setSearchString } = useDispatch();

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
