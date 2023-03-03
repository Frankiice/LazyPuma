import { render } from "react-dom";
import React, { Component }  from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom';
import Navbar from "./componentes/navbar.component";
import SearchResults from "./componentes/searchresults.component";
import Homepage from "./componentes/homepage.component";
import Footer from "./componentes/footer.component";
import ExercisesList from "./componentes/exercises-list.component"
import Registo from "./componentes/registo.component";
import Login from "./componentes/login.component";
import Perfil from "./componentes/perfil";
function App() {
  return (
    <React.StrictMode>
    <Navbar/>

    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/exercise-list" element={<ExercisesList/>}/>
        <Route path="/registo" element={<Registo/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/perfil" element={<Perfil/>}/>
      </Routes>
    </Router>

    <Footer/>
    </React.StrictMode>
  );
}

export default App;
