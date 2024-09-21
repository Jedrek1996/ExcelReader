import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../components/Home";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();

  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue([{ id: 1, name: "Item 1", value: 100 }]),
  });
});

describe("Home Component", () => {
  it("renders the upload message when no file is uploaded", () => {
    render(<Home />);
    expect(screen.getByText(/Please upload a CSV file./i)).toBeInTheDocument();
  });

  it("shows error when trying to upload without a file", async () => {
    render(<Home />);
    const uploadButton = screen.getByRole("button", { name: /Upload CSV/i });
    expect(uploadButton).toBeDisabled();
    fireEvent.click(uploadButton);
  });

  it("uploads a file and displays success message", async () => {
    const mockFile = new File(["dummy content"], "test.csv", {
      type: "text/csv",
    });
    render(<Home />);

    const input = screen.getByLabelText(/choose file/i);
    fireEvent.change(input, { target: { files: [mockFile] } });

    const uploadButton = screen.getByRole("button", { name: /Upload CSV/i });
    fireEvent.click(uploadButton);

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("File uploaded successfully!");
    });

    //Item is rendered upload
    expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
  });
});
