interface DataTableProps {
  data: Record<string, any>[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-slate-500 text-white border shadow-md">
        <thead>
          <tr className="bg-gray-400 text-white">
            {Object.keys(data[0]).map((key) => (
              <th key={key} className="border-2 px-4 py-2 text-left">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-slate-600">
              {Object.values(row).map((value, i) => (
                <td key={i} className="border-2 px-4 py-2">
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
