import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { mockOrderUpdates } from '../../mockData';
import styles from './OrderTrackingPage.module.css';

// Mock order data based on tracking ID
const getMockOrder = (orderId) => {
  if (orderId.startsWith('MOCK')) {
    return {
      id: orderId,
      status: 'Processing', // Will be updated by the mock updates
      items: [{ name: 'Assorted Medicines', qty: 'Various' }],
      history: mockOrderUpdates,
    };
  }
  return null;
};

const OrderTrackingPage = () => {
  const { orderId } = useParams();
  const order = useMemo(() => getMockOrder(orderId), [orderId]);
  
  if (!order) {
    return <h2 className={styles.notFound}>Order ID **{orderId}** Not Found.</h2>;
  }
  
  const currentStatus = order.history[order.history.length - 1].status;
  const statusSteps = ['Processing', 'Verified Prescription', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStepIndex = statusSteps.indexOf(currentStatus);

  return (
    <div className={styles.trackingPage}>
      <h1>Track Your Order</h1>
      <p className={styles.orderId}>Order ID: **{order.id}**</p>
      
      <div className={styles.progressBar}>
        {statusSteps.map((status, index) => (
          <div 
            key={status} 
            className={`${styles.step} ${index <= currentStepIndex ? styles.completed : ''}`}
          >
            <div className={styles.circle}>
              {index < currentStepIndex ? '✅' : index === currentStepIndex ? '⏳' : index + 1}
            </div>
            <span className={styles.label}>{status}</span>
          </div>
        ))}
        {/* Visual line connecting steps */}
        <div 
          className={styles.progressLine} 
          style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
        ></div>
      </div>
      
      <div className={styles.historySection}>
        <h2>Order History</h2>
        {order.history.slice().reverse().map(update => (
          <div key={update.id} className={styles.updateItem}>
            <span className={styles.updateTime}>{new Date(update.timestamp).toLocaleString()}</span>
            <span className={styles.updateStatus}>**{update.status}**</span>
          </div>
        ))}
      </div>
      
      <div className={styles.currentStatusAlert}>
        <p>Current Status: **{currentStatus}**</p>
        <p>You will receive an in-app notification upon the next status change.</p>
      </div>
      
    </div>
  );
};

export default OrderTrackingPage;