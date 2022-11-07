import React, { Reducer, useReducer } from 'react';
import { GlobalContext } from '../../context/GlobalContext';
import { TUserCard } from '../CreateForm/CreateForm.types';
import Header from './elements/Header';
import Main from './elements/Main';

enum ActionType {
  SORT = 'sort',
  GO_TO_PAGE = 'goToPage',
  GO_TO_NEXT_PAGE = 'goToNextPage',
  GO_TO_PREV_PAGE = 'goToPrevPage',
  SET_SEARCH_STRING = 'setSearchString',
  ADD_USER = 'addUser',
}

// interface IAction {
//   type: ActionType;
//   payload?: Partial<IState>;
// }

interface IState {
  page: number;
  perPage: number;
  sort: string;
  searchString: string;
  users: TUserCard[];
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

type SetSearchStringAction = {
  type: ActionType.SET_SEARCH_STRING;
  payload: string;
};

type IAction = AddUserAction | GoToPrevNextPageAction | GoToPageAction | SetSearchStringAction;

const initialState = {
  page: 1,
  sort: 'popular',
  perPage: 20,
  searchString: '',
  users: [],
};

const globalReducer: Reducer<IState, IAction> = (state, action) => {
  switch (action.type) {
    case ActionType.GO_TO_PAGE:
      return { ...state, page: action.payload };
    // case ActionType.SORT:
    //   return { ...state, sort: action.payload };
    case ActionType.GO_TO_NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case ActionType.GO_TO_PREV_PAGE:
      return { ...state, page: state.page - 1 };
    case ActionType.SET_SEARCH_STRING:
      return { ...state, searchString: action.payload, page: 1 };
    case ActionType.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    default:
      return state;
  }
};

const Layout = () => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  const value = {
    users: state.users,
    currentPage: state.page,
    searchString: state.searchString,
    setCurrentPage: (pageNum: number) => {
      dispatch({ type: ActionType.GO_TO_PAGE, payload: pageNum });
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
  };

  return (
    <GlobalContext.Provider value={value}>
      <Header />
      <Main />
    </GlobalContext.Provider>
  );
};

export { Layout };
