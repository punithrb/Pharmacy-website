import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/slices/cartSlice';
import styles from './MedicineCard.module.css';

const MedicineCard = ({ medicine }) => {
  const dispatch = useDispatch();
  
  const finalPrice = medicine.price * (1 - (medicine.discount / 100));

  const handleAddToCart = () => {
    dispatch(addItem({ ...medicine, quantity: 1 }));
    // In a real app, you'd trigger a notification here (e.g., a toast)
    console.log(`${medicine.name} added to cart!`);
  };

  return (
    <div className={styles.card}>
      {medicine.discount > 0 && (
        <div className={styles.badge}>
          -{medicine.discount}%
        </div>
      )}
      <div className={styles.imagePlaceholder}>
<img src={`/images/${medicine.name.toLowerCase()}.png`} alt="" />
</div>
      <div className={styles.details}>
        <Link to={`/product/${medicine.id}`} className={styles.nameLink}>
          <h4>{medicine.name}</h4>
        </Link>
        <p className={styles.brand}>{medicine.brand}</p>
        <div className={styles.priceContainer}>
          {medicine.discount > 0 && (
            <span className={styles.originalPrice}>${medicine.price.toFixed(2)}</span>
          )}
          <span className={styles.price}>${finalPrice.toFixed(2)}</span>
        </div>
        <p className={`${styles.availability} ${medicine.availability ? styles.available : styles.unavailable}`}>
          {medicine.availability ? 'In Stock' : 'Out of Stock'}
        </p>
        <div className={styles.actions}>
          <button 
            className="btn-secondary"
            onClick={handleAddToCart}
            disabled={!medicine.availability}
          >
            Add to Cart
          </button>
          <button className={styles.compareBtn} title="Compare">↔️</button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;