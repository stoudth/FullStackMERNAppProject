import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditExercisePage from './pages/EditExercisePage';
import CreateExercisePage from './pages/CreateExercisePage';
import { useState } from 'react'
import Navigation from './components/Navigation';

function App() {

  const [exerciseToEdit, setExerciseToEdit] = useState();

  return (
    <div className="App">
      <Router>
        <div className="App-layout">
          <header id="header">
            <Navigation/>
            <h1>Exercise Tracker</h1>
            <p id="description">Full Stack Mern App Demonstration</p>
          </header>
          <Routes>
              <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}/>
              <Route path="/create-exercise" element={<CreateExercisePage />}/>
              <Route path="/edit-exercise" element={ <EditExercisePage exerciseToEdit={exerciseToEdit}/>}/>
          </Routes>
          </div>
          <footer id="footer">
            <div id="copyright">
              © Hailey Stoudt
            </div>
          </footer>
      </Router>
    </div>
  );
}

export default App;