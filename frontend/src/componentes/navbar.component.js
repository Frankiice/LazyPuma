import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import "../styles/styles.css";
import { FarBootstrap } from "react-icons/fa";
import {useState, useEffect} from 'react';
import axios from 'axios';
import ExercisesList from './exercises-list.component';
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
    const [user, setUser] = useState(null);

    // funcoes dummy --------------
    async function login(user = null){
      setUser(user);
    }

    async function logout(){
      setUser(null);
    }
    // -----------------------------


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

      // NAV ANTIGA
      // <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-height">
      //   <a href="/" className="navbar-brand logo">Lazy Puma</a>
      //   <div className="collpase navbar-collapse">

      //   {/* Componentes da navbar */}
      //   <ul className="navbar-nav mr-auto">
      //     <li className="navbar-item">
      //     <a href="/teste1" className="nav-link">Teste1</a>
      //     </li>
      //     <li className="navbar-item">
      //     <a href="/teste2" className="nav-link">Teste2</a>
      //     </li>
      //     <li className="navbar-item">
      //     <a href="/teste3" className="nav-link">Teste3</a>
      //     </li>
      //   </ul>
      //     <div className="input-group center">
      //       <div className="form-outline">
      //         <input type="search" id="form1Search" className="form-control inputSearch" onChange={e => {setQuery(e.target.value)}} placeholder='Search'/>
      //       </div>
      //       <a href="/results" onClick={() => sendSearchData(query)} id="form1Botao iconbotao" className="btn btn-primary"><FaSearch id="iconbotao" /></a>
      //     </div>
      //   </div>
      // </nav>

    //NAV NOVA
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-0 py-3">
      <div class="logo px-4">
        <a href="/"><img id="imglogo" src="https://cdn.discordapp.com/attachments/821485480898068498/1079086052435828777/lazypumatr.png"></img>
        <img id="imgNome" src="https://cdn.discordapp.com/attachments/811930446765097000/1079804170586030100/Untitled.png"></img></a>
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse px-4" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          {/* <li class="nav-item active">
            <a class="nav-link" href="/exercise-list">Test1 <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">Test2<span class="sr-only">(current)</span></a>
          </li> */}
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
        <div className="input-group px-5">
            <div className="form-group has-search">
              <div class="input-field border-0"> <input id="form1Search" className="text-white form-control inputSearch bg-dark" onChange={e => {setQuery(e.target.value)}} placeholder='Search'/> <a href="/results" onClick={() => sendSearchData(query)} id="form1Botao iconbotao"><span class="fa fa-search text-white form-control-feedback"></span></a> </div>
            </div>
        </div>
      </div>
      <form class="d-flex px-3">
        <button class="btn btn-outline-light col-md-12" type="submit">
            <i class="bi-cart-fill me-1"></i>
            Cart
            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
        </button>
      </form>
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
        <a class="nav-link" href="/login"><i class="bi bi-person-circle"></i> Login/Registo <span class="sr-only">(current)</span></a>
        </li>
      </ul>
      {/* Login e signup buttons + informaçao sobre user logado */}

      {/* Codigo para ver se user esta ou nao logado   */}
      {/* {user ? ( // if there is a user (se for true) a primeira coisa acontece se for false acontece a segunda (depois de :)
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ) : (
              <Link to={"/login"} className="nav-link">
                Login/Registo
              </Link>
            )} */}
    </nav>
    );
  }



export default Navbar