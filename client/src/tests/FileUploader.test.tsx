import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FileUploader from "../components/FileUploader";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("FileUploader Component", () => {
  const setFile = jest.fn();
  const handleUpload = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles valid CSV file selection", async () => {
    const validFile = new File(["dummy content"], "test.csv", {
      type: "text/csv",
    });

    render(
      <FileUploader file={null} setFile={setFile} handleUpload={handleUpload} />
    );

    const fileInput = screen.getByLabelText(/Choose File/i);
    fireEvent.change(fileInput, { target: { files: [validFile] } });

    await waitFor(() => {
      expect(setFile).toHaveBeenCalledWith(validFile);
      expect(toast.success).toHaveBeenCalledWith(
        "File added! Click Upload CSV to proceed!"
      );
    });
  });

  it("displays error for invalid file type", async () => {
    const invalidFile = new File(["dummy content"], "test.txt", {
      type: "text/plain",
    });

    render(
      <FileUploader file={null} setFile={setFile} handleUpload={handleUpload} />
    );

    const fileInput = screen.getByLabelText(/Choose File/i);
    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    await waitFor(() => {
      expect(screen.getByText(/No file chosen/i)).toBeInTheDocument();
      expect(toast.error).toHaveBeenCalledWith(
        "Invalid file type. Only CSV file format is accepted."
      );
    });
  });
});
