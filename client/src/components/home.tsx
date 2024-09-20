import { useState } from "react";
import { toast } from "react-toastify";
import FileUploader from "./FileUploader";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import DataTable from "./Datatable";
import ResultsFilter from "./ResultsFilter";

function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<Record<string, any>[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  // useEffect(() => {
  //   const checkConnection = async () => {
  //     try {
  //       const response = await fetch("/api/test-connection");

  //       if (response.ok) {
  //         const data = await response.json();
  //         toast.success(data.message);
  //       } else {
  //         toast.error("Connection test failed.");
  //       }
  //     } catch (error) {
  //       console.error("Error checking connection:", error);
  //       toast.error("Connection test failed.");
  //     }
  //   };

  //   checkConnection();
  // }, []);

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setParsedData(data);
        setTotalPages(Math.ceil(data.length / limit));
        setPage(1);
        setIsFileUploaded(true);
        setSearchPerformed(false);
        toast.success("File uploaded successfully!");
      } else {
        const errorData = await response.json();
        toast.error(`Upload failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("An error occurred while uploading the file.");
    }
  };

  const handlePagination = async (newPage: number) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    setTotalPages(Math.ceil(parsedData.length / newLimit)); //
  };

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const displayedData = parsedData.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-700 text-white min-h-screen flex flex-col p-4">
      <div className="flex flex-col justify-center text-center p-4 border border-gray-600 rounded-lg bg-gray-800">
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
        <div className="flex justify-between items-center mb-6 w-full">
          <ResultsFilter limit={limit} onLimitChange={handleLimitChange} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePagination}
            hasData={parsedData.length > 0}
          />
        </div>
      )}
      <div className="w-full flex flex-col justify-center items-center">
        {isFileUploaded ? (
          displayedData.length > 0 ? (
            <div className="w-full flex justify-center">
              <DataTable data={displayedData} />
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <p className="text-center text-gray-400 mt-24">
                {searchPerformed
                  ? "No search results found."
                  : "No data available. Please upload a CSV file."}
              </p>
            </div>
          )
        ) : (
          <div className="w-full flex justify-center">
            <p className="text-center text-gray-400 mt-24">
              Please upload a CSV file.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
