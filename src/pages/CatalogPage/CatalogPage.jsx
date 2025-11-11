import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicines, setFilters } from '../../redux/slices/catalogSlice';
import MedicineCard from '../../components/common/MedicineCard/MedicineCard';
import FilterSidebar from '../../components/catalog/FilterSidebar/FilterSidebar';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();
  const { medicines, loading, error, searchTerm, filters } = useSelector((state) => state.catalog);

  useEffect(() => {
    if (loading === 'idle') {
      dispatch(fetchMedicines());
    }
  }, [dispatch, loading]);

  const allCategories = useMemo(() => [...new Set(medicines.map(m => m.category))], [medicines]);
  const allBrands = useMemo(() => [...new Set(medicines.map(m => m.brand))], [medicines]);

  // Combined Search and Filter Logic
  const filteredMedicines = useMemo(() => {
    let result = medicines;

    // 1. Search Filter (Case-insensitive, includes name or brand)
    if (searchTerm) {
      result = result.filter(med => 
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Advanced Filters
    if (filters.category) {
      result = result.filter(med => med.category === filters.category);
    }
    
    if (filters.brand) {
      result = result.filter(med => med.brand === filters.brand);
    }

    // 3. Price Range Filter (using final price)
    result = result.filter(med => {
      const finalPrice = med.price * (1 - (med.discount / 100));
      return finalPrice >= filters.priceRange[0] && finalPrice <= filters.priceRange[1];
    });

    return result;
  }, [medicines, searchTerm, filters]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
  };
  
  if (loading === 'loading') return <h2 className={styles.status}>Loading Catalog...</h2>;
  if (error) return <h2 className={styles.statusError}>Error: {error}</h2>;

  return (
    <div className={styles.catalogPage}>
      <h1>Medicine Catalog</h1>
      
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <FilterSidebar 
            categories={allCategories} 
            brands={allBrands} 
            currentFilters={filters} 
            onFilterChange={handleFilterChange} 
          />
        </div>
        
        <div className={styles.medicineList}>
          <h2>Showing {filteredMedicines.length} Results</h2>
          <div className={styles.grid}>
            {filteredMedicines.length > 0 ? (
              filteredMedicines.map(med => (
                <MedicineCard key={med.id} medicine={med} />
              ))
            ) : (
              <p className={styles.noResults}>No medicines found matching your criteria.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;