'use client';

import { useState } from 'react';

export default function EventFilter({ categories, onFilterChange }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onFilterChange(category);
  };

  return (
    <div>
      <label htmlFor='category-filter'>Filtrera på kategori: </label>
      <select
        id='category-filter'
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value='all'>Alla</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
