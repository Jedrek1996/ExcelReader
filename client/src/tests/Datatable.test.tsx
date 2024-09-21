import { render, screen } from "@testing-library/react";
import DataTable from "../components/Datatable"; 

describe("DataTable Component", () => {
  const mockData = [
    { id: 1, name: "Item 1", value: 100 },
    { id: 2, name: "Item 2", value: 200 },
  ];

  it("renders the correct headers and rows based on data", () => {
    render(<DataTable data={mockData} />);

    expect(screen.getByText(/id/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/value/i)).toBeInTheDocument();

    expect(screen.getByText(/Item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Item 2/i)).toBeInTheDocument();
    expect(screen.getByText(/100/i)).toBeInTheDocument();
    expect(screen.getByText(/200/i)).toBeInTheDocument();
  });
});
