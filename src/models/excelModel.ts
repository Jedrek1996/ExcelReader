export interface CSVRow {
  [key: string]: string;
}

let csvData: CSVRow[] = [];

export const saveData = (data: CSVRow[]) => {
  csvData = data;
};

export const getData = (data: CSVRow[], page: number, limit: number): CSVRow[] => {
  const startIndex = (page - 1) * limit;
  return data.slice(startIndex, startIndex + limit);
};

export const searchData = (query: string): CSVRow[] => {
  return csvData.filter((row) =>
    Object.values(row).some((value) =>
      value.toLowerCase().includes(query.toLowerCase())
    )
  );
};
