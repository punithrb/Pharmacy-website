import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import styles from './ProductPage.module.css';

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const medicines = useSelector(state => state.catalog.medicines);
  const [activeTab, setActiveTab] = useState('description');
  const [liveChatActive, setLiveChatActive] = useState(false);

  const medicine = useMemo(() => medicines.find(m => m.id === parseInt(id)), [medicines, id]);
  
  if (!medicine) {
    return <h2 className={styles.notFound}>Medicine Not Found</h2>;
  }
  
  const finalPrice = medicine.price * (1 - (medicine.discount / 100));

  const handleAddToCart = () => {
    dispatch(addItem({ ...medicine, quantity: 1 }));
    console.log(`${medicine.name} added to cart!`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return <p>{medicine.description}</p>;
      case 'ingredients':
        return (
          <ul>
            {medicine.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
          </ul>
        );
      case 'dosage':
        return <p>{medicine.dosage}</p>;
      case 'reviews':
        return <p>Rating: **{medicine.reviews}/5**. (Mock Reviews - Feature not fully implemented)</p>;
      default:
        return <p>{medicine.description}</p>;
    }
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.gridContainer}>
        <div className={styles.imageSection}>
          <div className={styles.mainImagePlaceholder}>

[Image of {medicine.name}]
</div>
          {medicine.discount > 0 && (
            <div className={styles.discountBadge}>SAVE {medicine.discount}%</div>
          )}
        </div>

        <div className={styles.infoSection}>
          <h1>{medicine.name}</h1>
          <p className={styles.brand}>Brand: **{medicine.brand}**</p>
          <div className={styles.priceContainer}>
            {medicine.discount > 0 && (
              <span className={styles.originalPrice}>${medicine.price.toFixed(2)}</span>
            )}
            <span className={styles.currentPrice}>${finalPrice.toFixed(2)}</span>
            <span className={styles.availability}>
              {medicine.availability ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <div className={styles.actions}>
            <input type="number" min="1" defaultValue="1" className={styles.quantityInput} />
            <button 
              className="btn-secondary" 
              onClick={handleAddToCart}
              disabled={!medicine.availability}
            >
              Add to Cart
            </button>
            <button className="btn-outline">❤️ Save</button>
          </div>
          
          <div className={styles.tabContainer}>
            <div className={styles.tabs}>
              <button 
                className={activeTab === 'description' ? styles.activeTab : ''} 
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button 
                className={activeTab === 'ingredients' ? styles.activeTab : ''} 
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
              <button 
                className={activeTab === 'dosage' ? styles.activeTab : ''} 
                onClick={() => setActiveTab('dosage')}
              >
                Dosage
              </button>
              <button 
                className={activeTab === 'reviews' ? styles.activeTab : ''} 
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            <div className={styles.tabContent}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Chat Widget */}
      <div 
        className={`${styles.liveChatWidget} ${liveChatActive ? styles.active : ''}`}
        onClick={() => setLiveChatActive(!liveChatActive)}
      >
        <span className={styles.chatIcon}>💬</span>
        {liveChatActive && (
          <div className={styles.chatWindow} onClick={(e) => e.stopPropagation()}>
            <p>Hi! How can I help you with **{medicine.name}**?</p>
            <input type="text" placeholder="Type your question..." />
            <button className="btn-primary">Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;