import express from "express";
const router = express.Router();

import auth from "./routes/auth.js";
import index from "./routes/index.js";
import book from "./routes/book.js";
import api from "./routes/api.js";

router.use("/", index);
router.use("/authentication", auth);
router.use("/book", book);
router.use("/api", api)

export default router;