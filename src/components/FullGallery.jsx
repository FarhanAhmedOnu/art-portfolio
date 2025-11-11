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
    <div className="min-h-screen bg-bgDark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Artworks</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore my complete collection of artwork
          </p>
        </div>

        {/* Search Bar and View Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="w-full sm:flex-1 max-w-md">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search artworks by title, description, or category..."
            />
          </div>

          {/* View Toggle Button */}
          <button
            onClick={toggleViewMode}
            className="flex items-center gap-2 bg-cardDark border border-gray-700 hover:border-pink-500 text-gray-300 hover:text-pink-400 px-6 py-3 rounded-xl transition-all duration-300"
            title={`Switch to ${viewMode === "grid" ? "scroll" : "grid"} view`}
          >
            {viewMode === "grid" ? (
              <>
                <List size={20} />
                <span>Scroll View</span>
              </>
            ) : (
              <>
                <Grid size={20} />
                <span>Grid View</span>
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
            // Grid View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtworks.map((art, index) => (
                <div
                  key={art.id}
                  className="bg-cardDark rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition cursor-pointer group"
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
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">View Details</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{art.title}</h3>
                    {art.year && (
                      <p className="text-gray-400 mb-2">{art.year}</p>
                    )}

                    {art.categories && art.categories.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {art.categories.map((category, catIndex) => (
                          <span
                            key={catIndex}
                            className="inline-block bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    ) : art.category && (
                      <span className="inline-block bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                        {art.category}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Scroll View (Instagram-like) with 3:4 aspect ratio
            <div className="max-w-2xl mx-auto space-y-8">
              {filteredArtworks.map((art, index) => (
                <div
                  key={art.id}
                  className="bg-cardDark rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                  onClick={() => {
                    const originalIndex = artworks.findIndex(a => a.id === art.id);
                    setSelected(originalIndex);
                  }}
                >
                  {/* Header with title and metadata */}
                  <div className="p-6 border-b border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-xl text-white">{art.title}</h3>
                      {art.year && (
                        <span className="text-gray-400">{art.year}</span>
                      )}
                    </div>

                    {/* Categories */}
                    {(art.categories || art.category) && (
                      <div className="flex flex-wrap gap-2">
                        {art.categories ? (
                          art.categories.map((category, catIndex) => (
                            <span
                              key={catIndex}
                              className="inline-block bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full"
                            >
                              {category}
                            </span>
                          ))
                        ) : (
                          <span className="inline-block bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                            {art.category}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Image with 3:4 aspect ratio */}
                  <div className="relative">
                    <div className="overflow-hidden">
                      <LazyImage
                        src={art.img}
                        thumbnail={art.thumbnail}
                        alt={art.title}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  {art.desc && art.desc !== "description pore likhbo" && (
                    <div className="p-6 border-t border-gray-700">
                      <p className="text-gray-300 leading-relaxed">{art.desc}</p>
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
    </div>
  );
}