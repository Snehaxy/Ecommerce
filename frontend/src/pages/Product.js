import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
    };
    load();
  }, [id]);

  if (!product) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="product-detail">
      <button className="btn btn-back" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-container">
        <div className="detail-image">
          {product.image ? <img src={product.image} alt={product.name} /> : <div className="no-image large">📦</div>}
        </div>
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="category">Category: {product.category || 'Uncategorized'}</p>
          <p className="description">{product.description || 'No description'}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className="stock">In Stock: {product.countInStock || 0}</p>
          <button
            className="btn btn-large"
            onClick={() => {
              addToCart(product);
              navigate('/cart');
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
