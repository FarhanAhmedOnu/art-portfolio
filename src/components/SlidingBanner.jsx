import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    image: "https://cdnb.artstation.com/p/assets/images/images/093/053/531/medium/fraanz-x-img-1761454067599.jpg?1761458576",
    title: "My pencil sketches",
    link: "https://cdnb.artstation.com/p/assets/images/images/093/053/531/medium/fraanz-x-img-1761454067599.jpg?1761458576",
  },
  {
    id: 2,
    image: "https://cdna.artstation.com/p/assets/images/images/021/083/124/medium/wl-op-3s.jpg?1570338646",
    title: "My Favorite artists",
    link: "#surreal-universe",
  },
  {
    id: 3,
    image: "https://cdnb.artstation.com/p/assets/images/images/033/036/307/medium/artur-tarnowski-1-5.jpg?1608204349",
    title: "Games That inspired me",
    link: "#urban-reflections",
  },
];

const SlidingBanner = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence mode="wait">
        <motion.a
          key={slides[current].id}
          href={slides[current].link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 block"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-white drop-shadow-lg">
              {slides[current].title}
            </h2>
          </div>
        </motion.a>
      </AnimatePresence>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        <FaChevronLeft size={20} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 w-full flex justify-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlidingBanner;
