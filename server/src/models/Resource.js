const mongoose = require("mongoose");
const { RESOURCE_TYPES } = require("../constants/resourceTypes");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    type: {
      type: String,
      enum: Object.values(RESOURCE_TYPES),
      required: true,
    },
    section: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
      required: true,
    },
    url: { type: String, trim: true, default: null },
    file: {
      originalName: { type: String, default: null },
      storedName: { type: String, default: null },
      mimeType: { type: String, default: null },
      size: { type: Number, default: null },
      path: { type: String, default: null },
    },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

resourceSchema.pre("validate", function (next) {
  if (this.type === RESOURCE_TYPES.DOCUMENT && !this.file?.path) {
    return next(new Error("Document resources must include uploaded file metadata."));
  }

  if (
    [RESOURCE_TYPES.WEB_LINK, RESOURCE_TYPES.REPOSITORY, RESOURCE_TYPES.VIDEO_REEL].includes(this.type) &&
    !this.url
  ) {
    return next(new Error("URL is required for link/repository/video resources."));
  }

  next();
});

module.exports = mongoose.model("Resource", resourceSchema);
