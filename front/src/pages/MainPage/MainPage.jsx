import React from 'react';
import ContinueTestSection from './../../components/ContinueTestSection/ContinueTestSection';
import CompletedTestCard from '../../components/CompletedTestCard/CompletedTestCard';
import TestResultsContainer from '../../components/TestResultsContainer/TestResultsContainer';
// import CompletedTestsSection from '../CompletedTestsSection/CompletedTestsSection';

import preview_icon_2 from '../../assets/test_preview_2.png'

const MainPage = ({ inProgressTest, completedTests, isGenerating }) => {
  const testResults = [
    {
      testName: 'ЕНТ пробный №1',
      totalScore: 95,
      subjects: {
        'История Казахстана': 18,
        'Математическая грамотность': 12,
        'Грамотность чтения': 9,
        'Физика': 20,
        'Химия': 36,
      },
      preview_icon: preview_icon_2
    },
    {
      testName: 'ЕНТ пробный №2',
      totalScore: 103,
      subjects: {
        'История Казахстана': 20,
        'Математическая грамотность': 10,
        'Грамотность чтения': 10,
        'Физика': 23,
        'Химия': 40,
      },
      preview_icon: preview_icon_2

    },
    {
      testName: 'ЕНТ пробный №3',
      totalScore: 88,
      subjects: {
        'История Казахстана': 15,
        'Математическая грамотность': 8,
        'Грамотность чтения': 11,
        'Физика': 18,
        'Химия': 36,
      },
      preview_icon: preview_icon_2
    },
    {
      testName: 'ЕНТ пробный №4',
      totalScore: 110,
      subjects: {
        'История Казахстана': 22,
        'Математическая грамотность': 13,
        'Грамотность чтения': 12,
        'Физика': 25,
        'Химия': 38,
      },
      preview_icon: preview_icon_2
    },
  ];



  return (
    <main className="main-content">
      <ContinueTestSection test={inProgressTest} isGenerating={isGenerating} />
      <TestResultsContainer resultsList={testResults} />
    </main>
  );
};

export default MainPage;