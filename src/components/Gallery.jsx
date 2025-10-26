import React, { useState } from "react";
import ImageModal from "./ImageModal";

const artworks = [
  { title: "Cut off", img: "https://cdnb.artstation.com/p/assets/images/images/093/053/531/medium/fraanz-x-img-1761454067599.jpg?1761458576", desc: " description pore likhbo" },
  { title: "Sunglasses", img: "https://cdna.artstation.com/p/assets/images/images/093/053/532/medium/fraanz-x-img-1761454062139.jpg?1761458579", desc: " description pore likhbo." },
  { title: "Smug in saree", img: "https://cdnb.artstation.com/p/assets/images/images/093/053/535/medium/fraanz-x-img-1761454033891.jpg?1761458586", desc: " description pore likhbo." },
  { title: "Hair in the wind", img: "https://cdna.artstation.com/p/assets/images/images/093/053/552/medium/fraanz-img-20250916-140603.jpg?1761458615", desc: " description pore likhbo." },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="py-16 px-8">
      <h2 className="text-4xl font-bold mb-8 text-center">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {artworks.map((art, index) => (
          <div
            key={index}
            className="bg-cardDark rounded-2xl overflow-hidden shadow-md hover:scale-105 transform transition cursor-pointer"
            onClick={() => setSelected(index)}
          >
            <img src={art.img} alt={art.title} className="w-full h-64 object-cover" />
            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">{art.title}</h3>
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
