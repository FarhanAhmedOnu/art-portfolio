import React from "react";
import { useNavigate } from "react-router-dom";
import artistsData from "../data/artists.json";
import LazyImage from "../components/ui/LazyImage";
export default function Artists() {
  const navigate = useNavigate();
  const artists = artistsData.artists;

  const handleArtistClick = (artist) => {
    navigate("/article", { 
      state: { 
        article: artist.article, 
        type: 'artists',
        item: artist
      } 
    });
  };

  return (
    <div className="min-h-screen bg-bgDark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Artists That Inspire Me</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Meet the incredible artists whose work continues to influence and inspire my creative journey
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.id}
              onClick={() => handleArtistClick(artist)}
              className="bg-cardDark rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden">
                <LazyImage
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">Read Article</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{artist.name}</h3>
                <p className="text-gray-400">{artist.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}