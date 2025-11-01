import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import GalleryHome from "./components/GalleryHome";
import About from "./components/About";
import Footer from "./components/Footer";
import SlidingBanner from "./components/SlidingBanner";
import FullGallery from "./components/FullGallery";
import ScrollToSection from "./components/ScrollToSection";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-bgDark text-gray-200">
      <Navbar />
      <ScrollToSection />
      <main className="flex-1">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <section id="banner">
                  <SlidingBanner />
                </section>

                <section id="gallery">
                  <GalleryHome />
                </section>

                <section id="about">
                  <About />
                </section>
              </>
            }
          />

          {/* Full Gallery Page */}
          <Route
            path="/gallery"
            element={
              <>
                <section id="full-gallery" className="pt-20">
                  <FullGallery />
                </section>
              </>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
