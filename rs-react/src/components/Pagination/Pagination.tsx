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
  const { total } = props;
  const prev = (
    <li className={style.page} onClick={goPrevPage}>
      {'<<'}
    </li>
  );
  const next = (
    <li className={style.page} onClick={goNextPage}>
      {'>>'}
    </li>
  );

  const pageItem = (pageNum: number) => {
    return (
      <li
        key={self.crypto.randomUUID()}
        className={page === pageNum ? style.current : style.page}
        onClick={() => setCurrentPage(pageNum)}
      >
        {pageNum}
      </li>
    );
  };

  if (total <= 10) {
    return (
      <div>
        <ul className={style.pagination}>
          {page > 1 && prev}
          {new Array(total).fill(0).map((_, idx) => pageItem(idx + 1))}
          {page < total && next}
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
              <li className={style.page} onClick={() => setCurrentPage(1)}>
                1
              </li>
              <li className={style.page}>...</li>
            </>
          )}
          {page > 5 && page < total - 4 && [page - 1, page, page + 1].map((num) => pageItem(num))}
          {page < total - 4 && (
            <>
              <li className={style.page}>...</li>
              <li className={style.page} onClick={() => setCurrentPage(total)}>
                {total}
              </li>
            </>
          )}
          {page > total - 5 && new Array(5).fill(0).map((_, idx) => pageItem(total - 4 + idx))}
          {page < total && next}
        </>
      </ul>
    </div>
  );
};

export default Pagination;
