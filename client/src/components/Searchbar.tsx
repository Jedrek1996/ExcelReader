import { useState } from "react";
import { toast } from "react-toastify";

interface SearchbarProps {
  setParsedData: React.Dispatch<React.SetStateAction<Record<string, any>[]>>;
  setSearchPerformed: React.Dispatch<React.SetStateAction<boolean>>;
}

const Searchbar = ({ setParsedData, setSearchPerformed }: SearchbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery.length > 25) {
      toast.error("Search query must be 25 characters or less.");
      return;
    }

    try {
      const response = await fetch(`/api/search?query=${searchQuery}`);
      const results = await response.json();

      setParsedData(results);
      setSearchPerformed(true);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="mt-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search data"
        className="px-2 py-1 border text-gray-400 rounded-sm focus:outline-none focus:ring-1 focus:ring-green-300 w-30 md:w-40"
      />
      <button
        onClick={handleSearch}
        className="px-2 py-1 bg-indigo-500 hover:bg-indigo-700 rounded mb-2"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
