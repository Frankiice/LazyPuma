import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1
    };
  }

  handleQuantityChange(event) {
    this.setState({
      quantity: parseInt(event.target.value)
    });
  }

render() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const { quantity } = this.state;
  return (
    

    <div class="container">
    <div class="row">

      <div class="col-lg-9">
        <div class="card border shadow-0">
          <div class="m-4">
            <h4 class="card-title mb-4">Your shopping cart</h4>
            <div class="row gy-3 mb-4">
              <div class="col-lg-5">
                <div class="me-lg-5">
                  <div class="d-flex">
                    
                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/11.webp" class="border rounded me-3" style="width: 96px; height: 96px;" />
                    <div class="">
                      <a href="#" class="nav-link">Winter jacket for men and lady</a>
                      <p class="text-muted">Yellow, Jeans</p>
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
                  <text class="h6">$1156.00</text> <br />
                  <small class="text-muted text-nowrap"> $460.00 / per item </small>
                </div>
              </div>
              <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                <div class="float-md-end">
                  <a href="#!" class="btn btn-light border px-2 icon-hover-primary"><i class="fas fa-heart fa-lg px-1 text-secondary"></i></a>
                  <a href="#" class="btn btn-light border text-danger icon-hover-danger"> Remove</a>
                </div>
              </div>
            </div>

            <div class="row gy-3 mb-4">
              <div class="col-lg-5">
                <div class="me-lg-5">
                  <div class="d-flex">
                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/12.webp" class="border rounded me-3" style="width: 96px; height: 96px;" />
                    <div class="">
                      <a href="#" class="nav-link">Mens T-shirt Cotton Base</a>
                      <p class="text-muted">Blue, Medium</p>
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
                  <text class="h6">$44.80</text> <br />
                  <small class="text-muted text-nowrap"> $12.20 / per item </small>
                </div>
              </div>
              <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                <div class="float-md-end">
                  <a href="#!" class="btn btn-light border px-2 icon-hover-primary"><i class="fas fa-heart fa-lg px-1 text-secondary"></i></a>
                  <a href="#" class="btn btn-light border text-danger icon-hover-danger"> Remove</a>
                </div>
              </div>
            </div>

            <div class="row gy-3">
              <div class="col-lg-5">
                <div class="me-lg-5">
                  <div class="d-flex">
                    <img src="https://bootstrap-ecommerce.com/bootstrap5-ecommerce/images/items/13.webp" class="border rounded me-3" style="width: 96px; height: 96px;" />
                    <div class="">
                      <a href="#" class="nav-link">Blazer Suit Dress Jacket for Men</a>
                      <p class="text-muted">XL size, Jeans, Blue</p>
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
                  <text class="h6">$1156.00</text> <br />
                  <small class="text-muted text-nowrap"> $460.00 / per item </small>
                </div>
              </div>
              <div class="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                <div class="float-md-end">
                  <a href="#!" class="btn btn-light border px-2 icon-hover-primary"><i class="fas fa-heart fa-lg px-1 text-secondary"></i></a>
                  <a href="#" class="btn btn-light border text-danger icon-hover-danger"> Remove</a>
                </div>
                
              </div>
              
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
            <div class="d-flex justify-content-between">
              <p class="mb-2">Total price:</p>
              <p class="mb-2">$329.00</p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-2">Discount:</p>
              <p class="mb-2 text-success">-$60.00</p>
            </div>
            <div class="d-flex justify-content-between">
              <p class="mb-2">TAX:</p>
              <p class="mb-2">$14.00</p>
            </div>
            <hr />
            <div class="d-flex justify-content-between">
              <p class="mb-2">Total price:</p>
              <p class="mb-2 fw-bold">$283.00</p>
            </div>
            
            <div class="mt-3">
              <a href="#" class="btn btn-success w-100 shadow-0 mb-2"> Make Purchase </a>
              <a href="#" class="btn btn-light w-100 border mt-2"> Back to shop </a>
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
