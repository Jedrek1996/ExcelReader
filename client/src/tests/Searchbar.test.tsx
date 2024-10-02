import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Searchbar from "../components/Searchbar"; 

const mockResponse = {
  ok: true,
  status: 200,
  statusText: "OK",
  headers: new Headers(),
  redirected: false,
  url: "",
  clone: () => mockResponse,
  json: jest.fn().mockResolvedValue({ results: [] }),
  text: jest.fn().mockResolvedValue(""),
};

global.fetch = jest.fn(() => Promise.resolve(mockResponse)) as jest.Mock;

describe("Searchbar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("calls search when the Search button is clicked", async () => {
    const setParsedData = jest.fn();
    const setSearchPerformed = jest.fn();

    const originalData: Record<string, any>[] = []; 

    render(
      <Searchbar 
        originalData={originalData} 
      />
    );

    const searchInput = screen.getByPlaceholderText("Search data");
    fireEvent.change(searchInput, { target: { value: "test" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(setParsedData).toHaveBeenCalledWith(originalData); 
      expect(setSearchPerformed).toHaveBeenCalledWith(true);
    });
  });
});
