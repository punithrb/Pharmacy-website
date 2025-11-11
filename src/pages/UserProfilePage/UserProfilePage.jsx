import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/slices/userSlice';
import styles from './UserProfilePage.module.css';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    // Fetch user profile on component mount
    if (loading === 'idle') {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, loading]);

  if (loading === 'loading') return <h2 className={styles.status}>Loading Profile...</h2>;
  if (error || !profile) return <h2 className={styles.error}>Error loading profile or profile data is empty.</h2>;

  return (
    <div className={styles.profilePage}>
      <h1>Welcome Back, **{profile.name}**</h1>
      <p className={styles.email}>Email: {profile.email}</p>

      <div className={styles.gridContainer}>
        
        {/* Medical History */}
        <section className={styles.sectionCard}>
          <h2>🩺 Medical History</h2>
          {profile.medicalHistory.length > 0 ? (
            <ul className={styles.list}>
              {profile.medicalHistory.map((item, index) => (
                <li key={index}>
                  **{item.condition}**: Taking {item.medication}
                </li>
              ))}
            </ul>
          ) : (
            <p>No medical history recorded. Update your profile to get better recommendations.</p>
          )}
          <button className="btn-outline">Edit History</button>
        </section>

        {/* Prescription History */}
        <section className={styles.sectionCard}>
          <h2>📄 Prescription History</h2>
          {profile.prescriptions.length > 0 ? (
            <ul className={styles.list}>
              {profile.prescriptions.map((pres) => (
                <li key={pres.id} className={styles.prescriptionItem}>
                  <span>**{pres.medicine}** ({pres.date})</span>
                  <span className={pres.status === 'Verified' ? styles.verified : styles.pending}>{pres.status}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No prescriptions on file.</p>
          )}
          <button className="btn-primary">Upload New Prescription</button>
        </section>

        {/* Purchase History */}
        <section className={styles.sectionCardFull}>
          <h2>📦 Purchase History</h2>
          {profile.pastOrders.length > 0 ? (
            <table className={styles.orderTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {profile.pastOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>${order.total.toFixed(2)}</td>
                    <td className={styles[order.status.replace(/\s/g, '')]}>{order.status}</td>
                    <td>
                      <Link to={`/order-track/${order.id}`} className={styles.detailsLink}>Track/View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No past orders found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserProfilePage;