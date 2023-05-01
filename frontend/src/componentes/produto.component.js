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
            produto: {},
            carrinho: JSON.parse(localStorage.getItem('carrinho')) || [],
            quantidade: '',
        };        
        this.adicionarCarrinho = this.adicionarCarrinho.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }  

adicionarCarrinho() {
    const novoProduto = { nome: this.state.produto.name, preco: 10, quantidade: this.state.quantidade, img:this.state.produto.img };
    let novoCarrinho = [...this.state.carrinho];
    let existingProductIndex = novoCarrinho.findIndex(item => item.nome === this.state.produto.name);

    if (existingProductIndex >= 0) {
      novoCarrinho[existingProductIndex].quantidade = parseInt(novoCarrinho[existingProductIndex].quantidade)+parseInt(this.state.quantidade);
    } else {
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
            this.setState({ produto: data.product })
            console.log(this.state.produto)
        }) 
    }catch(err){
        console.log(err);
    }
}


    
    render(){
    return (
    //<!-- Header -->
    <React.Fragment>
        
     <section class="py-5">
        <div class="container px-4 px-lg-5 my-5">
            <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6"><img class="card-img" src={this.state.produto.img} alt="..." /></div>
                <div class="col-md-6">
                    <div class="small mb-1">SKU: BST-498</div>
                    <h1 class="display-5 fw-bolder">{this.state.produto.name}</h1>
                    <div class="fs-5 mb-5">
                        <span class="text-decoration-line-through">$45.00</span>
                        <span>$40.00</span>
                    </div>
                    <p class="lead text-dark">Brand: {this.state.produto.brand}</p>
                    <p class="lead text-dark">Caracteristicas do produto</p>
                    <p class="lead text-dark">Caracteristicas do produto</p>
                    <br></br>
                    <p class="lead text-dark">Caracteristicas do Fornecedor ?</p>
                    <br></br>


                    <div class="d-flex">
                        <label class="lead text-dark">Quantity: &nbsp; </label>
                       
                        <input value={this.state.quantidade} onChange={this.handleChange}
                        class="form-control text-center me-3"
                         id="inputQuantity"
                          type="num"
                           placeholder="1" />
                        <button onClick={this.adicionarCarrinho}
                         class="btn btn-outline-dark flex-shrink-0" 
                         type="button" >
                            <i class="bi-cart-fill me-1"></i>
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
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