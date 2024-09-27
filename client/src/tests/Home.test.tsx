import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../components/Home";
import useFileUpload from "../components/hooks/useFileUpload";
import { usePagination } from "../components/hooks/usePagination";

jest.mock("../components/hooks/useFileUpload");
jest.mock("../components/hooks/usePagination");

describe("Home Component", () => {
  beforeEach(() => {
    (useFileUpload as jest.Mock).mockReturnValue({
      file: null,
      setFile: jest.fn(),
      isFileUploaded: true,
      handleUpload: jest.fn(),
    });

    const mockData = Array.from({ length: 50 }, (_, index) => ({
      id: index + 1,
      name: `Test Data ${index + 1}`,
    }));

    (usePagination as jest.Mock).mockReturnValue({
      page: 1,
      limit: 10,
      totalPages: 5,
      displayedData: mockData,
      handlePagination: jest.fn(),
      handleLimitChange: jest.fn(),
    });
  });

  it("renders the file uploader, search bar, and data table when a file is uploaded", () => {
    render(<Home />);

    expect(screen.getByText("Select File")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Select File"), {
      target: {
        files: [new File(["test.csv"], "test.csv", { type: "text/csv" })],
      },
    });

    expect(screen.getByPlaceholderText(/Search/i)).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("id")).toBeInTheDocument();
    expect(screen.getByText("name")).toBeInTheDocument();

    expect(screen.getByText("Test Data 1")).toBeInTheDocument();
    expect(screen.getByText("Test Data 2")).toBeInTheDocument();
    expect(screen.getByText("Test Data 3")).toBeInTheDocument();

    const dropdown = screen.getByRole("combobox");
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
  });
});
