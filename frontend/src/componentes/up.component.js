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
      editUP: window.localStorage.getItem("editUP"),
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
      msgMorada: "",
      produtoID: "",
      veiculoID: "",
    };
    this.getCoordenadas = this.getCoordenadas.bind(this);
    this.handleUnidadeProducao = this.handleUnidadeProducao.bind(this);
    this.handleProduto= this.handleProduto.bind(this);
    this.handleVeiculo= this.handleVeiculo.bind(this);
    this.handleUnidade = this.handleUnidade.bind(this);


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
        window.localStorage.removeItem("produtoID");
        window.localStorage.removeItem("veiculoID");
        
    })

    const {unidadeID} = this.state;
    if(unidadeID !== null){
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
                  upCapacity: data.capacidade,
                  upName: data.nome,
                  upAddress: data.morada
                });
            if (data.morada && data.morada.length >= 6) {
              this.setState({
                rua: data.morada[0],
                localidade: data.morada[1],
                freguesia: data.morada[2],
                concelho: data.morada[3],
                cod_postal: data.morada[4],
                cidade: data.morada[5]
              });
            }
              //   console.log("this.state.unidade: ", this.state.unidades);
          }) 
      }catch(err){
          console.log(err);
      }
    }else{

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


handleNovoVeiculo(e){
  window.location.href = "/user/f/veiculo";
}

handleVeiculo(veiculoID) {
  window.localStorage.setItem("veiculoID", veiculoID);
  window.location.href = "/user/f/veiculo";
  console.log("veiculoID", veiculoID)
}


handleNovoProduto(e){
  window.location.href = "/user/f/produto";
}

handleProduto(produtoID) {
  window.localStorage.setItem("produtoID", produtoID);
  window.location.href = "/user/f/produto";
}

handleUnidade(e){
  var editUP = true;
  window.localStorage.setItem("unidadeID", this.state.unidadeID);
  window.localStorage.setItem("editUP", editUP);
  window.location.href = "/user/f/up";
};

  

render() {
  const { unidadeID, unidades, editUP } = this.state;
//1 é true em javascript
if (editUP == "1") {
  // Render the input fields with data from the database
  return (
    <div className="container">
      <div className="row">
        <div className="card d-flex border shadow-0 custom-card">
          <div className="m-4">
            <h2 className="card-title mb-4 text-dark">{this.state.nickname}'s Production Units</h2>
            <p>Teste 1 {editUP.toString()}</p>
            <br></br>
            <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <form onSubmit={this.handleSubmit}>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Name</label>
                            <div class="input-field "> 
                            <input type="text" id="upName" onChange={(e => this.setState({ upName: e.target.value }))} value={this.state.upName} required/>
                            </div>
                        </div>
                    </div>
                    <div class="border-top border-bottom pb-2">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Street</label>
                                    <div class="input-field "> 
                                    <input type="text" id="rua" onChange={(e => this.setState({ rua: e.target.value }))} value={this.state.rua}/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Location</label>
                                    <div class="input-field "> 
                                    <input type="text" id="localidae" onChange={(e => this.setState({ localidade: e.target.value }))} value={this.state.localidade}/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Parish</label>
                                    <div class="input-field "> 
                                    <input type="text" id="freguesia" onChange={(e => this.setState({ freguesia: e.target.value }))} value={this.state.freguesia}/>
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
                                    <input type="text" pattern="\d{4}-\d{3}" id="cod_postal" onChange={(e => this.setState({ cod_postal: e.target.value }))} value={this.state.cod_postal}/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>City</label>
                                    <div class="input-field "> 
                                    <input type="text" id="cidade" onChange={(e => this.setState({ cidade: e.target.value }))} value={this.state.cidade}/>
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
                                <input type="number" id="upCapacity" onChange={(e => this.setState({ upCapacity: e.target.value }))} value={this.state.upCapacity}required/>
                            </div>
                        </div>
                    </div>
  
                    <div>
                        {this.state.msgMorada !== "" ? 
                          this.state.msgMorada === "Error: Invalid address, please correct your address" ?
                              <label></label>
                              :
                              <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" onClick={this.handleUnidadeProducao}>Create</button>
  
                      :
                          <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" onClick={this.handleUnidadeProducao}>Create</button>
                          }
  
                    </div>
                </div>
            </form>
            </div>
          </div>
        </div>
      </div>
      <div>
            <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f">Back </a>
        </div>
    </div>
  );
} else {
  // Check if unidadeID exists in localStorage
  if (unidadeID != null) {
    // Render everything like the productsList
    return (
      <div className="container">
        <div className="row">
          <div className="card d-flex border shadow-0 custom-card">
            <div className="m-4">
              <h2 className="card-title mb-4 text-dark">{this.state.nickname}'s Production Units</h2>
              <p>Teste 2{editUP}</p>

              <br></br>
              <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {unidades.map((unidade, index) => (
                          <div className="row gy-3 mb-4 produto_carrinho" key={unidade._id}>
                            <div className="col-lg-12">
                              <h4>{unidade.nome}</h4>
                            </div>
                            <div className="col-lg-4">
                              <p>Address: {unidade.morada}</p>
                            </div>
                            <div className="col-lg-4">
                              <p>Coordinates: ({unidade.lat}, {unidade.lon})</p>
                            </div>
                            <div className="col-lg-4">
                              <a href="#" class="btn btn-light border icon-hover-danger" onClick={this.handleUnidade}> Edit Up's details</a>
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
                                      {item.img.startsWith('http') ? (
                                              <img className="border rounded me-3" style={{ width: '96px', height: '96px' }} src={item.img} alt="..." />
                                          ) : (
                                              <img className="border rounded me-3" style={{ width: '96px', height: '96px' }} src={`http://localhost:5000/images/${item.img.replace('public/images/', '')}`} alt="..." />

                                          )}
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
                                          <h6>{item.quantidade}</h6>
                                      </div>
                                      </div>
                                      <div className="col-lg-2 d-flex justify-content-end">
                                      <div className="row">
                                        <div className="float-md-end">
                                          <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => this.removerProduto(index)}>Remove</a>
                                        </div>
                                        <div className="float-md-end mt-2">
                                          <a href="#" className="btn btn-light border icon-hover-danger" onClick={() => this.handleProduto(item._id)}>Edit</a>
                                        </div>
                                      </div>
                                    </div>


                                      <hr />
                                  </div>
                                  ))}                
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                          <div className="row">
                            <div className="col-md-9"></div>
                            <div className="col-md-3 text-right">
                              <button type="submit" class="btn btn-outline-light btn-dark botaoPerfil" onClick={this.handleNovoProduto}>Create New Product</button>
                            </div>
                          </div>
                          </div>
                          <hr />
                          <div className="col-lg-12">
                            <h5>Vehicles:</h5>
                            <hr />
                            <div className="col">
                            <div className="d-flex">
                            <div className="col" style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
                            {unidade.listaVeiculos.map((veiculo, index) => (
                            <div className="row gy-3 mb-4 produto_carrinho" key={veiculo._id}>
                                <div className="col-lg-6">
                                <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                <div className="">
                                    <h6>Licence Plate</h6>
                                    <h6>{veiculo.matricula}</h6>
                                </div>
                                </div>
                                </div>

                                <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                                <div className="">
                                    <h6>Brand</h6>
                                    <h6>{veiculo.marca}</h6>
                                </div>
                                </div>
                                <div className="col-lg-2 col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                                <div className="form-outline">
                                    <h6>Capacity (m³)</h6>
                                    <h6>{veiculo.capacidade}</h6>

                                </div>
                                </div>
                                <div className="col-lg-2 d-flex justify-content-end">
                                    <div className="row">
                                      <div class="float-md-end">
                                        <a href="#" class="btn btn-light border text-danger icon-hover-danger" onClick={() => this.removerVeiculo(index)}> Remove</a>
                                      </div>
                                      <div class="float-md-end mt-2">
                                        <a href="#" class="btn btn-light border icon-hover-danger" onClick={() => this.handleVeiculo(veiculo._id)}> Edit</a>
                                      </div>
                                    </div>
                                  </div>
                                <hr />
                            </div>
                            ))}
                              
                                
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                      <div className="row">
                        <div className="col-md-9"></div>
                        <div className="col-md-3 text-right">
                          <button type="submit" class="btn btn-outline-light btn-dark botaoPerfil" onClick={this.handleNovoVeiculo}>Create New Vehicle</button>
                        </div>
                      </div>
                      </div>
                        
                    </div>
                      
                ))
                }
              </div>
            </div>
          </div>
        </div>
        <div>
            <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f">Back </a>
        </div>
      </div>
    );
  } else {
    // Render the inputs to create a new one
    return (
      <div className="container">
        <div className="row">
          <div className="card d-flex border shadow-0 custom-card">
            <div className="m-4">
              <h2 className="card-title mb-4 text-dark">{this.state.nickname}'s Production Units</h2>
              <p>Teste 3{editUP}</p>
              <br></br>
              <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <form onSubmit={this.handleSubmit}>
              <div class="row">
                  <div class="col-md-6">
                      <div class="form-group">
                          <label>Name</label>
                          <div class="input-field "> 
                          <input type="text" id="upName" onChange={(e => this.setState({ upName: e.target.value }))} placeholder="Factory" required/>
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
                              <input type="number" id="upCapacity" onChange={(e => this.setState({ upCapacity: e.target.value }))} placeholder="10 U+00B3." required/>
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
              </div>
            </div>
          </div>
        </div>
        <div>
            <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f">Back </a>
        </div>
      </div>
 
    );
  }
}

  // return (
    
  //   <div class="container">
  //   <div class="row">
  //       <div class="card d-flex border shadow-0 custom-card">
  //           <div class="m-4">
  //           <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Production Units</h2>
  //           <br></br>
  //           <div class="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
  //            {editUP !== true ?
  //                unidadeID != null ? (         
  //                 console.log("editUP dentro do render 2", editUP),
  //                 unidades.length == 0 ? (
  //                 <div class="carrinho-vazio">
  //                     <br></br>
  //                     <h5 class="text-secondary justify-content-md-center">You don't have Production Units!</h5>
  //                 </div>
  //                 ) : (
                //       unidades.map((unidade, index) => (
                //           <div className="row gy-3 mb-4 produto_carrinho" key={unidade._id}>
                //             <div className="col-lg-12">
                //               <h4>{unidade.nome}</h4>
                //             </div>
                //             <div className="col-lg-4">
                //               <p>Address: {unidade.morada}</p>
                //             </div>
                //             <div className="col-lg-4">
                //               <p>Coordinates: ({unidade.lat}, {unidade.lon})</p>
                //             </div>
                //             <div className="col-lg-4">
                //               <a href="#" class="btn btn-light border icon-hover-danger" onClick={this.handleUnidade}> Edit Up's details</a>
                //             </div>
                //             <div className="col-lg-12">
                //             <h5>Products:</h5>
                //               <hr />
                //             </div>
                //             <div className="col">
                //               <div className="d-flex">
                //                 <div className="col" style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
                                  
                //                   {unidade.listaProdutos.map((item, index) => (
                //                   <div className="row gy-3 mb-4 produto_carrinho" key={item.nome}>
                //                       <div className="col-lg-2">
                //                       {item.img.startsWith('http') ? (
                //                               <img className="border rounded me-3" style={{ width: '96px', height: '96px' }} src={item.img} alt="..." />
                //                           ) : (
                //                               <img className="border rounded me-3" style={{ width: '96px', height: '96px' }} src={`http://localhost:5000/images/${item.img.replace('public/images/', '')}`} alt="..." />

                //                           )}
                //                       </div>
                //                       <div className="col-lg-4">
                //                       <div className="me-lg-5">
                //                           <div className="d-flex">
                //                           <div className="">
                //                               <a href="#" className="nav-link">
                //                               {item.name}
                //                               </a>
                //                           </div>
                //                           </div>
                //                       </div>
                //                       </div>
                //                       <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                //                       <div className="">
                //                           <h6>Price</h6>
                //                           <h6>{item.preco}€</h6>
                //                       </div>
                //                       </div>
                //                       <div className="col-lg-2 col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                //                       <div className="form-outline">
                //                           <h6>Quantity</h6>
                //                           <h6>{item.quantidade}</h6>
                //                       </div>
                //                       </div>
                //                       <div className="col-lg-2 d-flex justify-content-end">
                //                       <div className="row">
                //                         <div className="float-md-end">
                //                           <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => this.removerProduto(index)}>Remove</a>
                //                         </div>
                //                         <div className="float-md-end mt-2">
                //                           <a href="#" className="btn btn-light border icon-hover-danger" onClick={() => this.handleProduto(item._id)}>Edit</a>
                //                         </div>
                //                       </div>
                //                     </div>


                //                       <hr />
                //                   </div>
                //                   ))}                
                //               </div>
                //             </div>
                //           </div>
                //           <div className="col-lg-12">
                //           <div className="row">
                //             <div className="col-md-9"></div>
                //             <div className="col-md-3 text-right">
                //               <button type="submit" class="btn btn-outline-light btn-dark botaoPerfil" onClick={this.handleNovoProduto}>Create New Product</button>
                //             </div>
                //           </div>
                //           </div>
                //           <hr />
                //           <div className="col-lg-12">
                //             <h5>Vehicles:</h5>
                //             <hr />
                //             <div className="col">
                //             <div className="d-flex">
                //             <div className="col" style={{ maxHeight: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
                //             {unidade.listaVeiculos.map((veiculo, index) => (
                //             <div className="row gy-3 mb-4 produto_carrinho" key={veiculo._id}>
                //                 <div className="col-lg-6">
                //                 <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                //                 <div className="">
                //                     <h6>Licence Plate</h6>
                //                     <h6>{veiculo.matricula}</h6>
                //                 </div>
                //                 </div>
                //                 </div>

                //                 <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                //                 <div className="">
                //                     <h6>Brand</h6>
                //                     <h6>{veiculo.marca}</h6>
                //                 </div>
                //                 </div>
                //                 <div className="col-lg-2 col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                //                 <div className="form-outline">
                //                     <h6>Capacity (m³)</h6>
                //                     <h6>{veiculo.capacidade}</h6>

                //                 </div>
                //                 </div>
                //                 <div className="col-lg-2 d-flex justify-content-end">
                //                     <div className="row">
                //                       <div class="float-md-end">
                //                         <a href="#" class="btn btn-light border text-danger icon-hover-danger" onClick={() => this.removerVeiculo(index)}> Remove</a>
                //                       </div>
                //                       <div class="float-md-end mt-2">
                //                         <a href="#" class="btn btn-light border icon-hover-danger" onClick={() => this.handleVeiculo(veiculo._id)}> Edit</a>
                //                       </div>
                //                     </div>
                //                   </div>
                //                 <hr />
                //             </div>
                //             ))}
                              
                                
                //             </div>
                //           </div>
                //         </div>
                //       </div>
                //       <div className="col-lg-12">
                //       <div className="row">
                //         <div className="col-md-9"></div>
                //         <div className="col-md-3 text-right">
                //           <button type="submit" class="btn btn-outline-light btn-dark botaoPerfil" onClick={this.handleNovoVeiculo}>Create New Vehicle</button>
                //         </div>
                //       </div>
                //       </div>
                        
                //     </div>
                      
                // ))
                // )
  //             ) : (
  //               console.log("editUP dentro do render 3", editUP),
          //       <form onSubmit={this.handleSubmit}>
          //     <div class="row">
          //         <div class="col-md-6">
          //             <div class="form-group">
          //                 <label>Name</label>
          //                 <div class="input-field "> 
          //                 <input type="text" id="upName" onChange={(e => this.setState({ upName: e.target.value }))} placeholder="Factory" required/>
          //                 </div>
          //             </div>
          //         </div>
          //         <div class="border-top border-bottom pb-2">
          //             <div class="row">
          //                 <div class="col-md-6">
          //                     <div class="form-group">
          //                         <label>Street</label>
          //                         <div class="input-field "> 
          //                         <input type="text" id="rua" onChange={(e => this.setState({ rua: e.target.value }))} placeholder={this.state.rua}/>
          //                         </div>
          //                     </div>
          //                 </div>
          //                 <div class="col-md-6">
          //                     <div class="form-group">
          //                         <label>Location</label>
          //                         <div class="input-field "> 
          //                         <input type="text" id="localidae" onChange={(e => this.setState({ localidade: e.target.value }))} placeholder={this.state.localidade}/>
          //                         </div>
          //                     </div>
          //                 </div>
          //                 <div class="col-md-6">
          //                     <div class="form-group">
          //                         <label>Parish</label>
          //                         <div class="input-field "> 
          //                         <input type="text" id="freguesia" onChange={(e => this.setState({ freguesia: e.target.value }))} placeholder={this.state.freguesia}/>
          //                         </div>
          //                     </div>
          //                 </div>
          //                 <div class="col-md-6">
          //                     <div class="form-group">
          //                         <label>County</label>
          //                         <div class="input-field "> 
          //                         <input type="text" id="concelho" onChange={(e => this.setState({ concelho: e.target.value }))} placeholder={this.state.concelho}/>
          //                         </div>
          //                     </div>
          //                 </div>
          //                 <div class="col-md-6">
          //                     <div class="form-group">
          //                         <label>Postal Code</label>
          //                         <div class="input-field "> 
          //                         <input type="text" pattern="\d{4}-\d{3}" id="cod_postal" onChange={(e => this.setState({ cod_postal: e.target.value }))} placeholder={this.state.cod_postal}/>
          //                         </div>
          //                     </div>
          //                 </div>
          //                 <div class="col-md-6">
          //                     <div class="form-group">
          //                         <label>City</label>
          //                         <div class="input-field "> 
          //                         <input type="text" id="cidade" onChange={(e => this.setState({ cidade: e.target.value }))} placeholder={this.state.cidade}/>
          //                         </div>
          //                     </div>
          //                 </div>
          //         </div>
          //         <button onClick={this.getCoordenadas} class="btn btn-outline-light btn-dark col-md-3">
          //             Verify Address
          //             </button>
          //             {this.state.msgMorada != "" ? 
                      
          //             <label><br></br>{this.state.msgMorada}</label>
          //             :
          //             <label></label>
          //             }
          //         </div>                     

          //         <div class="col-md-6">
          //             <div class="form-group">
          //                 <label>Capacity (m&sup3;)  </label>
          //                 <div class="input-field "> 
          //                     <input type="number" id="upCapacity" onChange={(e => this.setState({ upCapacity: e.target.value }))} placeholder="10 U+00B3." required/>
          //                 </div>
          //             </div>
          //         </div>

          //         <div>
          //             {this.state.msgMorada != "" ? 
          //               this.state.msgMorada == "Error: Invalid address, please correct your address" ?
          //                   <label></label>
          //                   :
          //                   <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" onClick={this.handleUnidadeProducao}>Create</button>

          //           :
          //               <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" onClick={this.handleUnidadeProducao}>Create</button>
          //               }

          //         </div>
          //     </div>
          // </form>
  //             )
                // aqui é para criar uma nova
//               : 
            //   <form onSubmit={this.handleSubmit}>
            //     <div class="row">
            //     {console.log("editUP dentro do render 4", editUP)}
            //         <div class="col-md-6">
            //             <div class="form-group">
            //                 <label>Name</label>
            //                 <div class="input-field "> 
            //                 <input type="text" id="upName" onChange={(e => this.setState({ upName: e.target.value }))} value={this.state.upName} required/>
            //                 </div>
            //             </div>
            //         </div>
            //         <div class="border-top border-bottom pb-2">
            //             <div class="row">
            //                 <div class="col-md-6">
            //                     <div class="form-group">
            //                         <label>Street</label>
            //                         <div class="input-field "> 
            //                         <input type="text" id="rua" onChange={(e => this.setState({ rua: e.target.value }))} value={this.state.rua}/>
            //                         </div>
            //                     </div>
            //                 </div>
            //                 <div class="col-md-6">
            //                     <div class="form-group">
            //                         <label>Location</label>
            //                         <div class="input-field "> 
            //                         <input type="text" id="localidae" onChange={(e => this.setState({ localidade: e.target.value }))} value={this.state.localidade}/>
            //                         </div>
            //                     </div>
            //                 </div>
            //                 <div class="col-md-6">
            //                     <div class="form-group">
            //                         <label>Parish</label>
            //                         <div class="input-field "> 
            //                         <input type="text" id="freguesia" onChange={(e => this.setState({ freguesia: e.target.value }))} value={this.state.freguesia}/>
            //                         </div>
            //                     </div>
            //                 </div>
            //                 <div class="col-md-6">
            //                     <div class="form-group">
            //                         <label>County</label>
            //                         <div class="input-field "> 
            //                         <input type="text" id="concelho" onChange={(e => this.setState({ concelho: e.target.value }))} placeholder={this.state.concelho}/>
            //                         </div>
            //                     </div>
            //                 </div>
            //                 <div class="col-md-6">
            //                     <div class="form-group">
            //                         <label>Postal Code</label>
            //                         <div class="input-field "> 
            //                         <input type="text" pattern="\d{4}-\d{3}" id="cod_postal" onChange={(e => this.setState({ cod_postal: e.target.value }))} value={this.state.cod_postal}/>
            //                         </div>
            //                     </div>
            //                 </div>
            //                 <div class="col-md-6">
            //                     <div class="form-group">
            //                         <label>City</label>
            //                         <div class="input-field "> 
            //                         <input type="text" id="cidade" onChange={(e => this.setState({ cidade: e.target.value }))} value={this.state.cidade}/>
            //                         </div>
            //                     </div>
            //                 </div>
            //         </div>
            //         <button onClick={this.getCoordenadas} class="btn btn-outline-light btn-dark col-md-3">
            //             Verify Address
            //             </button>
            //             {this.state.msgMorada != "" ? 
                        
            //             <label><br></br>{this.state.msgMorada}</label>
            //             :
            //             <label></label>
            //             }
            //         </div>                     
  
            //         <div class="col-md-6">
            //             <div class="form-group">
            //                 <label>Capacity (m&sup3;)  </label>
            //                 <div class="input-field "> 
            //                     <input type="number" id="upCapacity" onChange={(e => this.setState({ upCapacity: e.target.value }))} value={this.state.upCapacity}required/>
            //                 </div>
            //             </div>
            //         </div>
  
            //         <div>
            //             {this.state.msgMorada !== "" ? 
            //               this.state.msgMorada === "Error: Invalid address, please correct your address" ?
            //                   <label></label>
            //                   :
            //                   <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" onClick={this.handleUnidadeProducao}>Create</button>
  
            //           :
            //               <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" onClick={this.handleUnidadeProducao}>Create</button>
            //               }
  
            //         </div>
            //     </div>
            // </form>
              
              
              
//               }
//                <div>
//                 <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f">Back </a>
//                 </div>
//                 </div>
                
//                 </div>

               

//             </div>


//         </div>
        
//     </div>
    
//   );
  }
}



