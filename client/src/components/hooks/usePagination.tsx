import { useState, useEffect } from "react";

export const usePagination = (
  initialLimit: number,
  parsedData: Record<string, any>[]
) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(parsedData.length / limit));
  }, [parsedData, limit]);

  const handlePagination = (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    setTotalPages(Math.ceil(parsedData.length / newLimit));
  };

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedData = Array.isArray(parsedData)
    ? parsedData.slice(startIndex, endIndex)
    : [];

  return {
    page,
    limit,
    totalPages,
    displayedData,
    handlePagination,
    handleLimitChange,
    setTotalPages,
  };
};
