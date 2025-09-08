const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.price) query.price = { $lte: parseFloat(req.query.price) }; // Price se kam ya barabar
    if (req.query.category) query.category = req.query.category;
    const items = await Item.find(query);
    res.send(items);
  } catch (err) {
    res.status(400).send({ message: 'Error: ' + err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const item = new Item(req.body);
    await item.save();
    res.status(201).send(item);
  } catch (err) {
    res.status(400).send({ message: 'Error: ' + err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).send({ message: 'Item nahi mila' });
    res.send(item);
  } catch (err) {
    res.status(400).send({ message: 'Error: ' + err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.send({ message: 'Item delete ho gaya' });
  } catch (err) {
    res.status(400).send({ message: 'Error: ' + err.message });
  }
});

module.exports = router;