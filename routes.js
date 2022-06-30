const express = require("express");
const router = express.Router();

const admin = require("./routes/admin");
const index = require("./routes/index");
const book = require("./routes/book");

router.use("/", index);
router.use("/admin", admin);
router.use("/book", book);

module.exports = router;