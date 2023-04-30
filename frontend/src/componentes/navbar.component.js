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
import 'bootstrap';

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
        data: "",
        user: "",
        nickname: "",
        obj: [],
        categoriaA: window.localStorage.getItem("categoriaA") || "", 
        categoriaB: window.localStorage.getItem("categoriaB") || "",
        page: 1,
        search: "",
        isCartHovered: false,
        carrinho: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCartHover = this.handleCartHover.bind(this);
    this.handleCartLeave = this.handleCartLeave.bind(this);
  }

  componentDidMount() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    console.log(carrinho);
    this.setState({ carrinho });
  }

  handleCartHover() {
    this.setState({ isCartHovered: true });
  }

  handleCartLeave() {
    this.setState({ isCartHovered: false });
  }

  handleSearch(){
    const {page, categoriaA, categoriaB, search, objSearch} = this.state;
    try {
      const base_url = "http://localhost:5000/produto/search" //este é a base nao sei se aceita do outro lado mais parametros aqui
      const url = `${base_url}?page=${page}&categoriaA=${categoriaA}&categoriaB=${categoriaB}&search=${search}`;
      console.log(url);
      fetch( url, {
        method:"GET",
        crossDomain:true,
        headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
        // body:JSON.stringify({
        //     token: window.localStorage.getItem("token"), //se daquela forma nao funcionar manda-se aqui os campos
        //     // filterCategoria,
        //     // page,
        //     // search,
        // }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data, "searchData");
        // this.setState({ objSearch: data.products}); //o que adicionar aqui??
        window.localStorage.setItem("objSearch", JSON.stringify(data.products))
        window.location.href= "./catalogo"
    })
    }catch(err){
      console.log(err);
    }
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


  //  sendSearchData = (query) => {
  //   const fetchUsers = () => {
  //     const res = axios.get(`http://localhost:5000/getProdutos?q=${query}`);
  //     this.setState({data: res.data});
  //   };
  //   fetchUsers();
  // };

  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login"
  }
  
  componentDidMount(){


    fetch("http://localhost:5000/user/userData", { //provavelmente teremos de mudar as cenas
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
            token: window.localStorage.getItem("token"),
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data, "userData");
        this.setState({ nickname: data.data.nickname,});
    })
}
  handlePre(){
    window.localStorage.removeItem("categoriaB");
    window.localStorage.removeItem("categoriaA");
    window.localStorage.removeItem("brand");
    window.localStorage.removeItem("produtoID");


}
    // const sendSearchData = (query) => {
    //   const fetchUsers = () => {
    //     const res = axios.get(`http://localhost:5000/getProdutos?q=${query}`);
    //     setData(res.data);
    //   };
    //   fetchUsers();
    // };

    render(){
      const { isCartHovered } = this.state;
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      
      return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-0 py-3 ">
      
      {/* Logo e imagem do navbar */}
      
      <div class="logo px-4">
        <a onClick={this.handlePre} href="/"><img id="imglogo" src="https://cdn.discordapp.com/attachments/821485480898068498/1079086052435828777/lazypumatr.png"></img>
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
              <div class="input-field border-0"> <input id="form1Search" className="text-white form-control inputSearch bg-dark" onChange={e => {this.setState({search: e.target.value} )}} placeholder='Search'/> <a onClick={() => this.handleSearch()} id="form1Botao iconbotao"><span class="fa fa-search text-white form-control-feedback"></span></a> </div>
            </div>
        </div>
      </div>
     
      <ul class="navbar-nav mr-auto">
        {/* <a class="nav-link" href="/login"><i class="bi bi-person-circle"></i> Login/Registo <span class="sr-only">(current)</span></a> */}
        {this.state.loggedIn ? 
        // <li class="nav-item active px-2">
        //   <div class="dropdown">
        //     <button class="btn btn-outline-light col-md-12" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        //       <i class="bi bi-person-circle"></i> Olá, 
        //     </button>
        //     <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        //       <a class="dropdown-item" href="#">Action</a>
        //     </div>
        //   </div>
        // </li> 
        <li class="nav-item dropdown active px-2">
          <button class="btn btn-outline-light col-md-12" id="perfilDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="bi bi-person-circle"></i> Olá {this.state.nickname}
          </button>
          <ul class="dropdown-menu botaoPerfilDropdown" aria-labelledby="perfilDropdown">
              <li><a class="dropdown-item" href="/user/c">Perfil</a></li>
              <li><hr class="dropdown-divider"></hr></li>
              <li><a class="dropdown-item" href="#">Histórico</a></li>
              <li><hr class="dropdown-divider"></hr></li>
              <li><a class="dropdown-item" onClick={this.logOut} href="./login">Log out</a></li>
          </ul>
        </li>:
        <li class="nav-item active px-2">
          <a href="/user/login">
            <button class="btn btn-outline-light col-md-12" id="botaoLogin">
              <i class="bi bi-person-circle"></i> Login/Registo
            </button>
          </a>
        </li>}
      </ul>
       <form class="d-flex px-3 nav-item " >
       <button
                className="btn btn-outline-light col-md-12 dropdown-hover"
                id="cartDropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onMouseEnter={this.handleCartHover}
                
                
              >
            <i className="bi-cart-fill me-1"></i>
            Cart
            <span className="badge bg-dark text-white ms-1 rounded-pill">0</span>
        </button>
        <div
                className={`dropdown-menu p-4 text-dark botaoCart ${isCartHovered ? 'show' : ''}`}
                aria-labelledby="cartDropdown"
                onMouseLeave={this.handleCartLeave}
                
                
                
              >
               
            <h3 class="text-dark font-weight-bold ">Shopping Cart</h3>
             
            <p class="text-dark">
            
            </p>
            <div class="carrinhoWrapper pb-3" >

              <div class="items-carrinho">
              
              <div>
              {carrinho.length === 0 ? (
                <div class="carrinho-vazio">
                <h3 class= "text-dark ">The cart is empty! :(</h3>
                </div>
              ) : (
                carrinho.map(item => (
                  <div class="carrinho-item" key={item.nome}>
                    <img class="" src={item.img} />
                    <div class="detalhes text-dark ">
                    <h5 class= "text-dark ">{item.nome}</h5>
                    <p class= "text-dark ">
                      <span class= " pt-5 text-dark ">{item.preco}$</span>
                      <br></br>
                      <p class="text-secondary float-right">Quantity: {item.quantidade}</p>
                    </p>
                  </div>
                  <div class="cancel">
                  <i class="bi bi-x-square-fill"></i>
                  </div>
                  </div>
                ))
              )}
            </div>

               
                
                </div>
              

              
            </div>
            <p class="d-none">espaco</p>
            <p class="text-end text-dark" id="total">Total: $</p>
              <button class="btn-checkout btn btn-outline-light btn-dark col-md-12 mb-1" id="checkout">Checkout</button>
              <button class="btn btn-outline-dark  col-md-12 " id="carrinho">View Cart</button>


              
          </div>
          <div class="overlay"></div>
      </form>
      


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