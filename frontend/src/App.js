import { render } from "react-dom";
import React, { Component }  from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router, 
  Routes,
  Route
} from 'react-router-dom';
import Navbar from "./componentes/navbar.component";
import Homepage from "./componentes/homepage.component";
import Footer from "./componentes/footer.component";
import Registo from "./componentes/registo.component";
import Login from "./componentes/login.component";
import PerfilC from "./componentes/perfilC.component";
import PerfilF from "./componentes/perfilF.component";
import Catalogo from "./componentes/catalogo.component";
import Produto from "./componentes/produto.component";
import Encomenda from "./componentes/encomenda.component";
import Cart from "./componentes/cart.component";
import Up from "./componentes/up.component";
import Fup from "./componentes/fUp.component";
import Fveiculo from "./componentes/fVeiculo.component";
import Fproduto from "./componentes/fProduto.component";
import Frecords from "./componentes/frecord1.component";
import Crecords from "./componentes/crecord1.component";
import Arecords from "./componentes/arecord.component";
import Admin from "./componentes/admin.component";
import FaAllUp from "./componentes/fAllUp.component";
import EncomendasC from "./componentes/cEncomenda.component";
import EncomendasF from "./componentes/fEncomenda.component";


function App() {
  // const isLoggedIn = window.localStorage.setItem("loggedIn", false);
  // const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (

    
    <React.StrictMode>
    <Navbar/>

    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user/registar" element={<Registo/>}/>
        <Route path="/user/login" element={<Login/>}/>
        <Route path="/user/c" element={<PerfilC/>}/>
        <Route path="/user/f" element={<PerfilF/>}/>
        <Route path="/catalogo" element={<Catalogo/>}/>
        <Route path="/produto" element={<Produto/>}/>
        <Route path="/user/encomenda" element={<Encomenda/>}/>
        <Route path ="/cart" element={<Cart/>}/>
        <Route path ="/user/f/up" element={<Up/>}/>
        <Route path ="/user/f/up/edit" element={<Fup/>}/>
        <Route path ="/user/f/veiculo" element={<Fveiculo/>}/>
        <Route path ="/user/f/produto" element={<Fproduto/>}/>
        <Route path ="/user/c/records" element={<Crecords/>}/>
        <Route path ="/user/f/records" element={<Frecords/>}/>
        <Route path ="/user/admin/records" element={<Arecords/>}/>
        <Route path ="/user/admin" element={<Admin/>}/>
        <Route path ="/user/f/allup" element={<FaAllUp/>}/>
        <Route path ="/user/c/orders" element={<EncomendasC/>}/>
        <Route path ="/user/f/orderHistory" element={<EncomendasF/>}/>









      </Routes>
    </Router>

    <Footer/>
    </React.StrictMode>
  );
}

export default App;
