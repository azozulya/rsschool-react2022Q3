import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import style from './Layout.module.css';

const activeClassName = [style.active, style.link].join(' ');

const Layout = () => {
  return (
    <>
      <header className={style.header}>
        <div className="container">
          <nav>
            <ul className={style.menu}>
              <li className={style.menuItem}>
                <NavLink
                  to={'/'}
                  className={({ isActive }) => (isActive ? activeClassName : style.link)}
                  end
                >
                  Main
                </NavLink>
              </li>
              <li className={style.menuItem}>
                <NavLink
                  to={'/about'}
                  className={({ isActive }) => (isActive ? activeClassName : style.link)}
                >
                  About
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export { Layout };
