import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
// import { MDBCheckbox } from 'mdb-react-ui-kit';

export default class FaAllUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      idFornecedor: "",   
      msg: "",
      unidades: [],
      unidadeID: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);


  }

  componentDidMount(){
    window.localStorage.removeItem("unidadeID")
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
        try{
            const base_url = "http://localhost:5000/user/unidadeProducao"
            const url = `${base_url}?id=${data.data._id}`;
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
                console.log(data, "unidade de producao");
                this.setState({ 
                    unidades: data,
                    });                
            }) 
        }catch(err){
            console.log(err);
        }  
    })
}


handleSubmit(e) {
    e.preventDefault();
    const { unidadeID, matricula, vBrand, vCapacity, veiculoID } = this.state;
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

handleUnidade(e){
    const {unidadeID} = this.state;
    const editUP = false;
    window.localStorage.setItem("unidadeID", unidadeID);
    window.localStorage.setItem("editUP", editUP);
    window.location.href = "/user/f/up";
};

handleNovaUnidade(e){
    window.location.href = "/user/f/up";
};
  
  

render() {
  return (
    
    <div class="container">
    <div class="row">
        {this.state.msg === "" ? 
        <>
            <div class="cardP border shadow-0 custom-cardUp">
                <div class="m-4">
                <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Production Units</h2>
                <br></br>
                <div class="cardP-body" style={{ overflowY: 'auto' }}>

                    {this.state.unidades !== [] ? (
                        <div className="col">
                        {this.state.unidades.map((unidade, index) => (
                        <div class="border-top border-bottom pt-2">
                            <div className="row gy-3 mb-4" key={unidade._id}>
                            <div className="col-lg-12">
                                <div className="me-lg-5">
                                <div className="d-flex">
                                    <div className="">
                                    <h5>{unidade.nome}</h5>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                <div className="col-lg-6 col-sm-6 col-6">
                                    <div className="">
                                    <h6>Address:</h6>
                                    <h6>{unidade.morada}</h6>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="form-outline">
                                    <h6>Nº of Products:</h6>
                                    <h6>{unidade.listaProdutos.length}</h6>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-6">
                                    <div className="form-outline">
                                    <h6>Nº of Vehicles:</h6>
                                    <h6>{unidade.listaVeiculos.length}</h6>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="row">
                                <div className="col-lg-6 col-sm-6 col-6">
                                    <div className="form-outline">
                                    <button class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" value={unidade._id} onClick={(e) => {this.setState({ unidadeID: e.target.value }, this.handleUnidade)}}>View Details</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                        </div>
                        
                    ) : (
                        <div class="border-top border-bottom pt-2">
                        <div className="col-md-6">
                        <div className="form-group box">
                            <label>Most recent order</label>
                            <p>Order No.:</p>
                            <p>Purchase Date:</p>
                            <p>Value:</p>
                            <button className="btn btn-outline-light btn-dark col-md-3 botaoPerfil">View Details</button>
                        </div>
                        </div>
                    </div>
                    )}
                       <br></br>
                        <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-6 col-sm-6 col-6">
                            <div className="form-outline">
                                <button class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" onClick={this.handleNovaUnidade}>Add Production Unit</button>
                            </div>
                            </div>
                        </div>
                        </div>


                    </div>
                    </div>
                    <div>
                    <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/">Back </a>
                    </div>

                </div>

             
                </>
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