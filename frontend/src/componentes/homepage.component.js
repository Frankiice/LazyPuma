import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import 'bootstrap';
import {Helmet} from "react-helmet";


// import ExercisesList from "./componentes/exercises-list.component";
// import EditExercise from "./componentes/edit-exercise.component";
// import CreateExercise from "./componentes/create-exercise.component";
// import CreateUser from "./componentes/create-user.component";


const ProdutosResposta = [{primeiroNome: "Bananas", quantidade:"30", tipo: "Madeira"}]

// state = {
//   pesquisa: ""
// };

// pesquisaInput = event => {
//   this.setState({ pesquisa: event.target.value });
// };

// Click = () => {
//   console.log(this.state.pesquisa);
// };
//const navigate = useNavigate();
export default class Homepage extends Component{
    constructor(props){
        super(props);
        this.state = {
            categoria: "",
            // bebe: "",
            // desporto: "", 
            // animais: "",
            // beleza: "",
            // bricolagem: "",
            // telemoveis: "",
            // decoracao: "",
            // jardinagem: "",
            // gaming: "",
            // TVs: "",
            // brinquedos: "",
            // eletrodomesticos: "",
            // fotografia: "",
            // livros: "",
        };
        this.handleClick = this.handleClick.bind(this);
        window.localStorage.removeItem("userUpdated");
        
    }


    handleClick(e){
        //const {bebe,desporto, animais,beleza,bricolagem,telemoveis,decoracao,jardinagem,gaming,TVs,brinquedos,eletrodomesticos,fotografia,livros} = this.state;
        //console.log(bebe,desporto, animais,beleza,bricolagem,telemoveis,decoracao,jardinagem,gaming,TVs,brinquedos,eletrodomesticos,fotografia,livros);
        const {categoria} = this.state;
        console.log(categoria);
        window.localStorage.setItem("categoria", categoria);
        window.location.href = "/";
        // fetch("http://localhost:5000/catalogo",{//mudar URL !
        //     method:"POST", //verificar!!!!!
        //     crossDomain:true,
        //     headers:{
        //         "Content-type":"application/json",
        //         Accept:"application/json",
        //         "Access-Control-Allow-Origin":"*",
        //     },
        //     body:JSON.stringify({
        //         token: window.localStorage.getItem("token"),
        //         categoria,
        //     }),
        // })
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log(data, "userCatalogo");
        //     if(data.status=="ok") {
        //         window.location.href = "/catalogo";
        // }
        // })
    };
    
    render(){
        
    
    return (
    //<!-- Header -->
    <React.Fragment>
    <div class="scrollmenu">
        <header class="cor_header height_header">
            <div class="btn-toolbar col-lg-12 justify-content-center scrollcontainer" id="buttons_header"role="toolbar" >      {/*onClick{() => this.setState({ count: 1})}*/}
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao2" title="bebé" value="bebe" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>bebé</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao3" title="desporto" value="desporto" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>desporto</button> 
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao4" title="animais" value="animais" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>animais</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao5" title="beleza" value="beleza" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>beleza</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao6" title="bricolagem" value="bricolagem" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>bricolagem</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao7" title="telemóveis e smartphones"value="telemoveis" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>Telemóveis <br></br>e<br></br> Smartphones</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao8" title="decoração"value="decoracao" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>decoração</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao9" title="jardinagem"value="jardinagem" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>jardinagem</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao10" title="gaming"value="gaming" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>gaming</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao11" title="TVs" value="TVs"onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>TVs</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao12" title="jogos e brinquedos"value="brinquedos" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>jogos <br></br>e<br></br>brinquedos</button>   
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao13" title="eletrodomesticos"value="eletrodomesticos" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>eletro-<br></br>-domésticos</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao14" title="fotografia"value="fotografia" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>fotografia</button>  
                <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao15" title="livros"value="livros" onClick={(e) => {this.setState({ categoria: e.target.value }, this.handleClick)}}>livros</button>
            </div>
        </header>
    </div>

    {/* <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="1" id="sidebar" aria-labelledby="produtos">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p>Try scrolling the rest of the page to see this option in action.</p>
        </div>
    </div> */}
    {/* <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="myOffcanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="myOffcanvasLabel">Offcanvas</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            swag
        </div>
    </div> */}



    
    <div class="offcanvas offcanvas-left" data-bs-scroll="true" tabindex="-1" id="sidebar">
        <div class="offcanvas-header navbar-dark bg-dark">
                <h5 class="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">Produtos</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body sidebar">
            <nav class="navbar navbar-light bg-light" id="offcanvasItems">
                <div class="container-fluid mt-2">
                    <ul class="navbar-nav produtosSidebar">
                    {/* <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" data-bs-target="#bebe" aria-expanded="false">
                        Bebé
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark" id="bebe" aria-labelledby="dropdownMenuButton2">
                            <li><a class="dropdown-item active" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            
                            <li><a class="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div> */}
                        <li class="nav-item dropdown ">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="bebe" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Bebé
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="bebe">
                                <li><a class="dropdown-item" href="#">Passeio e Viagem</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Higiene e Fraldas</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Proteção e Saúde</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Mobiliário e Decoração</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Alimentação</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Brinquedos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="desporto" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Desporto, Outdoor e Viagem
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="desporto">
                                <li><a class="dropdown-item" href="#">Desportos Outdoor</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Desportos Coletivos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Equipamento de Cardio e Fitness</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Desportos Aquáticos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Desportos Neve</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Roupa Desportiva</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Tecnologia Desportiva</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Nutrição e Suplementos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Pesca</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Caça</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Campismo</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Viagem</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="animais" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Animais de Estimação
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="animais">
                                <li><a class="dropdown-item" href="#">Gatos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Cães</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Peixes</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Tartarugas e Répteis</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Pássaros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Coelhos e Roedores</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Animais de Quinta</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                            
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="beleza" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Beleza e Saúde
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="beleza">
                                <li><a class="dropdown-item" href="#">Máquinas de Depilação</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Perfumes</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Cabelo</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Corpo</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Rosto</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Maquilhagem</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Higiene Oral</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Saúde e Bem Estar</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="bricolagem" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Bricolagem 
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="bricolagem">
                                <li><a class="dropdown-item" href="#">Ferramentas de Bricolagem</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Tintas, Colas e semelhantes</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Segurança e Proteção</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Construção</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Ferrragens</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="telemoveis" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Telemóveis e Smartwatches
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="telemoveis">
                                <li><a class="dropdown-item" href="#">Telemóveis e Smartphones</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Acessórios de Telemóvel</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Smartwatches</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Telefones Fixos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Acessórios de Som</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Telefones Fixos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="decoracao" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Decoração
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="decoracao">
                                <li><a class="dropdown-item" href="#">Sala</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Sala de Jantar</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Quarto</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Cozinha</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Casa de Banho</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Iluminação</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Têxteis</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="jardinagem" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Jardinagem
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="Jardinagem">
                                <li><a class="dropdown-item" href="#">Plantas Naturais</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Sementes e Bolbos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Adubos, Fertilizantes e Substratos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Inseticida</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Vasos e floreiras</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Ferramentas</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Estufas e Coberturas</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="gaming" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Gaming
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="gaming">
                                <li><a class="dropdown-item" href="#">Consolas</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Jogos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Gaming PC</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Acessórios Gaming</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="televisoes" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                TVs e Som
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="TVS">
                                <li><a class="dropdown-item" href="#">Televisões</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">SoundBars</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Projetores de imagem</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Acessórios de TV</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Auriculares</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="brinquedos" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Jogos e Brinquedos
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="brinquedos">
                                <li><a class="dropdown-item" href="#">Jogos, Puzzles e Cartas</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Legos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Funko Pop e Merchandising</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Brinquedos de Bebé</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="eletrodomesticos" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Eletrodomésticos
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="eletrodomesticos">
                                <li><a class="dropdown-item" href="#">Frigoríficos e Arcas</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Máquinas de Roupa</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Máquinas de Loiça</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Fornos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Fogões</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Micro-ondas</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Máquinas de Café</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Preparação de Alimentos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Aspiradores e Máquinas de Limpeza</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Ar condicionado</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="fotografia" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Fotografia</a>
                                <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="fotografia">
                                <li><a class="dropdown-item" href="#">Máquinas Fotográficas</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Drones</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Vídeo</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Objetivas</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Acessórios de Fotografia</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                            </ul>
                        </li>
                        <hr class="linhaSeparacaoProdutos"></hr>
                        <li class="nav-item">
                            <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="livros" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Livros
                            </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="livros">
                                <li><a class="dropdown-item" href="#">Romance</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Literatura infantil e juvenil</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Autoajuda</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Manga</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Livros técnicos</a></li>
                                <li><hr class="dropdown-divider"></hr></li>
                                <li><a class="dropdown-item" href="#">Outros</a></li>
                                <li><hr class="dropdown-divider"></hr></li>

                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
    {/* <ul class="dropdown-menu" aria-labelledby="cartDropdown">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
    </ul> */}
    
    <script src="../scripts/sliderProdutos.js"></script>
    {/* //<!-- Section --> */}
    <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="/produto">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </React.Fragment>
    );
  }
}

//export default Homepage