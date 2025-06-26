import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import BookDetailPage from './pages/BookDetailPage';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Recupera il token dal localStorage all'avvio
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser(token);
    }
  }, []);

  return (
    <Router>
      <Navbar cart={cart} user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<HomePage cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/books/:id" element={<BookDetailPage cart={cart} setCart={setCart} />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
