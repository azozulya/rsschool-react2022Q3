import { TCard } from '../components/Cards/Card/types';
import { API_KEY, API_MOVIE_DETAILS_URL } from '../utils/constants';

async function getMovieDetails(id: number): Promise<TCard | null> {
  try {
    return await fetch(`${API_MOVIE_DETAILS_URL}${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data: TCard) => {
        return data;
      })
      .catch((error) => {
        console.error('getMovieDetails error1: ', error);
        return null;
      });
  } catch (error) {
    console.error('getMovieDetails error2: ', error);
  }
  return null;
}

export { getMovieDetails };
