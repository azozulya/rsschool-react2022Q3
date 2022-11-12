import { TCards } from '../components/Cards/types';
import { API_POPULAR_URL } from '../utils/constants';

async function getPopular(): Promise<TCards | null> {
  try {
    return await fetch(API_POPULAR_URL)
      .then((response) => response.json())
      .then((data: TCards) => {
        return data;
      })
      .catch((error) => {
        console.error('getPopular error1: ', error);
        return null;
      });
  } catch (error) {
    console.error('getPopular error2: ', error);
  }
  return null;
}

export { getPopular };
