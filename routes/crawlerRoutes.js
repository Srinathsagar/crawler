const express = require("express");
const { crawl } = require("../controllers/crawlerController");

const router = express.Router();

router.post("/crawl", crawl);

module.exports = router;
