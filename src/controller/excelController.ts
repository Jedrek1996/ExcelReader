import { Request, Response } from "express";
import { saveData, getData, searchData, CSVRow } from "../models/excelModel";
import { parseCSV } from "../utils/fileParser";

let csvData: CSVRow[] = [];

export const uploadCSV = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    csvData = await parseCSV(req.file.buffer);
    saveData(csvData);
    return res.status(200).json(csvData);
  } catch (error) {
    return res.status(500).json({ error: "Error parsing the CSV file" });
  }
};

export const getPaginatedData = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  const data = getData(csvData, page, limit);
  const totalItems = csvData.length;
  const totalPages = Math.ceil(totalItems / limit);

  return res.status(200).json({
    data,
    totalItems,
    totalPages,
    currentPage: page,
  });
};

export const searchInData = (req: Request, res: Response) => {
  const query = req.query.query as string;
  if (!query) {
    return res.status(400).json({ error: "No search query provided" });
  }
  const results = searchData(query);
  return res.status(200).json(results);
};
