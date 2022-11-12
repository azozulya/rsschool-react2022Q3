import { TCards } from '../components/Cards/types';
import { API_URL } from '../utils/constants';

type TPhotoResponse = {
  photos: TCards;
};

const DEFAULT_PAGE = 1;
const DEFAULT_SORT = 'date-posted-desc';
const DEFAULT_PER_PAGE = '20';

async function getData(
  queryString: string,
  page = DEFAULT_PAGE,
  perpage = DEFAULT_PER_PAGE,
  sort = DEFAULT_SORT
): Promise<TCards | null> {
  try {
    const url = queryString
      ? `&text=${queryString}&page=${page}&per_page=${perpage}&sort=${sort}`
      : `&page=1&per_page=20&sort=${sort}`;

    return await fetch(`${API_URL}${url}&media=photo&license=4`)
      .then((response) => response.json() as Promise<TPhotoResponse>)
      .then((data: TPhotoResponse) => {
        return data.photos;
      })
      .catch((error) => {
        console.error('getData error1: ', error);
        return null;
      });
  } catch (error) {
    console.error('getData error2: ', error);
  }
  return null;
}

export { getData };
