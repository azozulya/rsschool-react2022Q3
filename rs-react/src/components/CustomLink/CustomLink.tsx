import React from 'react';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import style from './CustomLink.module.css';

const CustomLink = ({ to, children }: LinkProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to} className={match ? [style.activeLink, style.link].join(' ') : style.link}>
      {children}
    </Link>
  );
};

export { CustomLink };
