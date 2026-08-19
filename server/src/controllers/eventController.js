import Event from '../models/Event.js';

export const getEvents = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    const events = await Event.find(query).sort({ eventDate: -1, createdAt: -1 });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req, res, next) => {
  try {
    let event = await Event.findOne({ id: req.params.id });
    if (!event && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      event = await Event.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    }
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findOne({ id: req.params.id });
    if (!event && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      event = await Event.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    }
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    const updated = await Event.findOneAndUpdate(
      { _id: event._id },
      req.body,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    let event = await Event.findOne({ id: req.params.id });
    if (!event && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      event = await Event.findOne({ $or: [{ _id: req.params.id.match(/^[0-9a-fA-F]{24}$/) ? req.params.id : null }, { id: req.params.id }] });
    }
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    await event.deleteOne();
    res.status(200).json({ success: true, message: 'Event removed completely' });
  } catch (error) {
    next(error);
  }
};

