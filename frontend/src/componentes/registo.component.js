import React, { useState, setState, Component } from "react";
import Select from 'react-select'
import '../styles/componentescss.css';

// const Registo = props => {
export default class Registo extends Component {

    constructor(props){
        super (props);
        this.state={
            tipoUser: "consumidor",
            name: "",
            username: "",
            morada: "",
            identificadorFiscal: "",
            email: "",
            telemovel: "",
            password: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

   
    // getInitialState(){
    //     return {selectValue:'consumidor'};
    // };
    
    handleChange(e){
        this.setState({tipoUser:e.target.value});
    };

    handleSubmit(e){
        e.preventDefault();
        const {tipoUser, name, username,morada, identificadorFiscal, email, telemovel, password} = this.state;
        console.log(tipoUser, name, username,morada, identificadorFiscal, email, telemovel, password);
        fetch("http://localhost:5000//user/registar",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                tipoUser,
                name,
                username,
                morada,
                identificadorFiscal,
                email,
                telemovel,
                password,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
        })
    };
// const initialUserState = {
//     tipoUser: "",
//     name: "",
//     username: "",
//     morada: "",
//     identificadorFiscal: "",
//     email: "",
//     telemovel: "",
//     password: "",
//   };

//   const [tipoUser, setTipoUser] = useState(null);
//   const [name, setName] = useState(null);
//   const [username, setUsername] = useState(null);
//   const [morada, setMorada] = useState(null);
//   const [identificadorFiscal, setIdFiscal] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [telemovel, setTelemovel] = useState(null);
//   const [password,setPassword] = useState(null);
//   const [confirmPassword,setConfirmPassword] = useState(null);

//   const options = [
//     { value: 'consumidor', label: 'Consumidor' },
//     { value: 'produtor', label: 'Produtor' }
//   ]


//   const handleInputChange = (e) => {
//     const {id , value} = e.target;
//     if(id === "tipoUser"){
//         setTipoUser(value);
//     }
//     if(id === "name"){
//         setName(value);
//     }
//     if(id === "username"){
//         setUsername(value);
//     }
//     if(id === "morada"){
//         setMorada(value);
//     }
//     if(id === "identificadorFiscal"){
//         setIdFiscal(value);
//     }
//     if(id === "email"){
//         setEmail(value);
//     }
//     if(id === "telemovel"){
//         setTelemovel(value);
//     }
//     if(id === "password"){
//         setPassword(value);
//     }
//     if(id === "confirmPassword"){
//         setConfirmPassword(value);
//     }



// const handleSubmit  = () => {
//   console.log(tipoUser,name,username,morada,email,password,confirmPassword);
// }

// const register = () => { //da registo no user e depois vai para a home page ???? copiado do login
//     props.register(email)
//     console.log(tipoUser,name,username,morada,identificadorFiscal,email,password,confirmPassword);
//     props.history.push('/');
//   }

render() {
  return (
    <div class="container">
    <div class="row">
        <div class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
            <div class="panel border bg-dark">
                <div class="panel-heading">
                    <h3 class="pt-3 font-weight-bold text-white">Registo</h3>
                </div>
                <div class="panel-body p-3">
                    <form onSubmit={this.handleSubmit}>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark">
                                 <span class="fa fa-user px-2"></span> 
                                    <select class="bg-dark text-white" id="tipoUser" 
                                    value={this.state.tipoUser} 
                                    onChange={this.handleChange} >
                                    <option value="consumidor">Consumidor</option>
                                    <option value="fornecedor">Fornecedor</option>
                                </select> 
                            </div>
                        </div>                                                                                                                          {/*value={name} onChange = {(e) => handleInputChange(e)}*/} 
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-user px-2"></span> <input class="bg-dark text-white" type="text" id="name" onChange={(e => this.setState({ name: e.target.value }))}  placeholder="Nome Completo" required /> </div>
                        </div>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-user px-2"></span> <input class="bg-dark text-white" type="text" id="username" onChange={(e => this.setState({ username: e.target.value }))} placeholder="Username" required /> </div>
                        </div>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-envelope px-1"></span> <input class="bg-dark text-white" type="text" id="email" onChange={(e => this.setState({ email: e.target.value }))} placeholder="Email" required /> </div>
                        </div>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-phone px-1"></span> <input class="bg-dark text-white"  type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" id="telemovel" onChange={(e => this.setState({ telemovel: e.target.value }))} placeholder="Telemóvel" required /> </div>
                        </div>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-map-marker px-2"></span> <input class="bg-dark text-white" type="text" id="morada" onChange={(e => this.setState({ morada: e.target.value }))} placeholder="Morada" required /> </div>
                        </div>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-id-card-o px-1"></span> <input class="bg-dark text-white" type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}"  id="identificadorFiscal" onChange={(e => this.setState({ identificadorFiscal: e.target.value }))} placeholder="Identificador Fiscal" required /> </div>
                        </div>
                        <div class="form-group py-1 pb-2">
                            <div class="input-field"> <span class="fa fa-lock px-2"></span> <input class="bg-dark text-white" type="password" id="password" onChange={(e => this.setState({ password: e.target.value }))} placeholder="Password" required /> </div>
                        </div>
                        <div class="form-group py-1 pb-2">
                            <div class="input-field"> <span class="fa fa-lock px-2"></span> <input class="bg-dark text-white" type="password" id="confirmPassword" onChange={(e => this.setState({ confirmPassword: e.target.value }))} placeholder="Confirme a Password" required /> </div>
                        </div>
                        <div class="form-inline"> <input type="checkbox" name="remember" id="remember" /> <label for="remember" class="text-muted">Remember me</label> <a href="#" id="forgot" class="font-weight-bold">Forgot password?</a> </div>
                        <div class="botao">
                            <br></br>
                          <button type="submit"  class="btn btn-outline-light col-md-3">
                            Registar
                          </button>
                        </div>
                        <div class="text-center pt-4 text-muted">Já tem uma conta? <a href="/login">Log in</a> </div>
                    </form>
                </div>
                <div class="mx-3 my-2 py-2 bordert">
                    <div class="text-center py-3">
                      <a href="https://wwww.facebook.com" class="px-3"> 
                        <img id="loginimg" src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg" alt="icon do facebook"/> 
                      </a> 
                      <a href="https://www.google.com" class="px-2"> 
                        <img id="loginimg" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="icon do google"/> 
                      </a> 
                      <a href="https://www.github.com" class="px-3"> 
                        <img id="loginimg" src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png" alt="icon do github"/> 
                      </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
//     <div className="form">
//      <div class="form-header">
//       <h3>Registo</h3>
//      </div>
//       <div className="form-body">
//           <div className="tipoUtilizador">
//               <label className="form__label" for="tipoUser">Tipo de Utilizador </label>
//               {/* <input className="form__input" type="text" value={tipoUser} onChange = {(e) => handleInputChange(e)} id="tipoUser" placeholder="Consumidor"/>  */}
//               <Select className="form__input" options={options} />
//           </div>
//           <div className="name">
//               <label className="form__label" for="name">Nome Completo</label>
//               <input className="form__input" type="text" id="name" value={name} onChange = {(e) => handleInputChange(e)} placeholder="Nome"/> 
//           </div>
//           <div className="morada">
//               <label className="form__label" for="morada">Morada</label>
//               <input  type="text" name="" id="morada" value={morada}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="Morada"/>
//           </div>
//           <div className="email">
//               <label className="form__label" for="email">Email </label>
//               <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
//           </div>
//           <div className="password">
//               <label className="form__label" for="password">Password </label>
//               <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
//           </div>
//           <div className="confirm-password">
//               <label className="form__label" for="confirmPassword">Confirm Password </label>
//               <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
//           </div>
//       </div>
//       <div class="footer">
//         <button onClick={()=>handleSubmit()} type="submit" class="btn btn-outline-dark col-md-2">Registar</button>
//       </div>
//       <a href="/login" >Já possuo conta</a>
//     </div>      
  );

    }
}
// export default Registo;
