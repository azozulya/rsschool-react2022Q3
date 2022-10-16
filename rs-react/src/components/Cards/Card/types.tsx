type TCard = {
  id: number;
  title: string;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

type TCards = {
  page: number;
  results: TCard[];
  total_pages: number;
  total_results: number;
};

export type { TCard, TCards };
