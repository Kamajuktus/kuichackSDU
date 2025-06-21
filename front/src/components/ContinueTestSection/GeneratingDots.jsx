import React, { useState, useEffect } from 'react';
import styles from './styles.module.css'; // Убедитесь, что путь к вашим стилям верный

const GeneratingDots = () => {
  const [dots, setDots] = useState('.');

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dots === '.') {
        setDots('..');
      } else if (dots === '..') {
        setDots('...');
      } else {
        setDots('.');
      }
    }, 500); // Изменяйте значение, чтобы контролировать скорость анимации

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
  }, [dots]);

  return (
    <p className={styles['text_under_notebook']}>Идет генерация новых тестов {dots}</p>
  );
};

export default GeneratingDots;