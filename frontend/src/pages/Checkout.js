import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckout = async () => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const order = await api.post('/orders', {
        items: cart.map(p => ({ product: p._id, name: p.name, price: p.price, quantity: p.quantity })),
        totalPrice: total
      });
      clearCart();
      alert('✓ Order placed successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <h2>Checkout</h2>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {error && <div className="error">{error}</div>}

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <ul>
          {cart.map(p => (
            <li key={p._id}>
              {p.name} x{p.quantity} = ${((typeof p.price === 'number' ? p.price : parseFloat(p.price)) * p.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h4>Total: ${typeof total === 'number' ? total.toFixed(2) : parseFloat(total).toFixed(2)}</h4>
      </div>

      <div className="checkout-form">
        <p style={{ color: '#666', marginBottom: '1rem' }}>
          ⚠️ This is a demo. No real payment processing.
        </p>
        <button
          className="btn btn-large"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}
