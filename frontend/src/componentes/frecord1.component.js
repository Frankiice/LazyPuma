import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
import { MDBCheckbox } from 'mdb-react-ui-kit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autosuggest from "react-autosuggest";
// import { Bar } from 'react-chartjs-2';
// import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { BarChart, Bar,ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Legend} from 'recharts';


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      distancia: 1010,
      arrastando: false,
      encomendas: [],
      categories: ["Baby","Sports","Animals","Cosmetics","DIY","Smartphones","Tech","Decoration","Gardening","Gaming","TVs","Toys","Appliances","Photography","Books"], 
      selectedCategories: [], 
      filteredEncomendas: [],
      chartData: [],
      produtos2: [],
      UP:[],
      selectedUP: "All",
      startDate: null,
      endDate: null,
      searchValue: "",
      
      
    };
    this.handleUPChange = this.handleUPChange.bind(this);
  }
  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  };
  
  handleEndDateChange = (date) => {
    this.setState({ endDate: date });
  };
  
  //Aplicação do filtro
  filtrarEncomendas = () => {
    const { startDate, endDate, selectedCategories, selectedUP } = this.state;
  
    // Filtrar os dados baseado nas categorias selecionadas
    let filteredData = this.state.encomendas;
    if (selectedCategories.length > 0) {
      filteredData = filteredData.map((item) => {
        const produtosCategoria = item.UP.produtos_vendidos.filter((produtoVendido) =>
          selectedCategories.includes(produtoVendido.produto.produto.categorieB)
        );
  
        return produtosCategoria.length > 0 ? { ...item, UP: { ...item.UP, produtos_vendidos: produtosCategoria } } : null;
      }).filter(Boolean); // Remover itens nulos da matriz
    }
  
    // Filtrar os dados baseado na UP selecionada
    if (selectedUP !== "" && selectedUP !== "All") {
      filteredData = filteredData.filter((item) => item.UP.nome === selectedUP);
    }
  
    // Filtrar os dados baseado nas datas
    if (startDate && endDate) {
      filteredData = filteredData.map((item) => {
        const produtosVendidos = item.UP.produtos_vendidos.filter((produtoVendido) => {
          const itemDate = new Date(produtoVendido.produto.data);
          return itemDate >= startDate && itemDate <= endDate;
        });
  
        return { ...item, UP: { ...item.UP, produtos_vendidos: produtosVendidos } };
      });
    }
  
    // Processar os dados filtrados para os gráficos
    const chartData = [];
    const produtos2 = [];
  
    filteredData.forEach((item) => {
      item.UP.produtos_vendidos.forEach((produtoVendido) => {
        const produto = produtoVendido.produto;
        const price = produto.total;
        const distance = this.calculateDistance(
          this.state.lat_user,
          this.state.lon_user,
          produtoVendido.consumidor_lat,
          produtoVendido.consumidor_lon
        );
  
        chartData.push({ price: price, distance: distance });
  
        const existingProduct = produtos2.find((item) => item.distance === distance);
        if (existingProduct) {
          existingProduct.total += produto.quantidade;
        } else {
          produtos2.push({ distance: distance, total: produto.quantidade });
        }
      });
    });
  
    console.log("filtro aplicado-chartData", chartData);
    console.log("filtro aplicado-produtos2", produtos2);
    this.setState({ chartData: chartData, produtos2: produtos2 });
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
    const distance = R * c;
  
    return Math.floor(distance); // Distance in kilometers without decimal places
  }
  

degToRad(degrees) {
  return degrees * (Math.PI / 180);
}


//----------------------------------------------------------------



componentDidMount() {
    this._isMounted = true; // Adicione esta linha ao iniciar o componente
    fetch('http://localhost:5000/user/userData', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        token: window.localStorage.getItem('token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          nickname: data.data.nickname,
          id_consumidor: data.data._id,
          lat_user: data.data.lat,
          lon_user: data.data.lon,
        });

        fetch(`http://localhost:5000/fornecedor/relatorios/${data.data._id}`)
        .then((response) => response.json())
        .then((data1) => {
          this.setState({ encomendas: data1, filteredEncomendas: data1 });
          let chartData = [];
          let produtos2 = [];
          let data_UPs = ["All"];
          
          data1.forEach((item) => {
            const { nome, lat, lon, produtos_vendidos } = item.UP;
            let nomeUP = item.UP.nome;
            data_UPs.push(nomeUP);
            produtos_vendidos.forEach((produto) => {
              const { quantidade, preco } = produto.produto;
              const total_price = preco * quantidade;
              const distance = this.calculateDistance(
                this.state.lat_user,
                this.state.lon_user,
                produto.consumidor_lat,
                produto.consumidor_lon
              );
      
              chartData.push({ price: total_price, distance: distance  });
      
              const existingProduct = produtos2.find((item) => item.distance === distance);
              if (existingProduct) {
                existingProduct.total += quantidade;
              } else {
                produtos2.push({ distance: distance, total: quantidade });
              }
            });
          });
            console.log("chartData", chartData);
            console.log("produtos2", chartData);
            console.log("UPS", data_UPs);
          this.setState({ chartData: chartData, produtos2: produtos2, UP:data_UPs});
        })
        .catch((error) => {
          console.error(error);
        });
      
      
      

      });
  }



renderTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Dados do ponto de dados clicado
      const { price, distance } = data;
  
      // Filtrar os produtos com o mesmo preço e distância
      const produtosIguais = this.state.chartData.filter(
        (produto) => produto.price === price && produto.distance === distance
      );
  
      return (
        <div className="custom-tooltip">
          <p>Price: {price}€</p>
          <p>Distance: {distance} km</p>
          {produtosIguais.length > 1 && (
            <p>There are {produtosIguais.length} orders for this product with the same characteristics </p>
          )}
        </div>
      );
    }
  
    return null;
  }

  renderTooltip2 = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload; // Dados do ponto de dados clicado
      const { total, distance } = data;
  
      
      
  
      return (
        <div className="custom-tooltip">
          <p>Total of products: {total}</p>
          <p>Distance: {distance} km</p>
          
        </div>
      );
    }
  
    return null;
  }
   
  handleUPChange(event) {
    const selectedUP = event.target.value;
    this.setState({ selectedUP }); 
    console.log("selectedUP",selectedUP);
  }
  



render() {
  
const {chartData} = this.state;
const {produtos2} = this.state;
// console.log("chartData2",chartData);

  const { distancia } = this.state;
  const maxDistancia = 1010;
  const distanciaFormatada = distancia <= 1000 ? `${distancia} km` : "More than 1000 km";
  const { startDate, endDate } = this.state;
  const { searchValue, selectedCategories } = this.state;

  const { encomendas } = this.state;
  const { filteredEncomendas } = this.state;
  const { UP, selectedUP } = this.state;
  

  
  
  return (
    
<div class="container">
  <div class="row">
    <div class="col-lg-8">
      <div class="card_record_c d-flex border shadow-0 custom-card" style={{ height: '1221px'}}>
        <div class="m-4">
          <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Local Impact Report </h2>
   
          <br></br>
          <div class="card-body" style={{ maxHeight: '1521px', overflowY: 'auto' }}>
            {filteredEncomendas.length === 0 ? (
              <div class="relatorio-vazio">
                <br></br>
                <h5 class="text-secondary justify-content-md-center">{this.state.nickname} hasn't sold any products yet </h5>
           
                
      
              </div>

              
            ) : (
                
                <>
                    {/* <h5 class="text-secondary justify-content-md-center">Existem encomendas (mostrar gráficos)</h5> */}
                    {chartData.length === 0 ? (
                      <div> 
                      <h4>First Graphic: </h4>
                      <h6 class="text-muted">Price of each product, taking into account the quantity selected per order by the consumer, depending on the distance between your Production Unit and the consumer.</h6>
                      <br></br>
                      <h5 class="text-muted text-allign-center">No matches for the selected criteria </h5>
                      </div>
    
  ) : (
                            <div>
                            <h4>First Graphic: </h4>
                            <h6 class="text-muted">Price of each product, taking into account the quantity selected per order by the consumer, depending on the distance between your Production Unit and the consumer.</h6>
                                <br></br><br></br>
                        <ScatterChart width={700} height={400} data={chartData} margin={{ bottom: 50 , left:50}} >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            type="number"
                            dataKey="distance"
                            label={{
                            value:'Proximity',
                            position: 'insideBottom',
                           offset:-10,
                            }}
                        />
                        <YAxis
                            type="number"
                            dataKey="price"
                            label={{ value: 'Price', angle: -90, position: 'insideLeft',offset: 5}}
                        />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} content={this.renderTooltip} />
                        
                        <Scatter data={chartData} fill="#8884d8" />
                        </ScatterChart>
                    </div>
  )}
                    <br></br><br></br>
                    {produtos2.length === 0 ? (
                      <div>
                        <h4>Second Graphic: </h4>
                        <h6 class="text-muted">Number of products ordered from your Production Unit taking in consideration the distance from the Consumer.</h6>
                        <br></br>
                        <h5 class="text-muted text-allign-center">No matches for the selected criteria </h5>
                      
                      </div>
                    
                      ) : (
                        <div>
                        <h4>Second Graphic: </h4>
                        <h6 class="text-muted">Number of products ordered from your Production Unit taking in consideration the distance from the Consumer.</h6>

                        <br></br><br></br>
                        <BarChart width={600} height={400} data={produtos2} margin={{ bottom: 50 , left:50}}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis
                            dataKey="distance"
                            label={{
                              value: 'Proximity',
                              position: 'insideBottom',
                              offset: -10,
                            }}
                          />
                          <YAxis label={{ value: 'Number of Products', angle: -90, position: 'inside', offset: 10, }} />
                          <Tooltip cursor={{ strokeDasharray: '3 3' }} content={this.renderTooltip2} />
                          <Bar dataKey="total" fill="#8884d8" />
                        </BarChart>

                            </div>
                    )}
                                        </>
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
            <br></br>
    <div className="dropdown">
    <label for="ups">Choose an UP:</label>
  <select name="ups"  onChange={this.handleUPChange}>
    {UP.map((up, index) => (
      <option key={index} value={up}>
        {up}
      </option>
    ))}
  </select>
 
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
