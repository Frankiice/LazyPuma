import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import { FaSearch } from "react-icons/fa";



// import ExercisesList from "./componentes/exercises-list.component";
// import EditExercise from "./componentes/edit-exercise.component";
// import CreateExercise from "./componentes/create-exercise.component";
// import CreateUser from "./componentes/create-user.component";



const ProdutosResposta = [{primeiroNome: "Bananas", quantidade:"30", tipo: "Madeira"}, {primeiroNome: "Maças", quantidade:"30", tipo: "Continente"}]

// useEffect(() => {
//   const fetchUsers = async () => {
//     const res = await axios.get(`http://localhost:5000/getProdutos?q=${query}`);
//     setData(res.data);
//   };
//   fetchUsers();
// }, [query]);

// state = {
//   pesquisa: ""
// };

// pesquisaInput = event => {
//   this.setState({ pesquisa: event.target.value });
// };

// Click = () => {
//   console.log(this.state.pesquisa);
// };

  

function searchResults(){
    return (
      <div className="listaprodutos center">
        {ProdutosResposta.map((val, key) => {
            return (
            <div>
                <p className="textodark">{val.primeiroNome}</p>
            </div>
            );
        })}
      </div>
    );
  }


export default searchResults