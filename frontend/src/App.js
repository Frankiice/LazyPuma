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
import Perfil from "./componentes/perfil.component";
function App() {

  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (

    
    <React.StrictMode>
    <Navbar/>

    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/results" element={<SearchResults />} />
        <Route path="/exercise-list" element={<ExercisesList/>}/>
        <Route path="/user/registar" element={<Registo/>}/>
        <Route path="/user/login" element={<Login/>}/>
        <Route path="/user" element={<Perfil/>}/>
      </Routes>
    </Router>

    <Footer/>
    </React.StrictMode>
  );
}

export default App;
