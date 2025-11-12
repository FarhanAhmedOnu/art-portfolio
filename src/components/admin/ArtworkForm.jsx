import React, { useState } from "react";
import { Plus, X, Upload, Image as ImageIcon } from "lucide-react";

const ArtworkForm = ({ onSave, onCancel, initialData = null }) => {
  const [formData, setFormData] = useState({
    id: initialData?.id || Date.now(),
    title: initialData?.title || "",
    img: initialData?.img || "",
    thumbnail: initialData?.thumbnail || "",
    desc: initialData?.desc || "",
    category: initialData?.category || "",
    categories: initialData?.categories || [],
    year: initialData?.year || new Date().getFullYear()
  });

  const [newCategory, setNewCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCategory.trim()]
      }));
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.filter(cat => cat !== categoryToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
      // Reset form if not editing
      if (!initialData) {
        setFormData({
          id: Date.now(),
          title: "",
          img: "",
          thumbnail: "",
          desc: "",
          category: "",
          categories: [],
          year: new Date().getFullYear()
        });
      }
    } catch (error) {
      console.error('Error saving artwork:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCategory();
    }
  };

  return (
    <div className="min-h-screen bg-bgDark pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {initialData ? 'Edit Artwork' : 'Add New Artwork'}
          </h1>
          <p className="text-gray-400">
            {initialData ? 'Update your artwork details' : 'Add a new artwork to your gallery'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-cardDark rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="Enter artwork title"
              />
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Image URL *
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  name="img"
                  value={formData.img}
                  onChange={handleInputChange}
                  required
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  className="px-4 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl transition-all flex items-center gap-2"
                >
                  <Upload size={18} />
                  Upload
                </button>
              </div>
            </div>

            {/* Thumbnail URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="https://example.com/thumbnail.jpg (optional)"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-vertical"
                placeholder="Describe your artwork..."
              />
            </div>

            {/* Year */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                min="2000"
                max="2030"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="2024"
              />
            </div>

            {/* Single Category (Legacy) */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Primary Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                placeholder="portrait, digital, etc."
              />
            </div>

            {/* Multiple Categories */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categories
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  placeholder="Add a category..."
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-xl transition-all flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add
                </button>
              </div>
              
              {/* Categories List */}
              {formData.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.categories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 bg-gray-700 text-gray-300 text-sm px-3 py-2 rounded-full"
                    >
                      {category}
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(category)}
                        className="text-gray-400 hover:text-red-400 transition"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          {formData.img && (
            <div className="mb-6 p-4 bg-gray-800 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-300 mb-3">Preview</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden">
                    <img
                      src={formData.img}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9Ii82NDc0OGIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBQcmV2aWV3PC90ZXh0Pjwvc3ZnPg==';
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 mt-2 text-center">Main Image</p>
                </div>
                
                {formData.thumbnail && (
                  <div className="flex-1">
                    <div className="aspect-[1/1] bg-gray-900 rounded-lg overflow-hidden max-w-[200px] mx-auto">
                      <img
                        src={formData.thumbnail}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9Ii82NDc0OGIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UaHVtYm5haWw8L3RleHQ+PC9zdmc+';
                        }}
                      />
                    </div>
                    <p className="text-sm text-gray-400 mt-2 text-center">Thumbnail</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.img}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-xl transition-all flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  {initialData ? 'Update Artwork' : 'Add Artwork'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArtworkForm;