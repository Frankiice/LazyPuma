import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import { FaSearch } from "react-icons/fa"



// import ExercisesList from "./componentes/exercises-list.component";
// import EditExercise from "./componentes/edit-exercise.component";
// import CreateExercise from "./componentes/create-exercise.component";
// import CreateUser from "./componentes/create-user.component";


const ProdutosResposta = [{primeiroNome: "Bananas", quantidade:"30", tipo: "Madeira"}]

// state = {
//   pesquisa: ""
// };

// pesquisaInput = event => {
//   this.setState({ pesquisa: event.target.value });
// };

// Click = () => {
//   console.log(this.state.pesquisa);
// };

function Footer(){
    return (
    //Footer
    <div class="d-flex flex-column min-vh-100">
      <footer class="bg-dark py-5 mt-auto">
        <div class="container"><p class="m-0 text-center text-white">Copyright &copy; LazyPuma 2022</p></div>
      </footer>
    </div>
    );
  }


export default Footer