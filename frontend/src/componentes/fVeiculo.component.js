import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
// import { MDBCheckbox } from 'mdb-react-ui-kit';

export default class Fveiculo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      idFornecedor: "",   
      unidadeID: window.localStorage.getItem("unidadeID"),
      veiculoID: window.localStorage.getItem("veiculoID"),
      listaVeiculos: [],
      matricula: "",
      vBrand: "",
      vCapacity: "",
      msg: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);


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
        this.setState({ nickname: data.data.nickname,
                        idFornecedor: data.data._id});
    })

    const { veiculoID } = this.state;
    if (veiculoID) {
      try {
        console.log("veiculoID", veiculoID);
        const base_url = "http://localhost:5000/user/veiculos";
        const url = `${base_url}?id=${veiculoID}`;
        console.log(url);
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
            console.log(data, "veiculoData");
            this.setState({
              matricula: data.matricula,
              vBrand: data.marca,
              vCapacity: data.capacidade,
            });
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("veiculoID", veiculoID);
    }    
}


handleSubmit(e) {
    e.preventDefault();
    const { unidadeID, matricula, vBrand, vCapacity, veiculoID } = this.state;
    console.log(veiculoID, unidadeID, matricula, vBrand, vCapacity);
    var flag = false;
    // se for true é para dar update
    if(veiculoID){
        flag = true;
    }
  
    const formData = new FormData();
    formData.append('veiculoID', veiculoID);
    formData.append('unidadeID', unidadeID);
    formData.append('matricula', matricula);
    formData.append('vBrand', vBrand);
    formData.append('vCapacity', vCapacity);
    formData.append('flag', flag);

  
  
    fetch("http://localhost:5000/user/veiculos", {
      method: "POST",
      crossDomain: true,
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "veiculo");
        if (data.status === "error") {
          throw new Error(data.error);
        }
        this.setState({ msg: "Vehicle added Successfully" });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ msg: "Error adding Vehicle" });
      });
  }
  
  

render() {
  return (
    
    <div class="container">
    <div class="row">
        {this.state.msg === "" ? 
        <div class="cardP border shadow-0 custom-card">
            <div class="m-4">
            <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s New Vehicle</h2>
            <br></br>
            <div class="cardP-body" style={{ overflowY: 'auto' }}>

            {this.state.veiculoID != null ?    
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Licence Plate</label>
                        <div className="input-field ">
                        <input
                            type="text"
                            pattern="(?:\d{2}-[A-Z]{2}-\d{2}|[A-Z]{2}-\d{2}-\d{2}|\d{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-[A-Z]{2}-\d{2}|\d{2}-[A-Z]{2}-[A-Z]{2})"
                            id="matricula"
                            onChange={(e) => this.setState({ matricula: e.target.value })}
                            value={this.state.matricula}
                            required
                        />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Vehicle Brand</label>
                        <div className="input-field ">
                        <input
                            type="text"
                            id="vBrand"
                            onChange={(e) => this.setState({ vBrand: e.target.value })}
                            value={this.state.vBrand}
                            required
                        />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Capacity (m³)</label>
                        <div className="input-field ">
                        <input
                            type="number"
                            id="vCapacity"
                            onChange={(e) => this.setState({ vCapacity: e.target.value })}
                            value={this.state.vCapacity}
                            required
                        />
                        </div>
                    </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil">
                    Update
                </button>
                </form>
        :
        <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Licence Plate</label>
                        <div className="input-field ">
                        <input
                            type="text"
                            pattern="(?:\d{2}-[A-Z]{2}-\d{2}|[A-Z]{2}-\d{2}-\d{2}|\d{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-[A-Z]{2}-\d{2}|\d{2}-[A-Z]{2}-[A-Z]{2})"
                            id="matricula"
                            onChange={(e) => this.setState({ matricula: e.target.value })}
                            required
                        />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Vehicle Brand</label>
                        <div className="input-field ">
                        <input
                            type="text"
                            id="vBrand"
                            onChange={(e) => this.setState({ vBrand: e.target.value })}
                            required
                        />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Capacity (m³)</label>
                        <div className="input-field ">
                        <input
                            type="number"
                            id="vCapacity"
                            onChange={(e) => this.setState({ vCapacity: e.target.value })}
                            required
                        />
                        </div>
                    </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil">
                    Create
                </button>
                </form>
        }


            </div>
            </div>
            <div>
            <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f/allup">Back </a>
            </div>

        </div>
    :
        <div class="cardP border shadow-0 custom-card">
            <div class="m-4">
            <div class="carrinho-vazio">
            <br></br>
                <h4 class="text-secondary justify-content-md-center">{this.state.msg}!</h4>
            </div>
            <div>
            <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f/allup">Back </a>
            </div>
            </div>
        </div>

        }
       
     
    </div>
    
</div>
    
  );
  }
}