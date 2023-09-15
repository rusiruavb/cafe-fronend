import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import Header from '../screens/common/Header';
import Footer from '../screens/common/Footer';

const Navigator: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes></Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Navigator;
