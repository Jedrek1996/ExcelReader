import { useState, useEffect } from "react";
import useFileUpload from "./hooks/useFileUpload";
import { usePagination } from "../components/hooks/usePagination";
import FileUploader from "./FileUploader";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import DataTable from "./Datatable";
import ResultsFilter from "./ResultsFilter";
import Header from "./misc/Header";
import Drawer from "./Drawer";
import { useUserContext } from "../provider/UserContext";

function Home() {
  const {
    user,
    setCurrentData,
    currentData,
    filteredData,
    tableData,
    setTableData,
  } = useUserContext();
  const [originalData, setOriginalData] = useState<Record<string, any>[]>([]);

  const { file, setFile, handleUpload } = useFileUpload(
    10,
    (currentData) => {
      setOriginalData(currentData);
      setTableData(currentData);
      setCurrentData(currentData);
    },
    (total) => pagination.setTotalPages(total)
  );

  const pagination = usePagination(10, tableData || []);

  useEffect(() => {
    if (currentData && currentData.length > 0) {
      setOriginalData(currentData);
      setTableData(currentData);
    }
  }, [currentData, setTableData]);

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setTableData(filteredData);
    } else {
      setTableData(originalData);
    }
  }, [filteredData, originalData, currentData, setTableData]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Drawer />
      <div className="flex-1 p-4">
        <Header />
        <div className="flex flex-col justify-center text-center w-full md:w-3/12 mx-auto m-4 p-4 border border-white rounded-xl bg-white">
          <FileUploader
            file={file}
            setFile={setFile}
            handleUpload={handleUpload}
          />
          {currentData && <Searchbar originalData={originalData} />}
        </div>
        {(currentData || originalData.length > 0) && (
          <>
            <div className="flex justify-between items-center mb-6 w-full">
              <ResultsFilter
                limit={pagination.limit}
                onLimitChange={pagination.handleLimitChange}
              />
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={pagination.handlePagination}
                hasData={!!(tableData && tableData.length > 0)}
              />
            </div>
            <div className="w-full flex justify-center">
              <DataTable data={pagination.displayedData || []} />{" "}
            </div>
            <div className="flex justify-end items-center mb-6 w-full">
              <Pagination
                page={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={pagination.handlePagination}
                hasData={!!(tableData && tableData.length > 0)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
