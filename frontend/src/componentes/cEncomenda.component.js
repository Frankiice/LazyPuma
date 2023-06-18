import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
import { MDBCheckbox } from 'mdb-react-ui-kit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autosuggest from "react-autosuggest";

export default class EncomendasC extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id_consumidor:"",
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
      orderID: "",
      confirmationDialogId: false,
      showProducts: {},
      json_data: {},
      op: ""  
    };
  }
  //Aplicação do filtro
  filtrarEncomendas = () => {
    const { encomendas, startDate, endDate, selectedCategories } = this.state;
    const distancia = this.state.distancia;
  
    // Filtrar por intervalo de datas
    const filteredByDate = encomendas.filter((encomenda) => {
      const dataEncomenda = new Date(encomenda.encomenda.data_encomenda);
      return (
        (!startDate || dataEncomenda >= startDate) &&
        (!endDate || dataEncomenda <= endDate)
      );
    });
  
    // Filtrar por categorias
    const filteredByCategory = filteredByDate.filter((encomenda) => {
      if (selectedCategories.length === 0) {
        return true; // Inclui todas as encomendas quando não há categorias selecionadas
      }
  
      const produtos = encomenda.produtos;
      return produtos.some((produto) =>
        selectedCategories.includes(produto.categoria)
      );
    });
  
    const filteredByDistance = filteredByCategory.filter((encomenda) => {
      const produtos = encomenda.produtos;
      const filteredProdutos = produtos.filter((produto) => {
        const proximity = this.calculateDistance(
          parseFloat(this.state.lat_user),
          parseFloat(this.state.lon_user),
          parseFloat(produto.lat_UP),
          parseFloat(produto.lon_UP)
        );
        produto.proximity = proximity; // Adicionando a propriedade "proximity" ao objeto produto
        return proximity <= distancia;
      });
      return filteredProdutos.length > 0;
    });

  this.setState({ filteredEncomendas: filteredByDistance });
  };
  
  showConfirmationDialog() {
    this.setState({ showConfirmationDialog: true });
  }
  
  // Method to hide the confirmation dialog
  hideConfirmationDialog() {
    this.setState({ showConfirmationDialog: false });
  }

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
        
        fetch(`http://localhost:5000/encomenda/consumidor/${data.data._id}`)
          .then((response) => response.json())
          .then((data1) => {
            console.log(data1, "EncomendaData");
            this.setState({ encomendas: data1, filteredEncomendas: data1});
          })
          .catch((error) => {
            console.error(error);
          });
      
      
      fetch(`http://localhost:5000/export/encomenda/consumidor/${this.state.id_consumidor}`)
      .then((response) => response.json())
      .then((data1) => {
        console.log(data1, "JSON");
        this.setState({ json_data: data1});
      })
      .catch((error) => {
        console.error(error);
      });
  });

  }

  handleOpOrder(idEncomenda, operacao) {
    const { id_consumidor} = this.state
    console.log("idEncomenda", idEncomenda)
    console.log("operacao", operacao)
    const base_url = `http://localhost:5000/encomenda/consumidor/${id_consumidor}`
    const url = `${base_url}?idOrder=${idEncomenda}&op=${operacao}`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'ok') {
          if(operacao === "Cancel"){
            console.log('Order Canceled:', data.data);
            this.setState({ msgRemoved: "Order was canceled" });
          }else{
            console.log('Order Confirmed:', data.data);
            this.setState({ msgRemoved: "Order was Confirmed" });
          }
        } else {
          console.log('Error:', data.data);
          // Handle the error case appropriately
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log('Error:', error);
        // Handle any network or fetch-related errors
      });
    };
  
  toggleProducts = (upName) => {
    this.setState((prevState) => ({
      showProducts: {
        ...prevState.showProducts,
        [upName]: !prevState.showProducts[upName],
      },
    }));
  };  


  handleDownload = () => {
    const { json_data } = this.state;
    const jsonContent = JSON.stringify(json_data);
  
    // Cria um objeto Blob com o conteúdo JSON
    const blob = new Blob([jsonContent], { type: 'application/json' });
  
    // Cria um URL temporário para o objeto Blob
    const url = URL.createObjectURL(blob);
  
    // Cria um elemento <a> invisível
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json'; // Nome do arquivo a ser baixado
  
    // Simula um clique no elemento <a> para iniciar o download
    link.click();
  
    // Libera o URL temporário
    URL.revokeObjectURL(url);
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
      <div class="cardP border shadow-0 custom-cardUP">
        <div class="m-4">
          <div className="row">
  <div className="col-md-6">
    <h2 className="card-title mb-4 text-dark">{this.state.nickname}'s Order History</h2>
  </div>
  <div className="col-md-6 d-flex justify-content-end">
    <button onClick={this.handleDownload} className="btn btn-light border icon-hover-danger">Download JSON</button>
  </div>
</div>
          <br></br>
          <div class="cardP-body" style={{ overflowY: 'auto' }}>
            {filteredEncomendas.length === 0 ? (
              <div class="relatorio-vazio">
                <br></br>
                <h5 class="text-secondary justify-content-md-center">
                  {this.state.nickname} hasn't placed any orders yet
                </h5>
              </div>
            ) : (
              filteredEncomendas.map((encomenda) => (
                <div class="row gy-3 mb-4 produto_carrinho" key={encomenda.encomenda.id_encomenda}>
                  <div class="">
                    <div class="me-lg-5">
                      <div>
                        <div className="row">
                          <div className="col-md-8">
                            <h4 className="d-flex justify-content-start">
                              <button
                                className="btn btn-link"
                                onClick={() => this.toggleProducts(encomenda.encomenda.id_encomenda)}
                              >
                                {this.state.showProducts[encomenda.encomenda.id_encomenda] ? (
                                  <i class="bi bi-chevron-down"></i>
                                ) : (
                                  <i class="bi bi-chevron-right"></i>
                                )}
                              </button>
                              <i className="bi bi-bag-check-fill"></i>&nbsp; Order ID: {encomenda.encomenda.id_encomenda} &nbsp;&nbsp;
                            </h4>
                            <h5 className="d-flex justify-content-start text-muted">Date: {encomenda.encomenda.data_encomenda}</h5>
                            <h5 className="d-flex justify-content-start text-muted">Total: {encomenda.encomenda.preco}€</h5>
                            <h5 className="d-flex justify-content-start text-muted">State: {encomenda.encomenda.estado}</h5>
                          </div>
                          <div className="col-md-4">
                            {/* Cancel Order */}
                            {encomenda.encomenda.estado !== "Canceled" && encomenda.encomenda.estado !== "Complete" ? (
                              new Date(encomenda.encomenda.prazoCancelamento) < new Date() && 
                              this.state.showConfirmationDialog && this.state.confirmationDialogId === encomenda.encomenda.id_encomenda ? (
                                <div className="confirmation-dialog">
                                  <h6>Are you sure you want to Cancel this Order?</h6>
                                  <div>
                                    <button className="btn btn-danger" onClick={() => { this.setState({ op: "Cancel" }); this.handleOpOrder(encomenda.encomenda.id_encomenda, "Cancel");}}>
                                      Confirm
                                    </button>&nbsp;
                                    <button className="btn btn-secondary" onClick={() => this.hideConfirmationDialog()}>
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className="d-flex justify-content-end">
                                  <a href="#" className="btn btn-light border text-danger icon-hover-danger" onClick={() => { this.setState({ confirmationDialogId: encomenda.encomenda.id_encomenda, op: "Cancel" }); this.showConfirmationDialog();}}>
                                    Cancel Order
                                  </a>
                                </div>
                              )
                            ) : null}
                            {/* Confirm Delivery */}
                            <div className="d-flex justify-content-end">
                              {encomenda.encomenda.estado !== "Canceled" && encomenda.encomenda.estado !== "Complete" && (
                                <div style={{ marginTop: '10px' }}>
                                  <a href="#" className="btn btn-light border icon-hover-danger" onClick={() => { this.setState({ op: "Complete" }); this.handleOpOrder(encomenda.encomenda.id_encomenda, "Complete");}}>
                                    Confirm Delivery
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <br></br>
                      {/* Purchased products */}
                      {this.state.showProducts[encomenda.encomenda.id_encomenda] && (
                        <div>
                          <h5 class="">Purchased products:</h5>
                          <br></br>
                          {encomenda.produtos.map((produto) => (
                            <div class="d-flex" key={produto.idProduto}>
                              <img
                                class="border rounded me-3"
                                src={produto.foto}
                                style={{ width: '96px', height: '96px' }}
                              />
                              <div>
                                <a href="#" class="nav-link">{produto.nome}</a>
                                <p class="text-muted">
                                  Brand: {produto.marca}<br></br>
                                  Categorie: {produto.categoria} <br></br>
                                  Quantity: {produto.quantidade}<br></br> <br></br>
                                  Suplier: {produto.name_UP}<br></br>
                                  Proximity: &nbsp;
                                  
                                  {this.calculateDistance(
                                      parseFloat(this.state.lat_user), // Convert to float
                                      parseFloat(this.state.lon_user), // Convert to float
                                      parseFloat(produto.lat_UP), // Convert to float
                                      parseFloat(produto.lon_UP) // Convert to float
                                  )} Km 
                                
                                 </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                    <div class=""></div>
                    <div class=""></div>
                  </div>
                  <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
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
