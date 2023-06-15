require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const cookieSession = require("cookie-session");
const passportSetup = require("./passport");
const authRoute = require("./routes/auth");
const multer = require('multer');

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

const UserDeactivetedDetailsSchema = new mongoose.Schema(
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
      collection: "usersD"
  }
);

const ProductPropertiesSchema = new mongoose.Schema(
  {
      name: String,
      value: String,
  }
);

const ProductDetailsSchema =  new mongoose.Schema(
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

const ProdutoSchema = new mongoose.Schema(
    {
      idProduto: String,
      quantidade: Number,
      preco: Number,
    },
    { _id: false }
  );

  const ProdutoSchema2 = new mongoose.Schema(
    {
      name: String, // correspondente a "name" em ProductDetailsSchema
      brand: String, // correspondente a "brand" em ProductDetailsSchema
      categorieA: String, // correspondente a "categorieA" em ProductDetailsSchema
      categorieB: String, // correspondente a "categorieB" em ProductDetailsSchema
      img: String, // correspondente a "img" em ProductDetailsSchema
      properties: [ProductPropertiesSchema], // correspondente a "properties" em ProductDetailsSchema
      quantidade: Number,
      preco: Number,
    },
    { _id: false }
  );
  

const VeiculoSchema = new mongoose.Schema(
    {
        idVeiculo: String,
        matricula: String,
        marca: String,
        capacidade: Number
    },
    {
        collection: "veiculos"
    }
)

const UnidadeProducaoSchema = new mongoose.Schema(
    {
    idFornecedor: String,
    nome: String,
    morada: String,
    listaProdutos: [ProdutoSchema],
    listaVeiculos: [VeiculoSchema],
    lat: String,
    lon: String,
    capacidade: Number,
    },
    {
    collection: "unidadeProducao",
    }
);

const EncomendaUPSchema = new mongoose.Schema(
  {
  idUP: String,
  idProduct: String,
  quantidade: Number,
  },
);



const EncomendaSchema = new mongoose.Schema(
    {
        idConsumidor: String,
        preco: String,
        dataEncomenda: String,
        dataEnvio: String,
        prazoCancelamento: String,
        listaUP: [EncomendaUPSchema],
        estadoEncomenda: String,
    },
    {
        collection: "encomenda"
    }
)


// app.get("/encomenda", async (req, res) => {
//   const Encomenda = mongoose.model("encomenda", EncomendaSchema);
//   try {
//     const encomendas = await Encomenda.find();
//     res.status(200).json(encomendas);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: true, message: "Internal Server Error" });
//   }
// });
app.get("/encomenda/consumidor/:idConsumidor", async (req, res) => {
  const Encomenda = mongoose.model("encomenda", EncomendaSchema);
  const Produto = mongoose.model("products", ProductDetailsSchema);
  const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
  

  try {

    const idConsumidor = req.params.idConsumidor;

    // Busca todas as encomendas do consumidor
    const encomendas = await Encomenda.find({ idConsumidor });

    // Array para armazenar todas as informações das encomendas e produtos relacionados
    const result = [];

    let count = 0;
    let lat;
    let lon;
    let nome_UP;
    for (const encomenda of encomendas) {
      console.log(`Encomenda: ${encomenda._id}`);
      const produtosEncomenda = [];
      count++;

      for (const item of encomenda.listaUP) {
        // console.log(`objecto da listaUp da encomenda atual: ${item}`);
        // console.log(`id do produto: ${item.idProduct}`);
        // const produto = await Produto.findById(item.idProduct);
        console.log(`id da UP:${item.idUP}`);
        const idProduto = mongoose.Types.ObjectId(item.idProduct);
        const produto = await Produto.findById(idProduto);
        const idUP = mongoose.Types.ObjectId(item.idUP);
        const UP = await UnidadeProducao.findById(idUP);
        console.log(`UP: ${UP}`);
        // console.log(`Produto: ${produto}`);
        lat = UP.lat;
        lon = UP.lon;
        nome_UP =UP.nome;
        if (produto) {
          const productInfo = {
            
            nome: produto.name,
            marca: produto.brand,
            categoria: produto.categorieB,
            foto: produto.img,
            propriedades: produto.properties,
            quantidade: item.quantidade,
            lat_UP:lat,
            lon_UP:lon,
            name_UP:nome_UP,
            
          };
          produtosEncomenda.push(productInfo);
          console.log(`produtosEncomenda: ${produtosEncomenda}`);
        }
      }
      const dataEncomenda = encomenda.dataEncomenda;
      const partes = dataEncomenda.split(" ");
      const data = `${partes[1]} ${partes[2]} ${partes[3]}`;
        

      result.push({
        produtos: produtosEncomenda,
        encomenda: {data_encomenda: data,
        preco_encomenda: encomenda.preco,
        id_encomenda: encomenda._id,
        preco:encomenda.preco,
        
        }
        
        
        
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});



//relatorios do fornecedor!

// Recuperar todos os produtos vendidos por um fornecedor
app.get("/fornecedor/relatorios/:idFornecedor", async (req, res) => {
  const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
  const Encomenda = mongoose.model("encomenda", EncomendaSchema);
  const Produto = mongoose.model("products", ProductDetailsSchema);
  const User = mongoose.model("users", UserDetailsSchema);

  try {
    const idFornecedor = req.params.idFornecedor;
    console.log("idFornecedor", idFornecedor);

    const unidadesProducao = await UnidadeProducao.find({ idFornecedor });
    const unidadesProducaoIds = unidadesProducao.map((up) => up._id.toString());

    const result = [];

    const encomendas = await Encomenda.find();

    for (const unidadeProducao of unidadesProducao) {
      const produtosVendidos = [];

      for (const encomenda of encomendas) {
        const consumidorId = encomenda.idConsumidor;
        const consumidor = await User.findById(consumidorId);
        const data_encomenda = encomenda.dataEncomenda;
        const partes = data_encomenda.split(" ");
      const data = `${partes[1]} ${partes[2]} ${partes[3]}`;

        for (const item of encomenda.listaUP) {
          if (item.idUP === unidadeProducao._id.toString()) {
            const produto = await Produto.findById(item.idProduct);
            const quantidade = item.quantidade;

            if (produto) {
              produtosVendidos.push({
                consumidor_id: consumidorId,
                consumidor_name:consumidor.fullname,
                consumidor_lat:consumidor.lat,
                consumidor_lon:consumidor.lon,
                produto: {
                  produto,
                  quantidade,
                  data,
                }
              });
            }
          }
        }
      }

      if (produtosVendidos.length > 0) {
        result.push({
          UP: {
            nome: unidadeProducao.nome,
            lat: unidadeProducao.lat,
            lon: unidadeProducao.lon,
            produtos_vendidos: produtosVendidos,
          },
        });
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});


//Relatorios do administrador

app.get("/administrador/relatorios", async (req, res) => {
  const Encomenda = mongoose.model("encomenda", EncomendaSchema);
  const Produto = mongoose.model("products", ProductDetailsSchema);
  const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
  const User = mongoose.model("users", UserDetailsSchema);

  try {
    const encomendas = await Encomenda.find().lean();
    let produtosVendidos = [];

    for (const encomenda of encomendas) {
      const consumidorId = encomenda.idConsumidor;
      const consumidor = await User.findById(consumidorId);
      console.log(encomenda);

      const data_encomenda = new Date(encomenda.dataEncomenda);
      const options = { month: 'short', day: '2-digit', year: 'numeric' };
      const formattedDate = data_encomenda.toLocaleString('en-US', options).replace(',', '');;

      for (let item of encomenda.listaUP) {
        let produto = await Produto.findById(item.idProduct);
        const quantidade = item.quantidade;
        const id_UP = item.idUP;
        const UP = await UnidadeProducao.findById(id_UP);
        const fornecedorId =UP.idFornecedor;
        const fornecedor = await User.findById(fornecedorId);

        

        if (produto) {
          produtosVendidos.push({
            encomeda:{
            
            produto: {
              produto,
              quantidade: quantidade,
              data: formattedDate,
              consumidor_nome: consumidor.fullname,
              consumidor_lat: consumidor.lat,
              consumidor_lon: consumidor.lon,
              consumidor_email: consumidor.email,
              UP_name: UP.nome,
              UP_lat:UP.lat,
              UP_lon:UP.lon,
              fornecedor_nome: fornecedor.fullname,
              fornecedor_email: fornecedor.email,
            }
          }
          });
        }
      }

      
    }

    res.status(200).json(produtosVendidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});






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
        console.log("search", search)


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
                ? (products = await Product.find({ $or: [{ name: { $regex: `.*${search}.*`, $options: "i" } }, { brand: { $regex: `.*${search}.*` , $options: "i"} }, { categorieA: { $regex: `.*${search}.*` , $options: "i"} }, { categorieB: { $regex: `.*${search}.*` , $options: "i"} }] })
                    .where("categorieB").in(categorieB)
                    // .skip(page * limit)
			        // .limit(limit);
                    
                )
                : (products = await Product.find({ $or: [{ name: { $regex: `.*${search}.*`, $options: "i" } }, { brand: { $regex: `.*${search}.*` , $options: "i"} }, { categorieA: { $regex: `.*${search}.*` , $options: "i"} }, { categorieB: { $regex: `.*${search}.*` , $options: "i"} }] })
                    .where("categorieB").in(categorieB)
                    .where("brand").in(brand),
                    // .skip(page * limit)
                    // .limit(limit);
                    console.log("entra bem"))
                )
            :   (brand === "All"
                ? (products = await Product.find({ $or: [{ name: { $regex: `.*${search}.*`, $options: "i" } }, { brand: { $regex: `.*${search}.*` , $options: "i"} }, { categorieA: { $regex: `.*${search}.*` , $options: "i"} }, { categorieB: { $regex: `.*${search}.*` , $options: "i"} }] })
                    .where("categorieB").in(categorieB)
                    .where("categorieA").in(categorieA)
                    // .skip(page * limit)
			        // .limit(limit);
                    )
                : (products = await Product.find({ $or: [{ name: { $regex: `.*${search}.*`, $options: "i" } }, { brand: { $regex: `.*${search}.*` , $options: "i"} }, { categorieA: { $regex: `.*${search}.*` , $options: "i"} }, { categorieB: { $regex: `.*${search}.*` , $options: "i"} }] })
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
                "lon": 1,
                "morada": 1
              });
            
              if (result) {
                productsWPrice.push({
                  ...products[i],
                  price: result.listaProdutos[0].preco,
                  lat: result.lat,
                  lon: result.lon,
                  morada: result.morada
                });
              } else {
                productsWPrice.push({
                  ...products[i],
                  price: 0, // Set a default value for price
                  lat: 0,   // Set default values for lat and lon
                  lon: 0,
                  morada: ""
                });
              }
            }

        
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
        "_id": 1,
        "listaProdutos.$": 1,
        "lat": 1,
        "lon": 1,
        "morada": 1,
        "nome": 1,
        });
    
        if (result) {
        productsWPrice.push({
            ...product,
            price: result.listaProdutos[0].preco,
            quantity: result.listaProdutos[0].quantidade,
            lat: result.lat,
            lon: result.lon,
            morada: result.morada,
            nome: result.nome,
            idUP: result._id
        });
        } else {
        productsWPrice.push({
            ...product,
            price: 0, // Set a default value for price
            quanity: 0,
            lat: 0,   // Set default values for lat and lon
            lon: 0,
            morada: "",
            nome: "",
            idUP: ""
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

app.get('/unidadeProducao/:id', async (req, res) => {
  const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
  const Product = mongoose.model("products", ProductDetailsSchema);

  try {
    const productsWPrice = [];
    const unidadeProducao = await UnidadeProducao.findOne({ _id: req.params.id });

    if (unidadeProducao) {
      const listaProdutos = unidadeProducao.listaProdutos.slice(0, 4); // Get the first 4 products
      for (const produto of listaProdutos) {
        const productDetails = await Product.findOne({ _id: produto.idProduto });
        console.log(productDetails)
        if (productDetails) {
          productsWPrice.push({
            ...produto,
            name: productDetails.name,
            img: productDetails.img,
            brand: productDetails.brand,
            categorieA: productDetails.categorieA,
            categorieB: productDetails.categorieB,
            properties: productDetails.properties,
          });
        } else {
          productsWPrice.push({
            ...produto,
            name: "",
            img: "",
            brand: "",
            categorieA: "",
            categorieB: "",
            properties: [],
          });
        }
      }
    } else {
      productsWPrice.push({
        price: 0, // Set a default value for price
        lat: 0, // Set default values for lat and lon
        lon: 0,
      });
    }
    
    const response = {
      error: false,
      total: productsWPrice.length,
      productsWPrice,
    };
    console.log(response);
    
    res.status(200).json(response);
    
    if (!unidadeProducao) {
      return res.status(404).json({ message: 'Unidade de produção not found' });
    }      
 
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
});



// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'public/images'; // Specify the destination folder where the uploaded files will be stored
      fs.mkdirSync(uploadDir, { recursive: true }); // Create the destination directory if it doesn't exist
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });
  
  const upload = multer({ storage });
  
const path = require('path');

// Other server configurations and routes...

app.use(express.static(path.join(__dirname, 'public')));

app.use('/images', express.static(path.join(__dirname, 'public/images')));
  

// setter
const fs = require('fs');
const { faLayerGroup } = require('@fortawesome/free-solid-svg-icons');
app.post('/produto', upload.single('img'), async (req, res) => {
  try {
    const { unidadeID, name, pBrand, categorieA, categorieB, quantity, price, produtoID, flag, properties } = req.body;

    const parsedProperties = JSON.parse(properties);
    console.log('Request body:', req.body);
    console.log('Type of properties:', typeof parsedProperties);
    console.log('Received properties:');
    parsedProperties.forEach((property, index) => {
      console.log(`Property ${index}:`, property);
    });

    const file = req.file;

    const filePath = file ? `public/images/${file.filename}` : null;

    const Produto = mongoose.model('products', ProductDetailsSchema);

    let product;

    if (flag === "true") {
      // Update existing product
      console.log("ProdutoID dentro do IF", produtoID)
      
      product = await Produto.findById(produtoID);

      if (!product) {
        res.send({ status: 'error', error: 'Product not found' });
        return;
      }

      // Update the product details
      product.name = name;
      product.brand = pBrand;
      product.categorieA = categorieA;
      product.categorieB = categorieB;

      if (file) {
        product.img = filePath;
      }
      product.properties = parsedProperties;
    } else {
      // Create a new product
      product = new Produto({
        name,
        brand: pBrand,
        categorieA,
        categorieB,
        img: filePath,
        parsedProperties
      });
    }

    // Save the product to the database
    await product.save();

    const UnidadeProducao = mongoose.model('unidadeProducao', UnidadeProducaoSchema);

    try {
      // Find the UnidadeProducao document by ID
      const unidade = await UnidadeProducao.findById(unidadeID);

      // Update or add the product in the listaProdutos array
      const productIndex = unidade.listaProdutos.findIndex(
        (produto) => produto.idProduto.toString() === product._id.toString()
      );

      if (productIndex >= 0) {
        // Update existing product in listaProdutos array
        unidade.listaProdutos[productIndex].quantidade = parseInt(quantity);
        unidade.listaProdutos[productIndex].preco = parseInt(price);
      } else {
        // Add new product to listaProdutos array
        unidade.listaProdutos.push({
          idProduto: product._id,
          quantidade: parseInt(quantity),
          preco: parseInt(price),
        });
      }

      // Save the updated UnidadeProducao document
      await unidade.save();

      res.send({ status: 'ok' });
    } catch (error) {
      res.send({ status: 'error', error });
    }
  } catch (error) {
    res.send({ status: 'error', error });
  }
});

app.delete("/produto", async (req, res) => {
  const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
  const Produto = mongoose.model('products', ProductDetailsSchema);
  try {
    const { id, unidadeProducaoId } = req.query;
    console.log("id no produto", id);
    console.log("unidadeProducaoId", unidadeProducaoId);

    // Find the document in UnidadeProducao collection and remove the matching veiculo
    UnidadeProducao.findOneAndUpdate(
      { _id: unidadeProducaoId },
      { $pull: { listaProdutos: { idProduto: id } } },
      { new: true }
    )
      .then(async (data) => {
        if (data) {
          // If the document is found and updated successfully
          // Remove the veiculo document from the veiculos collection
          await Produto.findOneAndRemove({ _id: id });
          res.send({ status: "ok", data: data });
        } else {
          // If the document is not found
          res.send({ status: "error", message: "UnidadeProducao not found" });
        }
      })
      .catch((error) => {
        // If an error occurs during the update
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    // Handle any errors that may occur
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

app.post("/user/unidadeProducao", async (req, res) => {
  try {
    const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
    const { unidadeID, idFornecedor, upName, upAddress, listaProdutos, listaVeiculos, lat, lon, upCapacity } = req.body;
    var nome = upName;
    var morada = upAddress;
    var capacidade = upCapacity;

    // Find the existing UnidadeProducao using the unidadeID
    let existingUnidadeProducao;

    if (unidadeID) {
      existingUnidadeProducao = await UnidadeProducao.findOne({ _id: unidadeID });
    }

    if (existingUnidadeProducao) {
      // If the UnidadeProducao already exists, update its properties
      existingUnidadeProducao.idFornecedor = idFornecedor;
      existingUnidadeProducao.nome = nome;
      existingUnidadeProducao.morada = morada;
      existingUnidadeProducao.lat = lat;
      existingUnidadeProducao.lon = lon;
      existingUnidadeProducao.capacidade = capacidade;

      await existingUnidadeProducao.save(); // Save the updated UnidadeProducao
    } else {
      // If the UnidadeProducao doesn't exist, create a new one
      await UnidadeProducao.create({
        idFornecedor,
        nome,
        morada,
        listaProdutos,
        listaVeiculos,
        lat,
        lon,
        capacidade
      });
    }

    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error", error: error });
  }
});


//vai buscar as unidades e os produtos para a homepage do fornecedor
app.get("/user/unidadeProducao", async (req, res) => {
  const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
  const Product = mongoose.model("products", ProductDetailsSchema); // Assuming "Product" is the model for the product details

  try {
    const { id } = req.query;
    console.log(id);
    const units = await UnidadeProducao.find({
      $or: [
        { _id: id },
        { idFornecedor: id }
      ]
    });

    const unitsWithProductDetails = await Promise.all(units.map(async (unit) => {
      if (unit) {
        const productList = await Promise.all(unit.listaProdutos.map(async (productEntry) => {
          const product = await Product.findById(productEntry.idProduto);
          return {
            ...(product ? product.toObject() : {}),
            quantidade: productEntry.quantidade,
            preco: productEntry.preco,
          };
        }));

        return {
          ...(unit ? unit.toObject() : {}),
          listaProdutos: productList
        };
      }
    }));

    res.json(unitsWithProductDetails.filter(unit => unit));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving production units." });
  }
});


app.delete("/user/unidadeProducao", async (req, res) => {
  const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
  try {
    const { id } = req.query;
    console.log("id", id)

    UnidadeProducao.findOneAndRemove({_id: id})
        .then((data) => {
            res.send({status: "ok", data: data})
        })
        .catch((error) => {
            res.send({status: "error", data: error})
        });
  }catch(error){
    res.send({ status: "error", error: error })
  }
});

//vai buscar as informações para fazer uma homepage para o consumidor
app.get("/user/homepage", async (req, res) => {
  const Encomenda = mongoose.model("encomenda", EncomendaSchema);
  const Product = mongoose.model("products", ProductDetailsSchema);
  const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);

  try {
    const { id } = req.query;
    let productList;

    if (id) {
      const encomendas = await Encomenda.find({
        $or: [
          { _id: id },
          { idConsumidor: id }
        ]
      });

      if (encomendas.length > 0) {
        // User has placed orders
        const productIds = encomendas.flatMap(encomenda => encomenda.listaUP.map(productEntry => productEntry.idProduct));

        const productListForCategories = await Product.find({ _id: { $in: productIds } });

        // Get unique categories from the productListForCategories
        const categories = [...new Set(productListForCategories.map(product => product.categorieB))];

        productList = await Promise.all(categories.map(async (category) => {
          // Retrieve products with the same category, excluding the ones in productListForCategories
          const productsWithCategory = await Product.find({
            categorieB: category,
            _id: { $nin: productIds }
          });

          return productsWithCategory.map(product => product.toObject());
        }));

        // Flatten the array of arrays into a single array
        productList = productList.flat();  

      } else {
        // User has no orders
        const categories = await Product.distinct("categorieB");
        productList = await Promise.all(categories.map(async (category) => {
          const product = await Product.findOne({ categorieB: category });
          return product.toObject();
        }));
      }
    } else {
      const categories = await Product.distinct("categorieB");
      productList = await Promise.all(categories.map(async (category) => {
        const product = await Product.findOne({ categorieB: category });
        return product.toObject();
      }));
    }

    // Fetch price, lat, and lon from UnidadesProdução table for each product
    productList = await Promise.all(productList.map(async (product) => {
      const unidadeProducao = await UnidadeProducao.findOne({ "listaProdutos.idProduto": product._id });
      if (unidadeProducao) {
        const productEntry = unidadeProducao.listaProdutos.find(entry => entry.idProduto === product._id.toString());
        if (productEntry) {
          product.preco = productEntry.preco;
          product.lat = unidadeProducao.lat;
          product.lon = unidadeProducao.lon;
        } else {
          // Set default values when product is not found in UnidadesProdução
          product.preco = 0;
          product.lat = 0;
          product.lon = 0;
        }
      } else {
        // Set default values when product is not found in UnidadesProdução
        product.preco = 0;
        product.lat = 0;
        product.lon = 0;
      }
      return product;
    }));

    res.json(productList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving products." });
  }
});


  
  

  app.get("/user/veiculos", async (req, res) => {
    try {
      const Veiculo = mongoose.model("veiculos", VeiculoSchema);
      const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
    
      // Extract the veiculoID from the query parameters
      const veiculoID = req.query.id;
    
      // Find the veiculo by veiculoID
      const veiculo = await Veiculo.findById(veiculoID);

    
      if (!veiculo) {
        return res.send({ status: "error", error: "Veiculo not found" });
      }
    
      // Find the UnidadeProducao that contains the veiculo
      const unidadeProducao = await UnidadeProducao.findOne({ "listaVeiculos._id": veiculoID });

    
      if (!unidadeProducao) {
        return res.send({ status: "error", error: "UnidadeProducao not found" });
      }
    
      // Prepare the response object
      const response = {
        unidadeID: unidadeProducao.unidadeID,
        matricula: veiculo.matricula,
        marca: veiculo.marca,
        capacidade: veiculo.capacidade,
      };
    
      res.send(response);
    } catch (error) {
      res.send({ status: "error", error: error.message });
    }
  });
  

  app.post("/user/veiculos", upload.none(), async (req, res) => {
    try {
      const Veiculo = mongoose.model("veiculos", VeiculoSchema);
      const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
  
      const { veiculoID, unidadeID, matricula, vBrand, vCapacity, flag } = req.body;
      console.log(veiculoID, unidadeID, matricula, vBrand, vCapacity, flag);
  
      let updatedVeiculo;
      // se for true é para dar update
      if (flag === "true") {
        // Update existing veiculo
        console.log("entra aqui?")
        updatedVeiculo = await Veiculo.findByIdAndUpdate(
          veiculoID,
          {
            matricula,
            marca: vBrand,
            capacidade: vCapacity
          },
          { new: true }
        );
  
        if (!updatedVeiculo) {
          res.send({ status: "error", error: "Veiculo not found" });
          return;
        }
      } else {
        // Create a new veiculo
        updatedVeiculo = await Veiculo.create({
          matricula,
          marca: vBrand,
          capacidade: vCapacity
        });
      }
  
      const unidadeProducao = await UnidadeProducao.findById(unidadeID);
      console.log("unidadeProducao", unidadeProducao);
  
      if (unidadeProducao) {
        const veiculoIndex = unidadeProducao.listaVeiculos.findIndex(
          (veiculo) => veiculo._id && updatedVeiculo._id && veiculo._id.toString() === updatedVeiculo._id.toString()
        );
        
  
        if (veiculoIndex >= 0) {
          // Update existing veiculo in listaVeiculos array
          unidadeProducao.listaVeiculos[veiculoIndex] = updatedVeiculo;
        } else {
          // Add new veiculo to listaVeiculos array
          unidadeProducao.listaVeiculos.push(updatedVeiculo);
        }
  
        // Save the updated UnidadeProducao document
        await unidadeProducao.save();
  
        res.send({ status: "ok" });
      } else {
        res.send({ status: "error", error: "UnidadeProducao not found" });
      }
    } catch (error) {
      res.send({ status: "error", error });
    }
  });

  app.delete("/user/veiculos", async (req, res) => {
    const UnidadeProducao = mongoose.model("unidadeProducao", UnidadeProducaoSchema);
    const Veiculo = mongoose.model("veiculos", VeiculoSchema);
    try {
      const { id, unidadeProducaoId } = req.query;
      console.log("id nos veiculos", id);
      console.log("unidadeProducaoId", unidadeProducaoId);
  
      // Find the document in UnidadeProducao collection and remove the matching veiculo
      UnidadeProducao.findOneAndUpdate(
        { _id: unidadeProducaoId },
        { $pull: { listaVeiculos: { _id: id } } },
        { new: true }
      )
        .then(async (data) => {
          if (data) {
            // If the document is found and updated successfully
            // Remove the veiculo document from the veiculos collection
            await Veiculo.findOneAndRemove({ _id: id });
            res.send({ status: "ok", data: data });
          } else {
            // If the document is not found
            res.send({ status: "error", message: "UnidadeProducao not found" });
          }
        })
        .catch((error) => {
          // If an error occurs during the update
          res.send({ status: "error", data: error });
        });
    } catch (error) {
      // Handle any errors that may occur
      res.send({ status: "error", error: error })
    }
  });

app.get("/users", async (req, res) => {
  const User = mongoose.model("users", UserDetailsSchema);

  try {
    const users = await User.find();
    return res.json({ status: "ok", data: users });
  } catch (error) {
    return res.json({
      status: "error",
      error: "An error occured during the connection to the data base",
    });
  }
});

app.get("/usersD", async (req, res) => {
  const UserD = mongoose.model("usersD", UserDeactivetedDetailsSchema);


  try {
    const users = await UserD.find();
    return res.json({ status: "ok", data: users });
  } catch (error) {
    return res.json({
      status: "error",
      error: "An error occured during the connection to the data base",
    });
  }
});

//usado para dar delete de um user dos users Activos e passa para os desativos
app.delete("/user", async (req, res) => {
  const User = mongoose.model("users", UserDetailsSchema);
  const UserD = mongoose.model("usersD", UserDeactivetedDetailsSchema);

  const userId = req.body.userId; // Assuming the user ID is provided in the request body

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ status: "error", error: "User not found" });
    }

    const userD = new UserD({
      // Copy the relevant user information to the UserD model
      email: user.email,
      type: user.type,
      fullname: user.fullname,
      nickname: user.nickname,
      phone: user.phone,
      morada: user.morada,
      lat: user.lat,
      lon: user.lon,
      nif: user.nif,
      password: user.password
    });

    await userD.save();
    await User.findByIdAndDelete(userId); // Delete the user from the User table
    return res.json({ status: "ok", data: userD });
  } catch (error) {
    return res.json({
      status: "error",
      error: "An error occurred during the connection to the database",
    });
  }
});

//usado para dar delete de um user dos users Desativos e passa para os Ativos
app.delete("/userD", async (req, res) => {
  const User = mongoose.model("users", UserDetailsSchema);
  const UserD = mongoose.model("usersD", UserDeactivetedDetailsSchema);

  const userId = req.body.userId; // Assuming the user ID is provided in the request body

  try {
    const userD = await UserD.findById(userId);

    if (!userD) {
      return res.json({ status: "error", error: "User not found" });
    }

    const user = new User({
      // Copy the relevant user information to the UserD model
      email: userD.email,
      type: userD.type,
      fullname: userD.fullname,
      nickname: userD.nickname,
      phone: userD.phone,
      morada: userD.morada,
      lat: userD.lat,
      lon: userD.lon,
      nif: userD.nif,
      password: userD.password
    });

    await user.save();
    await UserD.findByIdAndDelete(userId); // Delete the user from the UserD table
    return res.json({ status: "ok", data: user });
  } catch (error) {
    return res.json({
      status: "error",
      error: "An error occurred during the connection to the database",
    });
  }
});

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});

//app.get("/Unidade_Producao", async (req,res) => {
//    try{
//        const Edicao = mongoose.model("unidadeProducao", EdicaoDetailsSchema);
//        const {listaProdutos, listaVeiculos, lat, long, morada} = req.body;
//        await Edicao.findOneAndUpdate({}
//        (err,result)=>{
//            res.json({status: "ok", data:"Update success"})
//            })
//
//    }catch(error) {
//        res.send({ status: "error", error: error })
//   }
//
//
//
//});