import React from 'react';
import Navigation from './Navigation';
import UserProfileIcon from './UserProfileIcon';
import styles from './styles.module.css'

import logo from '../../assets/logo.svg'; // Путь к вашему логотипу

import main_icon from '../../assets/main_menu.svg'
import tests_icon from '../../assets/tests.svg'
import statistics_icon from '../../assets/statistics.svg'


const Header = ({ user }) => {
  const navItems = [
    { id: 'main', label: 'Главная', path: '/', icon: main_icon},
    { id: 'tests', label: 'Тесты', path: '/tests',  icon: tests_icon},
    { id: 'stats', label: 'Статистика', path: '/stats',  icon: statistics_icon},
  ];
  return (
    <header className={styles.header}>
      <img src={logo} alt="ЕНТ AI Logo" className={styles.header__logo} />
      <Navigation navItems={navItems} />
      <UserProfileIcon user={user} />
    </header>
  );
};

export default Header;