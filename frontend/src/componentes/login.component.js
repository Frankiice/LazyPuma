import React, { useState } from "react";
import '../styles/componentescss.css';


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
    <div className="submit-form">
     <div>
      <div className="form-group">
        <lable htmlFor="user"> Username</lable>
          <input 
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
      </div>
      <div className="form-group">
        <lable htmlFor="id">ID</lable>
        <input
          type="text"
          className="form-control"
          id="id"
          required
          value={user.id}
          onChange={handleInputChange}
          name="id"
        />
      </div>

      <button onClick={login} className="btn btn-success">
        Login
      </button>

     </div>
    </div>
  );
}

export default Login;
