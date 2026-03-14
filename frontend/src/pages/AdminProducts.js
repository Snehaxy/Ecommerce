import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AdminProducts(){
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: '', countInStock: 10 });
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { load(); }, []);
  
  const load = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/products/${editing}`, form);
        setEditing(null);
      } else {
        await api.post('/products', form);
      }
      setForm({ name: '', description: '', price: '', image: '', category: '', countInStock: 10 });
      load();
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      if (err.response?.status === 401) {
        setError('Unauthorized - Login required or not admin');
        navigate('/login');
      } else {
        setError(msg);
      }
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        load();
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  const editProduct = (p) => {
    setForm(p);
    setEditing(p._id);
  };

  const token = localStorage.getItem('token');

  return (
    <div className="admin-container">
      <h2>Admin - Product Management</h2>
      {token ? <p style={{ color: 'green' }}>✓ Logged in</p> : <p style={{ color: 'red' }}>✗ Not logged in - <a href="/login">Login</a></p>}
      {error && <div className="error">{error}</div>}

      <form onSubmit={createProduct} className="admin-form">
        <h3>{editing ? 'Edit Product' : 'Add New Product'}</h3>
        <div className="form-row">
          <input
            placeholder="Product Name *"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
          />
          <input
            placeholder="Price *"
            type="number"
            step="0.01"
            value={form.price}
            onChange={e => setForm({...form, price: e.target.value})}
            required
          />
        </div>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({...form, description: e.target.value})}
          rows="3"
        ></textarea>
        <div className="form-row">
          <input
            placeholder="Image URL"
            value={form.image}
            onChange={e => setForm({...form, image: e.target.value})}
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={e => setForm({...form, category: e.target.value})}
          />
          <input
            placeholder="Stock"
            type="number"
            value={form.countInStock}
            onChange={e => setForm({...form, countInStock: e.target.value})}
          />
        </div>
        <button type="submit" className="btn">{editing ? 'Update Product' : 'Add Product'}</button>
        {editing && <button type="button" className="btn btn-secondary" onClick={() => { setEditing(null); setForm({ name: '', description: '', price: '', image: '', category: '', countInStock: 10 }); }}>Cancel</button>}
      </form>

      <h3>Products</h3>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>${p.price}</td>
              <td>{p.category || '-'}</td>
              <td>{p.countInStock || 0}</td>
              <td>
                <button className="btn btn-small" onClick={() => editProduct(p)}>Edit</button>
                <button className="btn btn-small" onClick={() => deleteProduct(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
