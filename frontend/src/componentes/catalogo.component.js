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
            propertiesFilter: [],
            priceFilter: null,
            distanceFilter: null, 
            brandFilter: null,
            subCategoryFilter: null,
            colorFilter: null,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleProduto = this.handleProduto.bind(this);
        this.handlePriceFilterChange = this.handlePriceFilterChange.bind(this);
        this.handleDistanceFilterChange = this.handleDistanceFilterChange.bind(this);

        window.localStorage.removeItem("userUpdated");

        
    }  
    componentDidMount(){
        const {categoriaA, categoriaB, brand, objSearch} = this.state;
        if (!objSearch){
            console.log("entra no obj serach nao existente")
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
        
            const properties = new Map(); // Use a map to store property values
            data.productsWPrice.forEach((product) => {
                product._doc.properties.forEach((property) => {
                    const propertyName = property.name;
                    const propertyValue = property.value;
        
                    if (properties.has(propertyName)) {
                        // Add the property value to the existing property
                        properties.get(propertyName).add(propertyValue);
                    } else {
                        // Create a new property with the value
                        properties.set(propertyName, new Set([propertyValue]));
                    }
                });
            });
        
            const propertiesFilter = Array.from(properties).map(([propertyName, propertyValues]) => ({
                name: propertyName,
                values: Array.from(propertyValues)
            }));
        
            this.setState({
                obj: data.productsWPrice,
                novoHeader: data.novoHeader,
                novoHeaderTip: data.novoHeaderTip,
                filteredProducts: data.productsWPrice,
                brands,
                subCategories,
                propertiesFilter, // Set the properties filter state
            });
        })        
        }
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
        const distance = R * c;
      
        return Math.round(distance);; // Distance in kilometers
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

    handlePropertyFilterChange = (event) => {
        const propertyValue = event.target.value;
        this.setState({ propertyValueFilter: propertyValue }, () => {
            this.filterProducts();
        });
    };

    getPriceRangeOptions() {
        const { obj } = this.state;
        let minPrice = Infinity;
        let maxPrice = -Infinity;
      
        // Find the minimum and maximum prices
        obj.forEach((product) => {
          const price = product.price;
          if (price < minPrice) {
            minPrice = price;
          }
          if (price > maxPrice) {
            maxPrice = price;
          }
        });
      
        const rangeOptions = [];
        const increment = 20;
      
        // Generate range options
        for (let i = minPrice; i <= maxPrice; i += increment) {
          const rangeStart = i;
          const rangeEnd = Math.min(i + increment - 1, maxPrice);
          const optionValue = `${rangeStart}-${rangeEnd}`;
          const optionLabel = `$${rangeStart} - $${rangeEnd}`;
          rangeOptions.push(<option key={optionValue} value={optionValue}>{optionLabel}</option>);
        }
      
        return rangeOptions;
      }
      
      getDistanceRangeOptions() {
        const { obj, user_lat, user_lon } = this.state;
        let minDistance = 1000;
        let maxDistance = -1000;
      
        // Find the minimum and maximum distances
        obj.forEach((product) => {
          const distance = this.calculateDistance(user_lat, user_lon, product.lat, product.lon);
          if (distance < minDistance) {
            minDistance = distance;
          }
          if (distance > maxDistance) {
            maxDistance = distance;
          }
        });
      
        const rangeOptions = [];
        const increment = 50;
      
        // Generate range options
        for (let i = minDistance; i <= maxDistance; i += increment) {
          const rangeStart = i;
          const rangeEnd = Math.min(i + increment - 1, maxDistance);
          const optionValue = `${rangeStart}-${rangeEnd}`;
          const optionLabel = `${rangeStart} - ${rangeEnd} km`;
          rangeOptions.push(<option key={optionValue} value={optionValue}>{optionLabel}</option>);
        }
      
        return rangeOptions;
      }

      handleDistanceFilterChange(event) {
        const selectedRange = event.target.value;
      
        if (selectedRange === "") {
          // Reset the distance filter
          this.setState({ distanceFilter: "", filteredProducts: this.state.obj }, () => {
            this.filterProducts();
          });
        } else {
          const [rangeStart, rangeEnd] = selectedRange.split("-");
          this.setState({ distanceFilter: selectedRange }, () => {
            this.filterProducts();
          });
        }
      }
      
      
      handlePriceFilterChange(event) {
        const selectedRange = event.target.value;
      
        if (selectedRange === "") {
          // Reset the price filter
          this.setState({ priceFilter: "", filteredProducts: this.state.obj }, () => {
            this.filterProducts();
          });
        } else {
          const [rangeStart, rangeEnd] = selectedRange.split("-");
          this.setState({ priceFilter: selectedRange }, () => {
            this.filterProducts();
          });
        }
      }
      
      
      filterProducts = () => {
        const {
          obj,
          objSearch,
          brandFilter,
          subCategoryFilter,
          propertyValueFilter,
          priceFilter,
          distanceFilter,
          user_lat,
          user_lon
        } = this.state;
      
        let filteredProducts;
      
        if (objSearch) {
          filteredProducts = objSearch.slice();
        } else {
          filteredProducts = obj.slice();
        }
      
        if (brandFilter) {
          filteredProducts = filteredProducts.filter(
            (product) => product._doc.brand === brandFilter
          );
        }
      
        if (subCategoryFilter) {
          filteredProducts = filteredProducts.filter(
            (product) => product._doc.categorieA === subCategoryFilter
          );
        }
      
        if (propertyValueFilter) {
          filteredProducts = filteredProducts.filter((product) =>
            product._doc.properties.some(
              (property) => property.value === propertyValueFilter
            )
          );
        }
      
        if (priceFilter) {
          const [rangeStart, rangeEnd] = priceFilter.split("-");
          filteredProducts = filteredProducts.filter((product) => {
            const price = product.price;
            return price >= Number(rangeStart) && price <= Number(rangeEnd);
          });
        }
      
        if (distanceFilter) {
          const [rangeStart, rangeEnd] = distanceFilter.split("-");
          filteredProducts = filteredProducts.filter((product) => {
            const distance = this.calculateDistance(
              user_lat,
              user_lon,
              product.lat,
              product.lon
            );
            return distance >= Number(rangeStart) && distance <= Number(rangeEnd);
          });
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
                <h1>&nbsp;<a onClick={this.preBreadCrumb} href='/catalogo'>{this.state.categoriaB}</a></h1>
            :
                <h1>&nbsp;<a onClick={this.preBreadCrumb} href='/catalogo'>{this.state.categoriaB}</a> {'>'} <a onClick={this.preBreadCrumb2} href='/catalogo'>{this.state.brand}</a> </h1>
        :
            this.state.brand === ""
            ?
            <h1>&nbsp;<a onClick={this.preBreadCrumb} href='/catalogo'>{this.state.categoriaB}</a> {'>'} <a onClick={this.preBreadCrumb3} href='/catalogo'>{this.state.categoriaA}</a> </h1>
            :
            <h1>&nbsp;<a onClick={this.preBreadCrumb} href='/catalogo'>{this.state.categoriaB}</a> {'>'} <a onClick={this.preBreadCrumb3} href='/catalogo'>{this.state.categoriaA}</a> {'>'} <a onClick={this.preBreadCrumb4} href='/catalogo'>{this.state.brand}</a> </h1>

        }
    </div>


    {this.state.tipoUser !== "" ?
        <div className="container_catalogo">
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
                
               <div>
                <label htmlFor="priceFilter">Price:</label>
                <select id="priceFilter" value={this.state.priceFilter} onChange={this.handlePriceFilterChange}>
                    <option value="">All</option>
                    {this.getPriceRangeOptions()}
                </select>
                </div>

                <div>
                <label htmlFor="distanceFilter">Distance:</label>
                <select id="distanceFilter" value={this.state.distanceFilter} onChange={this.handleDistanceFilterChange}>
                    <option value="">All</option>
                    {this.getDistanceRangeOptions()}
                </select>
                </div>

                {this.state.propertiesFilter.map((property) => (
                <div key={property.name}>
                    <label htmlFor={property.name}>{property.name}:</label>
                    <select id={property.name} onChange={(event) => this.handlePropertyFilterChange(event, property.name)}>
                    <option value="">All</option>
                    {property.values.map((value) => (
                        <option key={value} value={value}>{value}</option>
                    ))}
                    </select>
                </div>
                ))}


            </div>
            </div>
            <div className="col-lg-9">
            <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {this.state.objSearch && this.state.filteredProducts.length === 0 ? (
                this.state.objSearch.length === 0 ? (
                    <h2>No Products Found</h2>
                ) : (
                    this.state.objSearch.map((produto) => (
                        <div
                        key={produto._doc._id}
                        className="col mb-5 clickable-card"
                        onClick={() => {
                          this.setState({ produtoID: produto._doc._id }, this.handleProduto);
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="card h-100 crop">
                          {produto._doc.img.startsWith('http') ? (
                            <img className="card-img img-fluid" src={produto._doc.img} alt={produto._doc.name}/>
                          ) : (
                            <img
                              className="card-img img-fluid"
                              src={`http://localhost:5000/images/${produto._doc.img.replace(
                                'public/images/',
                                ''
                              )}`}
                              alt={produto._doc.name}
                            />
                          )}
                          <div className="card-body p-4">
                            <div className="text-center">
                              <h5 className="fw-bolder">{produto._doc.name}</h5>
                              {this.state.tipoUser === 'consumidor' ? (
                                <>
                                  {this.calculateDistance(
                                    parseFloat(this.state.user_lat), // Convert to float
                                    parseFloat(this.state.user_lon), // Convert to float
                                    parseFloat(produto.lat), // Convert to float
                                    parseFloat(produto.lon) // Convert to float
                                  )}
                                  km
                                  <br />
                                </>
                              ) : null}
                              {produto.price}€
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    ))
                )
                ) : (
                    this.state.filteredProducts.length > 0 ? (
                        this.state.filteredProducts.map((produto) => (
                          <div
                            key={produto._doc._id}
                            className="col mb-5"
                            onClick={() => {
                              this.setState({ produtoID: produto._doc._id }, this.handleProduto);
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <div className="card h-100 crop">
                              {produto._doc.img ? (
                                produto._doc.img.startsWith('http') ? (
                                  <img className="card-img img-fluid" src={produto._doc.img} alt={produto._doc.name} />
                                ) : (
                                  <img
                                    className="card-img img-fluid"
                                    src={`http://localhost:5000/images/${produto._doc.img.replace('public/images/', '')}`}
                                    alt={produto._doc.name}
                                  />
                                )
                              ) : (
                                <img className="card-img img-fluid" alt={produto._doc.name} />
                              )}
                              <div className="card-body p-4">
                                <div className="text-center">
                                  <h5 className="fw-bolder">{produto._doc.name}</h5>
                                  {this.state.tipoUser === 'consumidor' ? (
                                    <>
                                      {this.calculateDistance(
                                        parseFloat(this.state.user_lat), // Convert to float
                                        parseFloat(this.state.user_lon), // Convert to float
                                        parseFloat(produto.lat), // Convert to float
                                        parseFloat(produto.lon) // Convert to float
                                      )}
                                      km
                                      <br />
                                    </>
                                  ) : null}
                                  {produto.price}€
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <h3>No products to display.</h3>
                      ) 
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
                                        <div class="card h-100 crop"
                                            onClick={(e) => {
                                                this.setState({ produtoID: produto._doc._id }, this.handleProduto);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                            >
                                            {produto._doc.img.startsWith('http') ? (
                                                <img class="card-img img-fluid" src={produto._doc.img} alt={produto._doc.name} />
                                            ) : (
                                                <img
                                                class="card-img img-fluid"
                                                src={`http://localhost:5000/images/${produto._doc.img.replace(
                                                    'public/images/',
                                                    ''
                                                )}`}
                                                alt={produto._doc.name}
                                                />
                                            )}
                                            <div class="card-body p-4">
                                                <div class="text-center">
                                                <h5 class="fw-bolder">{produto._doc.name}</h5>
                                                {this.state.tipoUser === 'consumidor' ? (
                                                <>
                                                    {this.calculateDistance(
                                                    parseFloat(this.state.user_lat), // Convert to float
                                                    parseFloat(this.state.user_lon), // Convert to float
                                                    parseFloat(produto.lat), // Convert to float
                                                    parseFloat(produto.lon) // Convert to float
                                                    )}
                                                    km
                                                    <br />
                                                </>
                                                ) : null}
                                                {produto.price}€
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div> 
                                ))
                        :
                            this.state.obj.map((produto) => (
                                
                                <div key={produto._doc._id}>
                                    <div class="col mb-5">
                                        <div class="card h-100 crop"
                                            onClick={() => {
                                                this.setState({ produtoID: produto._doc._id }, this.handleProduto);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                            >
                                            {produto._doc.img ? (
                                                produto._doc.img.startsWith('http') ? (
                                                <img class="card-img img-fluid" src={produto._doc.img} alt={produto._doc.name} />
                                                ) : (
                                                <img
                                                    class="card-img img-fluid"
                                                    src={`http://localhost:5000/images/${produto._doc.img.replace(
                                                    'public/images/',
                                                    ''
                                                    )}`}
                                                    alt={produto._doc.name}
                                                />
                                                )
                                            ) : (
                                                <img class="card-img img-fluid" alt={produto._doc.name} />
                                            )}
                                            <div class="card-body p-4">
                                                <div class="text-center">
                                                <h5 class="fw-bolder">{produto._doc.name}</h5>
                                                {this.state.tipoUser === 'consumidor' ? (
                                                <>
                                                    {this.calculateDistance(
                                                    parseFloat(this.state.user_lat), // Convert to float
                                                    parseFloat(this.state.user_lon), // Convert to float
                                                    parseFloat(produto.lat), // Convert to float
                                                    parseFloat(produto.lon) // Convert to float
                                                    )}
                                                    km
                                                    <br />
                                                </>
                                                ) : null}
                                                {produto.price}€
                                                </div>
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