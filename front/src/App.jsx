import React from 'react';
import { BrowserRouter } from 'react-router'
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import styles from './styles.module.css'; // Общие стили или стили для лэйаута
import user_icon_dummy from './assets/user_icon_dummy.svg'
import test_preview_1 from  './assets/test_preview_1.png'

function App() {
  // Здесь могут быть данные пользователя, тестов и т.д., полученные, например, из API
  const userData = { icon: user_icon_dummy };
  const inProgressTest = { preview: test_preview_1 };
  const completedTests = [ /* массив данных для завершенных тестов */ ];
  const isGenerating = true; // флаг для карточки генерации

  return (
    <BrowserRouter>
    <Header user={userData} />
    <div className={styles.app_container}>
      <MainPage
        inProgressTest={inProgressTest}
        completedTests={completedTests}
        isGenerating={isGenerating}
      />
    </div>
    </BrowserRouter>
  );
}

export default App;