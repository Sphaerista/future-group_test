import React from 'react';
import './App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainPage from './router/MainPage';
import BookPage from './router/BookPage';

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/book/:id" element={<BookPage />} />
      
      {/* <Route path='/' element={<header />} >
                <Route path='/' element={<MainWrapper />} />
                <Route path="/:id" element={<BookPage />} />
                <Outlet/>
            </Route> */}
    </Routes>
    </>
  );
}

export default App;
