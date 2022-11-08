import { TCardDetails } from '../components/Cards/Card/types';
import { API_PHOTO_DETAILS_URL } from '../utils/constants';

type TPhotoResponse = {
  photo: {
    id: string;
    title: { _content: string };
    description: { _content: string };
    dateuploaded: string;
    secret: string;
    server: string;
    views: number;
    owner: { username: string; realname: string; location: string; iconserver: string };
  };
};

async function getPhotoDetails(id: string): Promise<TCardDetails | null> {
  try {
    return await fetch(`${API_PHOTO_DETAILS_URL}&photo_id=${id}`)
      .then((response) => response.json() as Promise<TPhotoResponse>)
      .then((data: TPhotoResponse) => {
        const { id, title, description, dateuploaded, owner, secret, server, views } = data.photo;
        return {
          id,
          title: title._content,
          description: description._content,
          dateuploaded,
          ...owner,
          secret,
          server,
          views,
        };
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
