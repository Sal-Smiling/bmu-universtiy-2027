import Application from '../models/Application.js';

// @desc    Submit new student admission application
// @route   POST /api/v1/applications
// @access  Public
export const submitApplication = async (req, res, next) => {
  try {
    const application = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Your admission application has been successfully submitted to BMU University!',
      applicationId: application.applicationId,
      data: application,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    next(error);
  }
};

// @desc    Get application status by applicationId or email
// @route   GET /api/v1/applications/status/:applicationId
// @access  Public
export const getApplicationStatus = async (req, res, next) => {
  try {
    const application = await Application.findOne({ applicationId: req.params.applicationId });
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application ID not found in admission records.' });
    }
    res.status(200).json({
      success: true,
      data: {
        applicationId: application.applicationId,
        fullName: application.fullName,
        programOfInterest: application.programOfInterest,
        status: application.status,
        submittedAt: application.submittedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
