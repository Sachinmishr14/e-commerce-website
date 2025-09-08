const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Token nahi hai' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).send({ message: 'Galat token' });
  }
};

router.get('/', verifyToken, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) cart = { items: [] }; // Empty cart if nahi hai
    res.send(cart);
  } catch (err) {
    res.status(400).send({ message: 'Error: ' + err.message });
  }
});

router.post('/add', verifyToken, async (req, res) => {
  try {
    const { itemId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) cart = new Cart({ userId: req.userId, items: [] });
    const existing = cart.items.find(i => i.itemId.toString() === itemId);
    if (existing) existing.quantity += quantity;
    else cart.items.push({ itemId, quantity });
    await cart.save();
    res.send(cart);
  } catch (err) {
    res.status(400).send({ message: 'Error: ' + err.message });
  }
});

router.post('/remove', verifyToken, async (req, res) => {
  try {
    const { itemId } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });
    if (cart) {
      cart.items = cart.items.filter(i => i.itemId.toString() !== itemId);
      await cart.save();
      res.send(cart);
    } else {
      res.send({ items: [] });
    }
  } catch (err) {
    res.status(400).send({ message: 'Error: ' + err.message });
  }
});

module.exports = router;