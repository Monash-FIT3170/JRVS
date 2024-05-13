import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Lessons from './pages/Lesson/lessons';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import CustomizePage from './pages/CustomizePage';
import Quizzes from './pages/Quiz/quizzes';
import RegistrationPage from './pages/RegistrationPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import UnitsPage from './pages/UnitsPage';

const App = () =>  {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ProtectedRoute/>}>
          <Route exact path="/" element={<HomePage />}/>
        </Route>
        <Route exact path="/lesson" element={<ProtectedRoute/>}>
          <Route exact path="/lesson" element={<Lessons/>}/>
        </Route>
        <Route exact path="/profile" element={<ProtectedRoute/>}>
          <Route exact path="/profile" element={<ProfilePage />}/>
        </Route>
        <Route exact path="/customize" element={<ProtectedRoute/>}>
          <Route exact path="/customize" element={<CustomizePage />}/>
        </Route>
        <Route exact path="/quiz" element={<ProtectedRoute/>}>
          <Route exact path="/quiz" element={<Quizzes/>}/>
        </Route>
        <Route path="/units" element={<UnitsPage/>} />
        <Route path="/lesson/:lessonId" element={<Lessons/>} />
        <Route element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
