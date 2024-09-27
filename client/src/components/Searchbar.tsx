import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface SearchbarProps {
  setParsedData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  setSearchPerformed: React.Dispatch<React.SetStateAction<boolean>>;
  parsedData: Record<string, any>[];
  originalData: Record<string, any>[];
}

const Searchbar = ({
  setParsedData,
  setSearchPerformed,
  parsedData,
  originalData,
}: SearchbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.length > 25) {
      toast.error("Search query must be 25 characters or less.");
      return;
    }

    if (originalData.length === 0) {
      toast.error("No data available to search.");
      return;
    }

    const results = originalData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (results.length === 0) {
      toast.info("No results found. Displaying all data.");
      setParsedData(originalData);
    } else {
      console.log("Search results:", results);
      setParsedData(results);
    }
    setSearchPerformed(true);
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search data"
        className="px-2 py-1 border text-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-neutral-300 w-30 md:w-40"
      />
      <button
        onClick={handleSearch}
        className="px-2 font-semibold py-1 bg-neutral-300 hover:bg-neutral-400 rounded mb-2"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
