import React from "react";

const SearchResultsInfo = ({ 
  searchQuery, 
  filteredCount, 
  totalCount,
  itemName = "artworks"
}) => {
  if (searchQuery) {
    return (
      <div className="text-center mb-8">
        <p className="text-gray-400">
          Showing {filteredCount} of {totalCount} {itemName}{filteredCount !== 1 ? 's' : ''}
          <span className="block text-sm mt-1">
            Search results for: "<span className="text-pink-400">{searchQuery}</span>"
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="text-center mb-8">
      <p className="text-gray-400">
        Showing all {totalCount} {itemName}{totalCount !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default SearchResultsInfo;