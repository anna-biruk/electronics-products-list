import React from 'react';
import { ProductsList } from 'components/ProductsList';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AboutUsPage from 'components/pages/AboutUsPage';
import FormsPage from 'components/pages/FormsPage';
import { NotFoundPage } from 'components/pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/forms" element={<FormsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
