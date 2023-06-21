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
      msgMorada: "",
      produtoID: "",
      veiculoID: "",
      msg: "",
      showConfirmationDialog: false,
      msgRemoved: "",
      remove: "",
      confirmationDialogId: "",
      showProducts: false,
      showVehicles: false
    };
    this.getCoordenadas = this.getCoordenadas.bind(this);
    this.handleUnidadeProducao = this.handleUnidadeProducao.bind(this);
    this.handleProduto= this.handleProduto.bind(this);
    this.handleVeiculo= this.handleVeiculo.bind(this);
    this.showConfirmationDialog = this.showConfirmationDialog.bind(this);
    this.hideConfirmationDialog = this.hideConfirmationDialog.bind(this);
    this.handleRemoveUP = this.handleRemoveUP.bind(this);
    this.handleRemoveVeiculo = this.handleRemoveVeiculo.bind(this);
    this.handleRemoveProduto = this.handleRemoveProduto.bind(this);
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
  const { unidadeID, idFornecedor, upName, upAddress, listaProdutos, listaVeiculos, lat, lon, upCapacity} = this.state;
  console.log(unidadeID, idFornecedor, upName, upAddress, listaProdutos, listaVeiculos, lat,lon, upCapacity);
  fetch("http://localhost:5000/user/unidadeProducao",{
      method:"POST",
      crossDomain:true,
      headers:{
          "Content-type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
          unidadeID,
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
      if (data.status === "error") {
        throw new Error(data.error); // Throw an error if the response has the status "error"
      }else{
        this.setState({ msg: "Produtcion Unit updated successfully" });
      }
  })
  .catch((error) => {
    console.log(error);
    this.setState({ msg: "Error updating Produtcion Unit" }); // Set the error message in the state

  });
};

// Method to show the confirmation dialog
showConfirmationDialog() {
  this.setState({ showConfirmationDialog: true });
}

// Method to hide the confirmation dialog
hideConfirmationDialog() {
  this.setState({ showConfirmationDialog: false });
}


handleNovoVeiculo(e){
  window.location.href = "/user/f/veiculo";
}

handleVeiculo(veiculoID) {
  window.localStorage.setItem("veiculoID", veiculoID);
  window.location.href = "/user/f/veiculo";
  console.log("veiculoID", veiculoID)
}

handleRemoveVeiculo(){
  const { confirmationDialogId, unidadeID } = this.state
  console.log("confirmationDialogId", confirmationDialogId)
  const base_url = "http://localhost:5000/user/veiculos"
  const url = `${base_url}?id=${confirmationDialogId}&unidadeProducaoId=${unidadeID}`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok') {
        console.log('Document deleted:', data.data);
        this.setState({ msgRemoved: "Vehicle Was Deleted" });

      } else {
        console.log('Error:', data.data);
        // Handle the error case appropriately
      }
    })
    .catch((error) => {
      console.log('Error:', error);
      // Handle any network or fetch-related errors
    });
  };


handleNovoProduto(e){
  window.location.href = "/user/f/produto";
}

handleProduto(produtoID) {
  window.localStorage.setItem("produtoID", produtoID);
  window.location.href = "/user/f/produto";
}

handleRemoveProduto(){
  const { confirmationDialogId, unidadeID } = this.state
  console.log("confirmationDialogId", confirmationDialogId)
  const base_url = "http://localhost:5000/produto"
  const url = `${base_url}?id=${confirmationDialogId}&unidadeProducaoId=${unidadeID}`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok') {
        console.log('Document deleted:', data.data);
        this.setState({ msgRemoved: "Product Was Deleted" });

      } else {
        console.log('Error:', data.data);
        // Handle the error case appropriately
      }
    })
    .catch((error) => {
      console.log('Error:', error);
      // Handle any network or fetch-related errors
    });
  };

handleEditUP(unidadeID){
  window.localStorage.setItem("unidadeID", unidadeID);
  window.location.href = "/user/f/up/edit";
}

handleRemoveUP(){
  const { unidadeID } = this.state
  console.log("unidadeID", unidadeID)
  const base_url = "http://localhost:5000/user/unidadeProducao"
  const url = `${base_url}?id=${unidadeID}`;
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok') {
        console.log('Document deleted:', data.data);
        this.setState({ msgRemoved: "Produtcion Unit Was Deleted" });
        
      } else {
        console.log('Error:', data.data);
        // Handle the error case appropriately
      }
    })
    .catch((error) => {
      console.log('Error:', error);
      // Handle any network or fetch-related errors
    });
  };

  toggleProducts = () => {
    this.setState((prevState) => ({
      showProducts: !prevState.showProducts,
    }));
  };

  toggleVehicles = () => {
    this.setState((prevState) => ({
      showVehicles: !prevState.showVehicles,
    }));
  };
 

render() {
  const { unidadeID, unidades } = this.state;
//   console.log("dentro do render: ", unidades)
  return (
    
    <div class="container" >
    <div class="row" >
        <div class="cardP border shadow-0 custom-cardUP" >
            <div class="m-4">
            <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Production Units</h2>
            <br></br>
            <div class="cardP-body" style={{ overflowY: 'auto' }}>
 

             {this.state.msgRemoved === "" ?
            
             (unidadeID != null ? 
            
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
                        <div className="col-lg-4">
                          <p>Address: {unidade.morada}</p>
                        </div>
                        <div className="col-lg-4">
                          <p>Coordinates: ({unidade.lat}, {unidade.lon})</p>
                        </div>
                        <div className="col-lg-2 d-flex justify-content-end">
                          <div className="row">
                            {/* <div className="col-md-auto">
                            <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => this.showConfirmationDialog()}>
                              Remove Production Unit
                            </a> */}
                            {this.state.showConfirmationDialog && this.state.remove === "up" && this.state.confirmationDialogId === unidade._id  ? (
                              
                              <div className="confirmation-dialog">
                                <h6>Are you sure you want to remove this Production Unit?</h6>
                                <div>
                                  <button className="btn btn-danger" onClick={() => this.handleRemoveUP(unidade._id)}>
                                    Confirm
                                  </button>&nbsp;
                                  <button className="btn btn-secondary" onClick={() => this.hideConfirmationDialog()}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            )
                          :
                          (<div className="col-md-auto">
                          <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => { this.setState({ remove: "up" , confirmationDialogId: unidade._id}); this.showConfirmationDialog();}}>
                            Remove Production Unit
                          </a>
                          </div>
                          )
                          }
                            {/* </div> */}
                            <div className="col-md-auto mt-2">
                              <a href="#" className="btn btn-light border icon-hover-danger" onClick={() => this.handleEditUP(unidadeID)}>Edit Production Unit</a>
                            </div>
                          </div>
                        </div>                    
                        <div className="col-lg-12">
                          <div className="d-flex align-items-center">
                            <h5 className="me-3">Products:</h5>
                            <div className="ms-3">
                              <button
                                className="btn btn-secondary me-2"
                                onClick={this.toggleProducts}
                              >
                                {this.state.showProducts ? 'Hide Products' : 'View All Products'}
                              </button>
                              <button className="btn btn-light border icon-hover-danger" onClick={this.handleNovoProduto}>
                                Create New Product
                              </button>
                            </div>
                          </div>
                          <hr />
                        </div>

                          {this.state.showProducts && (
                            <div className="d-flex">
                            <div className="col" style={{ overflowY: 'auto', overflowX: 'hidden' }}>
                                
                                {unidade.listaProdutos.map((item, index) => (
                                <div className="row gy-3 mb-4 produto_carrinho" key={item.nome}>
                                    <div className="col-lg-2">
                                     {item.img.startsWith('http') ? (
                                            <img className="border rounded me-3" style={{ width: '96px', height: '96px' }} src={item.img} alt={item.nome} />
                                        ) : (
                                            <img className="border rounded me-3" style={{ width: '96px', height: '96px' }} src={`http://localhost:5000/images/${item.img.replace('public/images/', '')}`} alt={item.nome} />

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
                                    {this.state.showConfirmationDialog && this.state.remove === "produto" && this.state.confirmationDialogId === item._id ? (
                                      <div className="confirmation-dialog">
                                        <h6>Are you sure you want to remove this Product</h6>
                                        <div>
                                          <button className="btn btn-danger" onClick={() => this.handleRemoveProduto(item._id)}>
                                            Confirm
                                          </button>&nbsp;
                                          <button className="btn btn-secondary" onClick={() => this.hideConfirmationDialog()}>
                                            Cancel
                                          </button>
                                        </div>
                                      </div>
                                    )
                                  :
                                  (<div className="col-md-auto">
                                  <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => { this.setState({ remove: "produto", confirmationDialogId: item._id}); this.showConfirmationDialog();}}>
                                    Remove 
                                  </a>
                                  </div>
                                  )
                                  }
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
                        
                        )}    
                     
                          <div className="col-lg-12">
                            <div className="d-flex align-items-center">
                              <h5 className="me-3">Vehicles:</h5>
                              <div className="ms-3">
                                <button
                                  className="btn btn-secondary me-2"
                                  onClick={this.toggleVehicles}
                                >
                                  {this.state.showVehicles ? 'Hide Vehicles' : 'View All Vehicles'}
                                </button>
                                <button className="btn btn-light border icon-hover-danger" onClick={this.handleNovoVeiculo}>
                                  Create New Vehicle
                                </button>
                              </div>
                            </div>
                            <hr />
                          </div>
                            {this.state.showVehicles && (
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
                                        {this.state.showConfirmationDialog && this.state.remove === "veiculo" && this.state.confirmationDialogId === veiculo._id ? (
                                        <div className="confirmation-dialog">
                                          <h6>Are you sure you want to remove this Vehicle?</h6>
                                          <div>
                                            <button className="btn btn-danger" onClick={() => this.handleRemoveVeiculo(veiculo._id)}>
                                              Confirm
                                            </button>&nbsp;
                                            <button className="btn btn-secondary" onClick={() => this.hideConfirmationDialog()}>
                                              Cancel
                                            </button>
                                          </div>
                                        </div>
                                      )
                                    :
                                    (<div className="col-md-auto">
                                    <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => { this.setState({ remove: "veiculo", confirmationDialogId: veiculo._id }); this.showConfirmationDialog();}}>
                                      Remove
                                    </a>
                                    </div>
                                    )
                                    }
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
                      )}
                     
                      {/* <div className="col-lg-12">
                      <div className="row">
                        <div className="col-md-9"></div>
                        <div className="col-md-3 text-right">
                          <button type="submit" class="btn btn-outline-light btn-dark botaoPerfil" onClick={this.handleNovoVeiculo}>Create New Vehicle</button>
                        </div>
                      </div>
                      </div> */}
                        
                    </div>
                      
                ))
                )
              :
              this.state.msg === "" ? 
                (
            <div>
                <form onSubmit={this.handleUnidadeProducao}>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Name</label>
                            <div class="input-field "> 
                            <input type="text" id="upName" onChange={(e => this.setState({ upName: e.target.value }))}required/>
                            </div>
                        </div>
                    </div>
                    <div class="border-top border-bottom pb-2">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Street</label>
                                    <div class="input-field "> 
                                    <input type="text" id="rua" onChange={(e => this.setState({ rua: e.target.value }))} required/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Location</label>
                                    <div class="input-field "> 
                                    <input type="text" id="localidae" onChange={(e => this.setState({ localidade: e.target.value }))} required/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Parish</label>
                                    <div class="input-field "> 
                                    <input type="text" id="freguesia" onChange={(e => this.setState({ freguesia: e.target.value }))} required/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>County</label>
                                    <div class="input-field "> 
                                    <input type="text" id="concelho" onChange={(e => this.setState({ concelho: e.target.value }))} required/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Postal Code</label>
                                    <div class="input-field "> 
                                    <input type="text" pattern="\d{4}-\d{3}" id="cod_postal" onChange={(e => this.setState({ cod_postal: e.target.value }))}required/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>City</label>
                                    <div class="input-field "> 
                                    <input type="text" id="cidade" onChange={(e => this.setState({ cidade: e.target.value }))} required/>
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
                                <input type="number" id="upCapacity" onChange={(e => this.setState({ upCapacity: e.target.value }))} required/>
                            </div>
                        </div>
                    </div>

                    <div>
                        {this.state.msgMorada != "" ? 
                          this.state.msgMorada == "Error: Invalid address, please correct your address" ?
                              <label></label>
                              :
                              <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" >Create</button>

                      :
                          <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" >Create</button>
                          }

                    </div>
                </div>
            </form>
            </div>
                ):(
                  <div class="card d-flex border shadow-0 custom-card">
                     
                      <div class="carrinho-vazio">
                      <br></br>
                          <h4 class="text-secondary justify-content-md-center">{this.state.msg}!</h4>
                      </div>
                      
                  </div>
                )
             ) : (
              <div class="card d-flex border shadow-0 custom-card">
                  
                      <div class="carrinho-vazio">
                      <br></br>
                          <h4 class="text-secondary justify-content-md-center">{this.state.msgRemoved}!</h4>
                      </div>
                      {/* <div>
                      <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f/allup">Back </a>
                      </div> */}
                    
                  </div>
             )
              }
               
                </div>
                <div>
                      <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f/allup">Back </a>
                      </div>
                
                </div>
                
               

            </div>


        </div>
        
    </div>
    
  );
  }
}


