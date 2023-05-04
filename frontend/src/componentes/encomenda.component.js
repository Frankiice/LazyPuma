import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { Stepper } from 'react-form-stepper';
import { FarBootstrap } from "react-icons/fa";

function Details() {
  return <h2>Informaçao sobre o utilizador e compra (morada, produtos, etc..)</h2>;
}

function Payment() {
  return <h2>Pagamento (produtos novamente, preço total, que forma de pagamento vai ser usada)</h2>;
}

function Confirmation() {
  return <h2>Confirmaçao a dizer que foi sucesso ou nao</h2>;
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
      <div class="cor_header height_header">  
        <br></br>
        <Stepper
        // steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
        // activeStep={1}
        steps={this.steps}
        activeStep={this.state}
        // stepStyle={{
        //     activeBgColor: '#FFFFFF',
        //     completedBgColor: '#FFFFFF',
        //     inactiveBgColor: '#FFFFFF'
        // }}
        />
        <div style={{padding: '20px'}}>
          { getSectionComponent(this.state.activeStep) }
          { 
          (this.state.activeStep !== 0 && this.state.activeStep !== this.steps.length - 1) && <button onClick={ () => this.setState({ activeStep: this.state.activeStep - 1 }) }>Previous</button>
          }
          { 
          this.state.activeStep !== this.steps.length - 1 && <button onClick={ () => this.setState({ activeStep: this.state.activeStep + 1 }) }>Next</button>
          }
        </div>
      </div>
      
    );
  }
}
