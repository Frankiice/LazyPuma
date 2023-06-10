import React, { Component } from "react";
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
      produtoID: window.localStorage.getItem("produtoID"),
      img: null,
      previewImage: null,
      name: "",
      pBrand: "",
      categorieA: "",
      categorieB: "",
      categorias:[],
      subcategorias: [],
      quantity: "",
      price: "",
      msg: "",
      produto: "",
      propriedades: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount(){
    fetch("http://localhost:5000/user/userData", {
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
        this.setState({
          nickname: data.data.nickname,
          idFornecedor: data.data._id,
          categorias: ["Baby","Sports","Animals","Cosmetics","DIY","Smartphones","Tech","Decoration","Gardening","Gaming","TVs","Toys","Appliances","Photography","Books"]
        });
    });

    const {produtoID} = this.state;
    if(produtoID != null){
      try{
          console.log("produtoID",produtoID);
          const base_url = "http://localhost:5000/produto"
          const url = `${base_url}?id=${produtoID}`;
          console.log(url);
          fetch(url, {
            method:"GET",
            crossDomain:true,
            headers:{
              "Content-type":"application/json",
              Accept:"application/json",
              "Access-Control-Allow-Origin":"*",
            },
          })
          .then((res) => res.json())
          .then((data) => {
              console.log(data, "produtoData");
              this.setState({ 
                produto: data.productWPrice,
                propriedades: data.productWPrice._doc.properties,
                name: data.productWPrice._doc.name,
                pBrand: data.productWPrice._doc.brand,
                categorieA: data.productWPrice._doc.categorieA,
                categorieB: data.productWPrice._doc.categorieB,
                quantity: data.productWPrice.quantity,
                price: data.productWPrice.price,
                img:data.productWPrice._doc.img
              });

              console.log("this.state.produto: ", this.state.produto);
              console.log("this.state.propriedades: ", this.state.propriedades);
          });
      } catch(err){
          console.log(err);
      }
    } else {
      console.log("produtoID",produtoID);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { unidadeID, img, name, pBrand, categorieA, categorieB, quantity, price, produtoID } = this.state;
    console.log(unidadeID, img, name, pBrand, categorieA, categorieB, quantity, price, produtoID);
  
    const formData = new FormData();
    formData.append('produtoID', produtoID);
    formData.append('unidadeID', unidadeID);
    formData.append('name', name);
    formData.append('pBrand', pBrand);
    formData.append('categorieA', categorieA);
    formData.append('categorieB', categorieB);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('img', img); // 'img' should match the field name specified in the backend (upload.single('img'))
  
    let url = "http://localhost:5000/produto";
    let method = "POST";
  
    fetch(url, {
      method: method,
      crossDomain: true,
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "produto");
        if (data.status === "error") {
          throw new Error(data.error); // Throw an error if the response has the status "error"
        }else{
            this.setState({ msg: "Product added/updated successfully" });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ msg: "Error adding/updating product" }); // Set the error message in the state
      });
  }
  
  

handleCategoryChange(e) {
    const selectedCategory = e.target.value;
    const subcategoryList = this.getSubcategories(selectedCategory);
    this.setState({
      categorieB: selectedCategory,
      categorieA: '',
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
    Smartphones: ['Smartphones', 'Accessories', 'Smartwatches', 'Telephones', 'Sound Accessories'],
    Decoration: ['Home Textiles', 'Lighting', 'Plant Hanger', 'Wall Decor'],
    Gardening: ['Hoses', 'Pruning Shears', 'Fertilizers', 'Hedge Trimmers', 'Raised Garden Beds', 'Indoor Gardening', 'String Trimmers', 'Garden Kneelers', 'Soil'],
    Gaming: ['Console', 'Games', 'Gaming PC', 'Gaming Accessories'],
    TVs: ['TVs', 'SoundBars', 'Projectors' ,'TV Accessories'],
    Toys: ['Building Toys', 'Dolls and Accessories', 'Preschool Toys', 'Vehicles', 'Outdoor Toys', 'Arts and Crafts', 'Card Games', 'Blaster Guns', 'Stacking Games', 'Collectibles', 'Preschool Playsets', 'Play Dough Sets', 'Kids Electronics'],
    Appliances: ['Refrigerators', 'Vacuum Cleaners', 'Kitchen Appliances', 'Washing Machines', 'Dryers'],
    Photography: ['Cameras', 'Drones', 'Video', 'Lenses', 'Photography Accessories'],
    Books: ['Romance', "Children's and Youth Literature", 'Self help', 'Manga', 'Technical books'],
   };
return subcategoryMap[selectedCategory] || [];
}

handleImageChange(event) {
    const file = event.target.files[0];
    this.setState({
      img: file,
      previewImage: URL.createObjectURL(file),
    });
    console.log(this.state.img)
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
                
                {this.state.produtoID != null ? 
                <form onSubmit={this.handleSubmit}>
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                    <div className="input-field ">
                    {this.state.previewImage || this.state.img ? (
                    <div>
                        <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageChange}
                        />
                        {this.state.previewImage ? (
                        <img src={this.state.previewImage} style={{ width: '200px', height: '200px' }} alt="Preview" />
                        ) : (
                        <img src={this.state.img} style={{ width: '200px', height: '200px' }} alt="Fetched" />
                        )}
                    </div>
                    ) : (
                    <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageChange}
                    />
                    )}

                        </div>
                    </div>
                </div>
                
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Name</label>
                        <div className="input-field">
                            <input
                            type="text"
                            id="name"
                            value={this.state.name}
                            onChange={(e) => this.setState({ name: e.target.value })}
                            required
                            />
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Brand</label>
                        <div className="input-field">
                            <input
                            type="text"
                            id="pBrand"
                            value={this.state.pBrand}
                            onChange={(e) => this.setState({ pBrand: e.target.value })}
                            required
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Category</label>
                        <div className="input-field">
                            <select
                            id="category"
                            value={this.state.categorieB}
                            onChange={this.handleCategoryChange}
                            required
                            >
                            <option value={this.state.categorieB}>{this.state.categorieB}</option>
                            {this.state.categorias.map((category) => (
                                <option value={category}>{category}</option>
                            ))}
                            </select>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Subcategory</label>
                        <div className="input-field">
                            <select
                            id="subcategory"
                            value={this.state.categorieA}
                            onChange={(e) => this.setState({ categorieA: e.target.value })}
                            required
                            disabled={!this.state.categorieB}
                            >
                            <option value={this.state.categorieA}>{this.state.categorieA}</option>
                            {this.state.subcategorias.map((subcategory) => (
                                <option value={subcategory}>{subcategory}</option>
                            ))}
                            </select>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Price (€)</label>
                        <div className="input-field">
                            <input
                            type="number"
                            id="price"
                            value={this.state.price}
                            onChange={(e) => this.setState({ price: e.target.value })}
                            required
                            />
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Quantity</label>
                        <div className="input-field">
                            <input
                            type="number"
                            id="quantity"
                            value={this.state.quantity}
                            onChange={(e) => this.setState({ quantity: e.target.value })}
                            required
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
    
                <button
                type="submit"
                className="btn btn-outline-light btn-dark col-md-3 botaoPerfil"
                >
                Update
                </button>
                </form>
            
                :
                <form onSubmit={this.handleSubmit}>
                <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                    <label>Image</label>
                    <div className="input-field ">
                        <input
                        type="file"
                        accept="image/*"
                        onChange={this.handleImageChange}
                        />
                        {this.state.previewImage && (
                        <img src={this.state.previewImage} alt="Preview" />
                        )}
                    </div>
                    </div>
                </div>
                
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Name</label>
                        <div className="input-field">
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
                        <div className="input-field">
                            <input
                            type="text"
                            id="pBrand"
                            onChange={(e) => this.setState({ pBrand: e.target.value })}
                            required
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Category</label>
                        <div className="input-field">
                            <select
                            id="category"
                            value={this.state.categorieB}
                            onChange={this.handleCategoryChange}
                            required
                            >
                            <option value="">Select category</option>
                            {this.state.categorias.map((category) => (
                                <option value={category}>{category}</option>
                            ))}
                            </select>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Subcategory</label>
                        <div className="input-field">
                            <select
                            id="subcategory"
                            value={this.state.categorieA}
                            onChange={(e) => this.setState({ categorieA: e.target.value })}
                            required
                            disabled={!this.state.categorieB}
                            >
                            <option value="">Select subcategory</option>
                            {this.state.subcategorias.map((subcategory) => (
                                <option value={subcategory}>{subcategory}</option>
                            ))}
                            </select>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                        <label>Price (€)</label>
                        <div className="input-field">
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
                        <div className="input-field">
                            <input
                            type="number"
                            id="quantity"
                            onChange={(e) => this.setState({ quantity: e.target.value })}
                            required
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
    
                <button
                type="submit"
                className="btn btn-outline-light btn-dark col-md-3 botaoPerfil"
                >
                Create
                </button>
                </form>

                }

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