import React from "react";

const artworks = [
  { title: "1", img: "https://cdna.artstation.com/p/assets/images/images/093/035/058/medium/hsiuwei-wan-20251025-sc02.jpg?1761387663" },
  { title: "2", img: "/images/IMG_20250908_104705.jpg" },
  { title: "3", img: "images/FB_IMG_1761454006227.jpg" },
  { title: "4", img: "images/FB_IMG_1761454006227.jpg" },
];

export default function App() {
  return (
    <div className="bg-gray-50 text-gray-900 font-sans min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold">🎨 My Art Portfolio</h1>
        <div className="space-x-4">
          <a href="#home" className="hover:text-pink-500">Home</a>
          <a href="#gallery" className="hover:text-pink-500">Gallery</a>
          <a href="#about" className="hover:text-pink-500">About</a>
          <a href="#contact" className="hover:text-pink-500">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="text-center py-24 bg-gradient-to-r from-pink-100 via-white to-purple-100">
        <h2 className="text-5xl font-extrabold mb-4">Welcome to My World of Art</h2>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Exploring emotions and imagination through colors, textures, and forms.
        </p>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-8">Gallery</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8">
          {artworks.map((art, idx) => (
            <div key={idx} className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
              <img src={art.img} alt={art.title} className="w-full h-64 object-cover" />
              <div className="p-4 text-center">
                <h4 className="font-semibold">{art.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50 text-center px-6">
        <h3 className="text-3xl font-bold mb-4">About Me</h3>
        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
          Hi, I’m an artist passionate about translating human emotions into visual stories.
          My work blends abstract themes with realistic elements, inviting viewers to interpret
          their own narratives through each piece.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-purple-100 via-white to-pink-100 text-center">
        <h3 className="text-3xl font-bold mb-6">Get in Touch</h3>
        <p className="text-gray-600 mb-4">Let’s collaborate or talk about art!</p>
        <div className="flex justify-center space-x-6 text-2xl">
          <a href="mailto:your@email.com" className="hover:text-pink-500">📧</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">📷</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-pink-500">🐦</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-white border-t">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} My Art Portfolio</p>
      </footer>
    </div>
  );
}
