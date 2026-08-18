import SiteSetting from '../models/SiteSetting.js';

export const getSettings = async (req, res, next) => {
  try {
    const settings = await SiteSetting.find({});
    // Transform array to object by key for easy frontend consumption
    const settingsMap = {};
    settings.forEach((item) => {
      settingsMap[item.key] = item;
    });
    res.status(200).json({ success: true, count: settings.length, data: settingsMap, raw: settings });
  } catch (error) {
    next(error);
  }
};

export const getSettingByKey = async (req, res, next) => {
  try {
    const setting = await SiteSetting.findOne({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ success: false, message: 'Setting key not found' });
    }
    res.status(200).json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
};

export const upsertSetting = async (req, res, next) => {
  try {
    const { key, title, subtitle, content, tag, image, slides, emblems } = req.body;
    const updateData = { lastUpdatedBy: req.user ? req.user.email : 'Admin' };
    if (title !== undefined) updateData.title = title;
    if (subtitle !== undefined) updateData.subtitle = subtitle;
    if (content !== undefined) updateData.content = content;
    if (tag !== undefined) updateData.tag = tag;
    if (image !== undefined) updateData.image = image;
    if (slides !== undefined) updateData.slides = slides;
    if (emblems !== undefined) updateData.emblems = emblems;

    const setting = await SiteSetting.findOneAndUpdate(
      { key },
      { $set: updateData },
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: setting });
  } catch (error) {
    next(error);
  }
};

export const deleteSetting = async (req, res, next) => {
  try {
    const setting = await SiteSetting.findOneAndDelete({ key: req.params.key });
    if (!setting) {
      return res.status(404).json({ success: false, message: 'Setting not found' });
    }
    res.status(200).json({ success: true, message: 'Setting removed successfully' });
  } catch (error) {
    next(error);
  }
};
