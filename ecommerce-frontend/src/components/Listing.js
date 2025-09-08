import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Listing() {
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/items?price=${price}&category=${category}`);
        setItems(res.data);
      } catch (err) {
        alert('Error fetching items');
      }
    };
    fetchItems();
  }, [price, category]);

  const addToCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/cart/add', { itemId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Cart mein add ho gaya');
    } catch (err) {
      alert('Error adding to cart');
    }
  };

  return (
    <div>
      <h2>PRODUCTS</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <input className="form-control" placeholder="Max Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="col-md-6">
          <input className="form-control" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        </div>
      </div>
      <ul className="list-group">
        {items.map(item => (
          <li key={item._id} className="list-group-item d-flex justify-content-between">
            {item.name} - ${item.price} ({item.category})
            <button className="btn btn-success btn-sm" onClick={() => addToCart(item._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <Link to="/cart" className="btn btn-secondary mt-3">See Cart </Link>
    </div>
  );
}

export default Listing;