import request from "supertest";
import express from "express";
import multer from "multer";
import {
  uploadCSV,
  getPaginatedData,
  searchInData,
  testConnection,
} from "../controller/excelController";

const app = express();
const upload = multer();
app.use(express.json());

app.post("/api/upload", upload.single("file"), uploadCSV);
app.get("/api/paginated-data", getPaginatedData);
app.get("/api/search", searchInData);
app.get("/api/test-connection", testConnection);

describe("Excel Controller", () => {
  beforeAll(() => {
  });

  afterEach(() => {
  });

  const mockUserData = "name,age\nMr Bean,30\nJackie Chan,70"

  it("should upload a CSV file and return parsed data", async () => {
    const fileBuffer = Buffer.from(mockUserData);
    const response = await request(app)
      .post("/api/upload")
      .attach("file", fileBuffer, { filename: "test.csv" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
        { name: "Mr Bean", age: "30" },
        { name: "Jackie Chan", age: "70" },
    ]);
  });

  it("should return 400 if no file is uploaded", async () => {
    const response = await request(app).post("/api/upload");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "No file uploaded" });
  });

  it("should get paginated data", async () => {
    await request(app)
      .post("/api/upload")
      .attach("file", Buffer.from(mockUserData), {
        filename: "test.csv",
      });

    const response = await request(app).get(
      "/api/paginated-data?page=1&limit=1"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: [{ name: "John Doe", age: "30" }],
      totalItems: 2,
      totalPages: 2,
      currentPage: 1,
    });
  });

  it("should search in data", async () => {
    await request(app)
      .post("/api/upload")
      .attach("file", Buffer.from("name,age\nMr Bean,30\nJackie Chan,70"), {
        filename: "test.csv",
      });

    const response = await request(app).get("/api/search?query=Jane");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ name: "Jackie Chan", age: "70" }]);
  });

  it("should connect successfully", async () => {
    const response = await request(app).get("/api/test-connection");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Connection successful!" });
  });
});
