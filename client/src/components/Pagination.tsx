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
            className={`p-1 md:p-2 text-indigo-500 bg-white hover:bg-gray-300 rounded-2xl text-[11px]  md:text-base ${
              page <= 1 ? "invisible" : ""
            }`}
          >
            &lt; Previous
          </button>

          <span className="w-15 md:w-28 text-center text-[10px] sm:text-sm md:text-base">
            Page <span className="font-bold text-green-300">{page}</span> of{" "}
            {totalPages}
          </span>

          <button
            onClick={() => onPageChange(page + 1)}
            className={`p-1 md:p-2 text-indigo-500 bg-white hover:bg-gray-300 rounded-2xl text-[11px] md:text-base ${
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
