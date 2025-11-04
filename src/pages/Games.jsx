import React from "react";
import { useNavigate } from "react-router-dom";
import LazyImage from "../components/ui/LazyImage";
import gamesData from "../data/games.json";

export default function Games() {
  const navigate = useNavigate();
  const games = gamesData.games;

  const handleGameClick = (game) => {
    navigate("/article", { 
      state: { 
        article: game.article, 
        type: 'games',
        item: game
      } 
    });
  };

  return (
    <div className="min-h-screen bg-bgDark pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Games That Inspire Me</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the video games that have shaped my artistic vision and creative process
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => handleGameClick(game)}
              className="bg-cardDark rounded-2xl overflow-hidden shadow-lg hover:scale-105 transform transition cursor-pointer group"
            >
              <div className="relative h-64 overflow-hidden">
                <LazyImage
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">Read Article</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{game.title}</h3>
                <div className="flex justify-between items-center text-gray-400">
                  <span>{game.developer}</span>
                  <span>{game.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}