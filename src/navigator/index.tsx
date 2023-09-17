import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from '../screens/common/Header';
import Footer from '../screens/common/Footer';
import Employee from '../screens/employee/list';
import Cafe from '../screens/cafe/list';
import UpdateCafe from '../screens/cafe/form';
import { Box } from '@mui/material';
import EmployeeForm from '../screens/employee/form';

const Navigator: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Box
          sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Cafe />} />
            <Route path="/employees" element={<Employee />} />
            <Route path="/cafe/:mode" element={<UpdateCafe />} />
            <Route path="/employee/:mode" element={<EmployeeForm />} />
          </Routes>
          <Footer />
        </Box>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default Navigator;
