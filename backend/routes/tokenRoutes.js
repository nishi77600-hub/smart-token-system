const express = require("express");
const router = express.Router();

const tokenController = require("../controllers/tokenController");

router.post("/create", tokenController.createToken);

router.get("/current", tokenController.getCurrentToken);

router.get("/queue", tokenController.getQueue);

router.post("/next", tokenController.nextToken);

module.exports = router;