import { TCard } from '../components/Cards/Card/types';

enum ActionType {
  NEXT = 'next',
  PREV = 'prev',
  SET_MOVIES = 'setMovies',
  LOADING = 'loading',
  SET_PAGE = 'setPage',
}

interface IAction {
  type: ActionType;
  payload?: Partial<IState>;
}

interface IState {
  title: string;
  total_pages: number;
  total_results: number;
  results: TCard[] | null;
  isLoading: boolean;
  currentMovieID: number | null;
}

export { ActionType };
export type { IState, IAction };
