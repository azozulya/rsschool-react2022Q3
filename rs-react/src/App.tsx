import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Main from './pages/MainPage';
import NotFound from './pages/NotFoundPage';
import About from './pages/AboutPage';
import FormPage from './pages/FormPage/FormPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="about" element={<About />} />
          <Route path="search-form" element={<FormPage />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to={'404'} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
