import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Header from '../screens/Common/Header';
import Footer from '../screens/Common/Footer';
import Employee from '../screens/Employee/list';
import Cafe from '../screens/Cafe/list';
import UpdateCafe from '../screens/Cafe/form';
import { Box } from '@mui/material';
import EmployeeForm from '../screens/Employee/form';

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
