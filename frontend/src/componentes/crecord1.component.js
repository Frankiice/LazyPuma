import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
import { MDBCheckbox } from 'mdb-react-ui-kit';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autosuggest from "react-autosuggest";
// import { Bar } from 'react-chartjs-2';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';



export default class Login extends Component {
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
      chartData: [],


      
      

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

        fetch(`http://localhost:5000/relatorios/consumidor/${data.data._id}`)
          .then((response) => response.json())
          .then((data1) => {
            console.log(data1, 'EncomendaData');
            this.setState({ encomendas: data1, filteredEncomendas: data1 });

            // Processar os dados para o gráfico
            const chartData = data1.map((item, index) => {
                const distances = item.produtos.map((produto) => ({
                  price: parseFloat(produto.preco),
                  distance: this.calculateDistance(
                    this.state.lat_user,
                    this.state.lon_user,
                    produto.lat_UP,
                    produto.lon_UP
                  ),
                }));
              
                // Retorne apenas o primeiro item do array de distâncias
                return distances[0];
              });
              
              console.log("chartData", chartData);
              this.setState({ chartData });
              
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

//   createChart(jsonData) {
//     const chartData = {
//       labels: [],
//       datasets: [
//         {
//           label: 'Total de Preço por Encomenda',
//           data: [],
//           backgroundColor: 'rgba(75, 192, 192, 0.6)',
//           borderColor: 'rgba(75, 192, 192, 1)',
//           borderWidth: 1,
//         },
//       ],
//     };

//     jsonData.forEach((item) => {
//       const { preco_encomenda, lat_UP, lon_UP } = item.encomenda;
//       const distancia = this.calculateDistance(
//         38.9015518,
//         -9.1616508,
//         parseFloat(lat_UP),
//         parseFloat(lon_UP)
//       );

//       chartData.labels.push(distancia);
//       chartData.datasets[0].data.push(parseFloat(preco_encomenda));
//     });

//     const options = {
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: 'Distância (em km)',
//           },
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'Total de Preço',
//           },
//         },
//       },
//     };

//     return (
//       <div>
//         <Bar data={chartData} options={options} />
//       </div>
//     );
//   }

  

render() {
  
const {chartData} = this.state;
console.log("chartData2",chartData);

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
      <div class="card d-flex border shadow-0 custom-card" style={{ height: '621px'}}>
        <div class="m-4">
          <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Local Impact Report </h2>
   
          <br></br>
          <div class="card-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {filteredEncomendas.length === 0 ? (
              <div class="relatorio-vazio">
                <br></br>
                <h5 class="text-secondary justify-content-md-center">{this.state.nickname} hasn't placed any orders yet </h5>
           
                
      
              </div>

              
            ) : (
                
                <>
                <h5 class="text-secondary justify-content-md-center">Existem encomendas (mostrar gráficos)</h5>
                <div>
                  <h1>Relatórios</h1>
                  <LineChart width={600} height={400} data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="distance" label={{ value: 'Distance (km) between You and Suppliers', position: 'insideBottom', offset: -10 }} />
                    <YAxis label={{ value: 'Price', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="price"  />
                  </LineChart>

                </div>
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
