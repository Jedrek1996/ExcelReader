import express from "express";
import multer from "multer";
import { getPaginatedData } from "../controller/paginationContoller";

import {
  uploadCSV,
  searchInData,
  searchLocalFile,
} from "../controller/excelController";

const router = express.Router();
const upload = multer();

//Pagination Route
router.get("/paginated-data", getPaginatedData);

//CSV  Routes
router.post("/upload", upload.single("file"), uploadCSV);
router.get("/search", searchInData);
router.get("/search-local", searchLocalFile);
export default router;
