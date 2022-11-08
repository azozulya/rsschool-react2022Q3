import { Reducer } from 'react';
import { TCard } from '../components/Cards/Card/types';
import { TCards } from '../components/Cards/types';
import { TUserCard } from '../components/CreateForm/CreateForm.types';

export enum ActionType {
  SORT = 'sort',
  GO_TO_PAGE = 'goToPage',
  GO_TO_NEXT_PAGE = 'goToNextPage',
  GO_TO_PREV_PAGE = 'goToPrevPage',
  SET_PER_PAGE = 'setPerPage',
  SET_SEARCH_STRING = 'setSearchString',
  SET_SORT = 'setSort',
  ADD_USER = 'addUser',
  ADD_PHOTO_DETAILS = 'addPhotoDetails',
  UPDATE_PHOTO_PAGE = 'updatePhotoPage',
  EMPTY_SEARCH = 'emptySearch',
}

interface IState {
  page: number;
  pages: number;
  perpage: string;
  photo: TCard[];
  total: number;
  sort: string;
  searchString: string;
  users: TUserCard[];
}

type AddUserAction = {
  type: ActionType.ADD_USER;
  payload: TUserCard;
};

type GoToPrevNextPageAction = {
  type: ActionType.GO_TO_NEXT_PAGE | ActionType.GO_TO_PREV_PAGE | ActionType.EMPTY_SEARCH;
};

type GoToPageAction = {
  type: ActionType.GO_TO_PAGE;
  payload: number;
};

type SetSearchStringPerPageSortAction = {
  type: ActionType.SET_SEARCH_STRING | ActionType.SET_PER_PAGE | ActionType.SET_SORT;
  payload: string;
};

type UpdatePhotosAction = {
  type: ActionType.UPDATE_PHOTO_PAGE;
  payload: TCards;
};

type IAction =
  | AddUserAction
  | GoToPrevNextPageAction
  | GoToPageAction
  | SetSearchStringPerPageSortAction
  | UpdatePhotosAction;

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
      return { ...state, perpage: action.payload };
    case ActionType.SET_SEARCH_STRING:
      return { ...state, searchString: action.payload, page: 1 };
    case ActionType.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case ActionType.UPDATE_PHOTO_PAGE: {
      return { ...state, ...action.payload };
    }
    case ActionType.EMPTY_SEARCH:
      return { ...state, photo: [] };
    default:
      throw new Error(`Unknown action type`);
  }
};

export default globalReducer;
