import React, { useContext } from 'react';
import { TUserCard } from '../components/CreateForm/CreateForm.types';

type GlobalContent = {
  users: TUserCard[];
  currentPage: number;
  searchString: string;
  setSearchString: (s: string) => void;
  setCurrentPage: (p: number) => void;
  goNextPage: () => void;
  goPrevPage: () => void;
  addUser: (user: TUserCard) => void;
};

export const GlobalContext = React.createContext<GlobalContent>({
  users: [],
  currentPage: 1,
  searchString: '',
  setSearchString: () => {},
  setCurrentPage: () => {},
  goNextPage: () => {},
  goPrevPage: () => {},
  addUser: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);
