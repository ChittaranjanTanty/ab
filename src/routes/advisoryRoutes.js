const express = require("express");
const router = express.Router();
const { getCropAdvisory, getSoilAdvisory } = require("../controllers/advisoryController");

router.post("/advisory", getCropAdvisory);
router.post("/soil-advisory", getSoilAdvisory);

module.exports = router;