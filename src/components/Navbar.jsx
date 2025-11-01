import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-cardDark shadow-lg sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-pink-500 hover:text-pink-400 transition">
        Onu's Sketch gallery
      </Link>
      <div className="space-x-6">
        <Link to="/" className="hover:text-pink-400 transition">Home</Link>
        <Link to="/#gallery" className="hover:text-pink-400 transition">Gallery</Link>
        <Link to="/#about" className="hover:text-pink-400 transition">About</Link>
      </div>
    </nav>
  );
}