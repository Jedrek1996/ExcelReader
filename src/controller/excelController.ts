import { Request, Response } from "express";
import { CSVRow, searchData } from "../models/excelModel";
import { parseCSV } from "../utils/fileParser";
import { CSVModel } from "../models/excelModel";
import { validateUser } from "./userController";

// Upload and save CSV data to MongoDB
export const uploadCSV = async (req: Request, res: Response) => {
  // Check if the file is uploaded
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    const csvData: CSVRow[] = await parseCSV(req.file.buffer);
    const fileName = req.file.originalname;
    const userName = req.body.username;

    if (!userName) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    await saveData(csvData, fileName, userName);
    console.log("Data successfully saved to MongoDB.");

    return res
      .status(200)
      .json({ message: "File uploaded and data saved.", data: csvData });
  } catch (error) {
    console.error("Error saving data:", error);
    return res.status(500).json({ error: "Error processing the CSV file" });
  }
};

export const searchInData = async (req: Request, res: Response) => {
  const query = req.query.query as string;
  if (!query) {
    return res.status(400).json({ error: "No search query provided" });
  }

  try {
    const results = await searchDataInDB(query);
    return res.status(200).json(results);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error searching the data in MongoDB" });
  }
};

export const saveData = async (
  data: CSVRow[],
  fileName: string,
  userName: string
) => {
  const csvDocument = new CSVModel({
    data,
    fileName,
    userName,
  });

  try {
    await csvDocument.save();
    console.log("CSV data successfully saved to MongoDB.");
  } catch (error) {
    console.error("Error saving data to MongoDB:", error);
  }
};

export const searchDataInDB = async (query: string) => {
  const results = await CSVModel.find({
    data: {
      $elemMatch: {
        $or: [
          { field1: new RegExp(query, "i") },
          { field2: new RegExp(query, "i") },
        ],
      },
    },
  });

  return results;
};

let parsedData: Record<string, any>[] = [];

export const searchLocalFile = (req: Request, res: Response) => {
  const query = req.query.query as string;
  console.log("Received query:", query);

  if (!query) {
    return res.status(400).json({ error: "No search query provided" });
  }

  const results = searchData(parsedData, query);
  console.log("Search results:", results);

  return res.status(200).json(results);
};

// MongoDB Controller
export const fetchUserFiles = async (req: Request, res: Response) => {
  const userName = req.params.user as string;

  try {
    const userFiles = await CSVModel.find({ userName });
    if (!userFiles || userFiles.length === 0) {
      return res.status(404).json({ error: "No files found for this user" });
    }
    return res.status(200).json(userFiles);
  } catch (error) {
    console.error("Error fetching user files:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const fetchSpecificFile = async (req: Request, res: Response) => {
  const fileId = req.params.id as string;

  try {
    const file = await CSVModel.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }
    return res.status(200).json(file);
  } catch (error) {
    console.error("Error fetching the file:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  const fileId = req.params.id as string;

  try {
    const deletedFile = await CSVModel.findByIdAndDelete(fileId);

    if (!deletedFile) {
      return res.status(404).json({ error: "File not found" });
    }

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting the file:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
