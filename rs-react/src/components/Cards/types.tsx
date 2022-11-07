import { TCard } from './Card/types';

type TCards = {
  page: number;
  pages: number;
  perpage: string;
  photo: TCard[];
  total: number;
};

export type { TCards };
