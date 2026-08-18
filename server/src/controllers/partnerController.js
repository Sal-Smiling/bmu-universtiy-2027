import Partner from '../models/Partner.js';

export const getPartners = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    const partners = await Partner.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: partners.length, data: partners });
  } catch (error) {
    next(error);
  }
};

export const getPartnerById = async (req, res, next) => {
  try {
    const partner = await Partner.findOne({ id: req.params.id }) || await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
};

export const createPartner = async (req, res, next) => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
};

export const updatePartner = async (req, res, next) => {
  try {
    let partner = await Partner.findOne({ id: req.params.id }) || await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    let updateData = { ...req.body };
    if (updateData._id) delete updateData._id;

    const updated = await Partner.findOneAndUpdate(
      { id: partner.id },
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deletePartner = async (req, res, next) => {
  try {
    let partner = await Partner.findOne({ id: req.params.id }) || await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ success: false, message: 'Partner not found' });
    }
    await partner.deleteOne();
    res.status(200).json({ success: true, message: 'Partner removed completely' });
  } catch (error) {
    next(error);
  }
};
