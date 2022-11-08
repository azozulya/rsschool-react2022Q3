import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useGlobalState } from '../state/globalStateContext';
import { API_IMG_URL } from '../utils/constants';

function PhotoDetails() {
  const { id } = useParams();
  const { photo } = useGlobalState();

  const currentPhoto = photo.find((item) => item.id === id);

  if (!id || !currentPhoto) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Link to="..">Back</Link>
      {currentPhoto && (
        <div>
          {currentPhoto.server && (
            <img
              src={`${API_IMG_URL}${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}_w.jpg`}
              alt=""
            />
          )}
          <div>
            {currentPhoto.title}
            <p>
              <a href={`https://www.flickr.com/photos/${currentPhoto.owner}`}>author</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default PhotoDetails;
