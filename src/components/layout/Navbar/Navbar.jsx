import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchTerm } from '../../../redux/slices/catalogSlice';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [localSearch, setLocalSearch] = useState('');
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleSearchChange = (e) => {
    // Implement debouncing logic here in a real app
    const term = e.target.value;
    setLocalSearch(term);
    
    // Dispatch immediately for simple implementation
    dispatch(setSearchTerm(term));
  };
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Navigate to catalog page to show filtered results
    navigate('/catalog'); 
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">💊 PharmaCare</Link>
      </div>
      <form onSubmit={handleSearchSubmit} className={styles.searchBar}>
        <input 
          type="text" 
          placeholder="Search medicines..." 
          value={localSearch}
          onChange={handleSearchChange}
        />
        <button type="submit">🔍</button>
      </form>
      <nav className={styles.navLinks}>
        <Link to="/catalog">Catalog</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/cart" className={styles.cartLink}>
          🛒 Cart {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;