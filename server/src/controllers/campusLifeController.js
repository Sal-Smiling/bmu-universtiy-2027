import CampusLife from '../models/CampusLife.js';

// Get all campus life items
export const getCampusLife = async (req, res) => {
  try {
    const items = await CampusLife.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new campus life item
export const createCampusLife = async (req, res) => {
  try {
    const item = new CampusLife(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update campus life item
export const updateCampusLife = async (req, res) => {
  try {
    const updatedItem = await CampusLife.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete campus life item
export const deleteCampusLife = async (req, res) => {
  try {
    await CampusLife.findByIdAndDelete(req.params.id);
    res.json({ message: 'Campus life item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
