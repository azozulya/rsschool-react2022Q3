import { TCards } from '../components/Cards/types';
import { API_URL } from '../utils/constants';

type TPhotoResponse = {
  photos: TCards;
};

async function getData(
  queryString: string,
  page = 1,
  perpage = '100',
  sort = 'date-posted-desc'
): Promise<TCards | null> {
  try {
    return await fetch(
      `${API_URL}&text=${queryString}&page=${page}&per_page=${perpage}&sort=${sort}&media=photo&license=4`
    )
      .then((response) => response.json() as Promise<TPhotoResponse>)
      .then((data: TPhotoResponse) => {
        return data.photos;
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
