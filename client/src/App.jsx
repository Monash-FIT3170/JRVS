import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LessonPage from './pages/LessonPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';

const App = () =>  {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/lesson" element={<LessonPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
