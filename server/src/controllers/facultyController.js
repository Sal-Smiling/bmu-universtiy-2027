import Faculty from '../models/Faculty.js';

// @desc    Get all faculties
// @route   GET /api/v1/faculties
// @access  Public
export const getFaculties = async (req, res, next) => {
  try {
    const faculties = await Faculty.find({});
    res.status(200).json({ success: true, count: faculties.length, data: faculties });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new faculty
// @route   POST /api/v1/faculties
// @access  Private/Admin
export const createFaculty = async (req, res, next) => {
  try {
    const faculty = await Faculty.create(req.body);
    res.status(201).json({ success: true, data: faculty });
  } catch (error) {
    next(error);
  }
};

// @desc    Update faculty
// @route   PUT /api/v1/faculties/:id
// @access  Private/Admin
export const updateFaculty = async (req, res, next) => {
  try {
    let faculty = await Faculty.findOne({ id: req.params.id });
    if (!faculty) {
      faculty = await Faculty.findById(req.params.id);
    }
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }

    let updateData = { ...req.body };
    if (updateData._id) delete updateData._id;

    const updatedFaculty = await Faculty.findOneAndUpdate(
      { id: faculty.id },
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updatedFaculty });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete faculty
// @route   DELETE /api/v1/faculties/:id
// @access  Private/Admin
export const deleteFaculty = async (req, res, next) => {
  try {
    let faculty = await Faculty.findOne({ id: req.params.id });
    if (!faculty) {
      faculty = await Faculty.findById(req.params.id);
    }
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }
    await faculty.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
