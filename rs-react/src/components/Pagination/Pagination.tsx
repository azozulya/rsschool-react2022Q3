import React from 'react';
import { useDispatch } from '../../state/dispatchContext';
import { useGlobalState } from '../../state/globalStateContext';
import style from './Pagination.module.css';

interface IProps {
  total: number;
}

const Pagination = (props: IProps) => {
  const { page } = useGlobalState();
  const { setCurrentPage, goNextPage, goPrevPage } = useDispatch();

  if (page === 1 && props.total === 1)
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
          <li className={style.page} onClick={() => setCurrentPage(props.total)}>
            {props.total}
          </li>
          <li className={style.page} onClick={goNextPage}>
            {'>>'}
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <ul className={style.pagination}>
        {page < props.total && page > 1 && (
          <>
            <li className={style.page} onClick={goPrevPage}>
              {'<<'}
            </li>
            <li className={style.page} onClick={() => setCurrentPage(1)}>
              1
            </li>
            <li className={style.page}>...</li>
            <li className={style.current}>{page}</li>
            <li className={style.page}>...</li>
            <li className={style.page} onClick={() => setCurrentPage(props.total)}>
              {props.total}
            </li>
            <li className={style.page} onClick={goNextPage}>
              {'>>'}
            </li>
          </>
        )}

        {page === props.total && (
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
