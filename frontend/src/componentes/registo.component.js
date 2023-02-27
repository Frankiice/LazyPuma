import React, { useState, setState } from "react";
import Select from 'react-select'
import '../styles/componentescss.css';

const Registo = props => {

  const [tipoUser, setTipoUser] = useState(null);
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [morada, setMorada] = useState(null);
  const [email, setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [confirmPassword,setConfirmPassword] = useState(null);

//   const options = [
//     { value: 'consumidor', label: 'Consumidor' },
//     { value: 'produtor', label: 'Produtor' }
//   ]


  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "tipoUser"){
        setTipoUser(value);
    }
    if(id === "name"){
        setName(value);
    }
    if(id === "username"){
        setUsername(value);
    }
    if(id === "morada"){
        setMorada(value);
    }
    if(id === "email"){
        setEmail(value);
    }
    if(id === "password"){
        setPassword(value);
    }
    if(id === "confirmPassword"){
        setConfirmPassword(value);
    }

}

// const handleSubmit  = () => {
//   console.log(tipoUser,name,username,morada,email,password,confirmPassword);
// }

const register = () => { //da registo no user e depois vai para a home page ???? copiado do login
    props.register(email)
    console.log(tipoUser,name,username,morada,email,password,confirmPassword);
    props.history.push('/');
  }


  return (
    <div class="container">
    <div class="row">
        <div class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
            <div class="panel border bg-dark">
                <div class="panel-heading">
                    <h3 class="pt-3 font-weight-bold text-white">Registo</h3>
                </div>
                <div class="panel-body p-3">
                    <form action="login_script.php" method="POST">
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-user px-2"></span> 
                            <select class="bg-dark text-white">
                                <option value="consumidor">Consumidor</option>
                                <option value="produtor">Produtor</option>
                            </select> </div>
                        </div>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-user px-2"></span> <input class="bg-dark text-white" type="text" id="name" value={name} onChange = {(e) => handleInputChange(e)} placeholder="Nome Completo" required /> </div>
                        </div>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-user px-2"></span> <input class="bg-dark text-white" type="text" id="username" value={username} onChange = {(e) => handleInputChange(e)} placeholder="Username" required /> </div>
                        </div>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-map-marker px-2"></span> <input class="bg-dark text-white" type="text" id="morada" value={morada} onChange = {(e) => handleInputChange(e)} placeholder="Morada" required /> </div>
                        </div>
                        <div class="form-group py-2">
                            <div class="input-field bg-dark"> <span class="fa fa-envelope px-1"></span> <input class="bg-dark text-white" type="text" id="email" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email" required /> </div>
                        </div>
                        <div class="form-group py-1 pb-2">
                            <div class="input-field"> <span class="fa fa-lock px-2"></span> <input class="bg-dark text-white" type="password" id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password" required /> </div>
                        </div>
                        <div class="form-group py-1 pb-2">
                            <div class="input-field"> <span class="fa fa-lock px-2"></span> <input class="bg-dark text-white" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Comfirme a Password" required /> </div>
                        </div>
                        <div class="form-inline"> <input type="checkbox" name="remember" id="remember" /> <label for="remember" class="text-muted">Remember me</label> <a href="#" id="forgot" class="font-weight-bold">Forgot password?</a> </div>
                        <div class="botao">
                          <button onClick={register} className="btn btn-primary btn-block mt-3">
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

export default Registo;
