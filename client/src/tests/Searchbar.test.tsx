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
    
    // Explicitly define the types for parsedData and originalData
    const parsedData: Record<string, any>[] = []; // Define as needed for your tests
    const originalData: Record<string, any>[] = []; // Explicitly define as an array of objects

    render(
      <Searchbar 
        setParsedData={setParsedData} 
        setSearchPerformed={setSearchPerformed} 
        parsedData={parsedData} // Add parsedData prop
        originalData={originalData} // Add originalData prop
      />
    );

    const searchInput = screen.getByPlaceholderText("Search data");
    fireEvent.change(searchInput, { target: { value: "test" } });

    const searchButton = screen.getByText("Search");
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(setParsedData).toHaveBeenCalledWith(originalData); // Update expected value based on your logic
      expect(setSearchPerformed).toHaveBeenCalledWith(true);
    });
  });
});
