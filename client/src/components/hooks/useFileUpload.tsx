import { useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../provider/UserContext";

function useFileUpload(
  limit: number,
  setParsedData: (data: Record<string, any>[]) => void,
  setTotalPages: (total: number) => void,
) {
  const [file, setFile] = useState<File | null>(null);
  const { user, setTableData } = useUserContext();

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a CSV file before uploading.");
      return;
    }

    if (!user) {
      toast.error("User not available. Please log in.");
      return;
    }

    try {
      const data = await parseFile(file);
      console.log("Parsed data:", data);
      setTableData(data);
      setTotalPages(Math.ceil(data.length / limit));

      const savedData = await saveDataToMongo(file, user);
      setParsedData(savedData.data);;
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.error("Error during file upload or parsing:", error);
      toast.error("An error occurred while uploading the file.");
    }
  };

  return { file, setFile, handleUpload };
}

async function saveDataToMongo(file: File, user: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("username", user);

  const response = await fetch("/api/excel/upload", {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to save data");
  }
  return await response.json();
}

async function parseFile(file: File): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line);

      const headers = lines[0].split(",").map((header) => header.trim());
      const parsedData: Record<string, any>[] = lines.slice(1).map((line) => {
        const values = line.split(",").map((value) => value.trim());
        const rowObject: Record<string, any> = {};
        headers.forEach((header, index) => {
          rowObject[header] = values[index];
        });
        return rowObject;
      });

      resolve(parsedData);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
}

export default useFileUpload;
