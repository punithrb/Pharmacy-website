import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchMedicines } from '../../redux/slices/catalogSlice';
import MedicineCard from '../../components/common/MedicineCard/MedicineCard';
import PrescriptionUpload from '../../components/common/PrescriptionUpload/PrescriptionUpload';
import styles from './HomePage.module.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { recommendations, loading } = useSelector((state) => state.catalog);

  useEffect(() => {
    // Fetch if not already loaded (to populate the store)
    if (loading === 'idle') {
      dispatch(fetchMedicines());
    }
  }, [dispatch, loading]);

  return (
    <div className={styles.homePage}>
      <header className={styles.hero}>
        <h1>Online Pharmacy</h1>
        <p>Order your medicines and healthcare products with ease.</p>
        <Link to="/catalog" className="btn-primary">Shop Now</Link>
      </header>

      <section className={styles.recommendations}>
        <h2>✨ Personalized Recommendations</h2>
        {loading === 'loading' ? (
          <p>Loading recommendations...</p>
        ) : (
          <div className={styles.carousel}>
            {recommendations.map(med => (
              <MedicineCard key={med.id} medicine={med} />
            ))}
          </div>
        )}
        <div className={styles.recommendationNote}>
          <p>Recommendations based on your mock medical history.</p>
        </div>
      </section>
      
      <section className={styles.uploadSection}>
        <h2>📄 Need a Prescription?</h2>
        <p>Easily upload your prescription for verification and ordering.</p>
        <PrescriptionUpload />
      </section>
      
    </div>
  );
};

export default HomePage;