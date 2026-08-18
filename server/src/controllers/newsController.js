import News from '../models/News.js';

// @desc    Get all news articles
// @route   GET /api/v1/news
// @access  Public
export const getNews = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const articles = await News.find(query).sort({ featured: -1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: articles.length,
      data: articles,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single news article by ID
// @route   GET /api/v1/news/:id
// @access  Public
export const getNewsById = async (req, res, next) => {
  try {
    const article = await News.findOne({ id: req.params.id });
    if (!article) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    res.status(200).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

// @desc    Create news article
// @route   POST /api/v1/news
// @access  Private/Admin
export const createNews = async (req, res, next) => {
  try {
    const article = await News.create(req.body);
    res.status(201).json({ success: true, data: article });
  } catch (error) {
    next(error);
  }
};

// @desc    Update news article
// @route   PUT /api/v1/news/:id
// @access  Private/Admin
export const updateNews = async (req, res, next) => {
  try {
    let article = await News.findOne({ id: req.params.id });
    if (!article) {
      article = await News.findById(req.params.id);
    }
    if (!article) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    let updateData = { ...req.body };
    if (updateData._id) delete updateData._id;

    const updatedArticle = await News.findOneAndUpdate(
      { id: article.id },
      updateData,
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: updatedArticle });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete news article
// @route   DELETE /api/v1/news/:id
// @access  Private/Admin
export const deleteNews = async (req, res, next) => {
  try {
    let article = await News.findOne({ id: req.params.id });
    if (!article) {
      article = await News.findById(req.params.id);
    }
    if (!article) {
      return res.status(404).json({ success: false, message: 'News article not found' });
    }
    await article.deleteOne();
    res.status(200).json({ success: true, message: 'News article removed completely' });
  } catch (error) {
    next(error);
  }
};
