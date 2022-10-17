import { TCard } from '../components/Cards/Card/types';
import { API_KEY, API_MOVIE_DETAILS_URL } from '../utils/constants';

async function getMovieDetails(id: number): Promise<TCard | null> {
  try {
    //920?api_key=6fcb9620a842bea26304d7962404e1fe&language=en-US';
    return await fetch(`${API_MOVIE_DETAILS_URL}${id}?api_key=${API_KEY}&language=en-US`)
      .then((response) => response.json())
      .then((data: TCard) => {
        console.log('fetch details results: ', data);
        return data;
      })
      .catch((error) => {
        console.log('fetch details error1: ', error);
        return null;
      });
  } catch (error) {
    console.log('fetch details error2: ', error);
  }
  return null;
}

export { getMovieDetails };
