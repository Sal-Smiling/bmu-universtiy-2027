import Partnership from '../models/Partnership.js';

export const getPartnerships = async (req, res) => {
  try {
    const items = await Partnership.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPartnership = async (req, res) => {
  try {
    const item = new Partnership(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePartnership = async (req, res) => {
  try {
    const item = await Partnership.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!item) return res.status(404).json({ message: 'Partnership not found' });
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePartnership = async (req, res) => {
  try {
    const item = await Partnership.findOneAndDelete({ id: req.params.id });
    if (!item) return res.status(404).json({ message: 'Partnership not found' });
    res.json({ message: 'Partnership removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

