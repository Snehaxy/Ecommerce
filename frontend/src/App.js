import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/Login';
import AdminProducts from './pages/AdminProducts';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function Nav() {
  const { cart } = useCart();
  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">🛍️ E-Store</Link>
        <nav>
          <Link to="/">Shop</Link>
          <Link to="/admin/products">Admin</Link>
          <Link to="/login">Login</Link>
          <Link to="/cart" className="cart-link">
            🛒 Cart ({cart.length})
          </Link>
        </nav>
      </div>
    </header>
  );
}

function AppContent() {
  return (
    <>
      <Nav />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
