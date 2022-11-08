import React, { useCallback, useEffect, useState } from 'react';
import { getData } from '../api/getData';
import { Cards } from '../components/Cards';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { MAX_PHOTOS } from '../utils/constants';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import Sort from '../components/Sort/Sort';
import { useGlobalState } from '../state/globalStateContext';
import { useDispatch } from '../state/dispatchContext';

const Main: React.FC = function () {
  const { updatePhotos, emptySearch } = useDispatch();
  const { page, perpage, pages, searchString, sort, photo } = useGlobalState();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const getPhotos = useCallback(
    (str: string) => {
      setLoading(true);
      getData(str, page, perpage, sort).then((photoData) => {
        if (!photoData || !photoData.total) {
          setTitle('Nothing find. Try again');
          emptySearch();
          setLoading(false);
          return;
        }

        updatePhotos(photoData);
        setTitle(
          `Page ${photoData.page} from ${
            photoData.pages > MAX_PHOTOS ? MAX_PHOTOS : photoData.pages
          }`
        );
        setLoading(false);
      });
    },
    [page, perpage, sort]
  );

  useEffect(() => {
    if (!searchString) return;
    getPhotos(searchString);
  }, [getPhotos, searchString]);

  if (!searchString)
    return (
      <>
        <SearchBar />
        <div>Let find something interesting</div>
      </>
    );

  return (
    <>
      <SearchBar />

      <div className="infoPanel">
        <h2>{title}</h2>
        {photo.length > 0 && <Sort />}
      </div>

      {loading ? <LoadingIndicator /> : photo.length > 0 && <Cards items={photo} />}

      {photo.length > 0 && <Pagination total={pages > MAX_PHOTOS ? MAX_PHOTOS : pages} />}
    </>
  );
};

export default Main;
