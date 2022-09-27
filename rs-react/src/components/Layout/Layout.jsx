import React from 'react';
import { Outlet } from 'react-router-dom';
import { CustomLink } from '../CustomLink/CustomLink';
import style from './Layout.module.css'

const Layout = () => {

    return (
        <>
            <header className={style.header}>
                <div className="container">
                    <nav>
                        <ul className={style.menu}>
                            <li className={style.menuItem}>
                                <CustomLink to='/'>Main</CustomLink>
                            </li>
                            <li className={style.menuItem}>
                                <CustomLink to='/about'>About us</CustomLink>
                            </li>
                            <li className={style.menuItem}>
                                <CustomLink to='/search-form'>Search form</CustomLink>
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
    )
}

export { Layout }