import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
// import { MDBCheckbox } from 'mdb-react-ui-kit';

export default class Up extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      cart: JSON.parse(localStorage.getItem('carrinho')) || [],
      unidades: [],      
      unidadeID: window.localStorage.getItem("unidadeID"),
    };
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

    const {unidadeID} = this.state;
    console.log("unidadeID",unidadeID);
    try{
        const base_url = "http://localhost:5000/user/unidadeProducao"
        const url = `${base_url}?id=${unidadeID}`;
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
            console.log(data, "unidadeData");
            this.setState({ 
                unidades: data,
              });
              
            //   console.log("this.state.unidade: ", this.state.unidades);
              
        }) 
    }catch(err){
        console.log(err);
    }
}
  

render() {
  const { unidades } = this.state;
//   console.log("dentro do render: ", unidades)
  return (
    
    <div class="container">
    <div class="row">
        <div class="col-lg-9">
        <div class="card d-flex border shadow-0 custom-card">
            <div class="m-4">
            <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Production Units</h2>
            <br></br>
            <div class="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {/* <div class="row"> */}
                {unidades.length === 0 ? (
                <div class="carrinho-vazio">
                    <br></br>
                    <h5 class="text-secondary justify-content-md-center">You don't have Production Units!</h5>
                </div>
                ) : (
                    unidades.map((unidade, index) => (
                        <div className="row gy-3 mb-4 produto_carrinho" key={unidade._id}>
                          <div className="col-lg-12">
                            <h4>{unidade.nome}</h4>
                          </div>
                          <div className="col-lg-6">
                            <p>Address: {unidade.morada}</p>
                          </div>
                          <div className="col-lg-6">
                            <p>
                              Coordinates: ({unidade.lat}, {unidade.lon})
                            </p>
                          </div>
                          <div className="col-lg-12">
                          <h5>Products:</h5>
                            <hr />
                          </div>
                          <div className="col">
                            <div className="d-flex">
                              <div className="col">
                                
                                {unidade.listaProdutos.map((item, index) => (
                                <div className="row gy-3 mb-4 produto_carrinho" key={item.nome}>
                                    <div className="col-lg-2">
                                    <img
                                        className="border rounded me-3"
                                        src={item.img}
                                        style={{ width: '96px', height: '96px' }}
                                    />
                                    </div>
                                    <div className="col-lg-4">
                                    <div className="me-lg-5">
                                        <div className="d-flex">
                                        <div className="">
                                            <a href="#" className="nav-link">
                                            {item.name}
                                            </a>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                    <div className="">
                                        <h6>Price</h6>
                                        <h6>{item.preco}€</h6>
                                    </div>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                    <div className="form-outline">
                                        <h6>Quantity</h6>
                                        <input
                                        type="number"
                                        id="typeNumber"
                                        className="form-control form-control-sm"
                                        style={{
                                            width: '60px',
                                            backgroundColor: '#f8f9fa',
                                            border: '1px solid #e4e8eb',
                                            display: 'inline-block',
                                        }}
                                        defaultValue={item.quantidade}
                                        min="1"
                                        onChange={(e) => this.handleQuantityChange(item.nome, parseInt(e.target.value))}
                                        />
                                    </div>
                                    </div>
                                    <div className="col-lg-2 d-flex justify-content-end">
                                    <div class="float-md-end">
                                    <a href="#" class="btn btn-light border text-danger icon-hover-danger" onClick={() => this.removerProduto(index)}> Remove</a>
                                    </div>
                                    </div>
                                    <hr />
                                </div>
                                ))}                 
                              </div>
                            </div>
                          </div>
                          <hr />
                          <div className="col-lg-12">
                            <div className="d-flex">
                              <div className="col-lg-6">
                                <h5>Vehicles:</h5>
                                <ul>
                                  {unidade.listaVeiculos.map((veiculo) => (
                                    <li key={veiculo.id}>{veiculo.nome}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <hr />
                          </div>
                          <div className="col-lg-12">
                            <a
                              href="#"
                              className="btn btn-light border text-danger icon-hover-danger"
                              onClick={() => this.removerUnidade(index)}
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      
                ))
                )}
                </div>
                </div>
            {/* </div> */}
            </div>
        </div>

        <div class="col-lg-3">
            <div class="card shadow-0 border" style={{"height": "200px"}}>
                <div class="card-body d-flex flex-column justify-content-between">
                <h3 class="d-flex justify-content-center">New Production Unit ?</h3>
                <div class="mt-3">
                    <a href="./user/encomenda" class="btn btn-success w-100 shadow-0 mb-2"><i class="bi bi-plus-circle"></i> Create</a>
                </div>
                </div>
            </div>
            </div>

        </div>
        
    </div>
    
  );
  }
}

