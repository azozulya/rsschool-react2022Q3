import React, { useContext } from 'react';
import { TCard } from '../components/Cards/Card/types';
import { TUserCard } from '../components/CreateForm/CreateForm.types';

type TGlobalStateContext = {
  photo: TCard[];
  users: TUserCard[];
  page: number;
  perpage: string;
  pages: number;
  searchString: string;
  sort: string;
};

export const GlobalStateContext = React.createContext<TGlobalStateContext>({
  photo: [],
  users: [],
  page: 1,
  pages: 1,
  perpage: '20',
  searchString: '',
  sort: 'date-posted-desc',
});

export const useGlobalState = () => useContext(GlobalStateContext);
