import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import Main from './pages/MainPage';
import NotFound from './pages/NotFoundPage';
import About from './pages/AboutPage';
import FormPage from './pages/FormPage';
import PhotoDetails from './pages/PhotoDetails';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="form" element={<FormPage />} />
          <Route path="about" element={<About />} />
          <Route path="404" element={<NotFound />} />
          <Route path="photo/:id" element={<PhotoDetails />} />
          <Route path="*" element={<Navigate replace to={'404'} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
