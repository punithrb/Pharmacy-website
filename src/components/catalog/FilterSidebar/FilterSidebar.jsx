import React, { useState, useEffect } from 'react';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ categories, brands, currentFilters, onFilterChange }) => {
  const [localPriceRange, setLocalPriceRange] = useState(currentFilters.priceRange);

  useEffect(() => {
    setLocalPriceRange(currentFilters.priceRange);
  }, [currentFilters.priceRange]);

  const handleCategoryChange = (category) => {
    onFilterChange({ category: currentFilters.category === category ? null : category });
  };

  const handleBrandChange = (e) => {
    onFilterChange({ brand: e.target.value === '' ? null : e.target.value });
  };

  const handlePriceChange = (e, index) => {
    const value = Number(e.target.value);
    const newRange = [...localPriceRange];
    newRange[index] = value;
    setLocalPriceRange(newRange);
  };
  
  const applyPriceFilter = () => {
    onFilterChange({ priceRange: localPriceRange });
  };
  
  const handleClearFilters = () => {
    onFilterChange({ category: null, brand: null, priceRange: [0, 100] });
    setLocalPriceRange([0, 100]);
  };

  return (
    <div className={styles.sidebar}>
      <h3>Filter Medicines</h3>
      <button className={styles.clearBtn} onClick={handleClearFilters}>Clear All Filters</button>

      {/* Category Filter */}
      <div className={styles.filterGroup}>
        <h4>Category</h4>
        <div className={styles.checkboxGroup}>
          {categories.map(category => (
            <label key={category} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={currentFilters.category === category}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      
      {/* Brand Filter */}
      <div className={styles.filterGroup}>
        <h4>Brand</h4>
        <select 
          value={currentFilters.brand || ''} 
          onChange={handleBrandChange} 
          className={styles.selectFilter}
        >
          <option value="">All Brands</option>
          {brands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className={styles.filterGroup}>
        <h4>Price Range</h4>
        <div className={styles.priceInputs}>
          <input 
            type="number" 
            value={localPriceRange[0]} 
            onChange={(e) => handlePriceChange(e, 0)} 
            min="0"
            max="100"
            className={styles.priceInput}
          />
          <span>-</span>
          <input 
            type="number" 
            value={localPriceRange[1]} 
            onChange={(e) => handlePriceChange(e, 1)} 
            min="0"
            max="100"
            className={styles.priceInput}
          />
        </div>
        <div className={styles.priceSliderContainer}>
          <input
            type="range"
            min="0"
            max="100"
            value={localPriceRange[0]}
            onChange={(e) => handlePriceChange(e, 0)}
            className={styles.priceSlider}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={localPriceRange[1]}
            onChange={(e) => handlePriceChange(e, 1)}
            className={styles.priceSlider}
          />
        </div>
        <button onClick={applyPriceFilter} className="btn-primary">Apply Price Filter</button>
      </div>
    </div>
  );
};

export default FilterSidebar;