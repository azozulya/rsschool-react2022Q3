import React, { Reducer, useReducer } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { TCardDetails } from '../Cards/Card/types';
import { TUserCard } from '../CreateForm/CreateForm.types';
import Header from './elements/Header';
import Main from './elements/Main';

enum ActionType {
  SORT = 'sort',
  GO_TO_PAGE = 'goToPage',
  GO_TO_NEXT_PAGE = 'goToNextPage',
  GO_TO_PREV_PAGE = 'goToPrevPage',
  SET_PER_PAGE = 'setPerPage',
  SET_SEARCH_STRING = 'setSearchString',
  SET_SORT = 'setSort',
  ADD_USER = 'addUser',
  ADD_PHOTO_DETAILS = 'addPhotoDetails',
}

interface IState {
  page: number;
  perPage: string;
  sort: string;
  searchString: string;
  users: TUserCard[];
  photos: TCardDetails[];
}

type AddUserAction = {
  type: ActionType.ADD_USER;
  payload: TUserCard;
};

type GoToPrevNextPageAction = {
  type: ActionType.GO_TO_NEXT_PAGE | ActionType.GO_TO_PREV_PAGE;
};

type GoToPageAction = {
  type: ActionType.GO_TO_PAGE;
  payload: number;
};

type SetSearchStringPerPageSortAction = {
  type: ActionType.SET_SEARCH_STRING | ActionType.SET_PER_PAGE | ActionType.SET_SORT;
  payload: string;
};

type AddPhotoDetailsAction = {
  type: ActionType.ADD_PHOTO_DETAILS;
  payload: TCardDetails;
};

type IAction =
  | AddUserAction
  | GoToPrevNextPageAction
  | GoToPageAction
  | SetSearchStringPerPageSortAction
  | AddPhotoDetailsAction;

const initialState = {
  page: 1,
  sort: 'date-posted-desc',
  perPage: '20',
  searchString: '',
  users: [],
  photos: [],
};

const globalReducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.GO_TO_PAGE:
      return { ...state, page: action.payload };
    case ActionType.SET_SORT:
      return { ...state, sort: action.payload };
    case ActionType.GO_TO_NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case ActionType.GO_TO_PREV_PAGE:
      return { ...state, page: state.page - 1 };
    case ActionType.SET_PER_PAGE:
      return { ...state, perPage: action.payload };
    case ActionType.SET_SEARCH_STRING:
      return { ...state, searchString: action.payload, page: 1 };
    case ActionType.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case ActionType.ADD_PHOTO_DETAILS: {
      return { ...state, photos: [...state.photos, action.payload] };
    }
    default:
      return state;
  }
};

const Layout = () => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const value = {
    photos: state.photos,
    users: state.users,
    currentPage: state.page,
    perPage: state.perPage,
    searchString: state.searchString,
    sort: state.sort,
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
    addPhotoDetails: (photo: TCardDetails) => {
      dispatch({ type: ActionType.ADD_PHOTO_DETAILS, payload: photo });
    },
  };

  return (
    <GlobalContext.Provider value={value}>
      <Header />
      <Main />
    </GlobalContext.Provider>
  );
};

export { Layout };
