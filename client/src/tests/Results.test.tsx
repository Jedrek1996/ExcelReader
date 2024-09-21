import { render, screen, fireEvent } from "@testing-library/react";
import ResultsFilter from "../components/ResultsFilter";

describe("ResultsFilter Component", () => {
  const onLimitChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("calls onLimitChange with the selected limit", () => {
    render(<ResultsFilter limit={10} onLimitChange={onLimitChange} />);

    const selectElement = screen.getByLabelText(/Results per page:/i);


    fireEvent.change(selectElement, { target: { value: "20" } });

    expect(onLimitChange).toHaveBeenCalledWith(20);
  });

  it("displays the correct initial limit", () => {
    render(<ResultsFilter limit={30} onLimitChange={onLimitChange} />);

    const selectElement = screen.getByLabelText(/Results per page:/i);

    expect(selectElement).toHaveValue("30");
  });
});
