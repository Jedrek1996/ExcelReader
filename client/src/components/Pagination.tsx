interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
    hasData: boolean;
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    page,
    totalPages,
    onPageChange,
    hasData,
  }) => {
    return (
      <div className="mt-4">
        {hasData && (
          <>
            {page > 1 && (
              <button
                onClick={() => onPageChange(page - 1)}
                className="p-2 bg-blue-500 hover:bg-blue-700 rounded mr-4"
              >
                &lt; Previous
              </button>
            )}
            <span>Page {page} of {totalPages}</span>
            {page < totalPages && (
              <button
                onClick={() => onPageChange(page + 1)}
                className="p-2 bg-blue-500 hover:bg-blue-700 rounded ml-4"
              >
                Next &gt;
              </button>
            )}
          </>
        )}
      </div>
    );
  };
  
  export default Pagination;
  