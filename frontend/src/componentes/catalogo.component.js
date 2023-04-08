import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import "../scripts/scripts.js";
import { FaSearch } from "react-icons/fa"
import ScrollContainer from 'react-indiana-drag-scroll'


export default class Catalogo extends Component{
    constructor(props){
        super(props);
        this.state = {
            obj: [],
            categoriaA: window.localStorage.getItem("categoriaA") || "", 
            categoriaB: window.localStorage.getItem("categoriaB") || "",
            page: 1,
            novoHeader: [],
        };
        this.handleClick = this.handleClick.bind(this);
        window.localStorage.removeItem("userUpdated");

        
    }  
    componentDidMount(){
        const {categoriaA, categoriaB} = this.state;
        const base_url = "http://localhost:5000/catalogo" 
        const url = `${base_url}?&categoriaB=${categoriaB}&categoriaA=${categoriaA}`;
        console.log(url);
        fetch(url, { //provavelmente teremos de mudar as cenas
            method:"GET",
            crossDomain:true,
            headers:{
                "Content-type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "Catalogo");
            this.setState({obj: data.products,
                            novoHeader: data.novoHeader}) ;
        })
    }

    handleClick(e){
        const {categoriaB} = this.state;
        console.log(categoriaB);
        window.localStorage.setItem("categoriaB", categoriaB);
        window.location.href = "/catalogo";
    };


    render(){
    return (
    //<!-- Header -->
    <React.Fragment>
    <div class="scrollmenu">
    <header class="cor_header height_header">  
    
        <ScrollContainer class="btn-toolbar col-lg-12 justify-content-center scrollcontainer" id="buttons_header" role="toolbar">
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao2" title="bebé" value="Baby" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>bebé</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao3" title="desporto" value="Sports" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>desporto</button> 
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao4" title="animais" value="Animals" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>animais</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao5" title="beleza" value="Cosmetics" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>beleza</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao6" title="bricolagem" value="DIY" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>bricolagem</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao7" title="telemóveis e smartphones"value="Smartphones" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Telemóveis <br></br>e<br></br> Smartphones</button>
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao8" title="informatica"value="Tech" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>informática </button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao9" title="decoração"value="Decoration" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>decoração</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao10" title="jardinagem"value="Gardening" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>jardinagem</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao11" title="gaming"value="Gaming" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>gaming</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao12" title="TVs" value="TVs"onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>TVs</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao13" title="jogos e brinquedos"value="Toys" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>jogos <br></br>e<br></br>brinquedos</button>   
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao14" title="eletrodomesticos"value="Appliances" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>eletro-<br></br>-domésticos</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao15" title="fotografia"value="Photography" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>fotografia</button>  
            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao16" title="livros"value="Books" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>livros</button> 
        </ScrollContainer>
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
                        {/* {movies.map((movie) => ( */}
                        {this.state.obj.map((produto) => (
                            <div key={produto._id}>
                                <div class="col mb-5">
                                    <div class="card h-100 crop">
                                        <img class="card-img-top" src={produto.img} alt="..." />
                                        <div class="card-body p-4">
                                            <div class="text-center">
                                                <h5 class="fw-bolder">{produto.name}</h5>
                                                $40.00 - $80.00
                                            </div>
                                        </div>
                                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        ))}
                    </div>
                </div>
    </section>




    {/* <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">CATALOGO Product</h5>
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
      </section> */}
    </React.Fragment>
    );
  }
}


// export default Catalogo