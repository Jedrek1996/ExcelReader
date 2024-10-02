import mongoose, { Schema, Document } from "mongoose";
export interface CSVRow {
  [key: string]: string;
}

export interface CSVData extends Document {
  data: CSVRow[];
  fileName: string;
  userName: string;
}

const csvSchema: Schema = new Schema({
  data: [{ type: Object, required: true }],
  fileName: { type: String, required: true },
  userName: { type: String, required: true },
});

export const CSVModel = mongoose.model<CSVData>("CSVData", csvSchema);

export const searchData = (
  csvData: Record<string, any>[],
  query: string
): Record<string, any>[] => {
  return csvData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );
};
