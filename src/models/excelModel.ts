import mongoose, { Schema, Document } from "mongoose";
export interface CSVRow {
  [key: string]: string;
}

export interface CSVData extends Document {
  data: CSVRow[];
  fileName: string;
}

const csvSchema: Schema = new Schema({
  data: [{ type: Object, required: true }],
  fileName: { type: String, required: true },
});

export const CSVModel = mongoose.model<CSVData>("CSVData", csvSchema);
