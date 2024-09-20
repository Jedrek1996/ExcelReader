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
              className="p-2 text-indigo-500 bg-white hover:bg-gray-300 rounded-2xl mr-4"
            >
              &lt; Previous
            </button>
          )}
          <span>
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <button
              onClick={() => onPageChange(page + 1)}
              className="p-2 text-indigo-500 bg-white hover:bg-gray-300 rounded-2xl ml-4"
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
