import React, { useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";


const Login = props => {

  const initialUserState = {
    name: "",
    id: ""
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => { //da login no user e depois vai para a home page
    props.login(user)
    props.history.push('/');
  }

  return (
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
    <div class="container">
        <div class="row">
            <div class="offset-md-2 col-lg-5 col-md-7 offset-lg-4 offset-md-3">
                <div class="panel border bg-dark">
                    <div class="panel-heading">
                        <h3 class="pt-3 font-weight-bold text-white">Login</h3>
                    </div>
                    <div class="panel-body p-3">
                        <form action="login_script.php" method="POST">
                            <div class="form-group py-2">
                                <div class="input-field bg-dark"> <span class="fa fa-user px-2"></span> <input class="bg-dark text-white" type="text" placeholder="Username ou Email" required /> </div>
                            </div>
                            <div class="form-group py-1 pb-2">
                                <div class="input-field"> <span class="fa fa-lock px-2"></span> <input class="bg-dark text-white" type="password" placeholder="Insira a sua Password" required /> </div>
                            </div>
                            <div class="form-inline"> <input type="checkbox" name="remember" id="remember" /> <label for="remember" class="text-muted">Remember me</label> <a href="#" id="forgot" class="font-weight-bold">Forgot password?</a> </div>
                            <div class="botao">
                              <button onClick={login} className="btn btn-primary btn-block mt-3">
                                Login
                              </button>
                            </div>
                            <div class="text-center pt-4 text-muted">Ainda não possui uma conta? <a href="/registo">Registo</a> </div>
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
  );
}

export default Login;
