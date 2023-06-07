import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
// import { GoogleLogin } from 'react-google-login';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin, googleLogout} from '@react-oauth/google'
import jwtDecode from "jwt-decode";

const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";

// console.log(process.env.CLIENT_ID)
// console.log(process.env.CLIENT_URL)

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:"",
      password:"",
      userLoginFailed: "",
      userError: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    window.localStorage.removeItem("userUpdated");

  }

  handleSubmit(e){
    e.preventDefault();
    const {email, password, userLoginFailed} = this.state;
    console.log( email, password);
    fetch("http://localhost:5000/user/login",{
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-type":"application/json",
                Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body:JSON.stringify({
                email,
                password,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data, "userRegister");
            if(data.status=="ok") {
              alert("login successful");
              window.localStorage.setItem("token", data.data);
              window.localStorage.setItem("loggedIn", true);
              if(data.type=="consumidor"){  //se for consumidor
                window.location.href = "./c";
              }else{ //se for fornecedor
                window.location.href = "./f";
              }
              
            }else{
              this.setState({userLoginFailed: true});
              this.setState({userError: data.error});
            }
        })
  };

  handleGoogleLoginSuccess(response) {
  
    const decodedResponse = jwtDecode(response.credential);

    console.log(decodedResponse)
  
    window.localStorage.setItem("response", JSON.stringify(decodedResponse));
    window.localStorage.setItem("isGoogleLogged", true);
    window.localStorage.setItem("loggedIn", true);
    
    window.location.href = "./c";
  };

// const Login = props => {

  // const initialUserState = {
  //   name: "",
  //   id: ""
  // };

  // const [user, setUser] = useState(initialUserState);

  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setUser({ ...user, [name]: value });
  // };

  // const login = () => { //da login no user e depois vai para a home page
  //   props.login(user)
  //   props.history.push('/');
  // }
render() {
  return (
    <div class="login">
    {isLoggedIn ? (
      <h5 style={{ height: "53vh", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "80px" }}>User already logged in!</h5>
    ) : (
      <div class="container">
          <div class="row">
              <div class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                  <div class="panel border bg-dark">
                      <div class="panel-heading">
                          <h3 class="pt-3 font-weight-bold text-white">Login</h3>
                      </div>
                      <div class="panel-body p-3">
                          <form onSubmit={this.handleSubmit}>
                              <div class="form-group py-2">
                                  <label>Email</label>
                                  <div class="input-field bg-dark"> <span class="fa fa-user px-2"></span> <input class="bg-dark text-white" type="text" onChange={(e => this.setState({ email: e.target.value }))}  required /> </div>
                              </div>
                              <div class="form-group py-1 pb-2">
                              <label>Password</label>
                                  <div class="input-field"> <span class="fa fa-lock px-2"></span> <input class="bg-dark text-white" type="password" onChange={(e => this.setState({ password: e.target.value }))}  required /> </div>
                              </div>
                              {/* <div class="form-inline"> <input type="checkbox" name="remember" id="remember" /> <label for="remember" >Remember me</label> <a href="#" id="forgot" class="font-weight-bold">Forgot password?</a> </div> */}
                              <div class="botao">
                                {/* <button className="btn btn-primary btn-block mt-3">
                                  Login
                                </button> */}
                                <button type="submit"  class="btn btn-outline-light col-md-3">
                                  Login
                                </button>
                              </div>
                              {this.state.userLoginFailed ?
                                <div> 
                                    <br></br>
                                    <p>{this.state.userError}</p>
                                </div> : 
                                <p></p>
                              }
                              <div class="text-center pt-4 text-light">Don't have an account? <a href="/user/registar">Register</a> </div>
                          </form>
                      </div>
                      <div class="mx-3 my-2 py-2 bordert">
                          <div class="text-center py-3">
                            {/* <a href="https://wwww.facebook.com" class="px-3"> 
                              <img id="loginimg" src="https://www.dpreview.com/files/p/articles/4698742202/facebook.jpeg" alt="icon do facebook"/> 
                            </a>  */}
                            <GoogleOAuthProvider clientId="321901519881-mem1hi5v20imtotsdme9s2qujgl96e6n.apps.googleusercontent.com">
                                {/* <a href="https://www.google.com" class="px-2"> 
                                  <img id="loginimg" src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png" alt="icon do google"/> 
                                </a>  */}
                                <div>
                                  {isLoggedIn ? (
                                    <h5 class="center">Logged in</h5>
                                  ) : (
                                    <div class="center">
                                      <GoogleLogin 
                                        onSuccess={(response) => this.handleGoogleLoginSuccess(response)}
                                        onError={() => console.log('Error')}
                                      />
                                    </div>
                                  )}
                                </div>
                            </GoogleOAuthProvider>
                            {/* <a href="https://www.github.com" class="px-3"> 
                              <img id="loginimg" src="https://www.freepnglogos.com/uploads/512x512-logo-png/512x512-logo-github-icon-35.png" alt="icon do github"/> 
                            </a> */}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>)}
    </div>
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
