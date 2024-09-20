import express from "express";
import multer from "multer";
import {
  uploadCSV,
  getPaginatedData,
  searchInData,
} from "../controller/excelController";

const router = express.Router();
const upload = multer();

router.post("/upload", upload.single("file"), uploadCSV);
router.get("/paginated-data", getPaginatedData);
router.get("/search", searchInData);

export default router;
