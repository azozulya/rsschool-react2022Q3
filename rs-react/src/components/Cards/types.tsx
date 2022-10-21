import { TCard } from './Card/types';

type TCards = {
  page: number;
  results: TCard[];
  total_pages: number;
  total_results: number;
};

export type { TCards };
