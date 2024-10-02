import { ChangeEvent } from "react";
import { toast } from "react-toastify";

interface FileUploaderProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleUpload: () => Promise<void>;
}

const FileUploader = ({ file, setFile, handleUpload }: FileUploaderProps) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      if (selectedFile.type === "text/csv") {
        setFile(selectedFile);
        toast.success("File added! Click Upload CSV to proceed!");
      } else {
        toast.error("Invalid file type. Only CSV file format is accepted.");
        setFile(null);
      }
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="rounded-lg w-fit bg-white">
        <h2 className="text-xl text-neutral-400 mb-4 font-semibold">
          Upload Your CSV
        </h2>

        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          className="hidden"
        />

        <label
          htmlFor="file-upload"
          className="block mb-4 px-4 py-2 bg-primary font-semibold text-white rounded-lg cursor-pointer hover:bg-red-400 transition duration-200 text-center"
        >
          Select File
        </label>

        <div className="w-full p-2 mb-4 text-center text-gray-400 border-dotted border-2 border-gray-300 rounded-md">
          {file ? file.name : "No file uploaded"}
        </div>

        <button
          onClick={handleUpload}
          className={`w-full px-4 py-2 rounded-lg text-white font-semibold transition duration-200 ${
            file
              ? "bg-secondary hover:bg-green-400"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          disabled={!file}
        >
          Upload CSV
        </button>
      </div>
    </div>
  );
};

export default FileUploader;
