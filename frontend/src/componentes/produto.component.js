import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import "../scripts/scripts.js";
import { FaSearch } from "react-icons/fa"
import 'bootstrap';


export default class Produto extends Component{
    constructor(props){
        super(props);
        this.state = {
            produtoID: window.localStorage.getItem("produtoID"),
            categoriaA: window.localStorage.getItem("categoriaA") || "", 
            categoriaB: window.localStorage.getItem("categoriaB") || "",
            user_lat: window.localStorage.getItem("user_lat") || "",
            user_lon: window.localStorage.getItem("user_lon") || "",
            produto: {},
            carrinho: JSON.parse(localStorage.getItem('carrinho')) || [],
            quantidade: "1",
            propriedades: [],
            // preco : this.state.produto.price,
            total: 0,
          
        };        
        this.adicionarCarrinho = this.adicionarCarrinho.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }  


adicionarCarrinho() {
    const novoProduto = { nome: this.state.produto._doc.name, preco: this.state.produto.price, quantidade: this.state.quantidade, img:this.state.produto._doc.img, preco_original:this.state.produto.price };
    let novoCarrinho = [...this.state.carrinho];
    let existingProductIndex = novoCarrinho.findIndex(item => item.nome === this.state.produto._doc.name);
    let preco = this.state.produto.price;
    if (existingProductIndex >= 0) {
        console.log("Entrei no outro ! BAD")
        novoCarrinho[existingProductIndex].quantidade = + novoCarrinho[existingProductIndex].quantidade + +this.state.quantidade;
        novoCarrinho[existingProductIndex].preco = novoCarrinho[existingProductIndex].quantidade * preco;
        this.state.total = + this.state.produto.price
    } else {
        console.log("Entrei no else ! GOOD")
        this.state.quantidade = 1;
        novoProduto.preco = novoProduto.quantidade * preco;
        novoCarrinho.push(novoProduto);
    }

    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    this.setState({ carrinho: novoCarrinho });

    // this.setState({ carrinho: novoCarrinho });

}
handleChange(event) {
    this.setState({ quantidade: event.target.value });
  }

componentDidMount(){
    const {produtoID} = this.state;
    console.log("produtoID",produtoID);
    try{
        const base_url = "http://localhost:5000/produto"
        const url = `${base_url}?id=${produtoID}`;
        console.log(url);
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
            console.log(data, "produtoData");
            this.setState({ 
                produto: data.productWPrice,
                propriedades: data.productWPrice._doc.properties,
              });
              
              console.log("this.state.produto: ", this.state.produto);
              console.log("this.state.propriedades: ", this.state.propriedades);
              
        }) 
    }catch(err){
        console.log(err);
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


    
    render(){
    return (
    //<!-- Header -->
    <React.Fragment>
        
     <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
            {this.state.produto._doc ? 
                <div class="row gx-4 gx-lg-5 align-items-center">
                   <div class="col-md-6">
                    {this.state.produto._doc.img.startsWith('http') ? (
                        <img class="card-img" src={this.state.produto._doc.img} alt="..." />
                    ) : (
                        <img class="card-img" src={`http://localhost:5000/images/${this.state.produto._doc.img.replace('public/images/', '')}`} alt="..." />

                    )}
                    </div>
                    <div class="col-md-6">
                        {/* <div class="small mb-1">SKU: BST-498</div> */}
                        <h1 class="display-5 fw-bolder">{this.state.produto._doc.name}</h1>
                        <div class="fs-5 mb-5">
                            {/* <span class="text-decoration-line-through">$45.00</span> */}
                            <h4 style={{ color: "#212529"}}>{this.state.produto.price}€</h4>
                        </div>
                        <p class="lead text-dark">Brand: {this.state.produto._doc.brand}</p>

                        <h4 style={{ color: "#212529"}}>Product Caracteristics:</h4>
                        <p class="lead text-dark" style={{ paddingLeft: "1em"}}>Main Category: {this.state.categoriaB}</p>
                            {this.state.categoriaA != "" ? 
                                <p class="lead text-dark" style={{ paddingLeft: "1em"}}>Sub Category: {this.state.categoriaA}</p>
                            :
                                <p></p>
                            }
                        {this.state.propriedade != [] ? 
                            this.state.propriedades.map((propriedade, index) => {
                                const keys = Object.keys(propriedade);
                                return (
                                  <div key={index}>
                                    {keys.map((key) => (
                                      <div key={key}>
                                        <p class="lead text-dark" style={{ paddingLeft: "1em"}}>{key}: {propriedade[key]}</p>
                                      </div>
                                    ))}
                                  </div>
                                );
                              })
                        :
                            <div>
                                <p class="lead text-dark">Caracteristicas do produto</p>
                                <br></br>
                            </div>
                        }
                        <h4 style={{ color: "#212529"}}>Supplier Caracteristics:</h4>
                        
                            <p class="lead text-dark" style={{ paddingLeft: "1em"}}>Distance: {this.calculateDistance(
                                                                                                    parseFloat(this.state.user_lat), // Convert to float
                                                                                                    parseFloat(this.state.user_lon), // Convert to float
                                                                                                    parseFloat(this.state.produto.lat), // Convert to float
                                                                                                    parseFloat(this.state.produto.lon) // Convert to float
                                                                                                )}Km</p>
                            <p class="lead text-dark" style={{ paddingLeft: "1em"}}>Address: {this.state.produto.morada}</p>
                        <br></br>

                        <div class="d-flex">
                            <label class="lead text-dark">Quantity: &nbsp; </label>
                        
                            <input value={this.state.quantidade} onChange={this.handleChange}
                            class="form-control text-center me-3 quantidade_seta"
                            id="inputQuantity"
                            type="number"
                            min={1}
                            
                                />
                            <button onClick={this.adicionarCarrinho}
                            class="btn btn-outline-dark flex-shrink-0" 
                            type="button" >
                                <i class="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            :
                <p></p>
            }
        </div>
    </section> 
        {/* <!-- Related items section--> */}
    <section class="py-5 bg-light">
        <div class="container px-4 px-lg-5 mt-5">
            <h2 class="fw-bolder mb-4">Related products</h2>
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
                       
                        <div class="badge bg-dark text-white position-absolute relatedItemSale" >Sale</div>
                        
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                       
                        <div class="card-body p-4">
                            <div class="text-center">
                                
                                <h5 class="fw-bolder">Special Item</h5>
                                
                                <div class="d-flex justify-content-center small text-warning mb-2">
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                </div>
                                
                                <span class="text-muted text-decoration-line-through">$20.00</span>
                                $18.00
                            </div>
                        </div>
                        
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        
                        <div class="badge bg-dark text-white position-absolute relatedItemSale" >Sale</div>
                        
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                       
                        <div class="card-body p-4">
                            <div class="text-center">
                               
                                <h5 class="fw-bolder">Sale Item</h5>
                              
                                <span class="text-muted text-decoration-line-through">$50.00</span>
                                $25.00
                            </div>
                        </div>
                        
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                       
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                       
                        <div class="card-body p-4">
                            <div class="text-center">
                                
                                <h5 class="fw-bolder">Popular Item</h5>
                                
                                <div class="d-flex justify-content-center small text-warning mb-2">
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                    <div class="bi-star-fill"></div>
                                </div>
                               
                                $40.00
                            </div>
                        </div>
                        
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">Add to cart</a></div>
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