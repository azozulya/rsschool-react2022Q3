import React from 'react';
import { Cards } from '../components/Cards';
import { SearchBar } from '../components/SearchBar';
import { Pagination } from '../components/Pagination';
import { useAppSelector } from '../store/hook';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import Sort from '../components/Sort/Sort';

const Main: React.FC = function () {
  const { loading, page, pages, total, searchString } = useAppSelector((state) => state.photos);

  if (!searchString)
    return (
      <>
        <SearchBar />
        <div className="center">Let find something interesting</div>
      </>
    );

  return (
    <>
      <SearchBar />

      <div className="infoPanel">
        {!loading && total > 0 && (
          <h2>
            Find {total} {total === 1 ? 'photo' : 'photos'}. Page {page} from {pages}.
          </h2>
        )}
        {!loading && !total && <h2>Nothing find. Try again.</h2>}
        {!loading && total > 0 && <Sort />}
      </div>

      {loading ? <LoadingIndicator /> : <Cards />}

      {!loading && total > 0 && <Pagination />}
    </>
  );
};

export default Main;
