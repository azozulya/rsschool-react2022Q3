import { TCards } from '../components/Cards/Card/types';
import { API_URL } from '../utils/constants';

async function getData(queryString: string, page = 1): Promise<TCards | null> {
  try {
    return await fetch(`${API_URL}&query=${queryString}&page=${page}`)
      .then((response) => response.json())
      .then((data: TCards) => {
        return data;
      })
      .catch((error) => {
        console.log('getData error1: ', error);
        return null;
      });
  } catch (error) {
    console.log('getData error2: ', error);
  }
  return null;
}

export { getData };
