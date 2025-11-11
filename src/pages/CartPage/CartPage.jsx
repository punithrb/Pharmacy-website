import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeItem, updateQuantity } from '../../redux/slices/cartSlice';
import styles from './CartPage.module.css';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, e) => {
    const quantity = parseInt(e.target.value);
    if (!isNaN(quantity) && quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const subtotal = calculateSubtotal();
  const shipping = subtotal > 50 ? 0.00 : 5.00;
  const total = subtotal + shipping;

  return (
    <div className={styles.cartPage}>
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is empty. Time to stock up!</p>
          <Link to="/catalog" className="btn-primary">Browse Medicines</Link>
        </div>
      ) : (
        <div className={styles.content}>
          <div className={styles.cartItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.imagePlaceholder}></div>
                <div className={styles.itemDetails}>
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                  <p className={styles.price}>${(item.price * item.quantity).toFixed(2)}</p>
                  {item.originalPrice !== item.price && (
                    <p className={styles.discounted}>Original Price: ${(item.originalPrice * item.quantity).toFixed(2)}</p>
                  )}
                </div>
                <div className={styles.itemActions}>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    className={styles.quantityInput}
                  />
                  <button 
                    onClick={() => dispatch(removeItem(item.id))}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summaryCard}>
            <h2>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping:</span>
              <span>{shipping === 0.00 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
              <span>Order Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className={`btn-primary ${styles.checkoutBtn}`}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;