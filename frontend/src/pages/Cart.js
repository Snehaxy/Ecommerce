import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>Your cart is empty</p>
        <Link to="/" className="btn">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(p => (
            <tr key={p._id}>
              <td>
                <Link to={`/product/${p._id}`}>{p.name}</Link>
              </td>
              <td>${p.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={p.quantity}
                  onChange={e => updateQuantity(p._id, parseInt(e.target.value))}
                  className="qty-input"
                />
              </td>
              <td>${(p.price * p.quantity).toFixed(2)}</td>
              <td>
                <button className="btn btn-small" onClick={() => removeFromCart(p._id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="cart-summary">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button className="btn btn-large" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        <Link to="/" className="btn btn-secondary">Continue Shopping</Link>
      </div>
    </div>
  );
}
