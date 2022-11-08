import React, { useContext } from 'react';
import { TCardDetails } from '../components/Cards/Card/types';
import { TUserCard } from '../components/CreateForm/CreateForm.types';

type GlobalContent = {
  photos: TCardDetails[];
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
  addPhotoDetails: (photo: TCardDetails) => void;
};

export const GlobalContext = React.createContext<GlobalContent>({
  photos: [],
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
  addPhotoDetails: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);
