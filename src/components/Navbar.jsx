export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-cardDark shadow-lg sticky top-0 z-50">
      <h1 className="text-2xl font-bold text-pink-500">Onu's Sketch gallery</h1>
      <div className="space-x-6">
        <a href="#gallery" className="hover:text-pink-400 transition">Gallery</a>
        <a href="#about" className="hover:text-pink-400 transition">About</a>
      </div>
    </nav>
  );
}
