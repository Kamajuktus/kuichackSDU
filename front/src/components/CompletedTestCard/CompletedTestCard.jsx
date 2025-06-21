import React from 'react';
import styles from './styles.module.css'; // Предполагаемый файл стилей

function CompletedTestCard({ results }) {
  const { testName, totalScore, subjects, preview_icon } = results;

  return (
    <div className={styles['results-card']}>
      <div className={styles['header']}>
        <div className={styles['characters']}>
          <img src={preview_icon} alt="preview_icon" />
        </div>
        <h2 className={styles['test-name']}>{testName || 'ЕНТ Пробный №X'}</h2>
        <p className={styles['total-score']}>Общий {totalScore} балл{totalScore > 1 ? 'ов' : ' '}</p>
      </div>
      <div className={styles['subjects-scores']}>
        {Object.entries(subjects || {}).map(([subject, score]) => (
          <div key={subject} className={styles['subject-score']}>
            <p className={styles['subject-name']}>{subject}</p>
            <p className={styles['score']}>{score}</p>
          </div>
        ))}
      </div>
      <button className={styles['details-button']}>Подробнее</button>
    </div>
  );
}

export default CompletedTestCard;