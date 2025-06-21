import React from 'react';
import CompletedTestCard from '../CompletedTestCard/CompletedTestCard';
import styles from './styles.module.css'; // Создадим новый файл стилей

function TestResultsContainer({ resultsList }) {
  return (
    <div className={styles['completed-test-section']}>
      <h2 className={styles['completed-test-text']}>Завершенные тесты</h2>
      <div className={styles['results-container']}>
        {resultsList.map((results, index) => (
          <CompletedTestCard key={index} results={results} />
        ))}
      </div>   
    </div>
  );
}

export default TestResultsContainer;