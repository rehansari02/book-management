import { Router } from "express";
import {
  bookadd,
  getAllBooks,
  getbookedit,
  getbookdelete,
} from "../controllers/BookController.js";
import { AsyncWrap } from "../utils/asyncwrap.js";

const router = Router();

router.post("/bookadd", AsyncWrap(bookadd));
router.get("/books", AsyncWrap(getAllBooks));
router.put("/:id", AsyncWrap(getbookedit));
router.delete("/:id", AsyncWrap(getbookdelete));

export default router;
