const express = require("express");
const router = express.Router();

const admin = require("./routes/admin");
const index = require("./routes/index");

router.use("/", index);
router.use("/admin", admin);

module.exports = router;