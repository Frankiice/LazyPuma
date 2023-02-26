import React, { useState, setState } from "react";
import Select from 'react-select'
import '../styles/componentescss.css';

function Registo(){

  const [tipoUser, setTipoUser] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password,setPassword] = useState(null);
  const [confirmPassword,setConfirmPassword] = useState(null);

  const options = [
    { value: 'consumidor', label: 'Consumidor' },
    { value: 'produtor', label: 'Produtor' }
  ]


  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "tipoUser"){
        setTipoUser(value);
    }
    if(id === "firstName"){
        setFirstName(value);
    }
    if(id === "lastName"){
        setLastName(value);
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

const handleSubmit  = () => {
  console.log(tipoUser,firstName,lastName,email,password,confirmPassword);
}


  return (
    <div className="form">
     <div class="form-header">
      <h3>Registo</h3>
     </div>
      <div className="form-body">
          <div className="tipoUtilizador">
              <label className="form__label" for="tipoUser">Tipo de Utilizador </label>
              {/* <input className="form__input" type="text" value={tipoUser} onChange = {(e) => handleInputChange(e)} id="tipoUser" placeholder="Consumidor"/>  */}
              <Select className="form__input" options={options} />
          </div>
          <div className="username">
              <label className="form__label" for="firstName">First Name </label>
              <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/> 
          </div>
          <div className="lastname">
              <label className="form__label" for="lastName">Last Name </label>
              <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
          </div>
          <div className="email">
              <label className="form__label" for="email">Email </label>
              <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
          </div>
          <div className="password">
              <label className="form__label" for="password">Password </label>
              <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
          </div>
          <div className="confirm-password">
              <label className="form__label" for="confirmPassword">Confirm Password </label>
              <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
          </div>
      </div>
      <div class="footer">
        <button onClick={()=>handleSubmit()} type="submit" class="btn btn-outline-dark col-md-2">Registar</button>
      </div>
      <a href="/login" >Já possuo conta</a>
    </div>      
  );
}

export default Registo;
