const Section = require("../models/Section");

exports.createSection = async (req, res, next) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).json(section);
  } catch (err) {
    next(err);
  }
};

exports.getSections = async (_req, res, next) => {
  try {
    const sections = await Section.find().sort({ name: 1 });
    res.json(sections);
  } catch (err) {
    next(err);
  }
};
