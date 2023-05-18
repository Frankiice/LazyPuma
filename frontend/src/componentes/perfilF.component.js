import React, { Component } from 'react';
import "../styles/style.css";
import {Helmet} from "react-helmet";


export default class PerfilF extends Component{

    constructor(props){
        super(props);
        this.state = {
            userData: "",
            fullname: "", // penso que será necessário para dar update da info
            nickname: "",
            rua: "",
            localidade: "",
            freguesia: "",
            concelho: "",
            cod_postal: "",
            cidade: "",
            pais: "Portugal",
            morada: "",
            lat: "",
            lon: "",
            nif: "",
            email: "",
            phone: "",
            password: "",
            userRemoveFailed: "",
            userUpdated: window.localStorage.getItem("userUpdated"),
            msgMorada: "",

        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.preHandleRemove = this.preHandleRemove.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.getCoordenadas = this.getCoordenadas.bind(this);


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
        this.setState({userData: data.data,
                    fullname: data.data.fullname, 
                    nickname: data.data.nickname,
                    morada: data.data.morada,
                    lat: data.data.lat,
                    lon: data.data.lon,
                    nif: data.data.nif,
                    email: data.data.email,
                    phone: data.data.phone,
                    password: data.data.password,});
        var moradaArray = data.data.morada.split(",");
        this.setState({
                    rua: moradaArray[0],
                    localidade: moradaArray[1],
                    freguesia: moradaArray[2],
                    concelho: moradaArray[3],
                    cod_postal: moradaArray[4],
                    cidade: moradaArray[5]});
    })
}
logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login"

}

getCoordenadas(e) {
    e.preventDefault();
    const { rua, localidade, freguesia, concelho, cod_postal, cidade, pais } = this.state;
    const morada = `${rua}, ${localidade}, ${freguesia}, ${concelho}, ${cod_postal}, ${cidade}, ${pais}`;
    console.log(morada);
    this.setState({morada: morada})
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${encodeURIComponent(morada)}`;
  
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
preHandleRemove(e){
    e.preventDefault();
    const {email, password, userRemoveFailed} = this.state;
    console.log("email" , email);
    console.log("password" , password);

    fetch("http://localhost:5000/user/login",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                email,
                password,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
            if(data.status=="ok") {
              this.handleRemove(e);   
            }else{
                this.setState({ userRemoveFailed: true });
                console.log(userRemoveFailed);
            }
        })
}

handleRemove(e){
    e.preventDefault();
    const {password, userRemoveFailed} = this.state;
    console.log(password);
    // if (this.state.userRemove === this.state.password){
    console.log("entra no sitio errado")
    fetch("http://localhost:5000/user/delete",{
        method:"DELETE",
        crossDomain:true,
        headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({       // o delete nem precisa de nada???
            token: window.localStorage.getItem("token"),
            password, 
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data, "userDelete");
        if (data.status=="ok"){
            window.localStorage.clear();
            window.location.href = "./login"
        }else{
            console.log("entra no sitio certo")
            this.setState({ userRemoveFailed: true });
            console.log(userRemoveFailed);
        }
    })
    // }else{
        
    // }
    
}
handleSubmit(e){
    e.preventDefault();
    const {fullname, nickname,morada,lat,lon, nif, email, phone} = this.state;
    console.log(fullname, nickname,morada,lat,lon, nif, email, phone);
    fetch("http://localhost:5000/user/update",{
        method:"PUT",
        crossDomain:true,
        headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
            token: window.localStorage.getItem("token"),
            fullname,
            nickname,
            morada,
            lat,
            lon,
            nif,
            email,
            phone,
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data, "userUpdate");
        window.localStorage.setItem("userUpdated", true);
        window.location.reload();
    })
};
      //AO CARREGAR NO UPDATE ENVIA PARA USER/UPDATE

render() {
    return (
        <div class="container">
        {/* <h1 class="mb-5">Account Settings</h1> */}
        <div class="bg-dark shadow rounded d-block d-sm-flex">
            <div class="profile-tab-nav border-right">
                <div class="p-4">
                    <div class="img-circle text-center mb-3">
                    <button class="btn btn-outline-dark btn-xl rounded-circle" id="butaoPerfil" title="perfil">bebé</button> 
                    </div>
                    <h4 class="text-center">{this.state.userData.nickname}</h4>
                </div>
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="account-tab" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="true">
                        <i class="fa fa-home text-center mr-1"></i> 
                        Account
                    </a>
                    <a class="nav-link" id="encomendas-tab" data-toggle="pill" href="#encomendas" role="tab" aria-controls="encomendas" aria-selected="false">
                        <i class="fa fa-key text-center mr-1"></i> 
                        Orders
                    </a>
                    <a class="nav-link" id="relatorios-tab" data-toggle="pill" href="#relatorios" role="tab" aria-controls="relatorios" aria-selected="false">
                        <i class="fa fa-key text-center mr-1"></i> 
                        Reports
                    </a>
                    <a class="nav-link" id="logout-tab" data-toggle="pill" href="#logout" role="tab" aria-controls="logout" aria-selected="false">
                        <i class="fa fa-user text-center mr-1"></i> 
                        Logout
                    </a>
                    <a class="nav-link" id="remocao-tab" data-toggle="pill" href="#remocao" role="tab" aria-controls="remocao" aria-selected="false">
                        <i class="fa fa-tv text-center mr-1"></i> 
                        Remove Account
                    </a>
                    <a class="nav-link" id="up-tab" data-toggle="pill" href="#up" role="tab" aria-controls="up" aria-selected="false">
                        <i class="fa fa-bell text-center mr-1"></i> 
                        Production Units
                    </a>
                    <a class="nav-link" id="veiculos-tab" data-toggle="pill" href="#veiculos" role="tab" aria-controls="veiculos" aria-selected="false">
                        <i class="fa fa-bell text-center mr-1"></i> 
                        Vehicles
                    </a>
                </div>
            </div>
            <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <h3 class="mb-4">Account Settings</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Full name</label>
                                    <div class="input-field bg-dark"> 
                                        <input type="text" class="bg-dark text-white" id="fullname" onChange={(e => this.setState({ fullname: e.target.value }))} placeholder={this.state.userData.fullname}/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Username</label>
                                    <div class="input-field bg-dark">
                                        <input type="text" class="bg-dark text-white" id="nickname" onChange={(e => this.setState({ nickname: e.target.value }))} placeholder={this.state.userData.nickname}/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Email</label>
                                    <div class="input-field bg-dark"> 
                                        <input type="text" class="bg-dark text-white" id="email" onChange={(e => this.setState({ email: e.target.value }))} placeholder={this.state.userData.email}/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Phone Number</label>
                                    <div class="input-field bg-dark"> 
                                        <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" class="bg-dark text-white" id="phone" onChange={(e => this.setState({ phone: e.target.value }))} placeholder={this.state.userData.phone}/>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>NIF</label>
                                    <div class="input-field bg-dark"> 
                                        <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" class="bg-dark text-white" id="nif" onChange={(e => this.setState({ nif: e.target.value }))} placeholder={this.state.userData.nif}/>
                                    </div>
                                </div>
                            </div>
                            <div class="border-top border-bottom pb-2">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Street</label>
                                            <div class="input-field bg-dark"> 
                                            <input type="text" class="bg-dark text-white" id="morada" onChange={(e => this.setState({ rua: e.target.value }))} placeholder={this.state.rua}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Location</label>
                                            <div class="input-field bg-dark"> 
                                            <input type="text" class="bg-dark text-white" id="morada" onChange={(e => this.setState({ localidade: e.target.value }))} placeholder={this.state.localidade}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Parish</label>
                                            <div class="input-field bg-dark"> 
                                            <input type="text" class="bg-dark text-white" id="morada" onChange={(e => this.setState({ freguesia: e.target.value }))} placeholder={this.state.freguesia}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>County</label>
                                            <div class="input-field bg-dark"> 
                                            <input type="text" class="bg-dark text-white" id="morada" onChange={(e => this.setState({ concelho: e.target.value }))} placeholder={this.state.concelho}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>Postal Code</label>
                                            <div class="input-field bg-dark"> 
                                            <input type="text" pattern="\d{4}-\d{3}" class="bg-dark text-white" id="morada" onChange={(e => this.setState({ cod_postal: e.target.value }))} placeholder={this.state.cod_postal}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label>City</label>
                                            <div class="input-field bg-dark"> 
                                            <input type="text" class="bg-dark text-white" id="morada" onChange={(e => this.setState({ cidade: e.target.value }))} placeholder={this.state.cidade}/>
                                            </div>
                                        </div>
                                    </div>
                            </div>
                            <button onClick={this.getCoordenadas} class="btn btn-outline-light col-md-3">
                                Verify Address
                                </button>
                                {this.state.msgMorada != "" ? 
                               
                                <label><br></br>{this.state.msgMorada}</label>
                                :
                                <label></label>
                                }
                            </div>
                           
                            {this.state.userUpdated ?
                              <div> 
                                  <br></br>
                                  <p>Information has been changed successfully!</p>
                              </div> : 
                              <p></p>
                            }
                            {/* <div class="col-md-12">
                                <div class="form-group">
                                        <label>Bio</label>
                                        <div class="input-field bg-dark"> 
                                            <textarea class="bg-dark text-white" rows="4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!</textarea>
                                        </div>
                                </div>
                            </div> */}
                        </div>
                        <div>
                             {this.state.msgMorada != "" ? 
                               this.state.msgMorada == "Error: Invalid address, please correct your address" ?
                                    <label></label>
                                    :
                                    <button type="submit" class="btn btn-outline-light col-md-3 botaoPerfil">Save</button>

                            :
                               <button type="submit" class="btn btn-outline-light col-md-3 botaoPerfil">Save</button>
                               }
                            {/* <button type="submit" class="btn btn-outline-light col-md-3 botaoPerfil">Save</button> */}
                            {/* <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancel</button> */}
                        </div>
                    </form>
                    
                </div>
                <div class="tab-pane fade" id="encomendas" role="tabpanel" aria-labelledby="encomendas-tab">
                    <h3 class="mb-4">Order History </h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group box">
                                <label>Most recent order</label>
                                <p> Order No.:</p>
                                <p> Purchase Date:</p>
                                <p> Value:</p>
                                <button class="btn btn-outline-light col-md-3 botaoPerfil">View Details</button>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group box">
                                <label>Most recent order</label>
                                <p> Order No.:</p>
                                <p> Purchase Date:</p>
                                <p> Value:</p>
                                <button class="btn btn-outline-light col-md-3 botaoPerfil">View Details</button>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group box">
                                <label>Most recent order</label>
                                <p> Order No.:</p>
                                <p> Purchase Date:</p>
                                <p> Value:</p>
                                <button class="btn btn-outline-light col-md-3 botaoPerfil">View Details</button>

                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group box">
                                <label>Most recent order</label>
                                <p> Order No.:</p>
                                <p> Purchase Date:</p>
                                <p> Value:</p>
                                <button class="btn btn-outline-light col-md-3 botaoPerfil">View Details</button>

                            </div>
                        </div>
                    </div>
                    

                    <div>
                        
                        
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">View all orders</button> 
                        {/* <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancel</button> */}
                    </div>
                </div>

                <div class="tab-pane fade" id="relatorios" role="tabpanel" aria-labelledby="relatorios-tab">
                    <h3 class="mb-4">Your Reports</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Reports</label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Reports </label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Confirme a Nova Reports</label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Save</button>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancel</button>
                    </div>
                </div>
                <div class="tab-pane fade" id="logout" role="tabpanel" aria-labelledby="logout-tab">
                    <h3 class="mb-4">Logout</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Do you want to logout?</label>
                                <div> 
                                    <br></br>
                                    <button onClick={this.logOut} class="btn btn-outline-light col-md-3 botaoPerfil">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="remocao" role="tabpanel" aria-labelledby="remocao-tab">
                    <h3 class="mb-4">Account Removal</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <form onSubmit={this.preHandleRemove}>
                                    <p>Attention: This action is irreversible</p>
                                    <label>To remove your account enter your password</label>
                                    <div class="input-field bg-dark"> 
                                        <input type="password" onChange={(e => this.setState({ password: e.target.value }))} class="bg-dark text-white" id="userRemocao"/>
                                    </div>
                                    <div> 
                                        <br></br>
                                        <button type="submit" class="btn btn-outline-light col-md-3 botaoRemover">Remove</button>
                                    </div>
                                    {this.state.userRemoveFailed ?
                                    <div> 
                                        <br></br>
                                        <p>Error: The entered pass is not correct</p>
                                    </div> : 
                                    <div></div>
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="up" role="tabpanel" aria-labelledby="up-tab">
                    <h3 class="mb-4">Production Units Settings</h3>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="up1"/>
                            <label class="form-check-label" for="up1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium accusamus, neque cupiditate quis
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="up2"/>
                            <label class="form-check-label" for="up2">
                                hic nesciunt repellat perferendis voluptatum totam porro eligendi.
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="up3"/>
                            <label class="form-check-label" for="up3">
                                commodi fugiat molestiae tempora corporis. Sed dignissimos suscipit
                            </label>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Save</button>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancel</button>
                    </div>
                </div>

                <div class="tab-pane fade" id="veiculos" role="tabpanel" aria-labelledby="veiculos-tab">
                    <h3 class="mb-4">Vehicles Settings</h3>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="veiculos1"/>
                            <label class="form-check-label" for="veiculos1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium accusamus, neque cupiditate quis
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="veiculos2"/>
                            <label class="form-check-label" for="veiculos2">
                                hic nesciunt repellat perferendis voluptatum totam porro eligendi.
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="veiculos3"/>
                            <label class="form-check-label" for="veiculos3">
                                commodi fugiat molestiae tempora corporis. Sed dignissimos suscipit
                            </label>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Save</button>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        <Helmet>
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
        </Helmet>
    </div> 

    ) 
    }       
}
