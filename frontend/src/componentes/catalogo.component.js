import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/componentescss.css";
import "../scripts/scripts.js";
import { FaSearch } from "react-icons/fa"
import ScrollContainer from 'react-indiana-drag-scroll'


export default class Catalogo extends Component{
    constructor(props){
        super(props);
        this.state = {
            obj: [],
            categoriaA: window.localStorage.getItem("categoriaA") || "", 
            categoriaB: window.localStorage.getItem("categoriaB") || "",
            user_lat: window.localStorage.getItem("user_lat") || "",
            user_lon: window.localStorage.getItem("user_lon") || "",
            brand: window.localStorage.getItem("brand") || "",
            tipoUser: window.localStorage.getItem("tipoUser") || "",
            page: 1,
            novoHeader: [],
            novoHeaderTip: "",
            produtoID: "",
            objSearch: JSON.parse(window.localStorage.getItem("objSearch")),
            filteredProducts: [], // Add this property
            brands: [],
            subCategories: [],
            brandFilter: null,
            subCategoryFilter: null,
            colorFilter: null,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleProduto = this.handleProduto.bind(this);
        window.localStorage.removeItem("userUpdated");

        
    }  
    componentDidMount(){
        const {categoriaA, categoriaB, brand} = this.state;
        const base_url = "http://localhost:5000/catalogo" 
        const url = `${base_url}?&categoriaB=${categoriaB}&categoriaA=${categoriaA}&brand=${brand}`;
        console.log(url);
        fetch(url, { //provavelmente teremos de mudar as cenas
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
            console.log(data, "Catalogo");
            const brands = [...new Set(data.productsWPrice.map((product) => product._doc.brand))];
            const subCategories = [...new Set(data.productsWPrice.map((product) => product._doc.categorieA))];
            this.setState({obj: data.productsWPrice,
                            novoHeader: data.novoHeader,
                            novoHeaderTip: data.novoHeaderTip,
                            filteredProducts: data.productsWPrice,
                            brands,
                            subCategories
                        });
            
        })
    }
    

    handleClick(e){
        const {categoriaA, brand} = this.state;
        console.log("categoriaA no handleClick ",categoriaA);
        console.log("brand no handleClick ", brand);
        window.localStorage.setItem("categoriaA", categoriaA);
        window.localStorage.setItem("brand", brand);
        window.localStorage.removeItem("objSearch");
        window.location.href = "/catalogo";
    };

    handleProduto(e){
        const {produtoID} = this.state;
        console.log("produto no handleProduto ",produtoID);
        window.localStorage.setItem("produtoID", produtoID);
        window.location.href = "/produto";
    };

    preBreadCrumb(e){
        window.localStorage.removeItem("categoriaA");
        window.localStorage.removeItem("brand");
        window.localStorage.removeItem("produtoID");
        window.localStorage.removeItem("objSearch");
        window.localStorage.removeItem("search");
    }

    preBreadCrumb2(e){
        window.localStorage.removeItem("categoriaA");
        window.localStorage.removeItem("produtoID");
        window.localStorage.removeItem("objSearch");
        window.localStorage.removeItem("search");
    }

    preBreadCrumb3(e){
        window.localStorage.removeItem("brand");
        window.localStorage.removeItem("produtoID");
        window.localStorage.removeItem("objSearch");
        window.localStorage.removeItem("search");
    }

    preBreadCrumb4(e){
        window.localStorage.removeItem("produtoID");
        window.localStorage.removeItem("objSearch");
        window.localStorage.removeItem("search");
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
      
        // Convert degrees to radians
        const lat1Rad = this.degToRad(lat1);
        const lon1Rad = this.degToRad(lon1);
        const lat2Rad = this.degToRad(lat2);
        const lon2Rad = this.degToRad(lon2);
      
        // Calculate the differences between the coordinates
        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;
      
        // Haversine formula
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(lat1Rad) * Math.cos(lat2Rad) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var distance = R * c;

        distance = distance.toFixed(2);
      
        return distance; // Distance in kilometers
      }
      
    degToRad(degrees) {
        return degrees * (Math.PI / 180);
      }

    handleBrandFilterChange = (event) => {
    const brand = event.target.value;
    this.setState({ brandFilter: brand }, () => {
        this.filterProducts();
    });
    };
    
    handleSubCategoryFilterChange = (event) => {
    const subCategory = event.target.value;
    this.setState({ subCategoryFilter: subCategory }, () => {
        this.filterProducts();
    });
    };
    
    filterProducts = () => {
    const { obj, brandFilter, subCategoryFilter } = this.state;
    let filteredProducts = obj;
    
    if (brandFilter && subCategoryFilter) {
        filteredProducts = obj.filter(
        (product) =>
            product._doc.brand === brandFilter &&
            product._doc.categorieA === subCategoryFilter
        );
    } else {
        if (brandFilter) {
        filteredProducts = obj.filter(
            (product) => product._doc.brand === brandFilter
        );
        }
    
        if (subCategoryFilter) {
        filteredProducts = obj.filter(
            (product) => product._doc.categorieA === subCategoryFilter
        );
        }
    }
    
    this.setState({ filteredProducts });
    };

    render(){
    return (
    // <!-- Header --> 
    <React.Fragment>
    {this.state.novoHeaderTip == "null" ?
        <header>
            <br></br>
        </header>
        :
        
        <div className="scrollmenu">
        <header className="cor_header height_header">
          <ScrollContainer className="btn-toolbar col-lg-12 justify-content-center scrollcontainer" id="buttons_header" role="toolbar">
            <div className="row">
              {this.state.novoHeader.map((product, index) => (
                <div key={product._id} className="col">
                  <div className="button-container">
                    <button
                      className="btn btn-outline-dark btn-xl rounded-circle section butaoBLA"
                      style={{ backgroundImage: `url(${product.img})` }}
                      value={this.state.novoHeaderTip === "brand" ? product.brand : product.categorieA}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundImage = `url(${product.img})`;
                      }}
                      onClick={(e) => {
                        this.setState(
                          this.state.novoHeaderTip === "brand"
                            ? { brand: e.target.value }
                            : { categoriaA: e.target.value },
                          this.handleClick
                        );
                      }}
                    >
                      {this.state.novoHeaderTip === "brand" ? product.brand : product.categorieA}
                    </button>
                    <div className="button-name">
                      {this.state.novoHeaderTip === "brand" ? product.brand : product.categorieA}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollContainer>  
   
    </header>
    </div> 
    }
    <div className='breadcrumb'>
        {this.state.categoriaA === ""
        ?
            this.state.brand === ""
            ?
                <h2>&nbsp;<a onClick={this.preBreadCrumb} href='/catalogo'>{this.state.categoriaB}</a></h2>
            :
                <h2>&nbsp;<a onClick={this.preBreadCrumb} href='/catalogo'>{this.state.categoriaB}</a> {'>'} <a onClick={this.preBreadCrumb2} href='/catalogo'>{this.state.brand}</a> </h2>
        :
            this.state.brand === ""
            ?
            <h2>&nbsp;<a onClick={this.preBreadCrumb} href='/catalogo'>{this.state.categoriaB}</a> {'>'} <a onClick={this.preBreadCrumb3} href='/catalogo'>{this.state.categoriaA}</a> </h2>
            :
            <h2>&nbsp;<a onClick={this.preBreadCrumb} href='/catalogo'>{this.state.categoriaB}</a> {'>'} <a onClick={this.preBreadCrumb3} href='/catalogo'>{this.state.categoriaA}</a> {'>'} <a onClick={this.preBreadCrumb4} href='/catalogo'>{this.state.brand}</a> </h2>

        }
    </div>

    <div class="offcanvas offcanvas-left" data-bs-scroll="true" tabindex="-1" id="sidebar">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Produtos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <nav class="navbar navbar-light bg-light" id="offcanvasItems">
                <div class="container-fluid">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Clickable Item</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>

    {this.state.tipoUser === "consumidor" ?
        <div className="container">
        <div className="row gx-4 gx-lg-5">
            <div className="col-lg-3 order-lg-first">
            <div className="filters">
                <h3>Filters</h3>
                <label htmlFor="brandFilter">Brand:</label>
                <select id="brandFilter" onChange={this.handleBrandFilterChange}>
                <option value="">All</option> {/* Add an option to show all brands */}
                {this.state.brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                ))}
                </select>

                <label htmlFor="subCategoryFilter">Subcategory:</label>
                <select id="subCategoryFilter" onChange={this.handleSubCategoryFilterChange}>
                <option value="">All</option> {/* Add an option to show all brands */}
                {this.state.subCategories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                ))}
                </select>
                {/* Add other filter options */}
            </div>
            </div>
            <div className="col-lg-9">
            <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                {this.state.objSearch ? (
                this.state.objSearch.length === 0 ? (
                    <h2>No Products Found</h2>
                ) : (
                    this.state.objSearch.map((produto) => (
                    <div key={produto._doc._id} className="col mb-5">
                        <div className="card h-100 crop">
                        {produto._doc.img.startsWith('http') ? (
                            <img className="card-img" src={produto._doc.img} alt="..." />
                        ) : (
                            <img
                            className="card-img"
                            src={`http://localhost:5000/images/${produto._doc.img.replace(
                                'public/images/',
                                ''
                            )}`}
                            alt="..."
                            />
                        )}
                        <div className="card-body p-4">
                            <div className="text-center">
                            <h5 className="fw-bolder">{produto._doc.name}</h5>
                            {console.log('lat1', parseFloat(this.state.lat))}
                            {this.calculateDistance(
                                parseFloat(this.state.user_lat), // Convert to float
                                parseFloat(this.state.user_lon), // Convert to float
                                parseFloat(produto.lat), // Convert to float
                                parseFloat(produto.lon) // Convert to float
                            )}
                            <br />
                            {produto.price}€
                            </div>
                        </div>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div className="text-center">
                            <button
                                className="btn btn-outline-dark mt-auto"
                                value={produto._doc._id}
                                onClick={(e) => {
                                this.setState({ produtoID: e.target.value }, this.handleProduto);
                                }}
                            >
                                View options
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))
                )
                ) : (
                this.state.filteredProducts.map((produto) => (
                    <div key={produto._doc._id} className="col mb-5">
                    <div className="card h-100 crop">
                        {produto._doc.img ? (
                        produto._doc.img.startsWith('http') ? (
                            <img className="card-img" src={produto._doc.img} alt="..." />
                        ) : (
                            <img
                            className="card-img"
                            src={`http://localhost:5000/images/${produto._doc.img.replace(
                                'public/images/',
                                ''
                            )}`}
                            alt="..."
                            />
                        )
                        ) : (
                        <img className="card-img" alt="..." />
                        )}
                        <div className="card-body p-4">
                        <div className="text-center">
                            <h5 className="fw-bolder">{produto._doc.name}</h5>
                            {this.calculateDistance(
                            parseFloat(this.state.user_lat), // Convert to float
                            parseFloat(this.state.user_lon), // Convert to float
                            parseFloat(produto.lat), // Convert to float
                            parseFloat(produto.lon) // Convert to float
                            )}
                            Km
                            <br />
                            {produto.price}€
                        </div>
                        </div>
                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                            <button
                            className="btn btn-outline-dark mt-auto"
                            value={produto._doc._id}
                            onClick={(e) => {
                                this.setState({ produtoID: e.target.value }, this.handleProduto);
                            }}
                            >
                            View options
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                ))
                )}
            </div>
            </div>
        </div>
    </div> 

    :

    <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {this.state.objSearch ?
                            this.state.objSearch.length === 0 ? 
                             <h2>No Products Found</h2>
                            :
                            this.state.objSearch.map((produto) => (
                                <div key={produto._doc._id}>
                                    <div class="col mb-5">
                                        <div class="card h-100 crop">
                                        {produto._doc.img.startsWith('http') ? (
                                            <img class="card-img" src={produto._doc.img} alt="..." />
                                        ) : (
                                            <img class="card-img" src={`http://localhost:5000/images/${produto._doc.img.replace('public/images/', '')}`} alt="..." />

                                        )}
                                            <div class="card-body p-4">
                                                <div class="text-center">
                                                    <h5 class="fw-bolder">{produto._doc.name}</h5>
                                                    {console.log("lat1", parseFloat(this.state.lat))}
                                                    {this.calculateDistance(
                                                        parseFloat(this.state.user_lat), // Convert to float
                                                        parseFloat(this.state.user_lon), // Convert to float
                                                        parseFloat(produto.lat), // Convert to float
                                                        parseFloat(produto.lon) // Convert to float
                                                    )}
                                                    <br></br>
                                                    {produto.price}€
                                                </div>
                                            </div>
                                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                <div class="text-center"><button class="btn btn-outline-dark mt-auto" value={produto._doc._id} onClick={(e) => {this.setState({ produtoID: e.target.value }, this.handleProduto)}}>View options</button></div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                ))
                        :
                            this.state.obj.map((produto) => (
                                
                                <div key={produto._doc._id}>
                                    <div class="col mb-5">
                                        <div class="card h-100 crop">
                                            {
                                            produto._doc.img ? 
                                                produto._doc.img.startsWith('http') ? (
                                                    <img class="card-img" src={produto._doc.img} alt="..." />
                                                ) : (
                                                    <img class="card-img" src={`http://localhost:5000/images/${produto._doc.img.replace('public/images/', '')}`} alt="..." />

                                                )
                                            :
                                            <img class="card-img" alt="..." />
                                            }
                                            <div class="card-body p-4">
                                                <div class="text-center">
                                                    <h5 class="fw-bolder">{produto._doc.name}</h5>
                                                    {this.calculateDistance(
                                                        parseFloat(this.state.user_lat), // Convert to float
                                                        parseFloat(this.state.user_lon), // Convert to float
                                                        parseFloat(produto.lat), // Convert to float
                                                        parseFloat(produto.lon) // Convert to float
                                                    )}Km
                                                    <br></br>
                                                    {produto.price}€
                                                </div>
                                            </div>
                                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                <div class="text-center"><button class="btn btn-outline-dark mt-auto" value={produto._doc._id} onClick={(e) => {this.setState({ produtoID: e.target.value }, this.handleProduto)}}>View options</button></div>
                                            </div>
                                        </div>
                                    </div>
                                </div> ))                   
                       }
                    </div>
                </div>

    }
   

    </React.Fragment>
    );
  }
}


// export default Catalogo