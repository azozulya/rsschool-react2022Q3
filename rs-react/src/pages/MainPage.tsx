import React, { useCallback, useEffect, useState } from 'react';
import Modal from '../components/Modal/Modal';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import { getData } from '../api/getData';
import { getPopular } from '../api/getPopular';
import { Cards } from '../components/Cards';
import { TCard } from '../components/Cards/Card/types';
import { SearchBar } from '../components/SearchBar';
import { SEARCH_STRING_LS } from '../utils/constants';
import { TCards } from '../components/Cards/types';

type TState = {
  title: string;
  page: number;
  total_pages: number;
  total_results: number;
  results: TCard[] | null;
  isLoading: boolean;
  currentMovieID: number | null;
};

const initialState = {
  title: '',
  page: 1,
  results: null,
  total_pages: 0,
  total_results: 0,
  isLoading: true,
  currentMovieID: null,
};

const Main: React.FC = function () {
  const [state, setState] = useState<TState>(initialState);

  const getPopularMovies = async () => {
    getPopular().then((popularMovies: TCards | null) => {
      setState((prevState) => ({
        ...prevState,
        ...popularMovies,
        isLoading: false,
        title: 'Popular movies',
      }));
    });
  };

  const getMovies = useCallback(async (searchStr: string) => {
    if (!searchStr) {
      return setState((prevState) => ({
        ...prevState,
        results: null,
        isLoading: false,
        title: 'What do you want to search?',
      }));
    }

    setState((prevState) => ({
      ...prevState,
      isLoading: true,
    }));

    getData(searchStr).then((searchMovies) => {
      if (!searchMovies || !searchMovies.total_results) {
        return setState((prevState) => ({
          ...prevState,
          results: null,
          isLoading: false,
          title: 'Nothing find. Try again.',
        }));
      }

      setState((prevState) => ({
        ...prevState,
        ...searchMovies,
        isLoading: false,
        title: `Find ${searchMovies.total_results} movies. Page ${searchMovies.page} from ${searchMovies.total_pages}`,
      }));
    });
  }, []);

  useEffect(() => {
    const searchString = localStorage.getItem(SEARCH_STRING_LS) || '';

    !searchString ? getPopularMovies() : getMovies(searchString);
  }, []);

  const searchHandler = async (searchStr: string) => {
    getMovies(searchStr);
  };

  const clickHandler = (id: number) => {
    setState({ ...state, currentMovieID: id });
    document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
    document.body.classList.add('noscroll');
  };

  const closeHandler = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;

    if (element.closest('[data-id=modal]') && element.ariaLabel !== 'Close') return;

    setState({ ...state, currentMovieID: null });
    document.body.classList.remove('noscroll');
    document.body.style.paddingRight = '0px';
  };

  return (
    <>
      {state.currentMovieID && <Modal id={state.currentMovieID} onClose={closeHandler} />}
      <SearchBar onSearch={searchHandler} />

      <h2>{state.title}</h2>

      {state.isLoading ? (
        <LoadingIndicator />
      ) : (
        state.results && <Cards items={state.results} onCardClick={clickHandler} />
      )}
    </>
  );
};

export default Main;
