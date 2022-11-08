import { createContext, useContext } from 'react';
import { TCards } from '../components/Cards/types';
import { TUserCard } from '../components/CreateForm/CreateForm.types';

export type TDispatchContext = {
  setSort: (sortParam: string) => void;
  setSearchString: (s: string) => void;
  setCurrentPage: (p: number) => void;
  setPerPage: (num: string) => void;
  goNextPage: () => void;
  goPrevPage: () => void;
  addUser: (user: TUserCard) => void;
  updatePhotos: (photos: TCards) => void;
  emptySearch: () => void;
};

const DispatchContext = createContext<TDispatchContext>({
  setSort: () => {},
  setSearchString: () => {},
  setCurrentPage: () => {},
  setPerPage: () => {},
  goNextPage: () => {},
  goPrevPage: () => {},
  addUser: () => {},
  updatePhotos: () => {},
  emptySearch: () => {},
});

export default DispatchContext;

export const useDispatch = () => useContext(DispatchContext);
