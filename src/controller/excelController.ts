import { Request, Response } from "express";
import { CSVRow } from "../models/excelModel";
import { parseCSV } from "../utils/fileParser";
import { CSVModel } from "../models/excelModel";

// Upload and save CSV data to MongoDB
export const uploadCSV = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const csvData: CSVRow[] = await parseCSV(req.file.buffer);
    const fileName = req.file.originalname;
    await saveData(csvData, fileName);
    console.log("Data successfully saved to MongoDB.");

    return res
      .status(200)
      .json({ message: "File uploaded and data saved.", data: csvData });
  } catch (error) {
    return res.status(500).json({ error: "Error parsing the CSV file" });
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

export const saveData = async (data: CSVRow[], fileName: string) => {
  const csvDocument = new CSVModel({
    data,
    fileName,
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
