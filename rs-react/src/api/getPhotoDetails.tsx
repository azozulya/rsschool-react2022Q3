import { TCardDetails } from '../components/Cards/Card/types';
import { API_PHOTO_DETAILS_URL } from '../utils/constants';

type TPhotoResponse = {
  photo: TCardDetails;
};

async function getPhotoDetails(id: string): Promise<TCardDetails | null> {
  try {
    return await fetch(`${API_PHOTO_DETAILS_URL}&photo_id=${id}`)
      .then((response) => response.json() as Promise<TPhotoResponse>)
      .then((data: TPhotoResponse) => {
        return data.photo;
      })
      .catch((error) => {
        console.log('loadPhotoDetails error1: ', error);
        return null;
      });
  } catch (error) {
    console.log('loadPhotoDetails error2: ', error);
  }
  return null;
}

export default getPhotoDetails;
