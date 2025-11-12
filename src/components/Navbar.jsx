import { Link } from "react-router-dom";
import { Home, Images, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 py-4 bg-cardDark shadow-lg sticky top-0 z-50">
      {/* Logo - Shorter on mobile */}
      <Link
        to="/"
        className="text-xl sm:text-2xl font-bold text-pink-500 hover:text-pink-400 transition"
      >
        <span className="hidden sm:inline">Onu's Sketch gallery</span>
        <span className="sm:hidden">Onu's Gallery</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="hover:text-pink-400 transition flex items-center gap-2">
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link to="/#gallery" className="hover:text-pink-400 transition flex items-center gap-2">
          <Images size={18} />
          <span>Gallery</span>
        </Link>
        <Link to="/#about" className="hover:text-pink-400 transition flex items-center gap-2">
          <User size={18} />
          <span>About</span>
        </Link>
      </div>

      {/* Mobile Navigation Icons */}
      <div className="flex md:hidden space-x-4">
        <Link
          to="/"
          className="hover:text-pink-400 transition p-2"
          title="Home"
        >
          <Home size={20} />
        </Link>
        <Link
          to="/#gallery"
          className="hover:text-pink-400 transition p-2"
          title="Gallery"
        >
          <Images size={20} />
        </Link>
        <Link
          to="/#about"
          className="hover:text-pink-400 transition p-2"
          title="About"
        >
          <User size={20} />
        </Link>
      </div>
    </nav>
  );
}