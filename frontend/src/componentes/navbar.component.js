import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import "../scripts/scripts.js";
import { FaBootstrap } from "react-icons/fa";
import { FaSearch } from "react-icons/fa"
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

export default class Navbar extends Component{

  constructor(props){
    super(props);
    this.state = {
        loggedIn:  window.localStorage.getItem("loggedIn"),
        query: "",
        data: "",
        user: "",
    };
  }
    // const [query, setQuery] = useState('')
    // const [data, setData] = useState([])
    // const [user, setUser] = useState(null);

    // funcoes dummy --------------
    // async function login(user = null){
    //   setUser(user);
    // }

    // async function logout(){
    //   setUser(null);
    // }
    // -----------------------------


   sendSearchData = (query) => {
    const fetchUsers = () => {
      const res = axios.get(`http://localhost:5000/getProdutos?q=${query}`);
      this.setState({data: res.data});
    };
    fetchUsers();
  };
    // const sendSearchData = (query) => {
    //   const fetchUsers = () => {
    //     const res = axios.get(`http://localhost:5000/getProdutos?q=${query}`);
    //     setData(res.data);
    //   };
    //   fetchUsers();
    // };

    render(){
      return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-0 py-3 ">
      
      {/* Logo e imagem do navbar */}
      
      <div class="logo px-4">
        <a href="/"><img id="imglogo" src="https://cdn.discordapp.com/attachments/821485480898068498/1079086052435828777/lazypumatr.png"></img>
        <img id="imgNome" src="https://cdn.discordapp.com/attachments/811930446765097000/1079804170586030100/Untitled.png"></img></a>
      </div>
      <div class="collapse navbar-collapse px-3" id="navbarSupportedContent">
        <ul class="navbar-nav px-3">
          {/* <li class="nav-item active">
            <a class="nav-link" href="/exercise-list">Test1 <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/">Test2<span class="sr-only">(current)</span></a>
          </li> */}
          <li class="nav-item">
            <button id="produtosbtn" class="btn btn-outline-light p-2 px-3 col-md-12" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="offcanvasScrolling">
            
              Produtos
            </button>
          </li>
        </ul>
        <div className="input-group px-3" id="searchbar">/                                                                   {/* onChange={e => {setQuery(e.target.value)}} placeholder='Search'/> <a href="/results" onClick={() => sendSearchData(query)}*/}
            <div className="form-group has-search">                                                                           
              <div class="input-field border-0"> <input id="form1Search" className="text-white form-control inputSearch bg-dark" onChange={e => {this.setState({query: e.target.value} )}} placeholder='Search'/> <a href="/results" onClick={() => this.sendSearchData(this.state.query)} id="form1Botao iconbotao"><span class="fa fa-search text-white form-control-feedback"></span></a> </div>
            </div>
        </div>
      </div>
      <form class="d-flex px-3">
        <button class="btn btn-outline-light col-md-12" type="submit">
            <i class="bi-cart-fill me-1"></i>
            Cesto
            <span class="badge bg-dark text-white ms-1 rounded-pill">0</span>
        </button>
      </form>
      <ul class="navbar-nav mr-auto">
        {/* <a class="nav-link" href="/login"><i class="bi bi-person-circle"></i> Login/Registo <span class="sr-only">(current)</span></a> */}
        {this.state.loggedIn ? <li class="nav-item active px-2">
          <a  href="/user/login">
            <button class="btn btn-outline-light col-md-12" id="botaoLogin">
              <i class="bi bi-person-circle"></i> Olá {}
            </button>
          </a>
        </li> :
        <li class="nav-item active px-2">
          <a  href="/user/login">
            <button class="btn btn-outline-light col-md-12" id="botaoLogin">
              <i class="bi bi-person-circle"></i> Login/Registo
            </button>
          </a>
        </li>}
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
}

// export default Navbar