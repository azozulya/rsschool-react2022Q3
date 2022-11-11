import React, { RefObject, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { changeItemsPerPage, sortItems } from '../../store/thunks';
import { PER_PAGE, SORT_PARAMS } from '../../utils/constants';
import style from './Sort.module.css';

function Sort() {
  const dispatch = useAppDispatch();
  const { perpage, sort } = useAppSelector((state) => state.photos);

  const perPageRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
  const sortRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);

  const onPerPageChangeHandler = () => {
    perPageRef.current && dispatch(changeItemsPerPage(perPageRef.current.value));
  };

  const onSortChangeHandler = () => {
    console.log('sort: ', sortRef.current && sortRef.current.value);
    sortRef.current && dispatch(sortItems(sortRef.current.value));
  };

  return (
    <div className={style.panel}>
      <div className={style.perpage}>
        <span className={style.title}>movies per page</span>
        <select name="perPage" onChange={onPerPageChangeHandler} ref={perPageRef} value={perpage}>
          {PER_PAGE.map((item) => (
            <option key={self.crypto.randomUUID()} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <div className={style.sort}>
        <span className={style.title}>sort</span>
        <select name="sort" value={sort} onChange={onSortChangeHandler} ref={sortRef}>
          {SORT_PARAMS.map((item) => (
            <option key={self.crypto.randomUUID()} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Sort;
