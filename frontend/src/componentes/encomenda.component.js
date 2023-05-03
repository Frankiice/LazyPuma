import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { Stepper } from 'react-form-stepper';
import { FarBootstrap } from "react-icons/fa";


export default class Encomenda extends Component {
  constructor(props){
    super(props);
    


  }

render() {
  return (
    <header class="cor_header height_header">  
    <br></br>
    <Stepper
    steps={[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]}
    activeStep={1}
    stepStyle={{
        activeBgColor: '#4e35ef',
        completedBgColor: '#4e35ef',
        inactiveBgColor: '#4e35ef'
      }}

    />
    </header>
  );
  }
}
