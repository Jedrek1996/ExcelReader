import { Request, Response } from "express";
import { CSVModel } from "../models/excelModel";

export const getPaginatedDataFromDB = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const totalItems = await CSVModel.countDocuments();
  const data = await CSVModel.find({}).skip(skip).limit(limit);
  const totalPages = Math.ceil(totalItems / limit);

  return { data, totalItems, totalPages };
};

export const getPaginatedData = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  try {
    const { data, totalItems, totalPages } = await getPaginatedDataFromDB(
      page,
      limit
    );
    return res.status(200).json({
      data,
      totalItems,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching paginated data from MongoDB" });
  }
};
