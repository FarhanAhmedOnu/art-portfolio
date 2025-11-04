import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Article() {
  const navigate = useNavigate();
  const location = useLocation();
  const { article, type, item } = location.state || {};

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Article not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bgDark pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition mb-8"
        >
          <ArrowLeft size={20} />
          Back to {type === 'games' ? 'Games' : 'Artists'}
        </button>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{article.title}</h1>
          <p className="text-gray-400 text-lg">
            Inspired by {type === 'games' ? item.title : item.name}
          </p>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none"
        >
          {article.content.map((section, index) => (
            <div key={index} className="mb-8">
              {section.type === 'paragraph' && (
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {section.text}
                </p>
              )}
              
              {section.type === 'image' && (
                <div className="my-8">
                  <img
                    src={section.url}
                    alt={section.caption}
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                  {section.caption && (
                    <p className="text-gray-400 text-center mt-3 text-sm">
                      {section.caption}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}