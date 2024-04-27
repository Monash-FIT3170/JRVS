import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/home';
import Quizzes from './pages/Quiz/quizzes';
import Lessons from './pages/Lesson/lessons';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/*WHEN WE SETUP MONGODB, WE CAN ROUTE IT BETTER I THINK? */}
        <Route path = "/" element = {<Home/>}></Route>
        <Route path = "/quizzes" element = {<Quizzes/>}></Route>
        <Route path= "/lessons" element = {<Lessons/>}></Route>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
