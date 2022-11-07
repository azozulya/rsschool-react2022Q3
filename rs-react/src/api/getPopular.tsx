import { TCards } from '../components/Cards/types';
import { API_POPULAR_URL } from '../utils/constants';

async function getPopular(page: number): Promise<TCards | null> {
  try {
    return await fetch(`${API_POPULAR_URL}&page=${page}`)
      .then((response) => response.json())
      .then((data: TCards) => {
        return data;
      })
      .catch((error) => {
        console.log('getPopular error1: ', error);
        return null;
      });
  } catch (error) {
    console.log('getPopular error2: ', error);
  }
  return null;
}

export { getPopular };
