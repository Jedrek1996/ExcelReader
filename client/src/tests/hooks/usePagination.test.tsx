import { renderHook, act } from '@testing-library/react';
import { usePagination } from '../../components/hooks/usePagination';

describe("usePagination Hook", () => {
  const mockData = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

  it("initializes with correct values", () => {
    const { result } = renderHook(() => usePagination(10, mockData));
    
    expect(result.current.page).toBe(1);
    expect(result.current.limit).toBe(10);
    expect(result.current.totalPages).toBe(3); // 25 items, 10 per page
    expect(result.current.displayedData.length).toBe(10);
  });

  it("changes page correctly", () => {
    const { result } = renderHook(() => usePagination(10, mockData));

    act(() => {
      result.current.handlePagination(2);
    });

    expect(result.current.page).toBe(2);
    expect(result.current.displayedData[0].name).toBe("Item 11");
  });

  it("changes limit and resets page", () => {
    const { result } = renderHook(() => usePagination(10, mockData));

    act(() => {
      result.current.handleLimitChange(5);
    });

    expect(result.current.limit).toBe(5);
    expect(result.current.page).toBe(1);
    expect(result.current.totalPages).toBe(5); // 25 items, 5 per page
  });
});
