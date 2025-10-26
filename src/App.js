import React from "react";
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bgDark text-gray-200">
      <Navbar />
      <main className="flex-1">
        <section id="gallery">
          <Gallery />
        </section>
        <section id="about">
          <About />
        </section>
      </main>
      <Footer />
    </div>
  );
}
