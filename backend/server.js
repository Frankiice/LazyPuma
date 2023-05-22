require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");

const app = express();

app.use(
    cookieSession({
        name: "session",
        keys:["lazypuma"],
        maxAge: 24 * 60 * 60 * 100,
    })
    );
    
app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin:"http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    }
));

app.use("/auth", authRoute);
  
const port = process.env.PORT || 5000;
app.use(express.json());

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { NavbarBrand } = require('react-bootstrap');
const JWT_SECRET = "aisfnoiqnfnqnfqfinqfw+qofmwkginanpgangspaiag"
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})



// const collection = connection.collection("products");
// const query = { "name": "Electronics" };
// const projection = { "subcategories": "TVs" };
// const result = collection.findOne(query, projection);

// result.then((doc) => {
//     console.log(doc.subcategories[0].subcategories[0].name);
// }).catch((err) => {
//     console.error(err);
// });



const UserDetailsSchema = new mongoose.Schema(
    {
    email: String,
    type: String,
    fullname: String,
    nickname: String,
    phone: String,
    morada: String,
    lat: String,
    lon: String,
    nif: Number,
    password: String,
    },
    {
        collection: "users"
    }
);

const ProductPropertiesSchema = new mongoose.Schema(
    {
        Color: String
    },
    { _id: false }
);

const ProductDetailsSchema =  new mongoose.Schema(
    {
        name: String,
        brand: String,
        categorieA: String,
        categorieB: String,
        properties: [ProductPropertiesSchema],
    },
    {
        collection: "products"
    }
)

const ProdutoSchema = new mongoose.Schema(
    {
      idProduto: String,
      quantidade: Number,
      preco: Number,
    },
    { _id: false }
  );

const VeiculoSchema = new mongoose.Schema(
    {
        idVeiculo: String
    },
    {
        collection: "veiculos"
    }
)

const UnidadeProducaoSchema = new mongoose.Schema(
    {
    idFornecedor: String,
    listaProdutos: [ProdutoSchema],
    listaVeiculos: [VeiculoSchema],
    lat: String,
    lon: String,
    morada: String,
    },
    {
    collection: "unidadeProducao",
    }
);


const EncomendaSchema = new mongoose.Schema(
    {
        idConsumidor: String,
        preco: String,
        dataEncomenda: String,
        dataEnvio: String,
        prazoCancelamento: String,
        listaUP: [UnidadeProducaoSchema],
        estadoEncomenda: String,
    },
    {
        collection: "encomenda"
    }
)


const fullProductSchema = new mongoose.Schema(
    {
        name: String,
        brand: String,
        categorieA: String,
        categorieB: String,
        img: String,
        properties: [ProductPropertiesSchema],
    },
    {
        collection: "products"
    }
)
  


app.post("/user/registar", async(req, res) => {
    try {
        const User = mongoose.model("users", UserDetailsSchema);
        //const usersCollection = connection.useDb("lazypuma").collection("users");
        const {type, fullname, nickname, morada, nif, lat, lon, email, phone, password} = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({email})
        if(user){
            return res.json({status: "error", error: "There is already an account with this email"})
        }else{
         await User.create({
             email,
             type,
             fullname,
             nickname,
             phone,
             morada, 
             lat,
             lon,
             nif,
             password: encryptedPassword,
          });
          res.send({ status: "ok" });
        }
    }catch (error) {
         res.send({ status: "error", error: error })
    }
})


app.post("/user/login", async (req, res) => {
    const User = mongoose.model("users", UserDetailsSchema);
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.json({status: "error", error: "O utilizador não foi encontrado"})
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sign({email:user.email}, JWT_SECRET)
        if(res.status(201)){
            return res.json({status:"ok", data: token, type: user.type})
        }else{
            return res.json({status:"error", error: "Ocorreu um erro na ligação à base de dados"})
        }
    }
    return res.json({status:"error", error: "Password inválida"})
});

app.post("/user/userData", async (req, res) => { //este seria para aceder as infos do user
    const User = mongoose.model("users", UserDetailsSchema);
    const {token} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        const user_email = user.email;
        User.findOne({email: user_email})
            .then((data) => {
                res.send({status: "ok", data: data});
            })
            .catch((error)=>{
                res.send({status: "error" ,data: error});
            });
    }catch(error){}
});

app.put("/user/update", async (req, res) => { //esste seria para atualizar as infos na BD
    const User = mongoose.model("users", UserDetailsSchema);
    const {token, fullname, nickname, morada, nif, lat, lon, email, phone, password} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        const user_email = user.email;
        await User.findOneAndUpdate({email: user_email}, {fullname: fullname, nickname: nickname, morada:morada, nif:nif, lat: lat, lon:lon, phone:phone },
            {new:true}, 
            (err,result)=>{
                res.json({status: "ok", data:"Update success"})
            })
            // .then((data) => {
            //     res.send({status: "ok", data: data});
            // })
            // .catch((error)=>{
            //     res.send({status: "error" ,data: error});
            // });
    }catch(error){}
});

app.delete("/user/delete", async (req, res) => { //esste seria para eleminar um user na BD
    const User = mongoose.model("users", UserDetailsSchema);
    const {token, userRemove} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        const user_email = user.email;
        User.findOneAndRemove({email: user_email})
            .then((data) => {
                res.send({status: "ok", data: data})
            })
            .catch((error) => {
                res.send({status: "error", data: error})
            });
    }catch(error){}
});

app.get("/catalogo", async (req, res) => { 
    const Product = mongoose.model("products", ProductDetailsSchema);
    const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);

    try{
        // const page = parseInt(req.query.page) - 1 || 0;
		// const limit = parseInt(req.query.limit) || 1000;
        let categorieA = req.query.categoriaA || "All";
        let categorieB = req.query.categoriaB || "All";
        let brand = req.query.brand || "All";

        // console.log("categorieA",categorieA);
        // console.log("categorieB",categorieB);
        // console.log("brand",brand);


        const categoriasPossiviesB = [
            "Baby",
            "Sports",
            "Animals",
            "Cosmetics",
            "DIY",
            "Smartphones",
            "Tech",
            "Decoration",
            "Gardening",
            "Gaming",
            "TVs",
            "Toys",
            "Appliances",
            "Photography",
            "Books"
		];

        categorieB === "All"
			? (categorieB = [...categoriasPossiviesB])
			: (categorieB = req.query.categoriaB);

        let products = null;
        categorieA === "All"
            ?   (brand === "All" 
                ? (products = await Product.find({ })
                    .where("categorieB").in(categorieB)
                    // .skip(page * limit)
			        // .limit(limit);
                    
                )
                : (products = await Product.find({ })
                    .where("categorieB").in(categorieB)
                    .where("brand").in(brand)
                    // .skip(page * limit)
                    // .limit(limit);
                    )
                )
            :   (brand === "All"
                ? (products = await Product.find({ })
                    .where("categorieB").in(categorieB)
                    .where("categorieA").in(categorieA)
                    // .skip(page * limit)
			        // .limit(limit);
                    )
                : (products = await Product.find({ })
                    .where("categorieB").in(categorieB)
                    .where("categorieA").in(categorieA)
                    .where("brand").in(brand)
                    // .skip(page * limit)
                    // .limit(limit);
                    )
            )
            
            let productsWPrice = [];

            for (let i = 0; i < products.length; i++) {
              const result = await UnidadeProducao.findOne({
                "listaProdutos": {
                  "$elemMatch": {
                    "idProduto": {
                      "$in": [products[i]._id]
                    }
                  }
                }
              },
              {
                "_id": 0,
                "listaProdutos.$": 1,
                "lat": 1,
                "lon": 1
              });
            
              if (result) {
                productsWPrice.push({
                  ...products[i],
                  price: result.listaProdutos[0].preco,
                  lat: result.lat,
                  lon: result.lon
                });
              } else {
                productsWPrice.push({
                  ...products[i],
                  price: 0, // Set a default value for price
                  lat: 0,   // Set default values for lat and lon
                  lon: 0
                });
              }
            }
            
            // console.log("productsWPrice", productsWPrice);
            
  
        // const setCategoriasA = new Set();
        // const setProdutos =  new Set();
        // for (let i = 0; i < products.length; i++) {
        //     setCategoriasA.add(products[i].categorieA);  //faz isto para fazer um conjunto de das categorias A
        //     setProdutos.add(products[i]);
        // }

        // const categoriasA = [...setCategoriasA]; //transforma num Array para enviar na response

        const setProdCat = new Set();
        const setCat = new Set();
        for(let j = 0; j < products.length; j++){ //verifica se ja existe no set das Categorias, se nao existe é pq ainda nao temos um produto para essa categoria ent adiciona ao setProdutos
            if (!setCat.has(products[j].categorieA)){ 
                setCat.add(products[j].categorieA)
                setProdCat.add(products[j]);
            }
        } 

        // console.log("setCategoriasA", setCat );
        // console.log("setProdutos", setProdutos );
        // console.log("setProd", setProd);

        const categoriasA = [...setProdCat]; //transforma num Array para enviar na response

        const setProdBra =  new Set();
        const setBrands = new Set();
        if(categoriasA.length < 2){
            // for (let i = 0; i < products.length; i++) {
            //     setBrands.add(products[i].brand);  //faz isto para fazer um conjunto de das brands
            // }
            for(let j = 0; j < products.length; j++){ //verifica se ja existe no set das Brands, se nao existe é pq ainda nao temos um produto para essa marca ent adiciona ao setBrands
                if (!setBrands.has(products[j].brand)){ 
                    setBrands.add(products[j].brand)
                    setProdBra.add(products[j]);
                }
            } 
        };

        // console.log("setBrands", setBrands);
        // console.log("setProdBra", setProdBra);


        const brands = [...setProdBra]; //transforma num Array para enviar na response

        const total = await Product.countDocuments({
            categorieB: { $in: categorieB },
        });

        if(categoriasA.length < 2){ //se nao existirem categorias suficientes o novo header vai ser feito de brands
            if(categoriasA.length < 2){
                novoHeader = [];
                novoHeaderTip = "null";
            }
            if(brands.length < 2){
                novoHeader = [];
                novoHeaderTip = "null";
            }else{
            novoHeader = brands;
            novoHeaderTip = "brand";
            }
        }else{
            novoHeader = categoriasA; //caso contrrario será feito de categoriasA
            novoHeaderTip = "categorieA";
        }

        const response = {
            error: false,
            total,
            // page: page + 1,
            // limit,
            categorias: categoriasPossiviesB,
            productsWPrice,
            novoHeader,
            novoHeaderTip,

        };

        res.status(200).json(response);
    }catch(error){
        console.log(error);
		res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});


app.get("/produto/search", async (req, res) => { 
    const Product = mongoose.model("products", ProductDetailsSchema);
    const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);


    try{
        const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
        let categorieA = req.query.categoriaA || "All";
        let categorieB = req.query.categoriaB || "All";
        let brand = req.query.brand || "All";

        console.log("categoriaA",categorieA);
        console.log("categorieB",categorieB);
        console.log("brand",brand);


        const categoriasPossiviesB = [
            "Baby",
            "Sports",
            "Animals",
            "Cosmetics",
            "DIY",
            "Smartphones",
            "Tech",
            "Decoration",
            "Gardening",
            "Gaming",
            "TVs",
            "Toys",
            "Appliances",
            "Photography",
            "Books"
		];

        categorieB === "All"
			? (categorieB = [...categoriasPossiviesB])
			: (categorieB = req.query.categoriaB);

        let products = null;
        categorieA === "All"
            ?   (brand === "All" 
                ? (products = await Product.find({ $or: [{ name: { $regex: search, $options: "i" } }, { brand: { $regex: search , $options: "i"} }, { categorieA: { $regex: search , $options: "i"} }, { categorieB: { $regex: search , $options: "i"} }, {"properties.Color": { $exists: true, $regex: search, $options: "i" }}] })
                    .where("categorieB").in(categorieB)
                    // .skip(page * limit)
			        // .limit(limit);
                    
                )
                : (products = await Product.find({ $or: [{ name: { $regex: search, $options: "i" } }, { brand: { $regex: search , $options: "i"} }, { categorieA: { $regex: search , $options: "i"} }, { categorieB: { $regex: search , $options: "i"} }, {"properties.Color": { $exists: true, $regex: search, $options: "i" }}] })
                    .where("categorieB").in(categorieB)
                    .where("brand").in(brand),
                    // .skip(page * limit)
                    // .limit(limit);
                    console.log("entra bem"))
                )
            :   (brand === "All"
                ? (products = await Product.find({ $or: [{ name: { $regex: search, $options: "i" } }, { brand: { $regex: search , $options: "i"} }, { categorieA: { $regex: search , $options: "i"} }, { categorieB: { $regex: search , $options: "i"} }, {"properties.Color": { $exists: true, $regex: search, $options: "i" }}] })
                    .where("categorieB").in(categorieB)
                    .where("categorieA").in(categorieA)
                    // .skip(page * limit)
			        // .limit(limit);
                    )
                : (products = await Product.find({ $or: [{ name: { $regex: search, $options: "i" } }, { brand: { $regex: search , $options: "i"} }, { categorieA: { $regex: search , $options: "i"} }, { categorieB: { $regex: search , $options: "i"} }, {"properties.Color": { $exists: true, $regex: search, $options: "i" }}] })
                    .where("categorieB").in(categorieB)
                    .where("categorieA").in(categorieA)
                    .where("brand").in(brand)
                    // .skip(page * limit)
                    // .limit(limit);
                    )
            )
            console.log(products)

            let productsWPrice = [];

            for (let i = 0; i < products.length; i++) {
              const result = await UnidadeProducao.findOne({
                "listaProdutos": {
                  "$elemMatch": {
                    "idProduto": {
                      "$in": [products[i]._id]
                    }
                  }
                }
              },
              {
                "_id": 0,
                "listaProdutos.$": 1,
                "lat": 1,
                "lon": 1
              });
            
              if (result) {
                productsWPrice.push({
                  ...products[i],
                  price: result.listaProdutos[0].preco,
                  lat: result.lat,
                  lon: result.lon
                });
              } else {
                productsWPrice.push({
                  ...products[i],
                  price: 0, // Set a default value for price
                  lat: 0,   // Set default values for lat and lon
                  lon: 0
                });
              }
            }
            
            // console.log("productsWPrice", productsWPrice);

        // const products = await Product.find({ $or: [{ name: { $regex: search, $options: "i" } }, { brand: { $regex: search , $options: "i"} }, { categorieA: { $regex: search , $options: "i"} }, { categorieB: { $regex: search , $options: "i"} }] })
        //     .where("categorieB")
		// 	.in(categorieB)
        //     .where("categorieA")
        //     .in(categorieA)
        //     .where("brand")
        //     .in(brand)
		// 	.skip(page * limit)
		// 	.limit(limit);
        
        const total = await Product.countDocuments({
            categorieB: { $in: categorieB },
            name: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            page: page + 1,
            limit,
            categoria: categoriasPossiviesB,
            productsWPrice,
        };

        res.status(200).json(response);
    }catch(error){
        console.log(error);
		res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// getter
app.get("/produto", async (req, res) => { 
    const Product = mongoose.model("products", ProductDetailsSchema);
    const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);


    try{
        const produtoID = req.query.id;

        const product = await Product.findById(produtoID);
        
        const total = await Product.countDocuments({
            _id: produtoID,
        });

        let productsWPrice = [];

        const result = await UnidadeProducao.findOne({
        "listaProdutos": {
            "$elemMatch": {
            "idProduto": {
                "$in": [product._id]
            }
            }
        }
        },
        {
        "_id": 0,
        "listaProdutos.$": 1,
        "lat": 1,
        "lon": 1,
        "morada": 1
        });
    
        if (result) {
        productsWPrice.push({
            ...product,
            price: result.listaProdutos[0].preco,
            lat: result.lat,
            lon: result.lon,
            morada: result.morada
        });
        } else {
        productsWPrice.push({
            ...product,
            price: 0, // Set a default value for price
            lat: 0,   // Set default values for lat and lon
            lon: 0,
            morada: ""
        });
        }
        
        var productWPrice = productsWPrice[0];

        const response = {
            error: false,
            total,
            productWPrice,
        };

        res.status(200).json(response);
    }catch(error){
        console.log(error);
		res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

// setter
app.post("/produto", async (req, res) => {
    try{
        const Produto = mongoose.model("products", fullProductSchema);
        const {name, brand, categorieA, categorieB, img, properties} = req.body;

        await Produto.create({
            name,
            brand, 
            categorieA, 
            categorieB, 
            img, 
            properties
        });
        res.send({ status: "ok" });
        
    }catch (error) {
        res.send({ status: "error", error: error })
    }
});

app.post("/user/encomenda", async(req, res) => {
    try{
        const Encomenda = mongoose.model("encomenda", EncomendaSchema);
        const {idConsumidor, preco, dataEncomenda, dataEnvio, prazoCancelamento, listaUP, estadoEncomenda} = req.body;

        await Encomenda.create({
            idConsumidor,
            preco,
            dataEncomenda,
            dataEnvio,
            prazoCancelamento,
            listaUP,
            estadoEncomenda,
        });
        res.send({ status: "ok" });
        
    }catch (error) {
        res.send({ status: "error", error: error })
    }
})

app.post("/user/unidadeProducao", async(req, res) => {
    try{
        const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
        const {idFornecedor, listaProdutos, listaVeiculos, lat, lon, morada} = req.body;

        await UnidadeProducao.create({
            idFornecedor,
            listaProdutos,
            listaVeiculos,
            lat,
            lon,
            morada,
        });
        res.send({ status: "ok" });
        
    }catch (error) {
        res.send({ status: "error", error: error })
    }
})

app.get("/user/unidadeProducao", async (req, res) => { 
    const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
    
    try {
        const { id } = req.query;
        const units = await UnidadeProducao.find({ id });
        res.json(units);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving production units." });
    }
});


app.post("/user/veiculos", async(req, res) => {
    try{
        const Veiculo = mongoose.model("veiculos", VeiculoSchema);
        const {idVeiculo} = req.body;

        await Veiculo.create({
            idVeiculo
        });
        res.send({ status: "ok" });
        
    }catch (error) {
        res.send({ status: "error", error: error })
    }
})

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});
