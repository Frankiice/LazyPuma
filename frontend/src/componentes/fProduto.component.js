import React, { Component, useState } from "react";
import '../styles/componentescss.css';
import { FarBootstrap } from "react-icons/fa";
// import { MDBCheckbox } from 'mdb-react-ui-kit';

export default class Fproduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      idFornecedor: "",   
      unidadeID: window.localStorage.getItem("unidadeID"),
      img: "",
      name: "",
      pBrand: "",
      categoriaA: "",
      categoriaB: "",
      categorias:[],
      subcategorias: [],
      quantity: "",
      price: "",
      msg: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);



  }

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
        this.setState({ nickname: data.data.nickname,
                        idFornecedor: data.data._id,
                        categorias: ["Baby","Sports","Animals","Cosmetics","DIY","Smartphones","Tech","Decoration","Gardening","Gaming","TVs","Toys","Appliances","Photography","Books"]});
        
    })
}


handleSubmit(e){
  e.preventDefault();
  const {unidadeID, img,  name,  pBrand,  categoriaA, categoriaB, quantity,  price} = this.state;
  console.log(unidadeID, img,  name,  pBrand,  categoriaA, categoriaB, quantity,  price);
  fetch("http://localhost:5000/produto",{
      method:"POST",
      crossDomain:true,
      headers:{
          "Content-type":"application/json",
          Accept:"application/json",
          "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        unidadeID, 
        img,  
        name,  
        pBrand,  
        categoriaA, 
        categoriaB, 
        quantity,  
        price
      }),
  })
  .then((res) => res.json())
  .then((data) => {
      console.log(data, "veiculo");
      this.setState({ msg: "Vehicle added Successfully"});
  })
  .catch((error) => {
    console.log(error);
  });
};

handleCategoryChange(e) {
    const selectedCategory = e.target.value;
    const subcategoryList = this.getSubcategories(selectedCategory);
    this.setState({
      categoriaB: selectedCategory,
      categoriaA: '',
      subcategorias: subcategoryList  // Reset subcategory options when category changes
      
    });
 
  }

getSubcategories(selectedCategory) {
const subcategoryMap = {
    Baby: ['Playards', 'Rockers and Bouncers', 'Bath', 'Car Seats', 'Activity Center', 'Baby Bottles', 'Baby Food', 'Feeding Set', 'Breast Pumps', 'Diapers', 'Wipes'],
    Sports: [ 'Running Shoes', 'Football', 'Badminton', 'Golf', 'Baseball', 'Hunting', 'Table Tennis', 'Basketball', 'Boxing', 'Hockey', 'Footwear', 'Clothing', 'Wearable Technology', 'Accessories'],
    Animals: ['Furniture', 'Accessories', 'Supplies', 'Apparel', 'Toys'],
    Cosmetics: ['Brows', 'Skincare', 'Lipstick', 'Foundation', 'Eye Shadow', 'Concealer', 'Setting Spray'],
    DIY: ['Power Tools', 'Measuring Tools', 'Woodworking Tools', 'Cutting Tools', 'Sanders', 'Rotary Tools', 'Baby Food', 'Drill Bits'],
    Smartphones: ['Smartphones'],
    Decoration: ['Home Textiles', 'Lighting', 'Plant Hanger', 'Wall Decor'],
    Gardening: ['Hoses', 'Pruning Shears', 'Fertilizers', 'Hedge Trimmers', 'Raised Garden Beds', 'Indoor Gardening', 'String Trimmers', 'Garden Kneelers', 'Soil'],
    Gaming: ['Console'],
    TVs: ['TVs'],
    Toys: ['Building Toys', 'Dolls and Accessories', 'Preschool Toys', 'Vehicles', 'Outdoor Toys', 'Arts and Crafts', 'Card Games', 'Blaster Guns', 'Stacking Games', 'Collectibles', 'Preschool Playsets', 'Play Dough Sets', 'Kids Electronics'],
    Appliances: ['Refrigerators', 'Vacuum Cleaners', 'Kitchen Appliances', 'Washing Machines', 'Dryers'],
    Photography: ['Cameras'],
    Books: [],
   };
return subcategoryMap[selectedCategory] || [];
}
  

render() {
  return (
    
    <div class="container">
    <div class="row">
        {this.state.msg === "" ? 
        <div class="card d-flex border shadow-0 custom-card">
            <div class="m-4">
            <h2 class="card-title mb-4 text-dark">{this.state.nickname}'s New Product</h2>
            <br></br>
            <div class="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Name</label>
                        <div className="input-field ">
                        <input
                            type="text"
                            id="name"
                            onChange={(e) => this.setState({ name: e.target.value })}
                            required
                        />
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Brand</label>
                        <div className="input-field ">
                        <input
                            type="text"
                            id="pBrand"
                            onChange={(e) => this.setState({ pBrand: e.target.value })}
                            required
                        />
                        </div>
                    </div>
                    </div>

                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Category</label>
                        <div className="input-field ">
                        <select
                        id="category"
                        value={this.state.categoriaB}
                        onChange={this.handleCategoryChange}
                        required
                        >
                        <option value="">Select category</option>
                        {this.state.categorias.map((category) => (
                        <option value={category}>
                        {category}
                        </option>
                        )
                        )}

                        
                        </select>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Subcategory</label>
                        <div className="input-field ">
                        <select
                        id="subcategory"
                        value={this.state.categoriaA}
                        onChange={(e) => this.setState({ categoriaA: e.target.value })}
                        required
                        disabled={!this.state.categoriaB} 
                        >
                        <option value="">Select subcategory</option>
                        {this.state.subcategorias.map((subcategory) => (
                            <option value={subcategory}>
                                {subcategory}
                            </option>
                        ))}
                        </select>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Price (€)</label>
                        <div className="input-field ">
                        <input
                            type="number"
                            id="price"
                            onChange={(e) => this.setState({ price: e.target.value })}
                            required
                        />
                        </div>
                    </div>
                    </div>

                    <div className="col-md-6">
                    <div className="form-group">
                        <label>Quantity</label>
                        <div className="input-field ">
                        <input
                            type="number"
                            id="quantity"
                            onChange={(e) => this.setState({ quantity: e.target.value })}
                            placeholder="10 m³"
                            required
                        />
                        </div>
                    </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil">
                    Create
                </button>
                </form>


            </div>
            </div>
            <div>
            <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f/up">Back </a>
            </div>

        </div>
    :
        <div class="card d-flex border shadow-0 custom-card">
            <div class="m-4">
            <div class="carrinho-vazio">
            <br></br>
                <h4 class="text-secondary justify-content-md-center">{this.state.msg}!</h4>
            </div>
            <div>
            <a type="submit" className="btn btn-outline-light btn-dark col-md-3 botaoPerfil" href="/user/f/up">Back </a>
            </div>
            </div>
        </div>

        }
       
     
    </div>
    
</div>
    
  );
  }
}