import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import "../scripts/scripts.js";
import { FaSearch } from "react-icons/fa"



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

export default class PerfilC extends Component{
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
    componentDidMount(){
        fetch("http://localhost:5000/catalogo", { //provavelmente teremos de mudar as cenas
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                token: window.localStorage.getItem("token"),
                categoria: window.localStorage.getItem("categoria")
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "Catalogo");
            this.setState({categoria: data.data}) //retificar depois
        })
    }

    handleClick(e){
        //const {bebe,desporto, animais,beleza,bricolagem,telemoveis,decoracao,jardinagem,gaming,TVs,brinquedos,eletrodomesticos,fotografia,livros} = this.state;
        //console.log(bebe,desporto, animais,beleza,bricolagem,telemoveis,decoracao,jardinagem,gaming,TVs,brinquedos,eletrodomesticos,fotografia,livros);
        const {categoria} = this.state;
        console.log(categoria);
        fetch("http://localhost:5000/catalogo",{//mudar URL !
            method:"POST", //verificar!!!!!
            crossDomain:true,
            headers:{
                "Content-type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                token: window.localStorage.getItem("token"),
                categoria,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userUpdate");
            if(data.status=="ok") {
                window.location.href = "/catalogo";
        }
        })
    };
    render(){
    return (
    //<!-- Header -->
    <React.Fragment>
    <div class="scrollmenu">
    <header class="cor_header height_header">  
    
        <div class="btn-toolbar col-lg-12 justify-content-center " id="buttons_header"role="toolbar" >
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao2" title="bebé">bebé</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao3" title="desporto">desporto</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao4" title="animais">animais</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao5" title="beleza">beleza</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao6" title="bricolagem">bricolagem</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao7" title="telemóveis e smartphones">Telemóveis <br></br>e<br></br> Smartphones</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao8" title="decoração">decoração</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao9" title="jardinagem">jardinagem</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao10" title="gaming">gaming</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao11" title="TVs">TVs</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao12" title="jogos e brinquedos">jogos <br></br>e<br></br>brinquedos</button>   
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao13" title="eletrodomesticos">eletro-<br></br>-domésticos</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao14" title="fotografia">fotografia</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle" id="butao15" title="livros">livros</button>  
        
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
        <div class="offcanvas-body">
            <nav class="navbar navbar-light bg-light" id="offcanvasItems">
                <div class="container-fluid">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Clickable Item</a>
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


// export default Catalogo