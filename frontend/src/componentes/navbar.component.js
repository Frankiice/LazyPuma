import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "./componentescss.css";
import { FaSearch } from "react-icons/fa"
import {useState, useEffect} from 'react';
import axios from 'axios';

// const navigate = useNavigate();
// const handleOnClickResults = useCallback(() => navigate('/results', {replace: true}), [navigate]);

// import ExercisesList from "./componentes/exercises-list.component";
// import EditExercise from "./componentes/edit-exercise.component";
// import CreateExercise from "./componentes/create-exercise.component";
// import CreateUser from "./componentes/create-user.component";
//import searchResults from './componentes/searchresults.component';

// const ProdutosResposta = [{primeiroNome: "Bananas", quantidade:"30", tipo: "Madeira"}]

// state = {
//   pesquisa: ""
// };

// pesquisaInput = event => {
//   this.setState({ pesquisa: event.target.value });
// };

// Click = () => {
//   console.log(this.state.pesquisa);
// };

// const [searchTerm, setSearchTerm] = useState('')

function Navbar(){
    const [query, setQuery] = useState('')
    const [data, setData] = useState([])

    const sendSearchData = (query) => {
      const fetchUsers = () => {
        const res = axios.get(`http://localhost:5000/getProdutos?q=${query}`);
        setData(res.data);
      };
      fetchUsers();
    };

    return (
      // <head>
      //   <link rel="stylesheet" href="path/to/font-awesome/css/font-awesome.min.css"></link>
      // </head>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-height">
        <a href="/" className="navbar-brand logo">Lazy Puma</a>
        <div className="collpase navbar-collapse">

        {/* Componentes da navbar */}
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <a href="/teste1" className="nav-link">Teste1</a>
          </li>
          <li className="navbar-item">
          <a href="/teste2" className="nav-link">Teste2</a>
          </li>
          <li className="navbar-item">
          <a href="/teste3" className="nav-link">Teste3</a>
          </li>
        </ul>

        {/* dropdown */}
        {/* <li className="navbar-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
        </li> */}
          <div className="input-group center">
            <div className="form-outline">
              <input type="search" id="form1Search" className="form-control inputSearch" onChange={e => {setQuery(e.target.value)}} placeholder='Search'/>
            </div>
            <a href="/results" onClick={() => sendSearchData(query)} id="form1Botao iconbotao" className="btn btn-primary"><FaSearch id="iconbotao" /></a>
          </div>
        </div>
      </nav>
    );
  }



export default Navbar