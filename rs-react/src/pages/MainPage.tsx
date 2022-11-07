import React, { useCallback, useEffect, useReducer } from 'react';
import { getData } from '../api/getData';
import { Cards } from '../components/Cards';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { ActionType } from '../reducer/movieReducer.types';
import { MovieContext } from '../context/MovieContext';
import { useGlobalContext } from '../context/GlobalContext';
import { MAX_PHOTOS } from '../utils/constants';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import Sort from '../components/Sort/Sort';
import movieReducer from '../reducer/movieReducer';

const initialState = {
  title: '',
  photo: null,
  pages: 0,
  total: 0,
  isLoading: true,
  currentMovieID: null,
};

const Main: React.FC = function () {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const { currentPage, perPage, searchString, sort } = useGlobalContext();

  const getImages = useCallback(
    async (searchStr: string) => {
      dispatch({
        type: ActionType.LOADING,
      });

      getData(searchStr, currentPage, perPage, sort).then((photoData) => {
        if (!photoData || !photoData.total) {
          dispatch({
            type: ActionType.SET_MOVIES,
            payload: {
              photo: null,
              isLoading: false,
              title: 'Nothing find. Try again.',
            },
          });
          return;
        }

        const total =
          photoData.pages > MAX_PHOTOS ? MAX_PHOTOS * parseInt(perPage) : photoData.total;

        dispatch({
          type: ActionType.SET_MOVIES,
          payload: {
            ...photoData,
            isLoading: false,
            title: `Find ${total} movies. Page ${photoData.page} from ${
              photoData.pages > MAX_PHOTOS ? MAX_PHOTOS : photoData.pages
            }`,
          },
        });
      });
    },
    [currentPage, perPage, sort]
  );

  useEffect(() => {
    searchString && getImages(searchString);
  }, [getImages, searchString]);

  if (!searchString)
    return (
      <>
        <SearchBar />
        <div>Let find something interesting</div>
      </>
    );

  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      <SearchBar />

      <div className="infoPanel">
        <h2>{state.title}</h2>
        {state.photo && <Sort />}
      </div>

      {state.isLoading ? <LoadingIndicator /> : state.photo && <Cards items={state.photo} />}

      {state.photo && <Pagination total={state.pages > MAX_PHOTOS ? MAX_PHOTOS : state.pages} />}
    </MovieContext.Provider>
  );
};

export default Main;
