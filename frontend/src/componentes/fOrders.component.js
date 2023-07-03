import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
import { MDBCheckbox } from 'mdb-react-ui-kit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autosuggest from "react-autosuggest";
import { now } from "mongoose";

export default class OrdersF extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      distancia: 1010,
      arrastando: false,
      encomendas: [],
      startDate: null,
      endDate: null,
      categories: ["Baby","Sports","Animals","Cosmetics","DIY","Smartphones","Tech","Decoration","Gardening","Gaming","TVs","Toys","Appliances","Photography","Books"], 
      searchValue: "", 
      selectedCategories: [], 
      filteredEncomendas: [],  
      showProducts: {},  
      msgErro: "",
      selectedVehicleId: ""
    };
  }
  //Aplicação do filtro
  filtrarEncomendas = () => {
    const { encomendas, startDate, endDate, selectedCategories } = this.state;
    const distancia = this.state.distancia;
  
  // Filtrar por intervalo de datas
  const filteredByDate = encomendas.map((encomenda) => {
    const produtosEncomenda = encomenda.UP.produtos_encomenda;
    const filteredProdutos = produtosEncomenda.filter((venda) => {
      const dataEncomenda = new Date(venda.produto.data);
      return (
        (!startDate || dataEncomenda >= startDate) &&
        (!endDate || dataEncomenda <= endDate)
      );
    });

    // Criar uma nova encomenda apenas com os produtos filtrados
    return { ...encomenda, UP: { ...encomenda.UP, produtos_encomenda: filteredProdutos } };
  });
    // Filtrar por categorias
    const filteredByCategory = filteredByDate.filter((encomenda) => {
      if (selectedCategories.length === 0) {
        return true; // Inclui todas as encomendas quando não há categorias selecionadas
      }
  
      const produtosEncomenda = encomenda.UP.produtos_encomenda;
      return produtosEncomenda.some((venda) =>
        selectedCategories.includes(venda.produto.produto.categorieB)
      );
    });
  
    const filteredByDistance = filteredByCategory.filter((encomenda) => {
      const produtosEncomenda = encomenda.UP.produtos_encomenda;
      const filteredProdutos = produtosEncomenda.filter((venda) => {
        const proximity = this.calculateDistance(
          parseFloat(this.state.lat_user), // Convert to float
          parseFloat(this.state.lon_user), // Convert to float
          parseFloat(venda.consumidor_lat), // Convert to float
          parseFloat(venda.consumidor_lon) // Convert to float
        );
        venda.produto.proximity = proximity; // Adicionando a propriedade "proximity" ao objeto produto
        return proximity <= distancia;
      });
      return filteredProdutos.length > 0;
    });
  
    this.setState({ filteredEncomendas: filteredByDistance });
  };
  
  
  

  //Funcoes do filtro da categoria

  handleDeleteCategory = (category) => {
    const { selectedCategories } = this.state;
    const updatedCategories = selectedCategories.filter(c => c !== category);
  
    this.setState({
      selectedCategories: updatedCategories
    });
  };

  
  handleSearchChange = (event, { newValue }) => {
    this.setState({
      searchValue: newValue
    });
  };

  renderSuggestions = ({ value }) => {
    const { categories } = this.state;
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0
      ? []
      : categories.filter(
          category => category.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  handleSuggestionSelected = (event, { suggestion }) => {
    const { selectedCategories } = this.state;
  
    if (selectedCategories.includes(suggestion)) {
      return; // Categoria já selecionada, não faz nada
    }
  
    const newSelectedCategories = [...selectedCategories, suggestion];
  
    this.setState({
      selectedCategories: newSelectedCategories,
      searchValue: "" // Limpar o valor do campo de pesquisa após a seleção
    });
  };
  

//funcoes o filtro da data

  handleStartDateChange = (date) => {
    this.setState({
      startDate: date
    });
  };

  handleEndDateChange = (date) => {
    this.setState({
      endDate: date
    });
  };

//funcoes do filtro da distancia

moverBola = (event) => {
  if (this.state.arrastando) {
    const barra = document.getElementById("barra");
    const barraEsquerda = barra.getBoundingClientRect().left;
    const mouseX = event.clientX - barraEsquerda;
    const larguraBarra = barra.offsetWidth;
    const incremento = 10;
    const maxDistancia = 1000; // reduzido em 10 para ajustar a barra começando em 10

    const novaDistancia = Math.floor((mouseX / larguraBarra) * maxDistancia);
    const distanciaAjustada = Math.min(Math.max(novaDistancia, 10), maxDistancia + 10); // ajustado o valor mínimo e máximo
    const distanciaIncrementada = Math.ceil(distanciaAjustada / incremento) * incremento;

    this.setState({ distancia: distanciaIncrementada });
  }
};


  iniciarArrasto = () => {
    this.setState({ arrastando: true });
  };

  pararArrasto = () => {
    this.setState({ arrastando: false });
  };

//--------------------------------------------------------------

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


//----------------------------------------------------------------
  componentDidMount() {
    fetch("http://localhost:5000/user/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        
        this.setState({ nickname: data.data.nickname, id_consumidor: data.data._id, lat_user:data.data.lat, lon_user: data.data.lon});
        fetch(`http://localhost:5000/fornecedor/orders/${data.data._id}`)
          .then((response) => response.json())
          .then((data1) => {
            console.log(data1, "EncomendaData");
            this.setState({ encomendas: data1, filteredEncomendas: data1});
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

  toggleProducts = (upName) => {
    this.setState((prevState) => ({
      showProducts: {
        ...prevState.showProducts,
        [upName]: !prevState.showProducts[upName],
      },
    }));
  };

  handleVehicleSelection(e, consumidorID, produtoID, quantidade) {  
    // Fetch request to the route with the selected vehicle ID
    fetch(`http://localhost:5000/fornecedor/veiculo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consumidorID: consumidorID,
        produtoID: produtoID,
        quantidade: quantidade
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        if(data.status === "ok"){
          console.log(data.data, "Veiculo Associado");
          window.location.reload();
        }else{
          console.log(data.message)
          this.setState({ msgErro: data.message})
        }
      })
      .catch((error) => {
        console.log('Error:', error);
        // Handle any errors
      });
  }

  handleNotificationSend(consumidorID, produtoID, quantidade) {
    fetch("http://localhost:5000/user/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const idFrom = data.data._id; // Set idFrom as the idLogado value

        this.setState({ nickname: data.data.nickname, idLogado: idFrom, lat_user:data.data.lat, lon_user: data.data.lon});
        fetch("http://localhost:5000/user/notificationsOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idFrom,
          idTo: consumidorID,
          produtoID: produtoID,
          title: "Produto Shipped",
          dateMsg: new Date(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            // Notification creation successful
            console.log("Notification created successfully!");
            // Perform any additional actions here
          } else {
            // Notification creation failed
            console.log("Error creating notification:", data.error);
            // Handle the error or display an error message
          }
        })
        .catch((error) => {
          console.log("Error creating notification:", error);
          // Handle the error or display an error message
        });
      });
  }

  handleCreateVehicle(unidadeID){
    console.log("unidadeID", unidadeID)
    window.localStorage.setItem("unidadeID",unidadeID )
    window.location ="/user/f/veiculo"
  }

  handleAddQuantity(unidadeID, produtoID){
    console.log("unidadeID", unidadeID)
    console.log("produtoID", produtoID)
    window.localStorage.setItem("unidadeID",unidadeID )
    window.localStorage.setItem("produtoID",produtoID )
    window.location ="/user/f/produto"
  }

  countPendingProducts(up) {
    let pendingCount = 0;
  
    up.produtos_encomenda.forEach((produto) => {
      if (produto.estado === "Pending") {
        pendingCount += 1;
      }
    });
  
    return pendingCount;
  }

  handleVehicleChange = (event) => {
    const selectedVehicleId = event.target.value;
    this.setState({ selectedVehicle: selectedVehicleId });
  };
  
  
  

render() {
  


  const { distancia } = this.state;
  const maxDistancia = 1010;
  const distanciaFormatada = distancia <= 1000 ? `${distancia} km` : "More than 1000 km";
  const { startDate, endDate } = this.state;
  const { searchValue, selectedCategories } = this.state;
  const { encomendas } = this.state;
  const { filteredEncomendas } = this.state;
  
  
  return (
    <div class="container">
    <div class="row">
        <div class="col-lg-8">
  
            <div className="cardP border shadow-0 custom-cardUP">
              <div className="m-4">
                <h2 className="card-title mb-4 text-dark">{this.state.nickname}'s Orders</h2>
                <br></br>
                <div className="cardP-body" style={{ overflowY: 'auto' }}>
                {filteredEncomendas.length === 0 ? (
                  <div className="relatorio-vazio">
                    <br></br>
                    <h5 className="text-secondary justify-content-md-center">
                      {this.state.nickname} hasn't sold any products yet
                    </h5>
                  </div>
                ) : (
                  filteredEncomendas.map((encomenda) => (
                    <div className="row gy-3 mb-4 produto_carrinho" key={encomenda.UP}>
                    
                        <div className="me-lg-5">
                          <h4 className="justify-content-sm-left">
                            <button
                              className="btn btn-link"
                              onClick={() => this.toggleProducts(encomenda.UP.nome)}
                            >
                              {this.state.showProducts[encomenda.UP.nome] ? (
                                <i className="bi bi-chevron-down"></i>
                              ) : (
                                <i className="bi bi-chevron-right"></i>
                              )}
                            </button>
                            <i className="bi bi-building"></i>&nbsp; UP NAME: {encomenda.UP.nome} 
                            {this.countPendingProducts(encomenda.UP) > 0 && (
                              <span className="badge bg-light text-danger ms-1 rounded-pill">
                                {this.countPendingProducts(encomenda.UP)}
                              </span>
                            )}
                          </h4>
                          {this.state.showProducts[encomenda.UP.nome] && (
                            <div>
                              <br></br>
                              <h5 className="">Ordered Products from this Production Unit:</h5>
                              <br></br>
                              <div className="produtos-vendidos-scrollbar">
                                {encomenda.UP.produtos_encomenda.map((venda) => (
                                  <div className="row" key={venda}>
                                    <div className="col-2">
                                      <img
                                        className="border rounded me-3"
                                        src={venda.produto.produto.img}
                                        style={{ width: '96px', height: '96px' }}
                                        alt={venda.produto.produto.name}
                                      />
                                    </div>
                                    <div className="col-4">
                                      <p href="#" className="nav-link">
                                        {venda.produto.produto.name}
                                      </p>
                                      <p className="text-muted">
                                        Brand: {venda.produto.produto.brand}
                                        <br></br>
                                        Categorie: {venda.produto.produto.categorieB} <br></br>
                                        Quantity: {venda.produto.quantidade}
                                        <br></br> <br></br>
                                        Buyer: {venda.consumidor_name}
                                        <br></br>
                                        Date: {venda.produto.data}
                                        <br></br>
                                        UP Proximity to the buyer: &nbsp;
                                        {this.calculateDistance(
                                          parseFloat(this.state.lat_user),
                                          parseFloat(this.state.lon_user),
                                          parseFloat(venda.consumidor_lat),
                                          parseFloat(venda.consumidor_lon)
                                        )}{' '}
                                        Km
                                        <br></br>
                                        <br></br>
                                      </p>
                                    </div>
                                    <div className="col-4">
                                      <p className="text-muted">Order Status: {venda.estado}</p>
                                      {venda.estado === 'Pending' && (
                                        <div className="d-flex align-items-center">
                                          {encomenda.UP.veiculos.length !== 0 ? (
                                            <>
                                              {this.state.msgErro !== "" ? (
                                                <p>{this.state.msgErro} <a href="#" onClick={() => this.handleAddQuantity(encomenda.UP.idUP, venda.produto.produto._id)}>Add more</a></p>
                                              ) : (
                                                <>
                                                  <select className="form-select" onChange={this.handleVehicleChange}>
                                                    <option value="">Select a Vehicle</option>
                                                    {encomenda.UP.veiculos.map((veiculo) => (
                                                      <option value={veiculo._id} key={veiculo._id}>
                                                        {veiculo.matricula}
                                                      </option>
                                                    ))}
                                                  </select>
                                                  &nbsp;
                                                  <button
                                                    className="btn btn-light border icon-hover-danger"
                                                    onClick={(e) => {
                                                      this.handleVehicleSelection(e, venda.consumidor_id, venda.produto.produto._id, venda.produto.quantidade);
                                                      this.handleNotificationSend(venda.consumidor_id, venda.produto.produto._id, venda.produto.quantidade);
                                                    }}
                                                    disabled={!this.state.selectedVehicle}
                                                  >
                                                    Associate
                                                  </button>
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <p>You don't have Vehicles <a href="#" onClick={() => this.handleCreateVehicle(encomenda.UP.idUP)}>Create</a></p>
                                          )}
                                        </div>
                                      )}
                                  </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                  
                      <hr />
                    </div>
                  ))
                )}
              </div>

              </div>
            </div>
            </div>





      <div class="col-lg-4">
 
        <div class="card shadow-0 border card-height">
          <div class="card-body">

            <h3 class="d-flex justify-content-center">Search Filters</h3>
            <br></br>
            <div class="d-flex justify-content-between">
              <h7 class="mb-2 text-dark">Maximum distance between {this.state.nickname} and Suppliers:</h7>
            </div>
            <div>
        
                <div className="barra-container">
                <div
                    id="barra"
                    className="barra"
                    onMouseMove={this.moverBola}
                    onMouseDown={this.iniciarArrasto}
                    onMouseUp={this.pararArrasto}
                    >
                    <div
                        className="bola"
                        style={{ left: `${(distancia / maxDistancia) * 100}%` }}
                    />
                    </div>
                    <p> {distanciaFormatada}</p>
                </div>
                </div>
                <div class="d-flex justify-content-start">
                        <h7 class="mb-2 text-dark">Date Range:</h7>
                </div>
                <div class="d-flex justify-content-center">
                <h9 class="mb-2 text-dark label_date">Start:&nbsp;</h9>
                    <DatePicker
                    selected={startDate}
                    onChange={this.handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date(2023, 0, 1)} 
                    maxDate={new Date()} 
                    placeholderText=" Select Date"
                    />
                    <h9 class="mb-2 text-dark label_date">End:&nbsp;</h9>
                    <DatePicker
                    selected={endDate}
                    onChange={this.handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate} 
                    maxDate={new Date()} 
                    placeholderText="Select Date"
                    />
                </div>
                <br></br>
                <div class="d-flex justify-content-start">
                        <h7 class="mb-2 text-dark">Product Categories you want to include:</h7>
                </div>
                <div>
                <div className="autosuggest-wrapper">
                <Autosuggest
                    suggestions={this.renderSuggestions({ value: searchValue })}
                    onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion}
                    renderSuggestion={suggestion => <span>{suggestion}</span>}
                    inputProps={{
                    placeholder: "Search categories",
                    value: searchValue,
                    onChange: this.handleSearchChange
                    
                    }}
                    onSuggestionSelected={this.handleSuggestionSelected}
                />
                </div>
                <br></br>
                <div>
                Selected categories:<br></br>
                <div className="output_categories">
                    {selectedCategories.map(category => (
                    <span key={category} className="category_span">
                        {category},&nbsp;
                        <button
                        className="delete_category_button"
                        onClick={() => this.handleDeleteCategory(category)}
                        >
                        X
                        </button>
                    </span>
                    ))}
                </div>
                </div>

        </div>
            
            
            <hr />
            
            <div class="mt-3">
              <a  class="btn btn-success w-100 shadow-0 mb-2" onClick={this.filtrarEncomendas}> View Results</a>
            
            </div>
          </div>
        </div>
      </div>
  
    </div>
    
  </div>
  


  );
  }
}
// export default Login;