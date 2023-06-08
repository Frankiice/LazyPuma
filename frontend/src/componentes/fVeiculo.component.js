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
}


handleSubmit(e){
  e.preventDefault();
  const { unidadeID, matricula, vBrand, vCapacity} = this.state;
  console.log(unidadeID, matricula, vBrand, vCapacity);
  fetch("http://localhost:5000/user/veiculos",{
      method:"POST",
      crossDomain:true,
      headers:{
          "Content-type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        unidadeID, 
          matricula, 
          vBrand, 
          vCapacity
      }),
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data, "veiculo");
      this.setState({ msg: "Vehicle added Successfully"});
  })
  .catch((error) => {
    console.log(error);
  });
};
  

render() {
  return (
    
    <div class="container">
    <div class="row">
        {this.state.msg === "" ? 
        <div class="card d-flex border shadow-0 custom-card">
            <div class="m-4">
            <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s New Vehicle</h2>
            <br></br>
            <div class="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
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
                            placeholder="AB-12-34"
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
                            placeholder="Renault"
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
                            placeholder="10 m³"
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


            </div>
            </div>
            <div>
            <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f/up">Back </a>
            </div>

        </div>
    :
        <div class="card d-flex border shadow-0 custom-card">
            <div class="m-4">
            <div class="carrinho-vazio">
            <br></br>
                <h4 class="text-secondary justify-content-md-center">{this.state.msg}!</h4>
            </div>
            <div>
            <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f/up">Back </a>
            </div>
            </div>
        </div>

        }
       
     
    </div>
    
</div>
    
  );
  }
}