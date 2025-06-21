import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import GeneratingDots from './GeneratingDots';
import FloatingComponent from './FloatingComponent';
import PercentageBar from './PercentageBar';
import BaseButton from '../BaseButton/BaseButton';

import generating_notebook from './../../assets/generating_notebook.png'
function ContinueTestSection({ test, isGenerating }) {
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress < 100 ? prevProgress + 5 : 100));
    }, 500);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className={styles['continue-test-section']}>
      <h2 className={styles['completed-test-text']}>Продолжить тест</h2>
        <div className={styles['card-section']}>
          <div className={styles['test-card']}>
            {/* <div className={styles['left-section']}> */}
              <div className={styles['characters']}>
                <div className={styles['character']}>{/* Первый персонаж */}</div>
                <img src={test.preview} alt="icon"/>
              </div>
              <div className={styles['test-info']}>
                <p className={styles['big-text']}>{test?.name || 'ЕНТ Пробный №X'}</p>
                <p className={styles['subjects']}>
                  Предметы: {test?.subjects || 'История Казахстана, Математическая грамотность, Грамотность чтения, Математика, Физика'}
                </p>
                <div className={styles['progress-info']}>
                  <p className={styles['']}>Осталось {test?.remainingQuestions || '60'} вопросов</p>
                  <div className={styles['progress-wrapper']}>
                    <div className={styles['progress-bar-container']}>
                      <div
                        className={styles['progress-bar']}
                        style={{ width: `${(test?.completedQuestions / test?.totalQuestions) * 100 || 0}%` }}
                      ></div>
                    </div>
                    <p className={styles['progress-percentage']}>
                      {(test?.completedQuestions / test?.totalQuestions) * 100 || 0}%
                    </p>
                  </div>
                </div>
                <BaseButton className={styles['continue-button']}>Продолжить тест</BaseButton>
              </div>
            {/* </div> */}
          </div>
          <div className={styles['generation-card']}>
            <PercentageBar percentage={progress}>
              <div className={styles['right-section']}>
                  {isGenerating ? (
                    <div className={styles['generating-state']}>
                      <div className={styles['relative_parent']}>
                        <FloatingComponent>
                          <img src={generating_notebook} alt="generating_notebook" />
                        </FloatingComponent>
                        <GeneratingDots />
                      </div>
                    </div>
                  ) : (
                    <div className={styles['time-remaining']}>
                      <p className={styles['label']}>Осталось времени</p>
                      <p className={styles['time']}>{test?.remainingTime || '2ч 10 мин'}</p>
                    </div>
                  )}
              </div>
            </PercentageBar>
          </div>
        </div>
    </div>
  );
}

export default ContinueTestSection;