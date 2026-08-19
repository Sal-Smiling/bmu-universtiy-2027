import Program from '../models/Program.js';

// @desc    Get all academic programs
// @route   GET /api/v1/programs
// @access  Public
export const getPrograms = async (req, res, next) => {
  try {
    const { category, degree, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }
    if (degree && degree !== 'All') {
      query.degree = degree;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const programs = await Program.find(query).sort({ featured: -1, title: 1 });
    res.status(200).json({
      success: true,
      count: programs.length,
      data: programs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single academic program by ID
// @route   GET /api/v1/programs/:id
// @access  Public
export const getProgramById = async (req, res, next) => {
  try {
    const program = await Program.findOne({ id: req.params.id });
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found in foundry database' });
    }
    res.status(200).json({ success: true, data: program });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new academic program
// @route   POST /api/v1/programs
// @access  Private/Admin
export const createProgram = async (req, res, next) => {
  try {
    const program = await Program.create(req.body);
    res.status(201).json({ success: true, data: program });
  } catch (error) {
    next(error);
  }
};

// @desc    Update academic program
// @route   PUT /api/v1/programs/:id
// @access  Private/Admin
export const updateProgram = async (req, res, next) => {
  try {
    let program = await Program.findOne({ id: req.params.id });
    if (!program) {
      program = await Program.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    }
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    const updatedProgram = await Program.findOneAndUpdate(
      { id: program.id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updatedProgram });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete academic program
// @route   DELETE /api/v1/programs/:id
// @access  Private/Admin
export const deleteProgram = async (req, res, next) => {
  try {
    let program = await Program.findOne({ id: req.params.id });
    if (!program) {
      program = await Program.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    }
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    await program.deleteOne();
    res.status(200).json({ success: true, message: 'Program removed completely' });
  } catch (error) {
    next(error);
  }
};

