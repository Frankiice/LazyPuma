import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { Stepper } from 'react-form-stepper';
import { FarBootstrap } from "react-icons/fa";

function Details(props) {
  return (
  console.log('props:', props),
  <div class="row p-5 mx-5 bg-dark shadow rounded d-block d-sm-flex">
    <div class="p-5 col-md-4 order-md-2 mb-4">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span >Your cart</span>
        <span class="badge badge-secondary badge-pill">3</span>
      </h4>
      <ul class="list-group mb-3">
      {/* <div class="container-cart"> */}
      {/* <div class="items-carrinho"> */}
      { props.state.carrinho && props.state.carrinho.map(item => (
      <div class="container-cart">
        <div class="carrinho-item" key={item.nome}>
          <div class="row align-items-center">
            <div class="col-sm-3">
              <img class="" style={{minHeight: "30px", minWidth: "30px"}} src={item.img} />
            </div> 
            <div class="col-sm-6">
              <h6>{item.nome}</h6>
              {/* <small class="text-muted">Brief description</small> */}
            </div>
            <div class="col-sm-3">
              <span class="text-muted">{item.preco}</span>
            </div>
          </div>
        </div>
      </div>
    ))}

        {/* </div> */}
    {/* </div> */}
          
          
       {/* <li class="list-group-item d-flex justify-content-between lh-condensed">
         <div>
           <h6 class="my-0">Product name</h6>
           <small class="text-muted">Brief description</small>
         </div>
         <span class="text-muted">$12</span>
       </li>
       <li class="list-group-item d-flex justify-content-between lh-condensed">
         <div>
           <h6 class="my-0">Second product</h6>
           <small class="text-muted">Brief description</small>
         </div>
         <span class="text-muted">$8</span>
       </li>
       <li class="list-group-item d-flex justify-content-between lh-condensed">
         <div>
           <h6 class="my-0">Third item</h6>
           <small class="text-muted">Brief description</small>
         </div>
         <span class="text-muted">$5</span>
       </li>
       <li class="list-group-item d-flex justify-content-between bg-light">
         <div class="text-success">
           <h6 class="my-0">Promo code</h6>
           <small>EXAMPLECODE</small>
         </div>
         <span class="text-success">-$5</span>
       </li> */}
       <li class="list-group-item d-flex justify-content-between">
         <span>Total (USD)</span>
         <strong>$20</strong>
       </li>
      </ul>

      {/* <form class="card p-2" style={{height:'10%'}}>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Promo code"></input>
          <div class="input-group-append">
            <button type="submit" class="btn btn-secondary">Redeem</button>
          </div>
        </div>
      </form> */}
    </div>
    <div class="p-5 col-md-8 order-md-1">
      <h4 class="mb-3">Billing address</h4>
      <form class="needs-validation" novalidate>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">First name</label>
            <div class="input-field bg-dark"> 
              <input type="text" class="form-control bg-dark text-white" id="firstName" placeholder={props.state.fName} required></input>
            </div>
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName">Last name</label>
            <div class="input-field bg-dark"> 
              <input type="text" class="form-control bg-dark text-white" id="lastName" placeholder={props.state.lName} required></input>
            </div>
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="email">Email <span class="text-muted">(Optional)</span></label>
            <input type="email" class="form-control bg-dark text-white" id="email" placeholder={props.state.email}></input>
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>

        <div class="mb-3">
          <label for="address">Address</label>
          <div class="input-field bg-dark"> 
            <input type="text" class="form-control bg-dark text-white" id="address" placeholder={props.state.morada} required></input>
          </div>
          <div class="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">NIF</label>
              <input type="num" class="form-control bg-dark text-white" id="NIF" placeholder={props.state.nif} required></input>
            <div class="invalid-feedback">
              Valid NIF is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName">Phone Number</label>
              <input type="num" class="form-control bg-dark text-white" id="phone" placeholder={props.state.phone} required></input>
            <div class="invalid-feedback">
              Valid Phone Number is required.
            </div>
          </div>
        </div>

        {/* <div class="row">
          <div class="col-md-5 mb-3">
            <label for="country">Country</label>
            <select class="custom-select d-block w-100 rounded" id="country" required>
              <option value="">Choose...</option>
              <option>Portugal</option>
            </select>
            <div class="invalid-feedback">
              Please select a valid country.
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="state">State</label>
            <select class="custom-select d-block w-100 rounded" id="state" required>
              <option value="">Choose...</option>
              <option>California</option>
            </select>
            <div class="invalid-feedback">
              Please provide a valid state.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="zip">Zip</label>
            <input type="text" class="form-control" id="zip" placeholder="" required></input>
            <div class="invalid-feedback">
              Zip code required.
            </div>
          </div>
        </div> */}
        <hr class="mb-4"></hr>
        <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
      </form>
    </div>
  </div>
  );
}

function Payment() {
  return (
    <div class="row p-5 mx-5 bg-dark shadow rounded d-block d-sm-flex">
      <div class="p-5 col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-muted">Your cart</span>
          <span class="badge badge-secondary badge-pill">3</span>
        </h4>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Product name</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$12</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Second product</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$8</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-condensed">
            <div>
              <h6 class="my-0">Third item</h6>
              <small class="text-muted">Brief description</small>
            </div>
            <span class="text-muted">$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Promo code</h6>
              <small>EXAMPLECODE</small>
            </div>
            <span class="text-success">-$5</span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (USD)</span>
            <strong>$20</strong>
          </li>
        </ul>

        <form class="card p-2" style={{height:'14%'}}>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="Promo code"></input>
            <div class="input-group-append">
              <button type="submit" class="btn btn-secondary">Redeem</button>
            </div>
          </div>
        </form>
      </div>
      <div class="p-5 col-md-8 order-md-1">
        <form class="needs-validation" novalidate>
          <h4 class="mb-3">Payment</h4>
          <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input id="credit" name="paymentMethod" type="radio" class="custom-control-input" checked required></input>
              <label class="custom-control-label" for="credit">Credit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="debit" name="paymentMethod" type="radio" class="custom-control-input" required></input>
              <label class="custom-control-label" for="debit">Debit card</label>
            </div>
            <div class="custom-control custom-radio">
              <input id="paypal" name="paymentMethod" type="radio" class="custom-control-input" required></input>
              <label class="custom-control-label" for="paypal">Paypal</label>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="cc-name">Name on card</label>
              <input type="text" class="form-control" id="cc-name" placeholder="" required></input>
              <small class="text-muted">Full name as displayed on card</small>
              <div class="invalid-feedback">
                Name on card is required
              </div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="cc-number">Credit card number</label>
              <input type="text" class="form-control" id="cc-number" placeholder="" required></input>
              <div class="invalid-feedback">
                Credit card number is required
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">Expiration</label>
              <input type="text" class="form-control" id="cc-expiration" placeholder="" required></input>
              <div class="invalid-feedback">
                Expiration date required
              </div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="cc-expiration">CVV</label>
              <input type="text" class="form-control" id="cc-cvv" placeholder="" required></input>
              <div class="invalid-feedback">
                Security code required
              </div>
            </div>
          </div>
          <hr class="mb-4"></hr>
          <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
        </form>
      </div>
    </div>
  );
}

function Confirmation() {
  return (
  <div>
    <h2>Confirmaçao a dizer que foi sucesso ou nao!</h2>
    <h2>Ou seja, se o email for diferente ao da conta logada dá erro</h2>
    <h2>(maybe) se a morada nao existe, dá erro</h2>
    <h2>se a API de pagamento (nos tinhamos pensado em paypal) der erro, entao a "transaçao" foi mal, dá erro</h2>
    <h2>etc</h2>
  </div>
  );
}

export default class Encomenda extends Component {
  constructor(props){
    super(props);

    this.state = {
      token: window.localStorage.getItem("token"),
      activeStep: 0,
      userData: "",
      fullname: "", 
      fName:"",
      lName:"",
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
      carrinho: JSON.parse(localStorage.getItem('carrinho')) || [],
  };
  this.componentDidMount = this.componentDidMount.bind(this);

    this.steps = [
      { label: 'Details' },
      { label: 'Payment' },
      { label: 'Booking confirmation' },
    ];

    this.stepStyle={
      activeBgColor: 'blue',
      completedBgColor: 'green',
      inactiveBgColor: 'gray',
      activeTextColor: 'white',
      completedTextColor: 'white',
      inactiveTextColor: 'black',
    };

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
        var nomeArray = data.data.fullname.split(" ");
        var lastIndex = nomeArray.length - 1;
        this.setState({
                    rua: moradaArray[0],
                    localidade: moradaArray[1],
                    freguesia: moradaArray[2],
                    concelho: moradaArray[3],
                    cod_postal: moradaArray[4],
                    cidade: moradaArray[5],
                    fName: nomeArray[0],
                    lName: nomeArray[lastIndex],
                  });
    })
}

getSectionComponent(s) {
  const { state } = this;
  switch(s) {
    case 0: return <Details state={state}/>;
    case 1: return <Payment />;
    case 2: return <Confirmation />;
    default: return <Details state={state}/>;
  }
}

  render() {

   
    return (
      this.state.token ?
        <React.Fragment>
        <div class="cor_header height_header">  
          <br></br>
          <Stepper
          // steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
          // activeStep={1}
          steps={this.steps}
          activeStep={this.state.activeStep}
          stepStyle={this.stepStyle}
          />
        </div>
        <div class="stepsEncomenda" style={{padding: '25px'}}>
          { this.getSectionComponent(this.state.activeStep) }
          { 
          (this.state.activeStep !== 0 && this.state.activeStep !== this.steps.length) && <button onClick={ () => this.setState({ activeStep: this.state.activeStep - 1 }) }>Previous</button>
          }
          { 
          this.state.activeStep !== this.steps.length - 1 && <button onClick={ () => this.setState({ activeStep: this.state.activeStep + 1 }) }>Next</button>
          }
        </div>
        </React.Fragment>
      :
      <div class="parent" style={{ height: "53vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div class="stepsEncomenda" style={{textAlign: "center", marginTop: "10px", color: "white"}}>
          <div class="row p-5 mx-5 bg-dark shadow rounded d-block d-sm-flex">
            <br></br>
            <h1>Create Account or login to proceed to Checkout</h1>
            <br></br>
            <h2><a href="/user/login">Login</a> or <a href="/user/registar">Create an Account</a></h2>
          </div>
        </div>
      </div>
    );
  }
}
