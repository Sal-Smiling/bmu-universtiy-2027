import CommunityService from '../models/CommunityService.js';

// Get all community services
export const getCommunityServices = async (req, res) => {
  try {
    const items = await CommunityService.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new community service
export const createCommunityService = async (req, res) => {
  try {
    const item = new CommunityService(req.body);
    const savedItem = await item.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update community service
export const updateCommunityService = async (req, res) => {
  try {
    const updatedItem = await CommunityService.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedItem) {
      return res.status(404).json({ message: 'Community Service item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete community service
export const deleteCommunityService = async (req, res) => {
  try {
    const deletedItem = await CommunityService.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Community Service item not found' });
    }
    res.json({ message: 'Community Service item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
