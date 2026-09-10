const { RESOURCE_TYPES } = require("../constants/resourceTypes");

function isGitHubRepoUrl(url = "") {
  return /^https?:\/\/(www\.)?github\.com\/[^/]+\/[^/]+\/?$/i.test(url.trim());
}

function isVideoUrl(url = "") {
  return /(youtube\.com|youtu\.be|instagram\.com\/reel|tiktok\.com)/i.test(url);
}

function inferTypeFromInput({ url, fileName, explicitType }) {
  if (explicitType) return explicitType;

  if (fileName) return RESOURCE_TYPES.DOCUMENT;
  if (url && isGitHubRepoUrl(url)) return RESOURCE_TYPES.REPOSITORY;
  if (url && isVideoUrl(url)) return RESOURCE_TYPES.VIDEO_REEL;
  if (url) return RESOURCE_TYPES.WEB_LINK;

  return RESOURCE_TYPES.WEB_LINK;
}

module.exports = { inferTypeFromInput, isGitHubRepoUrl, isVideoUrl };
