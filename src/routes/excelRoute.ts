import express from "express";
import multer from "multer";
import { getPaginatedData } from "../controller/paginationContoller";

import {
  uploadCSV,
  searchInData,
  searchLocalFile,
  fetchUserFiles,
  fetchSpecificFile,
  deleteFile
} from "../controller/excelController";

const router = express.Router();
const upload = multer();

//Pagination Route
router.get("/paginated-data", getPaginatedData);

//CSV Routes
router.post("/upload", upload.single("file"), uploadCSV);
router.get("/search", searchInData);
router.get("/search-local", searchLocalFile);
router.get("/:user/fetchUserFiles", fetchUserFiles);
router.get("/:id/fetchSpecificFile", fetchSpecificFile);
router.delete("/:id/deleteFile", deleteFile);

export default router;
