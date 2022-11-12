import React, { RefObject, useRef } from 'react';
import { useDispatch } from '../../state/dispatchContext';
import { useGlobalState } from '../../state/globalStateContext';
import style from './Sort.module.css';

const PER_PAGE = [5, 10, 20, 30, 40, 60];

const SORT_PARAMS = [
  {
    key: 'date-posted-desc',
    value: 'Date posted ↑',
  },
  {
    key: 'date-posted-asc',
    value: 'Date posted ↓',
  },
  {
    key: 'date-taken-asc',
    value: 'Date taken ↓',
  },
  {
    key: 'date-taken-desc',
    value: 'Date taken ↑',
  },
  {
    key: 'interestingness-desc',
    value: 'Interestingness ↑',
  },
  {
    key: 'interestingness-asc',
    value: 'Interestingness ↓',
  },
];

function Sort() {
  const { setPerPage, setSort } = useDispatch();
  const { perpage, sort } = useGlobalState();
  const perPageRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);
  const sortRef: RefObject<HTMLSelectElement> = useRef<HTMLSelectElement>(null);

  const onPerPageChangeHandler = () => {
    perPageRef.current && setPerPage(perPageRef.current.value);
  };

  const onSortChangeHandler = () => {
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
          {SORT_PARAMS.map(({ key, value }) => (
            <option key={self.crypto.randomUUID()} value={key}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Sort;
