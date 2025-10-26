import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

export default function ImageModal({ artworks, selected, setSelected }) {
  const art = artworks[selected];

  const next = () => setSelected((selected + 1) % artworks.length);
  const prev = () => setSelected((selected - 1 + artworks.length) % artworks.length);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative max-w-4xl w-[90%] bg-cardDark rounded-xl shadow-2xl overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
        >
          <img src={art.img} alt={art.title} className="w-full max-h-[75vh] object-contain" />

          <div className="absolute top-4 right-4">
            <button onClick={() => setSelected(null)} className="text-gray-300 hover:text-pink-500">
              <X size={28} />
            </button>
          </div>

          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <button onClick={prev} className="text-gray-300 hover:text-pink-500">
              <ArrowLeft size={32} />
            </button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <button onClick={next} className="text-gray-300 hover:text-pink-500">
              <ArrowRight size={32} />
            </button>
          </div>

          <div className="p-6 bg-cardDark text-center">
            <h3 className="text-2xl font-bold mb-2">{art.title}</h3>
            <p className="text-gray-400">{art.desc}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
