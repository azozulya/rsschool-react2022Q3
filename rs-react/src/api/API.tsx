import { TCards } from '../components/Cards/types';
import { API_URL, RESENT_PHOTOS_URL } from '../utils/constants';

const API = {
  getPhotos: async (searchString: string, page: number, perpage: string, sort: string) => {
    const response = await fetch(
      `${API_URL}&text=${searchString}&page=${page}&per_page=${perpage}&sort=${sort}&media=photo&license=4`
    );

    if (!response.ok) {
      throw new Error("Can't load photos");
    }

    const photosData = (await response.json()) as { photos: TCards };
    return photosData.photos as TCards;
  },
  getResentPhotos: async () => {
    const response = await fetch(RESENT_PHOTOS_URL);

    if (!response.ok) {
      throw new Error("Can't load photos");
    }

    const photosData = (await response.json()) as { photos: TCards };
    return photosData.photos as TCards;
  },
};

export default API;
