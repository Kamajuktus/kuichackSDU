import React from 'react';
import { Link } from 'react-router'; // Если вы используете React Router
import styles from './styles.module.css'; // Импортируем CSS-модуль как 'styles'


const Navigation = ({ navItems }) => {
  return (
    <nav className={styles.nav}> 
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li key={item.path} className={styles.navItem}> 
            <img src={item.icon} alt="icon"/>
            <Link to={item.path} className={styles.navLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;