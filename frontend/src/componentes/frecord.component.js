import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
import { MDBCheckbox } from 'mdb-react-ui-kit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autosuggest from "react-autosuggest";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      distancia: 0,
      arrastando: false,
      encomendas: [],
      startDate: null,
      endDate: null,
      categories: ["Baby","Sports","Animals","Cosmetics","DIY","Smartphones","Tech","Decoration","Gardening","Gaming","TVs","Toys","Appliances","Photography","Books"], 
      searchValue: "", 
      selectedCategories: [], 
      
      

    };
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
      const maxDistancia = 1010;

      const novaDistancia = Math.floor((mouseX / larguraBarra) * maxDistancia);
      const distanciaAjustada = Math.min(Math.max(novaDistancia, 0), maxDistancia);
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
        
        this.setState({ nickname: data.data.nickname, id_consumidor: data.data._id });

        //fetch(`http://localhost:5000/administrador/relatorios`)
        fetch(`http://localhost:5000/fornecedor/relatorios/${data.data._id}`)
          .then((response) => response.json())
          .then((data1) => {
            console.log(data1, "Produtos vendidos");
            this.setState({ Vendas: data1 });
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }
  
  

render() {
  


  const { distancia } = this.state;
  const maxDistancia = 1010;
  const distanciaFormatada = distancia <= 1000 ? `${distancia} km` : "more than 1000 km";
  const { startDate, endDate } = this.state;
  const { searchValue, selectedCategories } = this.state;
  const { encomendas } = this.state;
  
  return (
    
<div class="container">
  <div class="row">
    <div class="col-lg-8">
      <div class="card d-flex border shadow-0 custom-card">
        <div class="m-4">
          <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Local Impact Report </h2>
          <br></br>
          <div class="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {encomendas.length === 0 ? (
              <div class="relatorio-vazio">
                <br></br>
                <h5 class="text-secondary justify-content-md-center">{this.state.id_consumidor} hasn't placed any orders yet 
               </h5>
                
      
              </div>

              
            ) : (
              encomendas.map((encomenda) => (
                
                <div class="row gy-3 mb-4 produto_carrinho" key={encomenda.id_encomenda}>
                  <div class="">
                    <div class="me-lg-5">
                    <h4 class="d-flex justify-content-sm-center">Order ID: {encomenda.id_encomenda}</h4>
                    
                    <h5 class="">Products:</h5>
                    <br></br>
                    {encomenda.produtos.map((produto) => 
                    (
          <div class="d-flex" key={produto.idProduto}>
            <img
              class="border rounded me-3"
              src={produto.foto}
              style={{ width: '96px', height: '96px' }}
            />
            <div>
              <a href="#" class="nav-link">{produto.nome}</a>
              <p class="text-muted">{produto.marca}</p>
            </div>
          </div>
        ))}
                    </div>
                  </div>
                  <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                    <div class="">

                    </div>
                    <div class="">
                      {/* <text class="h6">{item.preco}€</text> <br />
                      <small class="text-muted text-nowrap"> {item.preco_original}€ / per item </small> */}
                      
                    </div>
                    
                    
                  </div>
                  <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                  {/* <div class="form-outline">
                  <text class="h6">Quantity</text>  &nbsp;
                      <input type="number" id="typeNumber" class="form-control form-control-sm " style={{ width: '48px', backgroundColor: '#f8f9fa', border: '1px solid #e4e8eb',display: 'inline-block'  }} defaultValue={item.quantidade} min="1" onChange={(e) => this.handleQuantityChange(item.nome, parseInt(e.target.value))} /> 
                  </div> */}
                  {/* &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <div class="float-md-end">
                      <a href="#" class="btn btn-light border text-danger icon-hover-danger" onClick={() => this.removerProduto(index)}> Remove</a>
                    </div> */}
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
              <h7 class="mb-2 text-dark">Proximity between consumers and suppliers:</h7>
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
              <a href='./user/encomenda' class="btn btn-success w-100 shadow-0 mb-2" > View Results</a>
            
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
