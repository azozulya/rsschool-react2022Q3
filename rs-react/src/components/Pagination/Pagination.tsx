import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { goToNextPage, goToPrevPage, goToPage } from '../../store/thunks';
import style from './Pagination.module.css';

const Pagination = () => {
  const { page, pages } = useAppSelector((state) => state.photos);
  const dispatch = useAppDispatch();

  const prev = (
    <li className={style.page} onClick={() => dispatch(goToPrevPage())}>
      {'<<'}
    </li>
  );
  const next = (
    <li className={style.page} onClick={() => dispatch(goToNextPage())}>
      {'>>'}
    </li>
  );

  const pageItem = (pageNum: number) => {
    return (
      <li
        key={self.crypto.randomUUID()}
        className={page === pageNum ? style.current : style.page}
        onClick={() => dispatch(goToPage(pageNum))}
      >
        {pageNum}
      </li>
    );
  };

  if (pages <= 10) {
    return (
      <div>
        <ul className={style.pagination}>
          {page > 1 && prev}
          {new Array(pages).fill(0).map((_, idx) => pageItem(idx + 1))}
          {page < pages && next}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className={style.pagination}>
        <>
          {page > 1 && prev}
          {page <= 5 && new Array(5).fill(0).map((_, idx) => pageItem(idx + 1))}
          {page > 5 && (
            <>
              {pageItem(1)}
              <li className={style.page}>...</li>
            </>
          )}
          {page > 5 && page < pages - 4 && [page - 1, page, page + 1].map((num) => pageItem(num))}
          {page < pages - 4 && (
            <>
              <li className={style.page}>...</li>
              {pageItem(pages)}
            </>
          )}
          {page > pages - 5 && new Array(5).fill(0).map((_, idx) => pageItem(pages - 4 + idx))}
          {page < pages && next}
        </>
      </ul>
    </div>
  );
};

export default Pagination;
