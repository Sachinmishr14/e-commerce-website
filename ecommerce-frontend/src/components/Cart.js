import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCartItems(res.data.items || []);
      } catch (err) {
        alert('Error fetching cart');
      }
    };
    fetchCart();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:5000/api/cart/remove', { itemId }, {
        headers: { Authorization: `Bearer ${token}`}
      });
      setCartItems(res.data.items || []);
    } catch (err) {
      alert('Error removing item');
    }
  };

  return (
    <div>
      <h2>YOUR CART</h2>
      <ul className="list-group">
        {cartItems.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between">
            Item ID: {item.itemId} (Quantity: {item.quantity})
            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.itemId)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to="/listing" className="btn btn-secondary mt-3">Back to Products</Link>
    </div>
  );
}

export default Cart;