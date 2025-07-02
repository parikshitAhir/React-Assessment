import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProductDashboard from './pages/Product-Dashboard';
import NewPassword from './pages/CreateNewPassword';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './Layout/mainLayout'; 

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<SignIn />} />
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/prodash" element={<ProductDashboard />} />
        <Route path="/newpass" element={<NewPassword />} />
      </Route>
    </Routes>
  );
};

export default App;
