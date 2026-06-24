const express = require("express");
const { handleBfhl } = require("../controllers/bfhlController");

const router = express.Router();

router.post("/", handleBfhl);

module.exports = router;
