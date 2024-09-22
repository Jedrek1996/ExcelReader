interface ResultsPerPageProps {
  limit: number;
  onLimitChange: (newLimit: number) => void;
}

const ResultsFilter: React.FC<ResultsPerPageProps> = ({
  limit,
  onLimitChange,
}) => {
  return (
    <div className="mt-4">
      <label htmlFor="limit" className="mr-2 text-[11px] md:text-lg ">
        Results per page:
      </label>
      <select
        id="limit"
        value={limit}
        onChange={(e) => onLimitChange(parseInt(e.target.value))}
        className="p-2 text-indigo-500 font-bold border border-gray-300 rounded-2xl text-[13px] md:text-md focus:outline-none focus:ring-1 focus:ring-green-300"
      >
        {[10, 20, 30, 40, 50].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ResultsFilter;
