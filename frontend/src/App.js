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
import PerfilC from "./componentes/perfilC.component";
import PerfilF from "./componentes/perfilF.component";
import Catalogo from "./componentes/catalogo.component";
import Produto from "./componentes/produto.component";
import Encomenda from "./componentes/encomenda.component";
import Cart from "./componentes/cart.component";
import Up from "./componentes/up.component";
import Fveiculo from "./componentes/fVeiculo.component";



function App() {
  // const isLoggedIn = window.localStorage.setItem("loggedIn", false);
  // const isLoggedIn = window.localStorage.getItem("loggedIn");
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
        <Route path="/user/c" element={<PerfilC/>}/>
        <Route path="/user/f" element={<PerfilF/>}/>
        <Route path="/catalogo" element={<Catalogo/>}/>
        <Route path="/produto" element={<Produto/>}/>
        <Route path="/user/encomenda" element={<Encomenda/>}/>
        <Route path ="/cart" element={<Cart/>}/>
        <Route path ="/user/f/up" element={<Up/>}/>
        <Route path ="/user/f/veiculo" element={<Fveiculo/>}/>





      </Routes>
    </Router>

    <Footer/>
    </React.StrictMode>
  );
}

export default App;
