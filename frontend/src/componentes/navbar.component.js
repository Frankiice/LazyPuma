import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Notification from './Notification.component';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import "../scripts/scripts.js";
import { FaBootstrap } from "react-icons/fa";
import { FaSearch } from "react-icons/fa"
import {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap';


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
        brand: window.localStorage.getItem("brand") || "",
        page: 1,
        search: window.localStorage.getItem("search") || "",
        isCartHovered: false,
        carrinho: [],
        type: "",
        encomendas: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCartHover = this.handleCartHover.bind(this);
    this.handleCartLeave = this.handleCartLeave.bind(this);
  }
  removerProduto = (index) => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    this.setState({ carrinho });
    window.location.reload();

  };
  
  atualizarQuantidade = (index, acao) => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  
    if (acao === "incrementar") {
      carrinho[index].quantidade++;
      carrinho[index].preco = carrinho[index].preco_original * carrinho[index].quantidade;
    } else if (acao === "decrementar") {
      if (carrinho[index].quantidade > 1) {
        carrinho[index].quantidade--;
        carrinho[index].preco = carrinho[index].preco_original * carrinho[index].quantidade;
      }
    }
  
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    this.setState({ carrinho: carrinho });
  };
  
  
  



  
  componentDidMount() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const total = this.calcularTotal(carrinho);
    console.log(carrinho);
    console.log('Total: $', total);
    this.setState({ carrinho });
  }



  calcularTotal(carrinho) {
    let total = 0;
    carrinho.forEach(function(item) {
      total += item.preco_original * item.quantidade;
    });
    return total;
  }


  handleButtonClick() {
    window.location.href = '/cart';
  }

  handleCartHover() {
    this.setState({ isCartHovered: true });
  }

  handleCartLeave() {
    this.setState({ isCartHovered: false });
  }

  countTotalProducts() {
    let localStorageObj = JSON.parse(localStorage.getItem('carrinho'));

    let count = 0;
    for (let key in localStorageObj) {
      if (localStorageObj.hasOwnProperty(key)) {
        count += parseInt(localStorageObj[key].quantidade);
      }
    }
    return count;
  }



  handleSearch(){
    const {page, categoriaA, categoriaB, search,brand} = this.state;
    try {
      const base_url = "http://localhost:5000/produto/search" //este Ã© a base nao sei se aceita do outro lado mais parametros aqui
      const url = `${base_url}?page=${page}&categoriaA=${categoriaA}&categoriaB=${categoriaB}&brand=${brand}&search=${search}`;
      console.log(url);
      window.localStorage.setItem("search", search)
      fetch( url, {
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
        console.log(data, "searchData");
        // this.setState({ objSearch: data.products}); //o que adicionar aqui??
        window.localStorage.setItem("objSearch", JSON.stringify(data.productsWPrice))
        window.location.href= "./catalogo"
    })
    }catch(err){
      console.log(err);
    }
}


  logOut = () => {
    window.localStorage.clear();
    window.location.href = "./user/login"
  }

  redirect = () => {
    if(this.state.type=="consumidor"){  //se for consumidor
      window.location.href = "/user/c";
    }else{ //se for fornecedor
      window.location.href = "/user/f";
    }
  }
  redirect_records = () => {
    if(this.state.type=="consumidor"){  //se for consumidor e quiser aceder aos seus relatorios
      window.location.href = "/user/c/records";
    }else if(this.state.type=="fornecedor"){ //se for fornecedor e quiser aceder aos seus relatorios
      window.location.href = "/user/f/records";
    }
    else{
      window.location.href = "/user/admin/records";
    }
    
  }

  redirect_up = () => {
    window.location.href = "/user/f/allup";
  }

  redirect_ordersC = () => {
    window.location.href = "/user/c/orders";
  }

  redirect_sales = () => {
    window.location.href = "/user/f/orderHistory"; 
  }

  redirect_ordersA = () => {
    window.location.href = "/user/admin/orderHistory"; 
  }

  redirect_ordersF = () => {
    window.location.href = "/user/f/orders"; 
  }
  
  componentDidMount() {
    const isGoogleLogged = window.localStorage.getItem("isGoogleLogged") === "true";
    
    if (isGoogleLogged) {
      const response = JSON.parse(window.localStorage.getItem("response"));
      if (response) {
        const { email } = response;
        console.log("ola")
        console.log(response)
        console.log(email)
        this.setState({ nickname: email });
      }
    } else {
      fetch("http://localhost:5000/user/userData", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userData");
          this.setState({ nickname: data.data.nickname,
                          type: data.data.type});
          
          window.localStorage.setItem("user_lat", data.data.lat);
          window.localStorage.setItem("user_lon", data.data.lon);

          if(data.data.type === "fornecedor"){
            fetch(`http://localhost:5000/fornecedor/orders/${data.data._id}`)
            .then((response) => response.json())
            .then((data1) => {
              console.log(data1, "EncomendaData");
              this.setState({ encomendas: data1});
            })
            .catch((error) => {
              console.error(error);
            });
          }
        });
       
    }
  }

  countTotalOrders(){
    const {encomendas} = this.state;
  
    let pendingCount = 0;
  
    encomendas.forEach((item) => {
      const produtos_encomenda = item.UP.produtos_encomenda;
      produtos_encomenda.forEach((produto) => {
        if (produto.estado === "Pending") {
          pendingCount += 1;
        }
      });
    });
  
    return pendingCount;
  }


  handlePre(){
    window.localStorage.removeItem("categoriaB");
    window.localStorage.removeItem("categoriaA");
    window.localStorage.removeItem("brand");
    window.localStorage.removeItem("produtoID");
    window.localStorage.removeItem("objSearch");
    window.localStorage.removeItem("search");
    window.localStorage.removeItem("unidadeID");
    window.localStorage.removeItem("user_lat");
    window.localStorage.removeItem("user_lon");

}


    handleClick(e){
      const {categoriaB, categoriaA} = this.state;
      console.log(categoriaB);
      console.log(categoriaA);
      window.localStorage.setItem("categoriaB", categoriaB);
      window.localStorage.setItem("categoriaA", categoriaA);
      window.localStorage.removeItem("objSearch")
      window.localStorage.removeItem("search")
      window.location.href = "/catalogo";
    };

    handleProduto(e){
        const {produtoID} = this.state;
        console.log("produto no handleProduto ",produtoID);
        window.localStorage.setItem("produtoID", produtoID);
        window.location.href = "/produto";
    };

    render(){
      const { isCartHovered } = this.state;
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const total = this.calcularTotal(carrinho);
      
      
      return (
        <React.Fragment>
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-0 py-2 ">
            
            {/* Logo e imagem do navbar */}
            
            <div class="logo px-4">
              <a onClick={this.handlePre} href="/"><img id="imglogo" src="https://cdn.discordapp.com/attachments/821485480898068498/1079086052435828777/lazypumatr.png" alt='Imagem Logo'></img>
              <img id="imgNome" src="https://cdn.discordapp.com/attachments/811930446765097000/1079804170586030100/Untitled.png" alt='Imagem Nome LazyPuma'></img></a>
            </div>
            <div class="collapse navbar-collapse px-3" id="navbarSupportedContent">
              <ul class="navbar-nav px-3">
                <li class="nav-item">
                  <button id="produtosbtn" class="btn btn-outline-light p-2 px-3 col-md-12" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="offcanvasScrolling">
                    Products
                  </button>
                </li>
              </ul>
              <div className="input-group px-3" id="searchbar">
                <div className="form-group has-search">
                  <div className="input-field border-0">
                    <input
                      id="form1Search"
                      className="text-white form-control inputSearch bg-dark"
                      onChange={e => {
                        this.setState({ search: e.target.value });
                      }}
                      onKeyPress={e => {
                        if (e.key === "Enter") {
                          this.handleSearch();
                        }
                      }}
                      placeholder={this.state.search === "" ? "Search" : this.state.search}
                    />
                    <a onClick={() => this.handleSearch()} id="form1Botao">
                      <span className="fa fa-search text-white form-control-feedback"></span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          
            <ul class="navbar-nav mr-auto">
              {/* <a class="nav-link" href="/login"><i class="bi bi-person-circle"></i> Login/Registo <span class="sr-only">(current)</span></a> */}
              {/* Notificao */}
              <div>
                <Notification />
              </div>
              {this.state.loggedIn ? 
              // <li class="nav-item active px-2">
              //   <div class="dropdown">
              //     <button class="btn btn-outline-light col-md-12" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              //       <i class="bi bi-person-circle"></i> OlÃ¡, 
              //     </button>
              //     <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              //       <a class="dropdown-item" href="#">Action</a>
              //     </div>
              //   </div>
              // </li> 
              <li class="nav-item dropdown active px-2">
                <button class="btn btn-outline-light col-md-12 dropdown-toggle" id="perfilDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="bi bi-person-circle"></i> Hello {this.state.nickname}
                </button>
                <ul class="dropdown-menu botaoPerfilDropdown" aria-labelledby="perfilDropdown">
                    <li><a class="dropdown-item" onClick={this.redirect} href="#">Profile</a></li>
                    <li><hr class="dropdown-divider"></hr></li>
                    <li><a class="dropdown-item" onClick={this.redirect_records} href="#">Reports</a></li>
                    <li><hr class="dropdown-divider"></hr></li>
                    {this.state.type === "fornecedor" ? 
                      <>
                      <li><a class="dropdown-item" onClick={this.redirect_up} href="#">Production Units</a></li>
                      <li><hr class="dropdown-divider"></hr></li>
                      <li><a class="dropdown-item" onClick={this.redirect_sales} href="#">Order History</a></li>
                      <li><hr class="dropdown-divider"></hr></li>
                      </>
                    :
                    this.state.type === "consumidor" ?
                      <>
                      <li><a class="dropdown-item" onClick={this.redirect_ordersC} href="#">Order History</a></li>
                      <li><hr class="dropdown-divider"></hr></li>
                      </>
                      :
                      this.state.type === "admin" ?
                      <>
                      <li><a class="dropdown-item" onClick={this.redirect_ordersA} href="#">Order History</a></li>
                      <li><hr class="dropdown-divider"></hr></li>
                      </>
                      :
                      <>
                      </>
                    }
                    <li><a class="dropdown-item" onClick={this.logOut} href="/user/login">Log out</a></li>
                </ul>
              </li>:
              <li class="nav-item active px-2">
                <a href="/user/login">
                  <button class="btn btn-outline-light col-md-12" id="botaoLogin">
                    <i class="bi bi-person-circle"></i> Login/Register
                  </button>
                </a>
              </li>}
            </ul>
            {this.state.type !== "fornecedor" ? 
              this.state.type === "admin" ? 
              <>
              <form class="d-flex px-3 nav-item " >
              <div></div></form>
              </>
              :
            <form class="d-flex px-2 nav-item mx-2" >
            <button
                      className="btn btn-outline-light col-md-12 dropdown-hover"
                      id="cartDropdown"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      onMouseEnter={this.handleCartHover}
                      onClick ={this.handleButtonClick}
                      
                      
                      
                    >
                  <i className="bi-cart-fill me-2" style={{ fontSize: '1rem', marginRight: '0.5rem' }}></i>
                  Cart
                  <span className="badge bg-dark text-white ms-1 rounded-pill">{this.countTotalProducts()}</span>
              </button>
              <div
                className={`dropdown-menu p-4 text-dark botaoCart ${isCartHovered ? 'show' : ''}`}
                aria-labelledby="cartDropdown"
                onMouseLeave={this.handleCartLeave}>
                    
                  <h3 class="text-dark font-weight-bold ">Shopping Cart</h3>
                  
                  <p class="text-dark">
                  
                  </p>
                  <div class="carrinhoWrapper pb-3" >

                    <div class="items-carrinho">
                    
                    <div>
                      {carrinho.length === 0 ? (
                        <div class="carrinho-vazio">
                          <p class="text-dark">Your cart is empty!</p>
                        </div>
                      ) : (
                        carrinho.map((item, index) => (
                        <div class="carrinho-item" key={item.nome}>
                          <img class="" src={item.img} alt={item.nome} />
                          <div class="detalhes text-dark">
                            <h5 class="text-dark">{item.nome}</h5>
                            <p class="text-dark">
                              <span class="pt-4 text-dark">{item.preco}€</span><br></br>
                              <small class="text-muted text-nowrap"> {item.preco_original}€ / per item </small>
                              
                              <div className="quantidade">
                                <div className="row">
                                  <div className="col d-flex align-items-center">
                                    <p className="text-secondary mb-0 ">Quantity: {item.quantidade}</p>
                                    <p className="text-secondary mb-0  "> </p>
                                    <br></br>
                                    <div className="d-flex flex-column">
                                      <i onClick={() => this.atualizarQuantidade(index, "incrementar")} className="bi bi-plus-square quantidade_atualizar"></i>
                                      <i onClick={() => this.atualizarQuantidade(index, "decrementar")} className="bi bi-dash-square quantidade_atualizar"></i>
                                    </div>
                  
                                  </div>
                                </div>
                              </div>
                            </p>
                          </div>
                          <div class="cancel">
                            <i className="bi bi-x-square-fill" onClick={() => this.removerProduto(index)}></i>
                          </div>
                        </div>
                        ))
                      )}
                      </div>
                      </div>       
                  </div>
                  <p class="d-none">espaco</p>
                  <p class="text-end text-dark" id="total">Total: {total}€</p>
                  {carrinho.length > 0 && (
              <a class="btn btn-success w-100 shadow-0 mb-2" id="checkout" href='/user/encomenda'>Checkout</a>
            )}
                    {/* <a class="btn-checkout btn btn-outline-light btn-dark col-md-12 mb-1" id="checkout" href='/user/encomenda'>Checkout</a> */}
                    <a class="btn-checkout btn btn-outline-light btn-dark col-md-12 mb-1" id="carrinho" href='/cart'>View Cart</a>
                   </div>
                <div class="overlay"></div>
            </form>
          : 
              <form class="d-flex px-3 nav-item " >
                <a className="btn btn-outline-light col-md-12" href="/user/f/orders">
                  Orders
                  <span className="badge bg-dark text-white ms-1 rounded-pill">{this.countTotalOrders()}</span>
                </a>
              </form>
          } 
            

          </nav>
          <div class="offcanvas offcanvas-left" data-bs-scroll="true" tabindex="-1" id="sidebar">
            <div class="offcanvas-header navbar-dark bg-dark">
              <h5 class="offcanvas-title text-white" id="offcanvasWithBothOptionsLabel">Products</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
              <div class="offcanvas-body sidebar">
                <nav class="navbar navbar-light bg-light" id="offcanvasItems">
                  <div class="container-fluid mt-2">
                    <ul class="navbar-nav produtosSidebar">
                      <li class="nav-item dropdown ">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" id="bebe" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Baby
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="bebe">
                            <li><button class="dropdown-item" value="Playards" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Playards</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Rockers and Bouncers" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Rockers and Bouncers</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Bath" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Bath</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Car Seats" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Car Seats</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Activity Center" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Activity Center</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Baby Bottles" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Baby Bottles</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Baby Food" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Baby Food</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Feeding Set" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Feeding Set</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Breast Pumps" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Breast Pumps</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Diapers" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Diapers</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Wipes" onClick={(e) => {this.setState({ categoriaB: "Baby", categoriaA: e.target.value}, this.handleClick)}}>Wipes</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Baby" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="desporto" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Sports
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="desporto">
                            <li><button class="dropdown-item" value="Running Shoes" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Running Shoes</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Gym" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Gym</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Football" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Football</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Badminton" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Badminton</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Golf" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Golf</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Baseball" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Baseball</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Hunting" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Hunting</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Table Tennis" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Table Tennis</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Basketball" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Basketball</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Boxing" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Boxing</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Hockey" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Hockey</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Footwear" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Footwear</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Clothing" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Clothing</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Wearable Technology" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Wearable Technology</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Accessories" onClick={(e) => {this.setState({ categoriaB: "Sports", categoriaA: e.target.value}, this.handleClick)}}>Accessories</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Sports" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="animais" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Animals
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="animais">
                        <li><button class="dropdown-item" value="Furniture" onClick={(e) => {this.setState({ categoriaB: "Animals", categoriaA: e.target.value}, this.handleClick)}}>Furniture</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Accessories" onClick={(e) => {this.setState({ categoriaB: "Animals", categoriaA: e.target.value}, this.handleClick)}}>Accessories</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Supplies" onClick={(e) => {this.setState({ categoriaB: "Animals", categoriaA: e.target.value}, this.handleClick)}}>Supplies</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Apparel" onClick={(e) => {this.setState({ categoriaB: "Animals", categoriaA: e.target.value}, this.handleClick)}}>Apparel</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Toys" onClick={(e) => {this.setState({ categoriaB: "Animals", categoriaA: e.target.value}, this.handleClick)}}>Toys</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Animals" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="beleza" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Cosmetics
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="beleza">
                            <li><button class="dropdown-item" value="Brows" onClick={(e) => {this.setState({ categoriaB: "Cosmetics", categoriaA: e.target.value}, this.handleClick)}}>Brows</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Skincare" onClick={(e) => {this.setState({ categoriaB: "Cosmetics", categoriaA: e.target.value}, this.handleClick)}}>Skincare</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Lipstick" onClick={(e) => {this.setState({ categoriaB: "Cosmetics", categoriaA: e.target.value}, this.handleClick)}}>Lipstick</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Foundation" onClick={(e) => {this.setState({ categoriaB: "Cosmetics", categoriaA: e.target.value}, this.handleClick)}}>Foundation</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Eye Shadow" onClick={(e) => {this.setState({ categoriaB: "Cosmetics", categoriaA: e.target.value}, this.handleClick)}}>Eye Shadow</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Concealer" onClick={(e) => {this.setState({ categoriaB: "Cosmetics", categoriaA: e.target.value}, this.handleClick)}}>Concealer</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Setting Spray" onClick={(e) => {this.setState({ categoriaB: "Cosmetics", categoriaA: e.target.value}, this.handleClick)}}>Setting Spray</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Mascara" onClick={(e) => {this.setState({ categoriaB: "Cosmetics", categoriaA: e.target.value}, this.handleClick)}}>Mascara</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Cosmetics" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="bricolagem" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        DIY 
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="bricolagem">
                            <li><button class="dropdown-item" value="Power Tools" onClick={(e) => {this.setState({ categoriaB: "DIY", categoriaA: e.target.value}, this.handleClick)}}>Power Tools</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Measuring Tools" onClick={(e) => {this.setState({ categoriaB: "DIY", categoriaA: e.target.value}, this.handleClick)}}>Measuring Tools</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Woodworking Tools" onClick={(e) => {this.setState({ categoriaB: "DIY", categoriaA: e.target.value}, this.handleClick)}}>Woodworking Tools</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Cutting Tools" onClick={(e) => {this.setState({ categoriaB: "DIY", categoriaA: e.target.value}, this.handleClick)}}>Cutting Tools</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Sanders" onClick={(e) => {this.setState({ categoriaB: "DIY", categoriaA: e.target.value}, this.handleClick)}}>Sanders</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Rotary Tools" onClick={(e) => {this.setState({ categoriaB: "DIY", categoriaA: e.target.value}, this.handleClick)}}>Rotary Tools</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Drill Bits" onClick={(e) => {this.setState({ categoriaB: "DIY", categoriaA: e.target.value}, this.handleClick)}}>Drill Bits</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="DIY" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="telemoveis" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Smartphones
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="telemoveis">
                            <li><button class="dropdown-item" value="Smartphones" onClick={(e) => {this.setState({ categoriaB: "Smartphones", categoriaA: e.target.value}, this.handleClick)}} >Smartphones</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Accessories" onClick={(e) => {this.setState({ categoriaB: "Smartphones", categoriaA: e.target.value}, this.handleClick)}} >Accessories</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Smartwatches" onClick={(e) => {this.setState({ categoriaB: "Smartphones", categoriaA: e.target.value}, this.handleClick)}} >Smartwatches</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Telephones" onClick={(e) => {this.setState({ categoriaB: "Smartphones", categoriaA: e.target.value}, this.handleClick)}} >Telephones</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Sound Accessories" onClick={(e) => {this.setState({ categoriaB: "Smartphones", categoriaA: e.target.value}, this.handleClick)}} >Sound Accessories</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Smartphones" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="decoracao" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Decoration
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="decoracao">
                            <li><button class="dropdown-item" value="Home Textiles" onClick={(e) => {this.setState({ categoriaB: "Decoration", categoriaA: e.target.value}, this.handleClick)}}>Home Textiles</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Lighting" onClick={(e) => {this.setState({ categoriaB: "Decoration", categoriaA: e.target.value}, this.handleClick)}}>Lighting</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Office Supplies" onClick={(e) => {this.setState({ categoriaB: "Decoration", categoriaA: e.target.value}, this.handleClick)}}>Office Supplies</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Plant Hanger" onClick={(e) => {this.setState({ categoriaB: "Decoration", categoriaA: e.target.value}, this.handleClick)}}>Plant Hanger</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Wall Decor" onClick={(e) => {this.setState({ categoriaB: "Decoration", categoriaA: e.target.value}, this.handleClick)}}>Wall Decor</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Decoration" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="jardinagem" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Gardening
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="Jardinagem">
                            <li><button class="dropdown-item" value="Hoses" onClick={(e) => {this.setState({ categoriaB: "Gardening", categoriaA: e.target.value}, this.handleClick)}}>Hoses</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Pruning Shears" onClick={(e) => {this.setState({ categoriaB: "Gardening", categoriaA: e.target.value}, this.handleClick)}}>Pruning Shears</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Fertilizers" onClick={(e) => {this.setState({ categoriaB: "Gardening", categoriaA: e.target.value}, this.handleClick)}}>Fertilizers</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Hedge Trimmers" onClick={(e) => {this.setState({ categoriaB: "Gardening", categoriaA: e.target.value}, this.handleClick)}}>Hedge Trimmers</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Raised Garden Beds" onClick={(e) => {this.setState({ categoriaB: "Gardening", categoriaA: e.target.value}, this.handleClick)}}>Raised Garden Beds</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Indoor Gardening" onClick={(e) => {this.setState({ categoriaB: "Gardening", categoriaA: e.target.value}, this.handleClick)}}>Indoor Gardening</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="String Trimmers" onClick={(e) => {this.setState({ categoriaB: "Gardening", categoriaA: e.target.value}, this.handleClick)}}>String Trimmers</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Garden Kneelers" onClick={(e) => {this.setState({ categoriaB: "Gardening", categoriaA: e.target.value}, this.handleClick)}}>Garden Kneelers</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Soil" onClick={(e) => {this.setState({ categoriaB: "Gardening", categoriaA: e.target.value}, this.handleClick)}}>Soil</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Gardening" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="gaming" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Gaming
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="gaming">
                            <li><button class="dropdown-item" value="Consoles" onClick={(e) => {this.setState({ categoriaB: "Gaming", categoriaA: e.target.value}, this.handleClick)}}>Consoles</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Games" onClick={(e) => {this.setState({ categoriaB: "Gaming", categoriaA: e.target.value}, this.handleClick)}}>Games</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Gaming PC" onClick={(e) => {this.setState({ categoriaB: "Gaming", categoriaA: e.target.value}, this.handleClick)}}>Gaming PC</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Gaming Accessories" onClick={(e) => {this.setState({ categoriaB: "Gaming", categoriaA: e.target.value}, this.handleClick)}}>Gaming Accessories</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Gaming" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="televisoes" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            TVs
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="TVS">
                            <li><button class="dropdown-item"  value="TVs" onClick={(e) => {this.setState({ categoriaB: "TVs", categoriaA: e.target.value}, this.handleClick)}}>TVs</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item"  value="SoundBars" onClick={(e) => {this.setState({ categoriaB: "TVs", categoriaA: e.target.value}, this.handleClick)}}>SoundBars</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item"  value="Projectors" onClick={(e) => {this.setState({ categoriaB: "TVs", categoriaA: e.target.value}, this.handleClick)}}>Projectors</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item"  value="TV Accessories" onClick={(e) => {this.setState({ categoriaB: "TVs", categoriaA: e.target.value}, this.handleClick)}}> TV Accessories</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="TVs" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="brinquedos" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Toys
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="brinquedos">
                            <li><button class="dropdown-item" value="Building Toys" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Building Toys</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Dolls and Accessories" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Dolls and Accessories</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Board Games" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Board Games</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Preschool Toys" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Preschool Toys</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Vehicles" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Vehicles</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Outdoor Toys" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Outdoor Toys</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Arts and Crafts" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Arts and Crafts</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Card Games" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Card Games</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Blaster Guns" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Blaster Guns</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Stacking Games" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Stacking Games</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Collectibles" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Collectibles</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Preschool Playsets" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Preschool Playsets</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Play Dough Sets" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Play Dough Sets</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Kids Electronics" onClick={(e) => {this.setState({ categoriaB: "Toys", categoriaA: e.target.value}, this.handleClick)}}>Kids Electronics</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Toys" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="eletrodomesticos" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Appliances
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="eletrodomesticos">
                            <li><button class="dropdown-item" value="Refrigerators" onClick={(e) => {this.setState({ categoriaB: "Appliances", categoriaA: e.target.value}, this.handleClick)}}>Refrigerators</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Vacuum Cleaners" onClick={(e) => {this.setState({ categoriaB: "Appliances", categoriaA: e.target.value}, this.handleClick)}}>Vacuum Cleaners</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Kitchen Appliances" onClick={(e) => {this.setState({ categoriaB: "Appliances", categoriaA: e.target.value}, this.handleClick)}}>Kitchen Appliances</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Washing Machines" onClick={(e) => {this.setState({ categoriaB: "Appliances", categoriaA: e.target.value}, this.handleClick)}}>Washing Machines</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Dryers" onClick={(e) => {this.setState({ categoriaB: "Appliances", categoriaA: e.target.value}, this.handleClick)}}>Dryers</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Appliances" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="fotografia" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Photography </a>
                            <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="fotografia">
                            <li><button class="dropdown-item"value="Cameras" onClick={(e) => {this.setState({ categoriaB: "Photography", categoriaA: e.target.value}, this.handleClick)}}>Cameras</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item"value="Drones" onClick={(e) => {this.setState({ categoriaB: "Photography", categoriaA: e.target.value}, this.handleClick)}}>Drones</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item"value="Video" onClick={(e) => {this.setState({ categoriaB: "Photography", categoriaA: e.target.value}, this.handleClick)}}>Video</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item"value="Lenses" onClick={(e) => {this.setState({ categoriaB: "Photography", categoriaA: e.target.value}, this.handleClick)}}>Lenses</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item"value="Photography Accessories" onClick={(e) => {this.setState({ categoriaB: "Photography", categoriaA: e.target.value}, this.handleClick)}}>Photography Accessories</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Photography" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                      <hr class="linhaSeparacaoProdutos"></hr>
                      <li class="nav-item">
                        <a class="nav-link dropdown-toggle botaoProdutoDropdown" href="#" id="livros" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Books
                        </a>
                        <ul class="dropdown-menu botaoProdutoDropdown" aria-labelledby="livros">
                            <li><button class="dropdown-item" value="Romance" onClick={(e) => {this.setState({ categoriaB: "Books", categoriaA: e.target.value}, this.handleClick)}}>Romance</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Children's and Youth Literature" onClick={(e) => {this.setState({ categoriaB: "Books", categoriaA: e.target.value}, this.handleClick)}}>Children's and Youth Literature</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Self help" onClick={(e) => {this.setState({ categoriaB: "Books", categoriaA: e.target.value}, this.handleClick)}}>Self help</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Manga" onClick={(e) => {this.setState({ categoriaB: "Books", categoriaA: e.target.value}, this.handleClick)}}>Manga</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Technical books" onClick={(e) => {this.setState({ categoriaB: "Books", categoriaA: e.target.value}, this.handleClick)}}>Technical books</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                            <li><button class="dropdown-item" value="Books" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</button></li>
                            <li><hr class="dropdown-divider"></hr></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
      </React.Fragment>
    );
  }
}

// export default Navbar