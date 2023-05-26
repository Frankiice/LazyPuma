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
                unidade: data.data,
              });
              
              console.log("this.state.produto: ", this.state.unidade);
              
        }) 
    }catch(err){
        console.log(err);
    }
}
  

render() {
  const { unidades } = this.state;
  return (
    
    <div class="container">
    <div class="row">
        <div class="col-lg-9">
        <div class="card d-flex border shadow-0 custom-card">
            <div class="m-4">
            <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Production Units</h2>
            <br></br>
            <div class="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <div class="row">
                {unidades.length === 0 ? (
                <div class="carrinho-vazio">
                    <br></br>
                    <h5 class="text-secondary justify-content-md-center">Don't have Production Units !</h5>
                </div>
                ) : (
                    unidades.map((unidade, index) => (
                        <div key={unidade._id} class="col-md-6">
                            <div class="form-group box">
                            <h5>{unidade.nome}</h5>
                            <label>Unit Nº: {index + 1}</label>
                            <p>Address: {unidade.morada}</p>
                            <p>Coordenates: ({unidade.lat}, {unidade.lon})</p>
                            <p>Nº of Products: {unidade.listaProdutos.length}</p>
                            <p>Nº of Vehicles: {unidade.listaVeiculos.length}</p>
                            <a class="btn-checkout btn btn-outline-light btn-dark col-md-6 mb-1" id="checkout">View Details</a>
                            </div>
                        </div>
                ))
                )}
                </div>
                </div>
            </div>
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

