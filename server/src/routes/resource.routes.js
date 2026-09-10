const express = require("express");
const {
  createResource,
  getResources,
  getResourceById,
  updateResource,
  deleteResource,
} = require("../controllers/resource.controller");
const { upload } = require("../middlewares/upload.middleware");

const router = express.Router();

router.post("/", upload.single("file"), createResource);
router.get("/", getResources);
router.get("/:id", getResourceById);
router.put("/:id", upload.single("file"), updateResource);
router.delete("/:id", deleteResource);

module.exports = router;
