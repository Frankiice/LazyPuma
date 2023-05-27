import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
// import { MDBCheckbox } from 'mdb-react-ui-kit';

export default class Up extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      idFornecedor: "",
      cart: JSON.parse(localStorage.getItem('carrinho')) || [],
      unidades: [],      
      unidadeID: window.localStorage.getItem("unidadeID"),
      listaProdutos: [],
      listaVeiculos: [],
      matricula: "",
      vBrand: "",
      vCapacity: "",
      upName: "",
      rua: "",
      localidade: "",
      freguesia: "",
      concelho: "",
      cod_postal: "",
      cidade: "",
      pais: "Portugal",
      upAddress: "",
      upCapacity: "",
      lat: "",
      lon: "",
      msgMorada: ""
    };
    this.getCoordenadas = this.getCoordenadas.bind(this);
    this.handleUnidadeProducao = this.handleUnidadeProducao.bind(this);

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

    const {unidadeID} = this.state;
    if(unidadeID != null){
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
    }else{
      console.log("unidadeID",unidadeID);
    }
}

getCoordenadas(e) {
  e.preventDefault();
  const { rua, localidade, freguesia, concelho, cod_postal, cidade, pais } = this.state;
  const upAddress = `${rua}, ${localidade}, ${freguesia}, ${concelho}, ${cod_postal}, ${cidade}, ${pais}`;
  console.log(upAddress);
  this.setState({upAddress: upAddress})
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${encodeURIComponent(upAddress)}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        this.setState({ lat, lon, msgMorada: "Valid address, you can proceed with your registration" });
        console.log("entra no if")
      } else {
        this.setState({ msgMorada: "Error: Invalid address, please correct your address" });
        console.log("entra no else")
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({ msgMorada: "Error validating address, please try again later" });
    });
}

handleUnidadeProducao(e){
  e.preventDefault();
  const { idFornecedor, upName, upAddress, listaProdutos, listaVeiculos, lat, lon, upCapacity} = this.state;
  console.log(idFornecedor, upName, upAddress, listaProdutos, listaVeiculos, lat,lon, upCapacity);
  fetch("http://localhost:5000/user/unidadeProducao",{
      method:"POST",
      crossDomain:true,
      headers:{
          "Content-type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
          idFornecedor,
          upName, 
          upAddress, 
          listaProdutos, 
          listaVeiculos,
          lat,
          lon, 
          upCapacity
      }),
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data, "unidadeProducao");
  })
  .catch((error) => {
    console.log(error);
  });
};
  

render() {
  const { unidadeID, unidades } = this.state;
//   console.log("dentro do render: ", unidades)
  return (
    
    <div class="container">
    <div class="row">
        <div class="card d-flex border shadow-0 custom-card">
            <div class="m-4">
            <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Production Units</h2>
            <br></br>
            <div class="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
 

             {unidadeID != null ? 
            
                unidades.length === 0 ? (
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
                              <div className="col" style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
                                
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
                )
              :
              <form onSubmit={this.handleSubmit}>
              <div class="row">
                  <div class="col-md-6">
                      <div class="form-group">
                          <label>Name</label>
                          <div class="input-field "> 
                          <input type="text" id="upName" onChange={(e => this.setState({ vBrand: e.target.value }))} placeholder="Renault" required/>
                          </div>
                      </div>
                  </div>
                  <div class="border-top border-bottom pb-2">
                      <div class="row">
                          <div class="col-md-6">
                              <div class="form-group">
                                  <label>Street</label>
                                  <div class="input-field "> 
                                  <input type="text" id="rua" onChange={(e => this.setState({ rua: e.target.value }))} placeholder={this.state.rua}/>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group">
                                  <label>Location</label>
                                  <div class="input-field "> 
                                  <input type="text" id="localidae" onChange={(e => this.setState({ localidade: e.target.value }))} placeholder={this.state.localidade}/>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group">
                                  <label>Parish</label>
                                  <div class="input-field "> 
                                  <input type="text" id="freguesia" onChange={(e => this.setState({ freguesia: e.target.value }))} placeholder={this.state.freguesia}/>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group">
                                  <label>County</label>
                                  <div class="input-field "> 
                                  <input type="text" id="concelho" onChange={(e => this.setState({ concelho: e.target.value }))} placeholder={this.state.concelho}/>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group">
                                  <label>Postal Code</label>
                                  <div class="input-field "> 
                                  <input type="text" pattern="\d{4}-\d{3}" id="cod_postal" onChange={(e => this.setState({ cod_postal: e.target.value }))} placeholder={this.state.cod_postal}/>
                                  </div>
                              </div>
                          </div>
                          <div class="col-md-6">
                              <div class="form-group">
                                  <label>City</label>
                                  <div class="input-field "> 
                                  <input type="text" id="cidade" onChange={(e => this.setState({ cidade: e.target.value }))} placeholder={this.state.cidade}/>
                                  </div>
                              </div>
                          </div>
                  </div>
                  <button onClick={this.getCoordenadas} class="btn btn-outline-light btn-dark col-md-3">
                      Verify Address
                      </button>
                      {this.state.msgMorada != "" ? 
                      
                      <label><br></br>{this.state.msgMorada}</label>
                      :
                      <label></label>
                      }
                  </div>                     

                  <div class="col-md-6">
                      <div class="form-group">
                          <label>Capacity (m&sup3;)  </label>
                          <div class="input-field "> 
                              <input type="text" id="upCapacity" onChange={(e => this.setState({ capacity: e.target.value }))} placeholder="10 U+00B3." required/>
                          </div>
                      </div>
                  </div>

                  <div>
                      {this.state.msgMorada != "" ? 
                        this.state.msgMorada == "Error: Invalid address, please correct your address" ?
                            <label></label>
                            :
                            <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" onClick={this.handleUnidadeProducao}>Create</button>

                    :
                        <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" onClick={this.handleUnidadeProducao}>Create</button>
                        }

                  </div>
              </div>
          </form>

              
              
              }
                </div>
                </div>

            </div>


        </div>
        
    </div>
    
  );
  }
}

// codigo para criar novo veiculo
    //  <form onSubmit={this.handleSubmit}>
    //           <div class="row">
    //               <div class="col-md-6">
    //                   <div class="form-group">
    //                       <label>Licence Plate</label>
    //                       <div class="input-field "> 
    //                       <input type="text" pattern="(?:\d{2}-[A-Z]{2}-\d{2}|[A-Z]{2}-\d{2}-\d{2}|\d{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-\d{2}-[A-Z]{2}|[A-Z]{2}-[A-Z]{2}-\d{2}|\d{2}-[A-Z]{2}-[A-Z]{2})" id="matricula" onChange={(e => this.setState({ matricula: e.target.value }))} placeholder="AB-12-34" required/>
    //                       </div>
    //                   </div>
    //               </div>
    //               <div class="col-md-6">
    //                   <div class="form-group">
    //                       <label>Vehicle Brand</label>
    //                       <div class="input-field ">
    //                           <input type="text" id="vBrand" onChange={(e => this.setState({ vBrand: e.target.value }))} placeholder="Renault" required/>
    //                       </div>
    //                   </div>
    //               </div>
    //               <div class="col-md-6">
    //                   <div class="form-group">
    //                       <label>Capacity</label><label className="text-muted">U+00B3.</label>
    //                       <div class="input-field "> 
    //                           <input type="text" id="vCapacity" onChange={(e => this.setState({ capacity: e.target.value }))} placeholder="10 U+00B3." required/>
    //                       </div>
    //                   </div>
    //               </div>

    //               <button type="submit" class="btn-checkout btn btn-outline-light btn-dark" >Create</button>
    //           </div>
    //       </form>

