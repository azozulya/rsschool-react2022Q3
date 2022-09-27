import React from 'react';
import { CustomLink } from '../components/CustomLink/CustomLink';
import style from './NotFoundPage.module.css';

export default function NotFound() {
  return (
    <div className={style.message}>
      Page not found.
      <br /> Go to
      <CustomLink to="/">main page</CustomLink>
    </div>
  );
}
