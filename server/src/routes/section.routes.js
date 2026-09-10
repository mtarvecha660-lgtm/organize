const express = require("express");
const { createSection, getSections } = require("../controllers/section.controller");

const router = express.Router();

router.post("/", createSection);
router.get("/", getSections);

module.exports = router;
