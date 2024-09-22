import { useState } from "react";
import { toast } from "react-toastify";

export const useFileUpload = (
  limit: number,
  setParsedData: Function,
  setTotalPages: (total: number) => void, 
  setSearchPerformed: Function
) => {
  const [file, setFile] = useState<File | null>(null);
  const [isFileUploaded, setIsFileUploaded] = useState(false);

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

  return {
    file,
    setFile,
    isFileUploaded,
    handleUpload,
  };
};
