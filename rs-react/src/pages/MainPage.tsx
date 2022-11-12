import React, { useEffect } from 'react';
import { Cards } from '../components/Cards';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { showResentPhotos } from '../store/thunks';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import Sort from '../components/Sort/Sort';

const Main: React.FC = function () {
  const { loading, page, pages, total, searchString, photo } = useAppSelector(
    (state) => state.photos
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    !photo.length && !searchString && dispatch(showResentPhotos());
  }, [dispatch, photo.length, searchString]);

  return (
    <>
      <SearchBar />
      {!searchString && <h2>Resent photos</h2>}

      {searchString && (
        <div className="infoPanel">
          {!loading && total > 0 && (
            <h2>
              Find {total} {total === 1 ? 'photo' : 'photos'}. Page {page} from {pages}.
            </h2>
          )}
          {!loading && !total && <h2>Nothing find. Try again.</h2>}
          {!loading && total > 0 && <Sort />}
        </div>
      )}

      {loading ? <LoadingIndicator /> : <Cards />}

      {!loading && total > 0 && searchString && <Pagination />}
    </>
  );
};

export default Main;
