import { useState } from "react";
import { useUserContext } from "../provider/UserContext";
import { toast } from "react-toastify";

interface SearchbarProps {
  originalData: Record<string, any>[];
}

const Searchbar: React.FC<SearchbarProps> = ({ originalData }) => {
  const { setFilteredData } = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    const results = originalData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    // console.log("Original Data:", originalData);
    // console.log("Search Query:", searchQuery);
    // console.log("Filtered Results:", results);

    if (results.length === 0) {
      toast.info("No results found. Displaying all results.");
      setFilteredData(originalData);
    } else {
      toast.success(`Displaying ${results.length} result(s).`);
      setFilteredData(results);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
        className="p-1 border border-gray-300 rounded"
      />
      <button
        onClick={handleSearch}
        className="ml-1 p-2 bg-neutral-400 text-white font-semibold rounded hover:bg-neutral-500"
      >
        Search
      </button>
    </div>
  );
};

export default Searchbar;
