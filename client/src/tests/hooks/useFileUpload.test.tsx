import { renderHook, act } from "@testing-library/react";
import useFileUpload from "../../components/hooks/useFileUpload";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: "Test Data" }]),
  })
) as jest.Mock;

describe("useFileUpload Hook", () => {
  const mockSetParsedData = jest.fn();
  const mockSetTotalPages = jest.fn();

  it("uploads a file successfully", async () => {
    const { result } = renderHook(() =>
      useFileUpload(
        10,
        mockSetParsedData,
        mockSetTotalPages,
      )
    );

    const file = new File(["test"], "test.csv", { type: "text/csv" });
    act(() => {
      result.current.setFile(file);
    });

    await act(async () => {
      await result.current.handleUpload();
    });

    // expect(result.current.isFileUploaded).toBe(true);
    expect(mockSetParsedData).toHaveBeenCalledWith([
      { id: 1, name: "Test Data" },
    ]);
    expect(mockSetTotalPages).toHaveBeenCalledWith(1);
  });
});
