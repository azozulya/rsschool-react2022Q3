import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hook';
import { API_IMG_URL } from '../utils/constants';
import style from './PhotoDetails.module.css';

function PhotoDetails() {
  const { id } = useParams();
  const { photo } = useAppSelector((state) => state.photos);
  let currentPhotoIndex = 0;
  const currentPhoto = photo.find((item, idx) => {
    if (item.id === id) {
      currentPhotoIndex = idx;
      return item;
    }
  });

  if (!id || !currentPhoto) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Link to="..">Back</Link>
      {currentPhoto && (
        <>
          <p className={style.position}>This photo is {currentPhotoIndex + 1} in the photo list</p>

          <div className={style.details}>
            {currentPhoto.server && (
              <img
                src={`${API_IMG_URL}${currentPhoto.server}/${currentPhoto.id}_${currentPhoto.secret}_w.jpg`}
                alt=""
              />
            )}
            <div>
              <h3>{currentPhoto.title}</h3>
              <p>
                <a
                  href={`https://www.flickr.com/photos/${currentPhoto.owner}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Author page
                </a>
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default PhotoDetails;
