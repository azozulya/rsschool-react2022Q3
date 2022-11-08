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
    console.log('id: ', id);
    if (!id) return;

    const photoDetails = photos.find((item) => item.id === id);
    console.log('photoDetails: ', photoDetails);

    if (photoDetails) return setPhoto(photoDetails);

    if (!photoDetails) {
      getPhotoDetails(id).then((photoData) => {
        console.log(photoData);
        if (!photoData) return;

        addPhotoDetails(photoData);
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
        <p>Author:{photo?.username}</p>
        <p>Location: {photo?.location}</p>
      </div>
    </>
  );
}

export default PhotoDetails;
