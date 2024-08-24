import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from './pages/HomePage';
import Lessons from "./pages/Lesson/lessons";
import NotFoundPage from "./pages/NotFoundPage";
import ProfilePage from "./pages/ProfilePage";
import CustomizePage from "./pages/CustomizePage";
import Quizzes from "./pages/Quiz/quizzes";
import LearningPathPage from "./pages/LearningPathPage";
import UnitsPage from "./pages/UnitsPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Videos from "./pages/Video/videos";
import EditLesson from "./pages/Lesson/editLesson";
import EditProfile from "./pages/EditProfile";
import LeaderboardPage from "./pages/LeaderboardPage";
import EditVideo from "./pages/Video/editVideo";
import EditShortAnswerQuestion from "./pages/Quiz/EditShortAnswer";
import EditDragDrop from "./pages/Quiz/EditDragDrop";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/leaderboard" element={<ProtectedRoute />}>
          <Route exact path="/leaderboard" element={<LeaderboardPage />} />
        </Route>
        <Route exact path="/" element={<ProtectedRoute />}>
          <Route exact path="/" element={<UnitsPage />} />
        </Route>
        <Route exact path="/lesson/:lessonId" element={<ProtectedRoute />}>
          <Route exact path="/lesson/:lessonId" element={<Lessons />} />
        </Route>
        <Route exact path="/edit/:lessonId" element={<ProtectedRoute />}>
          <Route exact path="/edit/:lessonId" element={<EditLesson />} />
        </Route>
        <Route exact path="/learningPath/:unitId" element={<ProtectedRoute />}>
          <Route
            exact
            path="/learningPath/:unitId"
            element={<LearningPathPage />}
          />
        </Route>
        <Route exact path="/profile" element={<ProtectedRoute />}>
          <Route exact path="/profile" element={<ProfilePage />} />
        </Route>
        <Route exact path="/customize" element={<ProtectedRoute />}>
          <Route exact path="/customize" element={<CustomizePage />} />
        </Route>
        <Route exact path="/quiz/:quizId" element={<ProtectedRoute />}>
          <Route exact path="/quiz/:quizId" element={<Quizzes />} />
        </Route>
        <Route
          exact
          path="/quiz/short-answer/edit/:quizId"
          element={<ProtectedRoute />}
        >
          <Route
            exact
            path="/quiz/short-answer/edit/:quizId"
            element={<EditShortAnswerQuestion />}
          />
        </Route>
        <Route
          exact
          path="/quiz/drag-drop/edit/:quizId"
          element={<ProtectedRoute />}
        >
          <Route
            exact
            path="/quiz/drag-drop/edit/:quizId"
            element={<EditDragDrop />}
          />
        </Route>
        <Route exact path="/video/:videoId" element={<ProtectedRoute />}>
          <Route exact path="/video/:videoId" element={<Videos />} />
        </Route>
        <Route exact path="/video/edit/:videoId" element={<ProtectedRoute />}>
          <Route exact path="/video/edit/:videoId" element={<EditVideo />} />
        </Route>
        <Route exact path="/units" element={<ProtectedRoute />}>
          <Route path="/units" element={<UnitsPage />} />
        </Route>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<NotFoundPage />} />
        <Route exact path="/editprofile" element={<ProtectedRoute />}>
          <Route path="/editprofile" element={<EditProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
