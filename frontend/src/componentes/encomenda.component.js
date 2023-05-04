import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { Stepper } from 'react-form-stepper';
import { FarBootstrap } from "react-icons/fa";

function Details() {
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

      <form class="card p-2" style={{height:'10%'}}>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Promo code"></input>
          <div class="input-group-append">
            <button type="submit" class="btn btn-secondary">Redeem</button>
          </div>
        </div>
      </form>
    </div>
    <div class="p-5 col-md-8 order-md-1">
      <h4 class="mb-3">Billing address</h4>
      <form class="needs-validation" novalidate>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">First name</label>
            <input type="text" class="form-control" id="firstName" placeholder="First name" value="" required></input>
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName">Last name</label>
            <input type="text" class="form-control" id="lastName" placeholder="Last name" value="" required></input>
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="username">Username</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">@</span>
            </div>
            <input type="text" class="form-control" id="username" placeholder="Username" required></input>
            <div class="invalid-feedback" style={{width: '100%'}}>
              Your username is required.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="email">Email <span class="text-muted">(Optional)</span></label>
          <input type="email" class="form-control" id="email" placeholder="you@example.com"></input>
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>

        <div class="mb-3">
          <label for="address">Address</label>
          <input type="text" class="form-control" id="address" placeholder="1234 Main St" required></input>
          <div class="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>

        <div class="mb-3">
          <label for="address2">Address 2 <span class="text-muted">(Optional)</span></label>
          <input type="text" class="form-control" id="address2" placeholder="Apartment or suite"></input>
        </div>

        <div class="row">
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
        </div>
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
      activeStep: 0,
    };

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
  

  render() {

    function getSectionComponent(s) {
      switch(s) {
        case 0: return <Details />;
        case 1: return <Payment />;
        case 2: return <Confirmation />;
        default: return <Details />;
      }
    }

    return (
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
        { getSectionComponent(this.state.activeStep) }
        { 
        (this.state.activeStep !== 0 && this.state.activeStep !== this.steps.length) && <button onClick={ () => this.setState({ activeStep: this.state.activeStep - 1 }) }>Previous</button>
        }
        { 
        this.state.activeStep !== this.steps.length - 1 && <button onClick={ () => this.setState({ activeStep: this.state.activeStep + 1 }) }>Next</button>
        }
      </div>
      </React.Fragment>
    );
  }
}
