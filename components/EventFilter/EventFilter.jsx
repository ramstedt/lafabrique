import styles from './EventFilter.module.css';

export default function EventFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}) {
  return (
    <div className={styles.filterContainer}>
      <label htmlFor='category-select'>Sortera på kategori</label>
      <select
        id='category-select'
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
      >
        <option value='all'>Allt</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
