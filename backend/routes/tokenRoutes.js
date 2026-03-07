const express = require("express");
const router = express.Router();

const tokenController = require("../controllers/tokenController");

router.post("/generate-token",tokenController.generateToken);

router.post("/next",tokenController.nextToken);

router.get("/status",tokenController.queueStatus);

router.post("/pause",tokenController.pauseQueue);

router.post("/resume",tokenController.resumeQueue);

module.exports = router;