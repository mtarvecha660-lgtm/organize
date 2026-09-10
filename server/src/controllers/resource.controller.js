const Resource = require("../models/Resource");
const { inferTypeFromInput } = require("../services/resourceParser.service");

exports.createResource = async (req, res, next) => {
  try {
    const { title, description, section, url, type, tags } = req.body;

    const inferredType = inferTypeFromInput({
      url,
      fileName: req.file?.originalname,
      explicitType: type,
    });

    const payload = {
      title,
      description,
      section,
      url: url || null,
      type: inferredType,
      tags: tags ? JSON.parse(tags) : [],
    };

    if (req.file) {
      payload.file = {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      };
    }

    const created = await Resource.create(payload);
    const populated = await created.populate("section", "name color");

    res.status(201).json(populated);
  } catch (err) {
    next(err);
  }
};

exports.getResources = async (_req, res, next) => {
  try {
    const resources = await Resource.find()
      .populate("section", "name color")
      .sort({ createdAt: -1 });

    res.json(resources);
  } catch (err) {
    next(err);
  }
};

exports.getResourceById = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id).populate("section", "name color");

    if (!resource) return res.status(404).json({ message: "Resource not found" });

    res.json(resource);
  } catch (err) {
    next(err);
  }
};

exports.updateResource = async (req, res, next) => {
  try {
    const existing = await Resource.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: "Resource not found" });

    const { title, description, section, url, type, tags } = req.body;

    if (title !== undefined) existing.title = title;
    if (description !== undefined) existing.description = description;
    if (section !== undefined) existing.section = section;
    if (url !== undefined) existing.url = url;
    if (tags !== undefined) existing.tags = JSON.parse(tags);

    existing.type = inferTypeFromInput({
      url: existing.url,
      fileName: req.file?.originalname || existing.file?.originalName,
      explicitType: type || existing.type,
    });

    if (req.file) {
      existing.file = {
        originalName: req.file.originalname,
        storedName: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        path: req.file.path,
      };
    }

    await existing.save();
    await existing.populate("section", "name color");

    res.json(existing);
  } catch (err) {
    next(err);
  }
};

exports.deleteResource = async (req, res, next) => {
  try {
    const deleted = await Resource.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Resource not found" });

    res.json({ message: "Resource deleted successfully" });
  } catch (err) {
    next(err);
  }
};
