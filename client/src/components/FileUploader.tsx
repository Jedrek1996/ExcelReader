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
      if (selectedFile.type === 'text/csv') {
        setFile(selectedFile);
        toast.success('File added! Click Upload CSV to proceed!');
      } else {
        toast.error('Invalid file type. Only CSV file format is accepted.');
        setFile(null); 
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        id="file-upload"
        onChange={handleFileChange}
        className="hidden"
      />
      <label
        htmlFor="file-upload"
        className="p-2 bg-indigo-500 text-white rounded cursor-pointer hover:bg-indigo-700 transition"
      >
        Choose File
      </label>
      <span className="ml-2 text-lg text-gray-400">
        {file ? file.name : "No file chosen"}
      </span>

      <button
        onClick={handleUpload}
        className={`ml-2 p-2 rounded ${
          file
            ? "bg-green-400 hover:bg-green-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!file}
      >
        Upload CSV
      </button>
    </div>
  );
};

export default FileUploader;
