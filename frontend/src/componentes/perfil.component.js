import React, { Component } from 'react';
import "../styles/style.css";
import {Helmet} from "react-helmet";


export default class Perfil extends Component{

    constructor(props){
        super(props);
        this.state = {
            userData: "",
            fullname: "", // penso que será necessário para dar update da info
            nickname: "",
            morada: "",
            lat: "",
            lon: "",
            nif: "",
            email: "",
            phone: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
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
            token: window.localStorage.getItem("token")
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data, "userData");
        this.setState({userData: data.data})
    })
}

handleSubmit(e){
    e.preventDefault();
    const {type, fullname, nickname,morada,lat,lon, nif, email, phone} = this.state;
    console.log(type, fullname, nickname,morada,lat,lon, nif, email, phone);
    fetch("http://localhost:5000/user/update",{
        method:"POST",
        crossDomain:true,
        headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({
            type,
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
                        <img id="#imagemPerfil" src='../images/user2.jpg' alt="Image" class="shadow"/>
                    </div>
                    <h4 class="text-center">{this.state.userData.nickname}</h4>
                </div>
                <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <a class="nav-link active" id="account-tab" data-toggle="pill" href="#account" role="tab" aria-controls="account" aria-selected="true">
                        <i class="fa fa-home text-center mr-1"></i> 
                        Conta
                    </a>
                    <a class="nav-link" id="password-tab" data-toggle="pill" href="#password" role="tab" aria-controls="password" aria-selected="false">
                        <i class="fa fa-key text-center mr-1"></i> 
                        Password
                    </a>
                    <a class="nav-link" id="security-tab" data-toggle="pill" href="#security" role="tab" aria-controls="security" aria-selected="false">
                        <i class="fa fa-user text-center mr-1"></i> 
                        Security
                    </a>
                    <a class="nav-link" id="application-tab" data-toggle="pill" href="#application" role="tab" aria-controls="application" aria-selected="false">
                        <i class="fa fa-tv text-center mr-1"></i> 
                        Application
                    </a>
                    <a class="nav-link" id="notification-tab" data-toggle="pill" href="#notification" role="tab" aria-controls="notification" aria-selected="false">
                        <i class="fa fa-bell text-center mr-1"></i> 
                        Notification
                    </a>
                </div>
            </div>
            <div class="tab-content p-4 p-md-5" id="v-pills-tabContent">
                <div class="tab-pane fade show active" id="account" role="tabpanel" aria-labelledby="account-tab">
                    <h3 class="mb-4">Definições da Conta</h3>
                    <form onSubmit={this.handleSubmit}>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Nome Completo</label>
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
                                <label>Telemóvel</label>
                                <div class="input-field bg-dark"> 
                                    <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" class="bg-dark text-white" id="phone" onChange={(e => this.setState({ phone: e.target.value }))} placeholder={this.state.userData.phone}/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Morada</label>
                                <div class="input-field bg-dark"> 
                                    <input type="text" class="bg-dark text-white" id="morada" onChange={(e => this.setState({ morada: e.target.value }))} placeholder={this.state.userData.morada}/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Identificador Fiscal</label>
                                <div class="input-field bg-dark"> 
                                    <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" class="bg-dark text-white" id="nif" onChange={(e => this.setState({ nif: e.target.value }))} placeholder={this.state.userData.nif}/>
                                </div>
                            </div>
                        </div>
                        {/* <div class="col-md-12">
                            <div class="form-group">
                                    <label>Bio</label>
                                    <div class="input-field bg-dark"> 
                                        <textarea class="bg-dark text-white" rows="4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore vero enim error similique quia numquam ullam corporis officia odio repellendus aperiam consequatur laudantium porro voluptatibus, itaque laboriosam veritatis voluptatum distinctio!</textarea>
                                    </div>
                            </div>
                        </div> */}
                    </div>
                    </form>
                    <div>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Guardar</button>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancelar</button>
                    </div>
                </div>
                <div class="tab-pane fade" id="password" role="tabpanel" aria-labelledby="password-tab">
                    <h3 class="mb-4">Password Settings</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Password Antiga</label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Password Nova</label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Confirme a Nova Password</label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Guardar</button>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancelar</button>
                    </div>
                </div>
                <div class="tab-pane fade" id="security" role="tabpanel" aria-labelledby="security-tab">
                    <h3 class="mb-4">Security Settings</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Login</label>
                                <div class="input-field bg-dark"> 
                                    <input type="text" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Two-factor auth</label>
                                <div class="input-field bg-dark"> 
                                    <input type="text" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="recovery"/>
                                    <label class="form-check-label" for="recovery">
                                    Recovery
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Guardar</button>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancelar</button>
                    </div>
                </div>
                <div class="tab-pane fade" id="application" role="tabpanel" aria-labelledby="application-tab">
                    <h3 class="mb-4">Application Settings</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="app-check"/>
                                    <label class="form-check-label" for="app-check">
                                    App check
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                                    <label class="form-check-label" for="defaultCheck2">
                                    Lorem ipsum dolor sit.
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Guardar</button>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancelar</button>
                    </div>
                </div>
                <div class="tab-pane fade" id="notification" role="tabpanel" aria-labelledby="notification-tab">
                    <h3 class="mb-4">Notification Settings</h3>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="notification1"/>
                            <label class="form-check-label" for="notification1">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium accusamus, neque cupiditate quis
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="notification2"/>
                            <label class="form-check-label" for="notification2">
                                hic nesciunt repellat perferendis voluptatum totam porro eligendi.
                            </label>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="notification3"/>
                            <label class="form-check-label" for="notification3">
                                commodi fugiat molestiae tempora corporis. Sed dignissimos suscipit
                            </label>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Guardar</button>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancelar</button>
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
