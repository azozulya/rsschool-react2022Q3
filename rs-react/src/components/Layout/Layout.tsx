import React, { useReducer } from 'react';
import DispatchContext from '../../state/dispatchContext';
import globalReducer, { ActionType } from '../../state/globalReducer';
import { GlobalStateContext } from '../../state/globalStateContext';
import { TCards } from '../Cards/types';
import { TUserCard } from '../CreateForm/CreateForm.types';
import Header from './elements/Header';
import Main from './elements/Main';

const initialState = {
  page: 1,
  pages: 1,
  perpage: '20',
  photo: [],
  total: 0,
  searchString: '',
  sort: 'date-posted-desc',
  users: [],
};

const Layout = () => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const dispatchValue = {
    setSort: (sort: string) => {
      dispatch({ type: ActionType.SET_SORT, payload: sort });
    },
    setCurrentPage: (pageNum: number) => {
      dispatch({ type: ActionType.GO_TO_PAGE, payload: pageNum });
    },
    setPerPage: (itemsPerPage: string) => {
      dispatch({ type: ActionType.SET_PER_PAGE, payload: itemsPerPage });
    },
    setSearchString: (str: string) => {
      dispatch({ type: ActionType.SET_SEARCH_STRING, payload: str });
    },
    goNextPage: () => {
      dispatch({ type: ActionType.GO_TO_NEXT_PAGE });
    },
    goPrevPage: () => {
      dispatch({ type: ActionType.GO_TO_PREV_PAGE });
    },
    addUser: (user: TUserCard) => {
      dispatch({ type: ActionType.ADD_USER, payload: user });
    },
    updatePhotos: (photos: TCards) => {
      dispatch({ type: ActionType.UPDATE_PHOTO_PAGE, payload: photos });
    },
    emptySearch: () => {
      dispatch({ type: ActionType.EMPTY_SEARCH });
    },
  };

  return (
    <GlobalStateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatchValue}>
        <Header />
        <Main />
      </DispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export { Layout };
