import { useState } from 'react'

import './App.css'
import LandingPage from './pages/LandingPage'

import 'antd/dist/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Halaman Utama */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Halaman Keranjang */}
        <Route path="/cart" element={<CartPage />} />
        
        {/* Halaman Keranjang */}
        <Route path="/payment" element={<PaymentPage />} />

        {/* Admin Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Halaman 404 (Opsional, jika user nyasar) */}
        <Route path="*" element={<div style={{textAlign: 'center', marginTop: 50}}>Halaman tidak ditemukan</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
