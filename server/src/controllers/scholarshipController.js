import Scholarship from '../models/Scholarship.js';

export const getScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.status(200).json(scholarships);
  } catch (error) {
    res.status(500).json({ message: 'Server Error fetching scholarships' });
  }
};

export const createScholarship = async (req, res) => {
  try {
    const newScholarship = new Scholarship(req.body);
    await newScholarship.save();
    res.status(201).json(newScholarship);
  } catch (error) {
    res.status(400).json({ message: 'Error creating scholarship', error });
  }
};

export const updateScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Scholarship.findOneAndUpdate({ id }, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Scholarship not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Error updating scholarship', error });
  }
};

export const deleteScholarship = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Scholarship.findOneAndDelete({ id });
    if (!deleted) return res.status(404).json({ message: 'Scholarship not found' });
    res.status(200).json({ message: 'Scholarship deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting scholarship', error });
  }
};

