const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
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

const ProductDetailsSchema =  new mongoose.Schema(
    {
        name: String,
        brand: String,
        categorieA: String,
        categorieB: String,
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
    }catch (error) {
         res.send({ status: "error" })
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

    try{
        // const page = parseInt(req.query.page) - 1 || 0;
		// const limit = parseInt(req.query.limit) || 1000;
        let categoria = req.query.categoria || "All";
        let categorieB = req.query.categoriaB || "All";

        console.log("categoria",categoria);
        console.log("categorieB",categorieB);

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

        const products = await Product.find({ })
            .where("categorieB")
			.in(categorieB)
			// .skip(page * limit)
			// .limit(limit);

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

        // console.log("setCategoriasA", setCategoriasA );
        // console.log("setProdutos", setProdutos );
        // console.log("setProd", setProd);

        const categoriasA = [...setProdCat]; //transforma num Array para enviar na response

        const setProdBra =  new Set();
        const setBrands = new Set();
        if(categoriasA.length < 5){
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

        if(categoriasA.length < 5){ //se nao existirem categorias suficientes o novo header vai ser feito de brands
            novoHeader = brands;
        }else{
            novoHeader = categoriasA; //caso contrrario será feito de categoriasA
        }

        const response = {
            error: false,
            total,
            // page: page + 1,
            // limit,
            categorias: categoriasPossiviesB,
            products,
            novoHeader,

        };

        res.status(200).json(response);
    }catch(error){
        console.log(error);
		res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});


app.get("/produto/search", async (req, res) => { 
    const Product = mongoose.model("products", ProductDetailsSchema);

    try{
        const page = parseInt(req.query.page) - 1 || 0;
		const limit = parseInt(req.query.limit) || 5;
		const search = req.query.search || "";
        let categoria = req.query.categoria || "All";
        let categorieB = req.query.categoriaB || "All";

        console.log("categoria",categoria);
        console.log("categorieB",categorieB);

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

        const products = await Product.find({ $or: [{ name: { $regex: search, $options: "i" } }, { brand: { $regex: search , $options: "i"} }, { categorieA: { $regex: search , $options: "i"} }, { categorieB: { $regex: search , $options: "i"} }] })
            .where("categorieB")
			.in(categorieB)
			.skip(page * limit)
			.limit(limit);
        
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
            products,
        };

        res.status(200).json(response);
    }catch(error){
        console.log(error);
		res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});

app.get('/getProdutos', (req, res) => {
    const { q } = req.query;
    console.log(q)


    const keys = ["primeiroNome"]
    
    res.json("ola")
});