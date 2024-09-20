interface DataTableProps {
  data: Record<string, any>[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-700 text-white">
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="border border-gray-600 px-4 py-2 text-left"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-600">
              {Object.values(row).map((value, i) => (
                <td key={i} className="border border-gray-600 px-4 py-2">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
