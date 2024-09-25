import express from "express";
import multer from "multer";
import { getPaginatedData } from "../controller/paginationContoller";
import { registerUser, authenticateUser } from "../controller/userController";
import { uploadCSV, searchInData } from "../controller/excelController";

const router = express.Router();
const upload = multer();

//Pagination Route
router.get("/paginated-data", getPaginatedData);

//User Routes
router.post("/register-user", registerUser);
router.post("/login", authenticateUser);

//CSV  Routes
router.post("/upload", upload.single("file"), uploadCSV);
router.get("/search", searchInData);
export default router;
