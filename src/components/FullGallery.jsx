import React, { useState } from "react";
import ImageModal from "./ImageModal";
import LazyImage from "./ui/LazyImage";
import artworksData from "../data/artworks.json";

export default function FullGallery() {
  const [selected, setSelected] = useState(null);
  const artworks = artworksData.artworks;

  return (
    <div className="py-16 px-8">
      <h2 className="text-4xl font-bold mb-8 text-center">All Artworks</h2>
      
      {/* Artwork Count */}
      <div className="text-center mb-8">
        <p className="text-gray-400">
          Showing {artworks.length} artwork{artworks.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((art, index) => (
          <div
            key={art.id}
            className="bg-cardDark rounded-2xl overflow-hidden shadow-md hover:scale-105 transform transition cursor-pointer group"
            onClick={() => setSelected(index)}
          >
            <div className="relative h-64 overflow-hidden">
              <LazyImage
                src={art.img}
                thumbnail={art.thumbnail}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Loading skeleton */}
              {!art.thumbnail && (
                <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                  <span className="text-gray-500">Loading...</span>
                </div>
              )}
            </div>
            
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg mb-1">{art.title}</h3>
              {art.year && (
                <p className="text-sm text-gray-400">{art.year}</p>
              )}
              {art.category && (
                <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full mt-1">
                  {art.category}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

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