const express = require("express");
const resourceRoutes = require("./resource.routes");
const sectionRoutes = require("./section.routes");

const router = express.Router();

router.use("/resources", resourceRoutes);
router.use("/sections", sectionRoutes);

module.exports = router;
