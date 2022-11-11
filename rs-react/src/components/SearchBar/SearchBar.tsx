import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchPhotosBySearchString } from '../../store/thunks';
import style from './SearchBar.module.css';

const SearchBar = () => {
  const { searchString } = useAppSelector((state) => state.photos);
  const dispatch = useAppDispatch();

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const el = event.target as HTMLFormElement;
    dispatch(fetchPhotosBySearchString(el.searchString.value as string));
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
