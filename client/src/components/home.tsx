import { useState } from "react";
import useFileUpload from "./hooks/useFileUpload";
import { usePagination } from "../components/hooks/usePagination";
import FileUploader from "./FileUploader";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import DataTable from "./Datatable";
import ResultsFilter from "./ResultsFilter";
import Header from "./misc/Header";

function Home() {
  const [parsedData, setParsedData] = useState<Record<string, any>[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const { file, setFile, isFileUploaded, handleUpload } = useFileUpload(
    10,
    setParsedData,
    (total) => pagination.setTotalPages(total),
    setSearchPerformed
  );

  const pagination = usePagination(10, parsedData);

  return (
    <div className="bg-indigo-500 text-white min-h-screen flex flex-col p-4">
      <Header />
      <div className="flex flex-col justify-center text-center w1/2 md:w-3/12 mx-auto mt-4 p-4 border border-white rounded-xl bg-white">
        <FileUploader
          file={file}
          setFile={setFile}
          handleUpload={handleUpload}
        />
        {isFileUploaded && (
          <Searchbar
            setParsedData={setParsedData}
            setSearchPerformed={setSearchPerformed}
          />
        )}
      </div>

      {isFileUploaded && (
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
              hasData={parsedData.length > 0}
            />
          </div>

          <div className="w-full flex justify-center">
            <DataTable data={pagination.displayedData} />
          </div>

          <div className="flex justify-end items-center mb-6 w-full">
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={pagination.handlePagination}
              hasData={parsedData.length > 0}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
