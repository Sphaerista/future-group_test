import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './router/MainPage';
import BookPage from './router/BookPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/book/:id" element={<BookPage />} />
    </Routes>
    </>
  );
}

export default App;
