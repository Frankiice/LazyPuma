import { render } from "react-dom";
import React, { Component }  from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router, 
  Routes, 
  Route
} from 'react-router-dom';
// import {
//   BrowserRouter,
//   Routes,
//   Route
// } from "react-router-dom";
import Navbar from "./componentes/navbar.component";
// import ExercisesList from "./componentes/exercises-list.component";
// import EditExercise from "./componentes/edit-exercise.component";
import SearchResults from "./componentes/searchresults.component";
import Home from "./componentes/homepage.component";

function App() {
  return (
    <React.StrictMode>
    <Navbar/>

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<SearchResults />} />
      </Routes>
    </Router>
    </React.StrictMode>
  );
}

export default App;
