import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import "../scripts/scripts.js";
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom";


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
        
    }    
    handleClick(e){
        e.preventDefault();
        //const {bebe,desporto, animais,beleza,bricolagem,telemoveis,decoracao,jardinagem,gaming,TVs,brinquedos,eletrodomesticos,fotografia,livros} = this.state;
        //console.log(bebe,desporto, animais,beleza,bricolagem,telemoveis,decoracao,jardinagem,gaming,TVs,brinquedos,eletrodomesticos,fotografia,livros);
        const {categoria} = this.state;
        console.log(categoria);
        // fetch("http://localhost:5000/user/update",{//mudar URL !
        //     method:"PUT", //verificar!!!!!
        //     crossDomain:true,
        //     headers:{
        //         "Content-type":"application/json",
        //         Accept:"application/json",
        //         "Access-Control-Allow-Origin":"*",
        //     },
        //     body:JSON.stringify({
        //         token: window.localStorage.getItem("token"),
        //         categoria,
        //         // bebe,
        //         // desporto, 
        //         // animais,
        //         // beleza,
        //         // bricolagem,
        //         // telemoveis,
        //         // decoracao,
        //         // jardinagem,
        //         // gaming,
        //         // TVs,
        //         // brinquedos,
        //         // eletrodomesticos,
        //         // fotografia,
        //         // livros,
        //     }),
        // })
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log(data, "userUpdate");
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
    
        <div class="btn-toolbar col-lg-12 justify-content-center " id="buttons_header"role="toolbar" >
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao2" title="bebé" value="bebe" onClick={(e => this.setState({categoria:e.target.value })(this.handleClick)(this.handleClick.bind(this)))}>bebé</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao3" title="desporto" onClick={(e => this.setState({ categoria:"desporto" }))}>desporto</button> 
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao4" title="animais" onClick={(e => this.setState({ categoria:"animais" }))}>animais</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao5" title="beleza" onClick={(e => this.setState({ categoria:"beleza" }))}>beleza</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao6" title="bricolagem" onClick={(e => this.setState({ categoria:"bricolagem" }))}>bricolagem</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao7" title="telemóveis e smartphones" onClick={(e => this.setState({ categoria:"telemoveis" }))}>Telemóveis <br></br>e<br></br> Smartphones</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao8" title="decoração" onClick={(e => this.setState({  categoria:"decoracao" }))}>decoração</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao9" title="jardinagem" onClick={(e => this.setState({  categoria:"jardinagem" }))}>jardinagem</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao10" title="gaming" onClick={(e => this.setState({  categoria:"gaming" }))}>gaming</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao11" title="TVs" onClick={(e => this.setState({  categoria:"TVs" }))}>TVs</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao12" title="jogos e brinquedos" onClick={(e => this.setState({  categoria:"brinquedos" }))}>jogos <br></br>e<br></br>brinquedos</button>   
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao13" title="eletrodomesticos" onClick={(e => this.setState({  categoria:"eletrodomesticos" }))}>eletro-<br></br>-domésticos</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao14" title="fotografia" onClick={(e => this.setState({  categoria:"fotografia" }))}>fotografia</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao15" title="livros" onClick={(e => this.setState({  categoria:"livros" }))}>livros</button>  
        
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
    <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Produtos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body sidebar">
            <nav class="navbar navbar-light bg-light" id="offcanvasItems">
                <div class="container-fluid">
                    <ul class="navbar-nav">
                    <div class="dropdown">
                         <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                           Bebé
                         </button>
                         <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                           <li><a class="dropdown-item active" href="#">Action</a></li>
                           <li><a class="dropdown-item" href="#">Another action</a></li>
                           <li><a class="dropdown-item" href="#">Something else here</a></li>
                          
                           <li><a class="dropdown-item" href="#">Separated link</a></li>
                         </ul>
                        </div>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Desporto</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Animais</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Beleza</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Bricolagem</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Telemóveis e Smartphones</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Decoração</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Jardinagem</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Animais</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Gaming</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">TVs</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Jogos e Brinquedos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Eletrodomésticos</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Fotografia</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Livros</a>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
    </div>
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