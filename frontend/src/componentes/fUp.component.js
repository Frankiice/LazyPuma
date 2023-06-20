import React, { Component } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
// import { MDBCheckbox } from 'mdb-react-ui-kit';

export default class Fproduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      idFornecedor: "",   
      unidadeID: window.localStorage.getItem("unidadeID"),
      unidades: [],
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
      msg: "",
      propriedades: "",
    };
    this.handleUnidadeProducao = this.handleUnidadeProducao.bind(this);
    this.getCoordenadas = this.getCoordenadas.bind(this);
  }

  componentDidMount(){
    fetch("http://localhost:5000/user/userData", {
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
        this.setState({
          nickname: data.data.nickname,
          idFornecedor: data.data._id,
        });
    });

    const { unidadeID } = this.state;
    if (unidadeID != null) {
      console.log("unidadeID", unidadeID);
      try {
        const base_url = "http://localhost:5000/user/unidadeProducao";
        const url = `${base_url}?id=${unidadeID}`;
        console.log(url);
        fetch(url, {
          method: "GET",
          crossDomain: true,
          headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "unidadeData");
            const unidadeData = data[0]; // Access the 'unidades' property from the response data
            this.setState({
              unidades: unidadeData,
              upCapacity: unidadeData.capacidade,
              upName: unidadeData.nome,
              upAddress: unidadeData.morada,
              lat: unidadeData.lat,
              lon: unidadeData.lon,
            });
            var moradaArray = unidadeData.morada.split(",");
            this.setState({
            rua: moradaArray[0],
            localidade: moradaArray[1],
            freguesia: moradaArray[2],
            concelho: moradaArray[3],
            cod_postal: moradaArray[4],
            cidade: moradaArray[5],
            });
            
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("unidadeID", unidadeID);
    }
  }    


  getCoordenadas(e) {
    e.preventDefault();
    const { rua, localidade, freguesia, concelho, cod_postal, cidade, pais } = this.state;
    const upAddress = `${rua},${localidade},${freguesia},${concelho},${cod_postal},${cidade},${pais}`;
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
          console.log("lat", lat)

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
        this.setState({ msg: "Production Unit updated successfully" });
      }
})
.catch((error) => {
    console.log(error);
    this.setState({ msg: "Error updating Production Unit" }); // Set the error message in the state
});
};
  

render() {
  return (
    
    <div class="container">
    <div class="row">
        {this.state.msg === "" ? 

            <div class="cardP border shadow-0 custom-cardUP">
                <div class="m-4">
                <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s Production Unit</h2>
                <br></br>
                <div class="cardP-body" style={{ overflowY: 'auto' }}>
                
                <form onSubmit={this.handleUnidadeProducao}>
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
                                    <input type="text" id="concelho" onChange={(e => this.setState({ concelho: e.target.value }))} value={this.state.concelho}/>
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
                                <input type="number" id="upCapacity" onChange={(e => this.setState({ upCapacity: e.target.value }))} value={this.state.upCapacity} min="1" required/>
                            </div>
                        </div>
                    </div>
  
                    <div>
                        {this.state.msgMorada !== "" ? 
                          this.state.msgMorada === "Error: Invalid address, please correct your address" ?
                              <label></label>
                              :
                              <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" >Update</button>
  
                      :
                          <button type="submit" class="btn btn-outline-light btn-dark col-md-3 botaoPerfil" >Update</button>
                          }
  
                    </div>
                </div>
            </form>

          </div>
        </div>
      <div>
      <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f/allup">Back </a>
      </div>

    </div>
    :
        <div class="cardP d-flex border shadow-0 custom-card">
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