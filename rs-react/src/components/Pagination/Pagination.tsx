import React from 'react';
import { useGlobalContext } from '../../context/GlobalContext';
import style from './Pagination.module.css';

interface IProps {
  total: number;
}

const Pagination = (props: IProps) => {
  const { currentPage, setCurrentPage, goNextPage, goPrevPage } = useGlobalContext();
  return (
    <div>
      <ul className={style.pagination}>
        {currentPage === 1 && (
          <>
            <li className={style.page}>{'<<'}</li>
            <li className={style.current}>1</li>
            <li className={style.page}>...</li>
            <li className={style.page} onClick={() => setCurrentPage(props.total)}>
              {props.total}
            </li>
            <li className={style.page} onClick={goNextPage}>
              {'>>'}
            </li>
          </>
        )}

        {currentPage < props.total && currentPage > 1 && (
          <>
            <li className={style.page} onClick={goPrevPage}>
              {'<<'}
            </li>
            <li className={style.page} onClick={() => setCurrentPage(1)}>
              1
            </li>
            <li className={style.page}>...</li>
            <li className={style.current}>{currentPage}</li>
            <li className={style.page}>...</li>
            <li className={style.page} onClick={() => setCurrentPage(props.total)}>
              {props.total}
            </li>
            <li className={style.page} onClick={goNextPage}>
              {'>>'}
            </li>
          </>
        )}

        {currentPage === props.total && (
          <>
            <li className={style.page} onClick={goPrevPage}>
              {'<<'}
            </li>
            <li className={style.page} onClick={() => setCurrentPage(1)}>
              1
            </li>
            <li className={style.page}>...</li>
            <li className={style.current}>{props.total}</li>
            <li className={style.page}>{'>>'}</li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
