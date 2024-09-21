import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
  it("renders pagination with correct page number", () => {
    const onPageChange = jest.fn();

    render(
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={onPageChange}
        hasData={true}
      />
    );

    // Use a regex to match the text that is split
    expect(screen.getByText(/Page/)).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
    expect(screen.getByText(/of/)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  it("calls onPageChange when Next button is clicked", () => {
    const onPageChange = jest.fn();

    render(
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={onPageChange}
        hasData={true}
      />
    );

    fireEvent.click(screen.getByText(/Next/));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("disables Previous button on first page", () => {
    render(
      <Pagination
        page={1}
        totalPages={5}
        onPageChange={() => {}}
        hasData={true}
      />
    );

    expect(screen.getByText(/Previous/)).toHaveClass("invisible");
  });
});
