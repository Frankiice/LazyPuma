import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
import { MDBCheckbox } from 'mdb-react-ui-kit';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      cart: JSON.parse(localStorage.getItem('carrinho')) || [],
      

    };
  }

  handleQuantityChange(itemnome, newQuantity) {
    const { cart } = this.state;
  
    const updatedCart = cart.map((item) => {
      if (item.nome === itemnome) {
        return {
          ...item,
          quantidade: newQuantity,
          preco: item.preco_original * newQuantity
        };
      }
      return item;
    });
  
    this.setState({ cart: updatedCart });
  
    // Atualizar o carrinho na Local Storage
    localStorage.setItem('carrinho', JSON.stringify(updatedCart));
  }
  calcularTotal(carrinho) {
    let total = 0;
    carrinho.forEach(function(item) {
      total += item.preco_original * item.quantidade;
    });
    return total;
  }
  removerProduto = (index) => {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    this.setState({ carrinho });
    window.location.reload();

  };
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
        this.setState({ nickname: data.data.nickname,});
    })
}
  

render() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const { cart } = this.state;
  const total = this.calcularTotal(carrinho);
  
  return (
    
<div class="container">
  <div class="row">
    <div class="col-lg-9">
      <div class="card d-flex border shadow-0 custom-card">
        <div class="m-4">
          <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s shopping cart</h2>
          <br></br>
          <div class="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {carrinho.length === 0 ? (
              <div class="carrinho-vazio">
                <br></br>
                <h5 class="text-secondary justify-content-md-center">Your shopping cart is empty!</h5>
              </div>
            ) : (
              carrinho.map((item,index) => (
                
                <div class="row gy-3 mb-4 produto_carrinho" key={item.nome}>
                  <div class="col-lg-5">
                    <div class="me-lg-5">
                      <div class="d-flex">
                        {/* <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp" class="border rounded me-3" style="width: 96px; height: 96px;" /> */}
                        <img class="border rounded me-3" src={item.img} style={{ width: '96px', height: '96px' }} alt={item.nome}/>
                        <div class="">
                          <a href="#" class="nav-link">{item.nome}</a>

                          {item.propriedades.map((propriedade, propIndex) => (
                <p key={propIndex} className="text-muted">{propriedade.name}: {propriedade.value}</p>
              ))}
       
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                    <div class="">
                      {/* <select style="width: 100px;" class="form-select me-4">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select> */}
                    </div>
                    <div class="">
                      <text class="h6">{item.preco}€</text> <br />
                      <small class="text-muted text-nowrap"> {item.preco_original}€ / per item </small>
                      
                    </div>
                    
                    
                  </div>
                  <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                  <div class="form-outline">
                  <text class="h6">Quantity</text>  &nbsp;
                      <input type="number" id="typeNumber" class="form-control form-control-sm " style={{ width: '48px', backgroundColor: '#f8f9fa', border: '1px solid #e4e8eb',display: 'inline-block'  }} defaultValue={item.quantidade} min="1" onChange={(e) => this.handleQuantityChange(item.nome, parseInt(e.target.value))} /> 
                  </div>
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                    <div class="float-md-end">
                      <a href="#" class="btn btn-light border text-danger icon-hover-danger" onClick={() => this.removerProduto(index)}> Remove</a>
                    </div>
                  </div>
                  <hr />
                </div>
              ))
            )}
          
        
     
   





            
             
            
            
       
            
            
            </div>
            
            
            
            
          </div>
          

          {/* <div class="border-top pt-4 mx-4 mb-4">
            <p><i class="fas fa-truck text-muted fa-lg"></i> Free Delivery within 1-2 weeks</p>
            <p class="text-muted">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip
            </p>
          </div> */}
        </div>
      </div>

      <div class="col-lg-3">
        {/* <div class="card mb-3 border shadow-0">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label class="form-label">Have coupon?</label>
                <div class="input-group">
                  <input type="text" class="form-control border" name="" placeholder="Coupon code" />
                  <button class="btn btn-light border">Apply</button>
                </div>
              </div>
            </form>
          </div>
        </div> */}
        <div class="card shadow-0 border">
          <div class="card-body">
            {/* <div class="d-flex justify-content-between">
              <p class="mb-2 text-dark ">Total price:</p>
              <p class="mb-2 text-secondary">$329.00</p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-2 text-dark">Discount:</p>
              <p class="mb-2 text-success text-secondary">-$60.00</p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-2 text-dark ">TAX:</p>
              <p class="mb-2 text-secondary">$14.00</p>
            </div>
            <hr /> */}
            <h3 class="d-flex justify-content-center">Order Summary</h3>
            <br></br>
            <div class="d-flex justify-content-between">
              <h5 class="mb-2 text-dark">Total price:</h5>
              <h5 class="mb-2 fw-bold text-secondary"> {total}€</h5>
            </div>
            
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="This order contains a gift"
              style={{ color: 'black' }}
            />
            <br></br> <br></br><br></br> 
            <hr />
            
            <div class="mt-3">
            {carrinho.length > 0 && (
        <a href='./user/encomenda' class="btn btn-success w-100 shadow-0 mb-2" > Proceed to checkout </a>
      )}
              
              
              <a href="./" class="btn btn-light w-100 border mt-2"> Back to shop </a>
            </div>
          </div>
        </div>
      </div>
  
    </div>
    
  </div>
  



/* <div class="container-fluid">
        <div class="row justify-content-evenly">
            <div class="col col-xl-9  ">
                <div class="panel border bg-dark padding- ">
                    <div class="panel-heading ">
                        <h3 class="pt-3 font-weight-bold text-white">Shopping Cart</h3>
                    </div>
                    <div class="panel-body p-3">
  
                    </div>
  
                </div>
              </div> 
              <div class=" col">
                <div class="panel border bg-dark">
                    <div class="panel-heading">
                        <h3 class="pt-3 font-weight-bold text-white">Shopping Cart</h3>
                    </div>
                    <div class="panel-body p-3">
  
                    </div>
  
                </div>
              </div> 
          </div> 
         
            <div class="row justify-content-end">
            <div class="col col-xl-9"></div>
            <div class="col">
              <div class="panel border bg-dark">
                    <div class="panel-heading">
                        <h3 class="pt-3 font-weight-bold text-white">Shopping Cart</h3>
                    </div>
                    <div class="panel-body p-3">
  
                    </div>
  
                </div>
            </div>
         </div>
    </div> */



    // <div className="submit-form">
    //  <div>
    //   <div className="form-group">
    //     <lable htmlFor="user"> Username</lable>
    //       <input 
    //         type="text"
    //         className="form-control"
    //         id="name"
    //         required
    //         value={user.name}
    //         onChange={handleInputChange}
    //         name="name"
    //       />
    //   </div>
    //   <div className="form-group">
    //     <lable htmlFor="id">ID</lable>
    //     <input
    //       type="text"
    //       className="form-control"
    //       id="id"
    //       required
    //       value={user.id}
    //       onChange={handleInputChange}
    //       name="id"
    //     />
    //   </div>

    // <button onClick={login} className="btn btn-success">
    //   Login
    // </button>

    //  </div>
    // </div>
  );
  }
}
// export default Login;
