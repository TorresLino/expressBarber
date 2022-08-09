import express from "express";
const router = express.Router();

import admin from "./routes/admin.js";
import index from "./routes/index.js";
import book from "./routes/book.js";
import api from "./routes/api.js";

router.use("/", index);
router.use("/admin", admin);
router.use("/book", book);
router.use("/api", api)

export default router;