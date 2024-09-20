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
    <div className="mt-4 flex items-center justify-center space-x-4">
      {hasData && (
        <>
          <button
            onClick={() => onPageChange(page - 1)}
            className={`p-2 text-indigo-500 bg-white hover:bg-gray-300 rounded-2xl ${
              page <= 1 ? "invisible" : ""
            }`}
          >
            &lt; Previous
          </button>

          <span className="w-28 text-center">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => onPageChange(page + 1)}
            className={`p-2 text-indigo-500 bg-white hover:bg-gray-300 rounded-2xl ${
              page >= totalPages ? "invisible" : ""
            }`}
          >
            Next &gt;
          </button>
        </>
      )}
    </div>
  );
};

export default Pagination;
