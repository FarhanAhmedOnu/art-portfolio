// src/utils/searchUtils.js
export const searchItems = (items, searchQuery, searchFields) => {
  if (!searchQuery.trim()) return items;

  const query = searchQuery.toLowerCase().trim();
  
  return items.filter(item => 
    searchFields.some(field => {
      const fieldValue = getNestedValue(item, field);
      
      if (Array.isArray(fieldValue)) {
        return fieldValue.some(value => 
          String(value).toLowerCase().includes(query)
        );
      }
      
      return fieldValue && String(fieldValue).toLowerCase().includes(query);
    })
  );
};

// Helper function to get nested object values
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
};

// Specific search functions
export const searchGames = (games, searchQuery) => {
  const searchFields = ['title', 'developer', 'article.title'];
  return searchItems(games, searchQuery, searchFields);
};

export const searchArtists = (artists, searchQuery) => {
  const searchFields = ['name', 'specialty', 'article.title'];
  return searchItems(artists, searchQuery, searchFields);
};

export const searchArtworks = (artworks, searchQuery) => {
  const searchFields = ['title', 'desc', 'category', 'categories'];
  return searchItems(artworks, searchQuery, searchFields);
};