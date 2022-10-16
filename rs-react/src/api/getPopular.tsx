import { TCards } from '../components/Cards/Card/types';
import { API_POPULAR_URL } from '../utils/constants';

async function getPopular(): Promise<TCards | null> {
  try {
    return await fetch(API_POPULAR_URL)
      .then((response) => response.json())
      .then((data: TCards) => {
        console.log('fetch popular results: ', data);
        return data;
      })
      .catch((error) => {
        console.log('fetch popular error1: ', error);
        return null;
      });
  } catch (error) {
    console.log('fetch popular error2: ', error);
  }
  return null;
}

export { getPopular };
