import { TCard } from '../components/Cards/Card/types';
import { TUserCard } from '../components/CreateForm/CreateForm.types';

export type TInitialState = {
  photo: TCard[];
  users: TUserCard[];
  page: number;
  perpage: string;
  pages: number;
  total: number;
  searchString: string;
  sort: string;
  loading: boolean;
  status: string | null;
  error: string | null;
};
