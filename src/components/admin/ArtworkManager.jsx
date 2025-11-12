import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Download, Upload, RefreshCw } from "lucide-react";
import ArtworkForm from "./ArtworkForm";
import artworksData from "../../data/artworks.json";

const ArtworkManager = () => {
    const [artworks, setArtworks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingArtwork, setEditingArtwork] = useState(null);
    const [viewMode, setViewMode] = useState("grid");

    // Load artworks from JSON file and localStorage
    useEffect(() => {
        loadArtworks();
    }, []);

    const loadArtworks = () => {
        // First try to load from localStorage (user's edits)
        const savedArtworks = localStorage.getItem('artworksData');

        if (savedArtworks) {
            setArtworks(JSON.parse(savedArtworks));
        } else {
            // If no localStorage data, load from JSON file
            // Fix duplicate IDs in the JSON data
            const fixedArtworks = artworksData.artworks.map((artwork, index) => ({
                ...artwork,
                id: artwork.id && artwork.id !== 6 ? artwork.id : index + 1 // Fix duplicate ID 6
            })).filter(artwork => artwork.img && artwork.img.trim() !== ""); // Remove empty images

            setArtworks(fixedArtworks);
            localStorage.setItem('artworksData', JSON.stringify(fixedArtworks));
        }
    };

    const saveArtworks = (newArtworks) => {
        setArtworks(newArtworks);
        localStorage.setItem('artworksData', JSON.stringify(newArtworks));
    };

    const handleSaveArtwork = (artworkData) => {
        return new Promise((resolve) => {
            if (editingArtwork) {
                // Update existing artwork
                const updatedArtworks = artworks.map(art =>
                    art.id === editingArtwork.id ? artworkData : art
                );
                saveArtworks(updatedArtworks);
                setEditingArtwork(null);
            } else {
                // Add new artwork - generate unique ID
                const newId = Math.max(...artworks.map(a => a.id), 0) + 1;
                const newArtwork = { ...artworkData, id: newId };
                const newArtworks = [...artworks, newArtwork];
                saveArtworks(newArtworks);
            }
            setShowForm(false);
            resolve();
        });
    };

    const handleEdit = (artwork) => {
        setEditingArtwork(artwork);
        setShowForm(true);
    };

    const handleDelete = (artworkId) => {
        if (window.confirm('Are you sure you want to delete this artwork?')) {
            const updatedArtworks = artworks.filter(art => art.id !== artworkId);
            saveArtworks(updatedArtworks);
        }
    };

    const handleExport = () => {
        const dataStr = JSON.stringify({ artworks }, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'artworks.json';
        link.click();
        URL.revokeObjectURL(url);

        // Show instructions
        alert(`artworks.json file downloaded! \n\nTo update your gallery:\n1. Replace src/data/artworks.json with this file\n2. Redeploy your app`);
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedData = JSON.parse(e.target.result);
                    if (importedData.artworks && Array.isArray(importedData.artworks)) {
                        saveArtworks(importedData.artworks);
                        alert('Artworks imported successfully!');
                    } else {
                        alert('Invalid file format. Expected artworks array.');
                    }
                } catch (error) {
                    alert('Error parsing JSON file.');
                }
            };
            reader.readAsText(file);
        }
        event.target.value = ''; // Reset file input
    };

    const handleReset = () => {
        if (window.confirm('Reset all changes and reload from JSON file? This will delete any artworks you\'ve added.')) {
            localStorage.removeItem('artworksData');
            loadArtworks();
        }
    };

    return (
        <div className="min-h-screen bg-bgDark pt-20 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Artwork Manager</h1>
                    <p className="text-gray-400">Manage your gallery artworks</p>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-xl transition-all"
                        >
                            <Plus size={18} />
                            Add Artwork
                        </button>

                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-xl transition-all"
                        >
                            <Download size={18} />
                            Export
                        </button>

                        <label className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-gray-300 px-4 py-2 rounded-xl transition-all cursor-pointer">
                            <Upload size={18} />
                            Import
                            <input
                                type="file"
                                accept=".json"
                                onChange={handleImport}
                                className="hidden"
                            />
                        </label>

                        <button
                            onClick={handleReset}
                            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl transition-all"
                        >
                            <RefreshCw size={18} />
                            Reset
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`px-4 py-2 rounded-xl transition-all ${viewMode === "grid"
                                    ? "bg-pink-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`px-4 py-2 rounded-xl transition-all ${viewMode === "list"
                                    ? "bg-pink-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                }`}
                        >
                            List
                        </button>
                    </div>
                </div>

                {/* Artworks Count */}
                <div className="text-center mb-6">
                    <p className="text-gray-400">
                        {artworks.length} artwork{artworks.length !== 1 ? 's' : ''} in gallery
                    </p>
                    <p className="text-sm text-gray-500">
                        {artworks.filter(a => !a.img || a.img.trim() === "").length} artworks without images
                    </p>
                </div>

                {/* Artworks Grid/List */}
                {artworks.length > 0 ? (
                    viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {artworks.map((artwork) => (
                                <div
                                    key={artwork.id}
                                    className="bg-cardDark rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        {artwork.img && artwork.img.trim() !== "" ? (
                                            <img
                                                src={artwork.thumbnail || artwork.img}
                                                alt={artwork.title || `Artwork ${artwork.id}`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM3NDE1MSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9Ii82NDc0OGIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                                                <span className="text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-2 truncate">
                                            {artwork.title || `Untitled ${artwork.id}`}
                                        </h3>
                                        <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                                            <span>{artwork.year}</span>
                                            <span>{artwork.category || (artwork.categories && artwork.categories[0]) || 'No Category'}</span>
                                        </div>
                                        {artwork.categories && artwork.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {artwork.categories.slice(0, 3).map((category, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                                        {category}
                                                    </span>
                                                ))}
                                                {artwork.categories.length > 3 && (
                                                    <span className="text-xs bg-gray-600 text-gray-400 px-2 py-1 rounded">
                                                        +{artwork.categories.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(artwork)}
                                                className="flex-1 flex items-center justify-center gap-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all"
                                            >
                                                <Edit size={16} />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(artwork.id)}
                                                className="flex-1 flex items-center justify-center gap-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        // List View
                        <div className="bg-cardDark rounded-2xl overflow-hidden">
                            {artworks.map((artwork) => (
                                <div
                                    key={artwork.id}
                                    className="flex items-center gap-4 p-4 border-b border-gray-700 last:border-b-0 hover:bg-gray-800 transition-all"
                                >
                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                        {artwork.img && artwork.img.trim() !== "" ? (
                                            <img
                                                src={artwork.thumbnail || artwork.img}
                                                alt={artwork.title || `Artwork ${artwork.id}`}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                                                <span className="text-gray-500 text-xs">No Image</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg truncate">
                                            {artwork.title || `Untitled ${artwork.id}`}
                                        </h3>
                                        <p className="text-gray-400 text-sm">
                                            {artwork.year} • {artwork.category || (artwork.categories && artwork.categories[0]) || 'No Category'}
                                        </p>
                                        {artwork.categories && artwork.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {artwork.categories.slice(0, 2).map((category, idx) => (
                                                    <span key={idx} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                                                        {category}
                                                    </span>
                                                ))}
                                                {artwork.categories.length > 2 && (
                                                    <span className="text-xs bg-gray-600 text-gray-400 px-2 py-1 rounded">
                                                        +{artwork.categories.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button
                                            onClick={() => handleEdit(artwork)}
                                            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                                            title="Edit"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(artwork.id)}
                                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : (
                    // Empty State
                    <div className="text-center py-12">
                        <div className="max-w-md mx-auto">
                            <Eye size={48} className="mx-auto text-gray-500 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                No artworks found
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Start by adding your first artwork to the gallery.
                            </p>
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-xl transition-all mx-auto"
                            >
                                <Plus size={18} />
                                Add Your First Artwork
                            </button>
                        </div>
                    </div>
                )}

                {/* Artwork Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                            <ArtworkForm
                                onSave={handleSaveArtwork}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingArtwork(null);
                                }}
                                initialData={editingArtwork}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtworkManager;