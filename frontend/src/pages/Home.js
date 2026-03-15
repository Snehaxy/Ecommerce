import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/products', { params: { q } });
      setProducts(res.data);
    };
    load();
  }, [q]);

  return (
    <div className="shop-container">
      <h1>Shop Products</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="products-grid">
        {products.map(p => (
          <div key={p._id} className="product-card">
            <div className="product-image">
              {p.image ? <img src={p.image} alt={p.name} /> : <div className="no-image">📦</div>}
            </div>
            <h3>{p.name}</h3>
            <p className="product-desc">{p.description}</p>
            <p className="product-price">${typeof p.price === 'number' ? p.price.toFixed(2) : parseFloat(p.price).toFixed(2)}</p>
            <div className="product-actions">
              <Link to={`/product/${p._id}`} className="btn btn-secondary">View</Link>
              <button className="btn" onClick={() => addToCart(p)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && <p style={{ textAlign: 'center', marginTop: '2rem' }}>No products found.</p>}
    </div>
  );
}
