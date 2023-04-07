import React from 'react';
import { CharactersList } from 'components/CharactersList';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import AboutUsPage from 'pages/AboutUsPage';
import FormsPage from 'pages/FormsPage';
import { NotFoundPage } from 'pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<CharactersList />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/forms" element={<FormsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
