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

    expect(screen.getByText(/Page 1 of 5/)).toBeInTheDocument();
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
