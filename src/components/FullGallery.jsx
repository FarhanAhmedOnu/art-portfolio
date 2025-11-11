import React, { useState, useMemo } from "react";
import ImageModal from "./ImageModal";
import LazyImage from "./ui/LazyImage";
import SearchBar from "./ui/SearchBar";
import SearchResultsInfo from "./ui/SearchResultsInfo";
import NoResults from "./ui/NoResults";
import artworksData from "../data/artworks.json";
import { searchArtworks } from "./utils/searchUtils.js";
import { Grid, List } from "lucide-react";

export default function FullGallery() {
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "scroll"
  const artworks = artworksData.artworks;

  // Filter artworks based on search query
  const filteredArtworks = useMemo(() => {
    return searchArtworks(artworks, searchQuery);
  }, [artworks, searchQuery]);

  const clearSearch = () => {
    setSearchQuery("");
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "scroll" : "grid");
  };

  return (
    <div className="py-16 px-8">
      <h2 className="text-4xl font-bold mb-8 text-center">All Artworks</h2>
      
      {/* Search Bar and View Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
        <div className="w-full sm:w-auto sm:flex-1 max-w-md">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search artworks by title, description, or category..."
          />
        </div>
        
        {/* View Toggle Button */}
        <button
          onClick={toggleViewMode}
          className="flex items-center gap-2 bg-cardDark border border-gray-700 hover:border-pink-500 text-gray-300 hover:text-pink-400 px-4 py-3 rounded-xl transition-all duration-300"
          title={`Switch to ${viewMode === "grid" ? "scroll" : "grid"} view`}
        >
          {viewMode === "grid" ? (
            <>
              <List size={20} />
              <span className="hidden sm:inline">Scroll View</span>
            </>
          ) : (
            <>
              <Grid size={20} />
              <span className="hidden sm:inline">Grid View</span>
            </>
          )}
        </button>
      </div>

      {/* Results Info */}
      <SearchResultsInfo
        searchQuery={searchQuery}
        filteredCount={filteredArtworks.length}
        totalCount={artworks.length}
        itemName="artworks"
      />

      {/* Artworks Display */}
      {filteredArtworks.length > 0 ? (
        viewMode === "grid" ? (
          // Grid View (Original)
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredArtworks.map((art, index) => (
              <div
                key={art.id}
                className="bg-cardDark rounded-2xl overflow-hidden shadow-md hover:scale-105 transform transition cursor-pointer group"
                onClick={() => {
                  const originalIndex = artworks.findIndex(a => a.id === art.id);
                  setSelected(originalIndex);
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <LazyImage
                    src={art.img}
                    thumbnail={art.thumbnail}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg mb-1">{art.title}</h3>
                  {art.year && (
                    <p className="text-sm text-gray-400">{art.year}</p>
                  )}

                  {art.categories && art.categories.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {art.categories.map((category, catIndex) => (
                        <span 
                          key={catIndex}
                          className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  ) : art.category && (
                    <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full mt-2">
                      {art.category}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Scroll View (Instagram-like)
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredArtworks.map((art, index) => (
              <div
                key={art.id}
                className="bg-cardDark rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => {
                  const originalIndex = artworks.findIndex(a => a.id === art.id);
                  setSelected(originalIndex);
                }}
              >
                {/* Header with title and metadata */}
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-white">{art.title}</h3>
                    {art.year && (
                      <span className="text-sm text-gray-400">{art.year}</span>
                    )}
                  </div>
                  
                  {/* Categories */}
                  {(art.categories || art.category) && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {art.categories ? (
                        art.categories.map((category, catIndex) => (
                          <span 
                            key={catIndex}
                            className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                          >
                            {category}
                          </span>
                        ))
                      ) : (
                        <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                          {art.category}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Image */}
                <div className="relative">
                  <LazyImage
                    src={art.img}
                    thumbnail={art.thumbnail}
                    alt={art.title}
                    className="w-full max-h-[600px] object-contain bg-black"
                  />
                </div>

                {/* Description */}
                {art.desc && art.desc !== "description pore likhbo" && (
                  <div className="p-4 border-t border-gray-700">
                    <p className="text-gray-300 text-sm leading-relaxed">{art.desc}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        // No results state
        <NoResults
          searchQuery={searchQuery}
          onClearSearch={clearSearch}
          itemName="artworks"
        />
      )}

      {/* Image Modal */}
      {selected !== null && (
        <ImageModal
          artworks={artworks}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </div>
  );
}