import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import { FaSearch } from "react-icons/fa"
import { useNavigate } from "react-router-dom";
import 'bootstrap';
import { useRef } from "react";
import ScrollContainer from 'react-indiana-drag-scroll'

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoriaB: "",
      categoriaA: "",
      objSearch: window.localStorage.getItem("objSearch") || [],
      produtoID: "",
      tipoUser: window.localStorage.getItem("tipoUser"),
      idUser: "",
      nickname: "",
      unidades: [], // Initialize unidades as an empty array
      produtos: [],
      user_lat: window.localStorage.getItem("user_lat") || "",
      user_lon: window.localStorage.getItem("user_lon") || "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleProduto = this.handleProduto.bind(this);
    window.localStorage.removeItem("userUpdated");
    window.localStorage.removeItem("categoriaB");
    window.localStorage.removeItem("categoriaA");
    window.localStorage.removeItem("produtoID");
    window.localStorage.removeItem("objSearch");
  }

  componentDidMount() {
    const token = window.localStorage.getItem("token")
    if (token){
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
        this.setState(
          {
            nickname: data.data.nickname,
            tipoUser: data.data.type,
            idUser: data.data._id,
          },
          () => {
            const { tipoUser, idUser } = this.state;
            console.log("tipoUser", tipoUser);
            if (tipoUser === "fornecedor") {
              try {
                console.log("IdUser dentro do try", idUser);
                const base_url = "http://localhost:5000/user/unidadeProducao";
                const url = `${base_url}?id=${idUser}`;
                fetch(url, {
                  method: "GET",
                  crossDomain: true,
                  headers: {
                    "Content-type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data, "unidade de producao");
                    this.setState({
                      unidades: data,
                    });
                  });
              } catch (err) {
                console.log(err);
              }
              
            }else{
                try {
                  console.log("IdUser dentro do try", idUser);
                  const base_url = "http://localhost:5000/user/homepage";
                  const url = `${base_url}?id=${idUser}`;
                  fetch(url, {
                    method: "GET",
                    crossDomain: true,
                    headers: {
                      "Content-type": "application/json",
                      Accept: "application/json",
                      "Access-Control-Allow-Origin": "*",
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      console.log(data, "Produtos For you");
                      this.setState({
                        produtos: data,
                      });
                    });
                } catch (err) {
                  console.log(err);
                }
            }
          }
        );
      });
    }else{
        try {
            const base_url = "http://localhost:5000/user/homepage";
            const url = `${base_url}`;
            fetch(url, {
              method: "GET",
              crossDomain: true,
              headers: {
                "Content-type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data, "Produtos For you");
                this.setState({
                    produtos: data,
                });
              });
          } catch (err) {
            console.log(err);
          }

    }
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
  
    // Convert degrees to radians
    const lat1Rad = this.degToRad(lat1);
    const lon1Rad = this.degToRad(lon1);
    const lat2Rad = this.degToRad(lat2);
    const lon2Rad = this.degToRad(lon2);
  
    // Calculate the differences between the coordinates
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
  
    // Haversine formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;

    distance = distance.toFixed(2);
  
    return distance; // Distance in kilometers
  }
  
degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }

          //AO CARREGAR NO UPDATE ENVIA PARA USER/


    handleClick(e){
        const {categoriaB, categoriaA} = this.state;
        console.log(categoriaB);
        console.log(categoriaA);
        window.localStorage.setItem("categoriaB", categoriaB);
        window.localStorage.setItem("categoriaA", categoriaA);
        window.location.href = "/catalogo";
    };

    handleProduto(e){
        const {produtoID} = this.state;
        console.log("produto no handleProduto ",produtoID);
        window.localStorage.setItem("produtoID", produtoID);
        window.location.href = "/produto";
    };
    
    render(){
        
    
    return (
    //<!-- Header -->
    <React.Fragment>
    <div class="scrollmenu-container">
    <div class="scrollmenu">
        <header class="cor_header height_header">
            <ScrollContainer class="btn-toolbar col-lg-12 justify-content-center scrollcontainer" id="buttons_header" role="toolbar">      {/*onClick{() => this.setState({ count: 1})}             Telemóveis <br></br>e<br></br> Smartphones*/}  
            <div class="row">
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao2" title="bebé" value="Baby" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Baby</button>
                    <div className="button-name">Baby</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao3" title="desporto" value="Sports" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Sports</button>
                    <div className="button-name">Sports</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao4" title="animais" value="Animals" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Animals</button>  
                    <div className="button-name">Animals</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao5" title="beleza" value="Cosmetics" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Cosmetics</button>  
                    <div className="button-name">Cosmetics</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao6" title="bricolagem" value="DIY" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>DIY</button>  
                    <div className="button-name">DIY</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao7" title="telemóveis e smartphones"value="Smartphones" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Smartphones</button>
                    <div className="button-name">Smartphones</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao8" title="informatica"value="Tech" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Tech </button>  
                    <div className="button-name">Tech</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao9" title="decoração"value="Decoration" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Decoration</button>
                    <div className="button-name">Decoration</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao10" title="jardinagem"value="Gardening" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Gardening</button>  
                    <div className="button-name">Gardening</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao11" title="gaming"value="Gaming" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Gaming</button> 
                    <div className="button-name">Gaming</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao12" title="TVs" value="TVs"onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>TVs</button>
                    <div className="button-name">TVs</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao13" title="jogos e brinquedos"value="Toys" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Toys</button>
                    <div className="button-name">Toys</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao14" title="eletrodomesticos"value="Appliances" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Appliances</button>
                    <div className="button-name">Appliances</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao15" title="fotografia"value="Photography" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Photography</button>
                    <div className="button-name">Photography</div>
                </div>
                </div>
                <div class="col">
                <div className="button-container">
                    <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butao16" title="livros"value="Books" onClick={(e) => {this.setState({ categoriaB: e.target.value }, this.handleClick)}}>Books</button>
                    <div className="button-name">Books</div>
                </div>
                </div>
            </div>
            
            </ScrollContainer>
        </header>
    </div>
    </div>



    
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
                                <li><a class="dropdown-item" value="Sports" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</a></li>
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
                                <li><a class="dropdown-item" value="Animals" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</a></li>
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
                                <li><a class="dropdown-item" value="DIY" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</a></li>
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
                                <li><a class="dropdown-item" value="Decoration" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</a></li>
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
                                <li><a class="dropdown-item" value="Gardening" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</a></li>
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
                                <li><a class="dropdown-item" value="Toys" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</a></li>
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
                                <li><a class="dropdown-item" value="Appliances" onClick={(e) => {this.setState({ categoriaB: e.target.value}, this.handleClick)}}>See All</a></li>
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

    
    <script src="../scripts/sliderProdutos.js"></script>
    {/* //<!-- Section --> */}
    <section class="py-5">
    {this.state.tipoUser === "fornecedor" ?
        <div className='breadcrumb'>
        <h1> &nbsp;<a href="/user/f/allup" >{this.state.nickname}'s Production Units</a></h1>
        </div>
    :   
        <>
        <h1> &nbsp;Products for You</h1>
        </>
    }

        <div class="container px-4 px-lg-5 mt-5">
        {this.state.tipoUser === "fornecedor" ?
            this.state.unidades.map((unidade) => (
            <>
                <h2>{unidade.nome}</h2>
                <br></br>
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {unidade.listaProdutos.length > 0 ? (
                    unidade.listaProdutos.map((produto) => (
                    <div key={produto._id}>
                        <div class="col mb-5">
                        <div class="card h-100 crop">
                            {produto.img ? (
                            produto.img.startsWith("http") ? (
                                <img class="card-img" src={produto.img} alt="..." />
                            ) : (
                                <img
                                class="card-img"
                                src={`http://localhost:5000/images/${produto.img.replace(
                                    "public/images/",
                                    ""
                                )}`}
                                alt="..."
                                />
                            )
                            ) : (
                            <img class="card-img" alt="..." />
                            )}
                            <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">{produto.name}</h5>
                                {produto.preco}€
                            </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center">
                                <button
                                class="btn btn-outline-dark mt-auto"
                                value={produto._id}
                                onClick={(e) => {
                                    this.setState(
                                    { produtoID: e.target.value },
                                    this.handleProduto
                                    );
                                }}
                                >
                                View options
                                </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))
                ) : (
            
                    <h3>This unit doesn't have any products yet.</h3>
                
                )}
                </div>
            </>
            ))
        : 
            <>
            <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {this.state.produtos.length > 0 ? (
                this.state.produtos.map((produto, index) => (
                     <div key={produto._id}>
                     <div class="col mb-5">
                        <div class="card h-100 crop">
                        {produto.img ? (
                            produto.img.startsWith("http") ? (
                                <img class="card-img" src={produto.img} style={{ height: '200px' }} alt="..." />
                            ) : (
                                <img
                                class="card-img"
                                src={`http://localhost:5000/images/${produto.img.replace(
                                    "public/images/",
                                    ""
                                )}`}
                                style={{ height: '200px' }}
                                alt="..."
                                />
                            )
                            ) : (
                            <img class="card-img" alt="..." style={{ height: '200px' }} />
                        )}
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h5 class="fw-bolder">{produto.name}</h5>
                                    {this.state.tipoUser === "consumidor" ?
                                        this.calculateDistance(
                                            parseFloat(this.state.user_lat), // Convert to float
                                            parseFloat(this.state.user_lon), // Convert to float
                                            parseFloat(produto.lat), // Convert to float
                                            parseFloat(produto.lon) // Convert to float
                                        )
                                    :
                                        <></>}km
                                    <br></br>
                                    {produto.preco}€
                                </div>
                            </div>
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button class="btn btn-outline-dark mt-auto" value={produto._id} onClick={(e) => {this.setState({ produtoID: e.target.value }, this.handleProduto)}}>View options</button></div>
                            </div>
                        </div>
                    </div>
                 </div>
                ))
            ) : (
            
                <h3>There are no products yet</h3>
                
            )}
            </div>

            

            </>
        }



                
            {/* </div> */}
        </div>
    </section>
    </React.Fragment>
    )
  }
}

//export default Homepage