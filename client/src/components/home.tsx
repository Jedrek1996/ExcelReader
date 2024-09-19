import { useState } from "react";
import { toast } from "react-toastify";

function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    console.log(selectedFile);

    if (selectedFile) {
      console.log(selectedFile.type !== "text/csv");
      console.log(!selectedFile.name.endsWith(".csv"));
      if (
        selectedFile.type !== "text/csv" &&
        !selectedFile.name.endsWith(".csv")
      ) {
        toast.error("Invalid file type. Only CSV file format is accepted.");
        return;
      }
      toast.success("Your file has been added!");
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      <input type="file" onChange={handleFileChange} />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleUpload}
        className="mt-4 p-2 bg-blue-500 hover:bg-blue-700 rounded"
      >
        Upload CSV
      </button>
    </div>
  );
}

export default Home;
