import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../screens/common/Header';
import Footer from '../screens/common/Footer';
import Employee from '../screens/employee';
import Cafe from '../screens/cafe/list';
import CreateCafe from '../screens/cafe/create';
import UpdateCafe from '../screens/cafe/update';
import { Box } from '@mui/material';

const Navigator: React.FC = () => {
  return (
    <BrowserRouter>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Cafe />} />
          <Route path="/employees" element={<Employee />} />
          <Route path="/cafe/create" element={<CreateCafe />} />
          <Route path="/cafe/update" element={<UpdateCafe />} />
        </Routes>
        <Footer />
      </Box>
    </BrowserRouter>
  );
};

export default Navigator;
