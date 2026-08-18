import Contact from '../models/Contact.js';

// @desc    Submit contact inquiry or feedback
// @route   POST /api/v1/contact
// @access  Public
export const submitContact = async (req, res, next) => {
  try {
    const inquiry = await Contact.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received! Our Silicon Valley campus team will respond within 24 hours.',
      ticketId: inquiry.ticketId,
      data: inquiry,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    next(error);
  }
};
