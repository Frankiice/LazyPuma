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
      user_lat:  "",
      user_lon:  "",
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
            user_lat: data.data.lat,
            user_lon: data.data.lon,

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
                          <div class="card h-100 crop"
                            onClick={() => {
                              this.setState({ produtoID: produto._id }, this.handleProduto);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            {produto.img ? (
                              produto.img.startsWith('http') ? (
                                <img class="card-img" src={produto.img} alt="..." />
                              ) : (
                                <img
                                  class="card-img"
                                  src={`http://localhost:5000/images/${produto.img.replace(
                                    'public/images/',
                                    ''
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
                      <div class="card h-100 crop"
                        onClick={() => {
                          this.setState({ produtoID: produto._id }, this.handleProduto);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {produto.img ? (
                          produto.img.startsWith('http') ? (
                            <img
                              class="card-img"
                              src={produto.img}
                              style={{ height: '200px' }}
                              alt="..."
                            />
                          ) : (
                            <img
                              class="card-img"
                              src={`http://localhost:5000/images/${produto.img.replace(
                                'public/images/',
                                ''
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
                            {this.state.tipoUser === 'consumidor' ? (
                              <>
                                {this.calculateDistance(
                                  parseFloat(this.state.user_lat), // Convert to float
                                  parseFloat(this.state.user_lon), // Convert to float
                                  parseFloat(produto.lat), // Convert to float
                                  parseFloat(produto.lon) // Convert to float
                                )}
                                km
                                <br />
                              </>
                            ) : null}
                            {produto.preco}€
                          </div>
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