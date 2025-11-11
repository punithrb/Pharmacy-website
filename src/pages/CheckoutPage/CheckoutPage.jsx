import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';
import { placeOrder } from '../../redux/slices/orderSlice';
import styles from './CheckoutPage.module.css';

const STEPS = {
  SHIPPING: 1,
  PAYMENT: 2,
  CONFIRMATION: 3,
};

const CheckoutPage = () => {
  const [step, setStep] = useState(STEPS.SHIPPING);
  const [shippingInfo, setShippingInfo] = useState({ name: '', address: '', phone: '' });
  const [paymentInfo, setPaymentInfo] = useState({ method: 'Credit Card' });
  
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 50 ? 0.00 : 5.00;
  const totalAmount = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Your cart is empty. Cannot checkout.</h2>
        <Link to="/catalog" className="btn-primary">Browse Medicines</Link>
      </div>
    );
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    if (shippingInfo.name && shippingInfo.address && shippingInfo.phone) {
      setStep(STEPS.PAYMENT);
    } else {
      alert("Please fill in all shipping details.");
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(STEPS.CONFIRMATION);
  };
  
  const handlePlaceOrder = () => {
    const orderPayload = {
      items: cartItems,
      shippingInfo,
      paymentInfo,
      total: totalAmount,
    };

    dispatch(placeOrder(orderPayload));
    dispatch(clearCart());
    
    // Mock navigation to order tracking page (using a mock ID for now)
    navigate(`/order-track/MOCK${Math.floor(Math.random() * 10000)}`);
  };

  const renderStepContent = () => {
    switch (step) {
      case STEPS.SHIPPING:
        return (
          <form onSubmit={handleShippingSubmit} className={styles.form}>
            <h3>Shipping Information</h3>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={shippingInfo.name}
              onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
            />
            <textarea 
              placeholder="Delivery Address" 
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            />
            <input 
              type="tel" 
              placeholder="Phone Number" 
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
            />
            <button type="submit" className="btn-primary">Continue to Payment</button>
          </form>
        );
      case STEPS.PAYMENT:
        return (
          <form onSubmit={handlePaymentSubmit} className={styles.form}>
            <h3>Payment Method</h3>
            <div className={styles.radioGroup}>
              <label>
                <input 
                  type="radio" 
                  value="Credit Card" 
                  checked={paymentInfo.method === 'Credit Card'}
                  onChange={(e) => setPaymentInfo({ method: e.target.value })}
                /> Credit Card (Mock)
              </label>
              <label>
                <input 
                  type="radio" 
                  value="PayPal" 
                  checked={paymentInfo.method === 'PayPal'}
                  onChange={(e) => setPaymentInfo({ method: e.target.value })}
                /> PayPal (Mock)
              </label>
              <label>
                <input 
                  type="radio" 
                  value="Cash on Delivery" 
                  checked={paymentInfo.method === 'Cash on Delivery'}
                  onChange={(e) => setPaymentInfo({ method: e.target.value })}
                /> Cash on Delivery
              </label>
            </div>
            <button type="submit" className="btn-primary">Review Order</button>
            <button type="button" className="btn-outline" onClick={() => setStep(STEPS.SHIPPING)}>Back to Shipping</button>
          </form>
        );
      case STEPS.CONFIRMATION:
        return (
          <div className={styles.confirmation}>
            <h3>Review and Place Order</h3>
            <div className={styles.reviewSection}>
              <h4>Shipping To:</h4>
              <p>Name: **{shippingInfo.name}**</p>
              <p>Address: {shippingInfo.address}</p>
            </div>
            <div className={styles.reviewSection}>
              <h4>Payment With:</h4>
              <p>Method: **{paymentInfo.method}**</p>
            </div>
            
            <div className={styles.summaryCard}>
              <h3>Order Total: ${totalAmount.toFixed(2)}</h3>
              <p>Items: {cartItems.length}</p>
            </div>
            
            <button onClick={handlePlaceOrder} className="btn-secondary">
              Place Order Now
            </button>
            <button type="button" className="btn-outline" onClick={() => setStep(STEPS.PAYMENT)}>Back to Payment</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.checkoutPage}>
      <h1>Checkout</h1>
      
      <div className={styles.stepIndicator}>
        <div className={`${styles.step} ${step >= STEPS.SHIPPING ? styles.active : ''}`}>
          1. Shipping
        </div>
        <div className={`${styles.step} ${step >= STEPS.PAYMENT ? styles.active : ''}`}>
          2. Payment
        </div>
        <div className={`${styles.step} ${step >= STEPS.CONFIRMATION ? styles.active : ''}`}>
          3. Review
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.formContainer}>
          {renderStepContent()}
        </div>
        
        <div className={styles.orderSummary}>
          <h2>Items in Order ({cartItems.length})</h2>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span>{shippingFee === 0.00 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;