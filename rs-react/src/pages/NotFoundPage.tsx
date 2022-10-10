import React from 'react';
import { NavLink } from 'react-router-dom';
import style from './NotFoundPage.module.css';

export default function NotFound() {
  return (
    <div className={style.message}>
      Page not found.
      <br /> Go to
      <NavLink to="/">main page</NavLink>
    </div>
  );
}
