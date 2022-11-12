import { TCard } from '../components/Cards/Card/types';

export type TInitialState = {
  photo: TCard[];
  page: number;
  perpage: string;
  pages: number;
  total: number;
  searchString: string;
  sort: string;
  loading: boolean;
  error: string | null;
};
