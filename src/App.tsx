import React from 'react';
import { ProductsList } from 'components/ProductsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { AboutUsPage } from 'components/AboutUsPage';
import { NotFoundPage } from 'components/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsList />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
