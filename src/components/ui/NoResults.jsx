import React from "react";
import { Search } from "lucide-react";

const NoResults = ({ 
  searchQuery, 
  onClearSearch, 
  itemName = "artworks" 
}) => {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <Search size={48} className="mx-auto text-gray-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-300 mb-2">
          No {itemName} found
        </h3>
        <p className="text-gray-400">
          No results found for "<span className="text-pink-400">{searchQuery}</span>". 
          Try searching with different keywords.
        </p>
        <button
          onClick={onClearSearch}
          className="mt-4 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition"
        >
          Clear Search
        </button>
      </div>
    </div>
  );
};

export default NoResults;