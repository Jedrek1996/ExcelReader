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
    <div className="mt-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search data"
        className="p-2 mb-4 text-black rounded-sm"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 hover:bg-blue-700 rounded mb-4"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
