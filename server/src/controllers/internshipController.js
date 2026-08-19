import Internship from '../models/Internship.js';

export const getInternships = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }
    if (search) {
      query.$or = [
        { company: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    const internships = await Internship.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: internships.length, data: internships });
  } catch (error) {
    next(error);
  }
};

export const getInternshipById = async (req, res, next) => {
  try {
    const internship = await Internship.findOne({ id: req.params.id }) || await Internship.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    res.status(200).json({ success: true, data: internship });
  } catch (error) {
    next(error);
  }
};

export const createInternship = async (req, res, next) => {
  try {
    const internship = await Internship.create(req.body);
    res.status(201).json({ success: true, data: internship });
  } catch (error) {
    next(error);
  }
};

export const updateInternship = async (req, res, next) => {
  try {
    let internship = await Internship.findOne({ id: req.params.id }) || await Internship.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    const updated = await Internship.findOneAndUpdate(
      { id: internship.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteInternship = async (req, res, next) => {
  try {
    let internship = await Internship.findOne({ id: req.params.id }) || await Internship.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    if (!internship) {
      return res.status(404).json({ success: false, message: 'Internship not found' });
    }
    await internship.deleteOne();
    res.status(200).json({ success: true, message: 'Internship removed completely' });
  } catch (error) {
    next(error);
  }
};

