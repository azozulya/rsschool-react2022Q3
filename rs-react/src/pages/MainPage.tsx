import React, { useCallback, useEffect, useReducer } from 'react';
import Modal from '../components/Modal/Modal';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import Sort from '../components/Sort/Sort';
import movieReducer from '../reducer/movieReducer';
import { getData } from '../api/getData';
import { Cards } from '../components/Cards';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { ActionType } from '../reducer/movieReducer.types';
import { MovieContext } from '../context/MovieContext';
import { useGlobalContext } from '../context/GlobalContext';

const initialState = {
  title: '',
  results: null,
  total_pages: 0,
  total_results: 0,
  isLoading: true,
  currentMovieID: null,
};

const Main: React.FC = function () {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const { currentPage, searchString } = useGlobalContext();

  const getMovies = useCallback(
    async (searchStr: string) => {
      dispatch({
        type: ActionType.LOADING,
      });

      getData(searchStr, currentPage).then((searchMovies) => {
        if (!searchMovies || !searchMovies.total_results) {
          dispatch({
            type: ActionType.SET_MOVIES,
            payload: {
              results: null,
              isLoading: false,
              title: 'Nothing find. Try again.',
            },
          });
          return;
        }

        dispatch({
          type: ActionType.SET_MOVIES,
          payload: {
            ...searchMovies,
            isLoading: false,
            title: `Find ${searchMovies.total_results} movies. Page ${searchMovies.page} from ${searchMovies.total_pages}`,
          },
        });
      });
    },
    [currentPage]
  );

  useEffect(() => {
    searchString && getMovies(searchString);
  }, [getMovies, searchString]);

  const clickHandler = (id: number) => {
    //setState({ ...state, currentMovieID: id });
    document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
    document.body.classList.add('noscroll');
  };

  const closeHandler = (event: React.MouseEvent<HTMLElement>) => {
    const element = event.target as HTMLElement;

    if (element.closest('[data-id=modal]') && element.ariaLabel !== 'Close') return;

    //setState({ ...state, currentMovieID: null });
    document.body.classList.remove('noscroll');
    document.body.style.paddingRight = '0px';
  };

  if (!searchString)
    return (
      <>
        <SearchBar />
        <div>Let find something interesting</div>
      </>
    );

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {state.currentMovieID && <Modal id={state.currentMovieID} onClose={closeHandler} />}
      <SearchBar />

      <h2>{state.title}</h2>

      {searchString && <Sort />}

      {state.isLoading ? (
        <LoadingIndicator />
      ) : (
        state.results && <Cards items={state.results} onCardClick={clickHandler} />
      )}

      {searchString && <Pagination total={state.total_pages > 500 ? 500 : state.total_pages} />}
    </MovieContext.Provider>
  );
};

export default Main;
