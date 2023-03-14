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
            morada: "",
            lat: "",
            lon: "",
            nif: "",
            email: "",
            phone: "",
            password: "",
            userRemove: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
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
                    password: data.data.password,
                    userRemove: data.data.userRemove,});
    })
}
logOut = () => {
    window.localStorage.clear();
    window.location.href = "./login"

}

handleRemove(e){
    e.preventDefault();
    const {userRemove} = this.state;
    console.log(userRemove);
    fetch("http://localhost:5000/user/delete",{
        method:"DELETE",
        crossDomain:true,
        headers:{
            "Content-type":"application/json",
            Accept:"application/json",
            "Access-Control-Allow-Origin":"*",
        },
        body:JSON.stringify({               // o delete nem precisa de nada???
            token: window.localStorage.getItem("token"),
            userRemove,
        }),
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data, "userDelete");
    })
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
                        Conta
                    </a>
                    <a class="nav-link" id="encomendas-tab" data-toggle="pill" href="#encomendas" role="tab" aria-controls="encomendas" aria-selected="false">
                        <i class="fa fa-key text-center mr-1"></i> 
                        Encomendas
                    </a>
                    <a class="nav-link" id="relatorios-tab" data-toggle="pill" href="#relatorios" role="tab" aria-controls="relatorios" aria-selected="false">
                        <i class="fa fa-key text-center mr-1"></i> 
                        Relatórios
                    </a>
                    <a class="nav-link" id="logout-tab" data-toggle="pill" href="#logout" role="tab" aria-controls="logout" aria-selected="false">
                        <i class="fa fa-user text-center mr-1"></i> 
                        Logout
                    </a>
                    <a class="nav-link" id="remocao-tab" data-toggle="pill" href="#remocao" role="tab" aria-controls="remocao" aria-selected="false">
                        <i class="fa fa-tv text-center mr-1"></i> 
                        Remover Conta
                    </a>
                    <a class="nav-link" id="up-tab" data-toggle="pill" href="#up" role="tab" aria-controls="up" aria-selected="false">
                        <i class="fa fa-bell text-center mr-1"></i> 
                        Unidades de Produção
                    </a>
                    <a class="nav-link" id="veiculos-tab" data-toggle="pill" href="#veiculos" role="tab" aria-controls="veiculos" aria-selected="false">
                        <i class="fa fa-bell text-center mr-1"></i> 
                        Veículos
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
                        <div>
                            <button type="submit" class="btn btn-outline-light col-md-3 botaoPerfil">Guardar</button>
                            {/* <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancelar</button> */}
                        </div>
                    </form>
                    
                </div>
                <div class="tab-pane fade" id="encomendas" role="tabpanel" aria-labelledby="encomendas-tab">
                    <h3 class="mb-4">Histórico de Encomendas </h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>encomendas Antiga</label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>encomendas Nova</label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Confirme a Nova encomendas</label>
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

                <div class="tab-pane fade" id="relatorios" role="tabpanel" aria-labelledby="relatorios-tab">
                    <h3 class="mb-4">Os seus Relatórios</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>relatorios</label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>relatorios </label>
                                <div class="input-field bg-dark"> 
                                    <input type="password" class="bg-dark text-white"/>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Confirme a Nova relatorios</label>
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
                <div class="tab-pane fade" id="logout" role="tabpanel" aria-labelledby="logout-tab">
                    <h3 class="mb-4">Efetue Logout</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Pertende dar logout?</label>
                                <div> 
                                    <br></br>
                                    <button onClick={this.logOut} class="btn btn-outline-light col-md-3 botaoPerfil">Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="remocao" role="tabpanel" aria-labelledby="remocao-tab">
                    <h3 class="mb-4">Remoção de Conta</h3>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <form onSubmit={this.handleRemove}>
                                    <p>Atenção: Esta ação é irreversível</p>
                                    <label>Para remover a sua conta insira o seu username</label>
                                    <div class="input-field bg-dark"> 
                                        <input type="text" onChange={(e => this.setState({ userRemove: e.target.value }))} class="bg-dark text-white" id="userRemocao"/>
                                    </div>
                                    <div> 
                                        <br></br>
                                        <button type="submit" class="btn btn-outline-light col-md-3 botaoRemover">Remover</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="up" role="tabpanel" aria-labelledby="up-tab">
                    <h3 class="mb-4">Unidades de Producao Settings</h3>
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
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Guardar</button>
                        <button class="btn btn-outline-light col-md-3 botaoPerfil">Cancelar</button>
                    </div>
                </div>

                <div class="tab-pane fade" id="veiculos" role="tabpanel" aria-labelledby="veiculos-tab">
                    <h3 class="mb-4">veiculos Settings</h3>
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
