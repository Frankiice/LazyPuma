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
            page: 1,
            novoHeader: [],
            novoHeaderTip: "",
            produtoID: "",
            objSearch: JSON.parse(window.localStorage.getItem("objSearch")),
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
            this.setState({obj: data.productsWPrice,
                            novoHeader: data.novoHeader,
                            novoHeaderTip: data.novoHeaderTip}) ;
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
      

    render(){
    return (
    // <!-- Header --> 
    <React.Fragment>
    {this.state.novoHeaderTip == "null" ?
        <header>
            <br></br>
        </header>
        :
        
    <div class="scrollmenu">
    <header class="cor_header height_header">  
        
        <ScrollContainer class="btn-toolbar col-lg-12 justify-content-center scrollcontainer" id="buttons_header" role="toolbar">
                <div class="row">
                    {this.state.novoHeader.map((product, index) =>  {
                        return <div  key={product._id} class="col">   
                        {this.state.novoHeaderTip == "brand"
                        ?                
                            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butaoBLA" 
                            style={{backgroundImage: `url(${product.img})`}} value={ product.brand} 
                            onMouseEnter={(e) => {
                                e.target.style.backgroundImage = "none";
                              }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundImage = `url(${product.img})`;
                              }}
                            onClick={(e) => {this.setState({ brand: e.target.value }, this.handleClick)}}> {product.brand }</button> 
                        :
                            <button class="btn btn-outline-dark btn-xl rounded-circle section" id="butaoBLA" 
                            style={{ backgroundImage: `url(${product.img})` }} value={ product.categorieA} 
                            onMouseEnter={(e) => {
                                e.target.style.backgroundImage = "none";
                              }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundImage = `url(${product.img})`;
                              }}
                            onClick={(e) => {this.setState({ categoriaA: e.target.value }, this.handleClick)}}> {product.categorieA }</button> 

                        }     
                        </div> 
                    })}
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
    {/* <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="1" id="sidebar" aria-labelledby="produtos">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <p>Try scrolling the rest of the page to see this option in action.</p>
        </div>
    </div> */}
    {/* <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="myOffcanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="myOffcanvasLabel">Offcanvas</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            swag
        </div>
    </div> */}
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
    {/* //<!-- Section --> */}
    <section class="py-5">
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
                                            <img class="card-img  img-fluid" src={produto._doc.img} alt="..." />
                                        ) : (
                                            <img class="card-img img-fluid" src={`http://localhost:5000/images/${produto._doc.img.replace('public/images/', '')}`} alt="..." />

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
                                                    <img class="card-img img-fluid"  src={produto._doc.img} alt="..." />
                                                ) : (
                                                    <img class="card-img img-fluid" src={`http://localhost:5000/images/${produto._doc.img.replace('public/images/', '')}`} alt="..." />

                                                )
                                            :
                                            <img class="card-img img-fluid" alt="..." />
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
    </section>




    {/* <section class="py-5">
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">CATALOGO Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
                <div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">Fancy Product</h5>
                                $40.00 - $80.00
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section> */}
    </React.Fragment>
    );
  }
}


// export default Catalogo