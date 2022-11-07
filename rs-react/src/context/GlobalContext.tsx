import React, { useContext } from 'react';
import { TUserCard } from '../components/CreateForm/CreateForm.types';

type GlobalContent = {
  users: TUserCard[];
  currentPage: number;
  perPage: string;
  searchString: string;
  sort: string;
  setSort: (sortParam: string) => void;
  setSearchString: (s: string) => void;
  setCurrentPage: (p: number) => void;
  setPerPage: (num: string) => void;
  goNextPage: () => void;
  goPrevPage: () => void;
  addUser: (user: TUserCard) => void;
};

export const GlobalContext = React.createContext<GlobalContent>({
  users: [],
  currentPage: 1,
  perPage: '20',
  searchString: '',
  sort: 'date-posted-desc',
  setSort: () => {},
  setSearchString: () => {},
  setCurrentPage: () => {},
  setPerPage: () => {},
  goNextPage: () => {},
  goPrevPage: () => {},
  addUser: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);
