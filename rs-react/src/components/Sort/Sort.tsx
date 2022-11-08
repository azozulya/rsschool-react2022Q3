import React, { RefObject, useRef } from 'react';
import { useDispatch } from '../../state/dispatchContext';
import { useGlobalState } from '../../state/globalStateContext';
import { PER_PAGE, SORT_PARAMS } from '../../utils/constants';
import style from './Sort.module.css';

function Sort() {
  const { setPerPage, setSort } = useDispatch();
  const { perpage, sort } = useGlobalState();
  const perPageRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
  const sortRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);

  const onPerPageChangeHandler = () => {
    console.log('perPage: ', perPageRef.current && perPageRef.current.value);
    perPageRef.current && setPerPage(perPageRef.current.value);
  };

  const onSortChangeHandler = () => {
    console.log('sort: ', sortRef.current && sortRef.current.value);
    sortRef.current && setSort(sortRef.current.value);
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
// sort_by=vote_average.desc
export default Sort;
