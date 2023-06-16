import React, { Component, useState, useEffect } from "react";
import '../styles/componentescss.css';
import { Stepper } from 'react-form-stepper';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { FarBootstrap } from "react-icons/fa";

function Details(props) {
  const total = props.calcularTotal(props.state.carrinho);

  // Function to check if the cart is empty or the full price is 0
  const CheckCartEmpty = () => {
    if (isCartEmpty() || total === 0) {
      // Redirect to the initial page after 5 seconds
      setTimeout(() => {
        window.location.href = "/"; // Replace with your desired initial page URL
      }, 5000);
      return (
        <div>
          <h1>The cart is empty or the full price of the items is 0 or FREE</h1>
          <p>Redirecting in 5 seconds...</p>
        </div>
      );
    } else {
      return (
        console.log('props:', props),
        <div class="encomenda">
          <div class="row p-5 mx-5 bg-dark shadow rounded d-block d-sm-flex">
            <div class="p-5 col-md-4 order-md-2 mb-4">
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span >Your cart</span>
                <span class="badge badge-secondary badge-pill">{props.state.count}</span>
              </h4>
              <ul class="list-group mb-3">
              {/* <div class="container-cart"> */}
              {/* <div class="items-carrinho"> */}
              { props.state.carrinho && props.state.carrinho.map(item => (
              <div class="container-cart">
                <div class="carrinho-item" key={item.nome}>
                      <img class="" style={{minHeight: "50px", minWidth: "30px"}} src={item.img} />    
                      <h6>{item.nome}</h6>
                      {/* <small class="text-muted">Brief description</small> */}
                      <span class="text-muted">{item.preco}€</span>
                </div>
              </div>
            
            ))}
                  
                  
              {/*
              <li class="list-group-item d-flex justify-content-between bg-light">
                <div class="text-success">
                  <h6 class="my-0">Promo code</h6>
                  <small>EXAMPLECODE</small>
                </div>
                <span class="text-success">-$5</span>
              </li> */}
              <li class="list-group-item d-flex justify-content-between">
                <span>Total</span>
                <strong>{total}€</strong>
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
              <form class="needs-validation" onSubmit={props.handleNextStep}>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName">First name</label>
                    <div class="input-field bg-dark"> 
                      <input type="text" class="form-control bg-dark text-white detailsEncomenda" id="firstName" placeholder={props.state.fName} required></input>
                    </div>
                    <div class="invalid-feedback">
                      Valid first name is required.
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName">Last name</label>
                    <div class="input-field bg-dark"> 
                      <input type="text" class="form-control bg-dark text-white detailsEncomenda" id="lastName" placeholder={props.state.lName} required></input>
                    </div>
                    <div class="invalid-feedback">
                      Valid last name is required.
                    </div>
                  </div>
                </div>
    
                <div class="mb-3">
                  <label for="email">Email <span class="text-muted">(Optional)</span></label>
                    <input type="email" class="form-control bg-dark text-white detailsEncomenda" id="email" placeholder={props.state.email}></input>
                  <div class="invalid-feedback">
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>
    
                <div class="mb-3">
                  <label for="address">Address</label>
                  <div class="input-field bg-dark"> 
                    <input type="text" class="form-control bg-dark text-white detailsEncomenda" id="address" placeholder={props.state.morada} required></input>
                  </div>
                  <div class="invalid-feedback">
                    Please enter your shipping address.
                  </div>
                </div>
    
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="firstName">NIF</label>
                      <input type="num" class="form-control bg-dark text-white detailsEncomenda" id="NIF" placeholder={props.state.nif} required></input>
                    <div class="invalid-feedback">
                      Valid NIF is required.
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="lastName">Phone Number</label>
                      <input type="num" class="form-control bg-dark text-white detailsEncomenda" id="phone" placeholder={props.state.phone} required></input>
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
        </div>
        );
    }
  };

  // Function to check if the cart is empty
  const isCartEmpty = () => {
    return props.state.carrinho.length === 0;
  };

  useEffect(() => {
    // Call the CheckCartEmpty function when the component mounts
    CheckCartEmpty();
  }, []);

  return <CheckCartEmpty />;
}

function Payment(props) {

//   const initialOptions = {
//     "client-id": "AS3rmVBGmMwOidTWn8ZkC-lab9AocIuWvzOtbtItPQCZRlf9jCAcW5FePQgOiR1_UY5O5UEfU14Mh8Ek",
//     currency: "USD",
//     intent: "capture",
//     "data-client-token": "abc123xyz==",
// };

  const total = props.calcularTotal(props.state.carrinho);

  let valorFinal = total.toFixed(2);

  return (
    <div class="encomenda">
    <div class="row p-5 mx-5 bg-dark shadow rounded d-block d-sm-flex">
      <div class="p-5 col-md-4 order-md-2 mb-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span>Your cart</span>
          <span class="badge badge-secondary badge-pill">3</span>
        </h4>
        <ul class="list-group mb-3">
        { props.state.carrinho && props.state.carrinho.map(item => (
      <div class="container-cart">
        <div class="carrinho-item" key={item.nome}>
              <img class="" style={{minHeight: "50px", minWidth: "30px"}} src={item.img} />    
              <h6>{item.nome}</h6>
              {/* <small class="text-muted">Brief description</small> */}
              <span class="text-muted">{item.preco}€</span>
        </div>
      </div>
       ))}
       <li class="list-group-item d-flex justify-content-between">
         <span>Total</span>
         <strong>{total}€</strong>
       </li>
        </ul>


      </div>
      <div class="p-5 col-md-8 order-md-1">
        <form class="needs-validation" novalidate>
          <h4 class="mb-3">Payment</h4>
          {/* <PayPalScriptProvider options={{ options: initialOptions}}>
            <PayPalButtons />
          </PayPalScriptProvider> */}

          <PayPalScriptProvider  options={{ "client-id": "AS3rmVBGmMwOidTWn8ZkC-lab9AocIuWvzOtbtItPQCZRlf9jCAcW5FePQgOiR1_UY5O5UEfU14Mh8Ek" }} >
            <PayPalButtons
            style={{ layout: "vertical" }}
            shippingPreference="NO_SHIPPING"
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: valorFinal,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              const name = details.payer.name.given_name;
              props.state.paymentSuccess = true;
              props.handleNextStep();
          }}
        />
          </PayPalScriptProvider>
          {/* <div class="d-block my-3">
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
          </div> */}
          {/* <div class="row">
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
          </div> */}

          {/* <div class="row">
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
          <hr class="mb-4"></hr> */}
          <button class="btn btn-primary btn-lg btn-block m-3" type="button" onClick={props.handlePreviousStep}>Go back</button>
        </form>
      </div>
    </div>
    </div>
  );
}

function Confirmation(props) {
  const total = props.calcularTotal(props.state.carrinho);

  useEffect(() => {
    if (props.state.paymentSuccess) {
      createOrder();
    }
  }, [props.state.paymentSuccess]);

  const createOrder = () => {
    const { idConsumidor, preco, dataEncomenda, dataEnvio, prazoCancelamento, estadoEncomenda, idProdutos} = getOrderData();

    console.log(getOrderData())

    fetch("http://localhost:5000/user/encomenda", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idConsumidor,
        preco,
        dataEncomenda,
        dataEnvio,
        prazoCancelamento,
        estadoEncomenda,
        idProdutos,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          // Order creation successful
          console.log("Encomenda criada com sucesso!");
          // Perform any additional actions here
        } else {
          // Order creation failed
          console.log("Erro ao criar encomenda", data.error);
          // Handle the error or display an error message
        }
      })
      .catch((error) => {
        console.log("Erro ao criar encomenda:", error);
        // Handle the error or display an error message
      });
  };

  const getOrderData = () => {
    // Replace with the actual order data from your app's state
    const {
      userData,
      carrinho,
    } = props.state;
  
    const currentDate = new Date();
    const dataEncomenda = currentDate.toISOString(); // Get the current time as the dataEncomenda
  
    const prazoCancelamento = (new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000))).toISOString(); // Set prazoCancelamento 30 days after dataEncomenda
  
    const idProdutos = carrinho.map(item => item.id_produto); // Extracting the id_produto from each item in carrinho
  
    return {
      idConsumidor: userData._id,
      preco: total,
      dataEncomenda,
      dataEnvio: null,
      prazoCancelamento,
      estadoEncomenda: "Pendente",
      idProdutos,
    };
  };

  return (
    <div className="encomenda">
      {props.state.paymentSuccess ? (
        <h2>Payment was successful by {props.state.nickname}!</h2>
      ) : (
        <h2>Payment failed. Please try again.</h2>
      )}
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
      count: "",
      paymentSuccess: false,
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

  calcularTotal(carrinho) {
    let total = 0;
    carrinho.forEach(function(item) {
      total += item.preco_original * item.quantidade;
    });
    return total;
  }

  handleNextStep = () => {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }
  
  handlePreviousStep = () => {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }

  handlePaymentSuccess = () => {
    this.setState({ paymentSuccess: true }); // Update paymentSuccess to true
  }

  handlePaymentFailure = () => {
    this.setState({ paymentSuccess: false }); // Update paymentSuccess to false
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
        var count = this.countTotalProducts();
        this.setState({count: count})
    })
}

countTotalProducts() {
  let localStorageObj = JSON.parse(localStorage.getItem('carrinho'));

  let count = 0;
  for (let key in localStorageObj) {
    if (localStorageObj.hasOwnProperty(key)) {
      count += parseInt(localStorageObj[key].quantidade);
    }
  }
  return count;
}

getSectionComponent(s) {
  const { state } = this;
  switch(s) {
    case 0: return <Details state={state} handleNextStep={this.handleNextStep} calcularTotal={this.calcularTotal} />;
    case 1: return <Payment  state={state} handleNextStep={this.handleNextStep} handlePreviousStep={this.handlePreviousStep} calcularTotal={this.calcularTotal} handlePaymentSuccess={this.handlePaymentSuccess} handlePaymentFailure={this.handlePaymentFailure} />;
    case 2: return <Confirmation state={state} handlePreviousStep={this.handlePreviousStep} handlePaymentSuccess={this.handlePaymentSuccess} handlePaymentFailure={this.handlePaymentFailure} calcularTotal={this.calcularTotal}/>;
    default: return <Details state={state} handleNextStep={this.handleNextStep} handlePreviousStep={this.handlePreviousStep} calcularTotal={this.calcularTotal} />;
  }
}

  render() {

   
    return (
      this.state.token ?
        <React.Fragment>
        <div class="cor_header height_header">  
          <br></br>
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
