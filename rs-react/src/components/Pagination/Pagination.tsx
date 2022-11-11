import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { goToNextPage, goToPrevPage, goToPage } from '../../store/photosSlice';
import style from './Pagination.module.css';

const Pagination = () => {
  const { page, pages } = useAppSelector((state) => state.photos);
  const dispatch = useAppDispatch();

  if (page === 1 && pages === 1)
    return (
      <div>
        <ul className={style.pagination}>
          <li className={style.current}>1</li>
        </ul>
      </div>
    );

  if (page === 1) {
    return (
      <div>
        <ul className={style.pagination}>
          <li className={style.page}>{'<<'}</li>
          <li className={style.current}>1</li>
          <li className={style.page}>...</li>
          <li className={style.page} onClick={() => dispatch(goToPage(pages))}>
            {pages}
          </li>
          <li className={style.page} onClick={() => dispatch(goToNextPage())}>
            {'>>'}
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className={style.pagination}>
        {page < pages && page > 1 && (
          <>
            <li className={style.page} onClick={() => dispatch(goToPrevPage())}>
              {'<<'}
            </li>
            <li className={style.page} onClick={() => dispatch(goToPage(1))}>
              1
            </li>
            <li className={style.page}>...</li>
            <li className={style.current}>{page}</li>
            <li className={style.page}>...</li>
            <li className={style.page} onClick={() => dispatch(goToPage(pages))}>
              {pages}
            </li>
            <li className={style.page} onClick={() => dispatch(goToNextPage())}>
              {'>>'}
            </li>
          </>
        )}

        {page === pages && (
          <>
            <li className={style.page} onClick={() => dispatch(goToPrevPage())}>
              {'<<'}
            </li>
            <li className={style.page} onClick={() => dispatch(goToPage(1))}>
              1
            </li>
            <li className={style.page}>...</li>
            <li className={style.current}>{pages}</li>
            <li className={style.page}>{'>>'}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
