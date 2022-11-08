import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import getPhotoDetails from '../api/getPhotoDetails';
import { TCardDetails } from '../components/Cards/Card/types';
import { useGlobalContext } from '../context/GlobalContext';
import { API_IMG_URL } from '../utils/constants';

function PhotoDetails() {
  const { id } = useParams();
  const { photos, addPhotoDetails } = useGlobalContext();
  const [photo, setPhoto] = useState<TCardDetails>();

  useEffect(() => {
    if (!id) return;

    const photoDetails = photos.find((item) => item.id === id);
    console.log('photoDetails: ', photoDetails);

    if (photoDetails) return setPhoto(photoDetails);

    if (!photoDetails) {
      getPhotoDetails(id).then((photoData) => {
        console.log(photoData);
        if (!photoData) return;
        const { id, title, owner, views, dateuploaded, secret, server } = photoData;
        addPhotoDetails({
          dateuploaded,
          views,
          ...owner,
          id,
          title: title._content,
          secret,
          server,
          owner,
        });
        console.log('photos: ', photos);
      });
    }
  }, [addPhotoDetails, id, photos]);

  // if (!photo) return <Navigate replace to={'404'} />;

  return (
    <>
      <Link to="..">Back</Link>
      <div>
        {photo?.server && (
          <img src={`${API_IMG_URL}${photo?.server}/${photo?.id}_${photo?.secret}_w.jpg`} alt="" />
        )}
        {photo?.title}
        <p>Views: {photo?.views}</p>
        <p>Author:{photo?.owner.username}</p>
        <p>Location: {photo?.owner.location}</p>
      </div>
    </>
  );
}

export default PhotoDetails;
