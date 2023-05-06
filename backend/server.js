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

const EncomendaSchema = new mongoose.Schema(
    {
        idConsumidor: String,
        preco: String,
        dataEncomenda: String,
        dataEnvio: String,
        prazoCancelamento: String,
        estadoEncomenda: String,
    },
    {
        collection: "encomenda"
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

app.post("/catalogo", async (req, res) => { 
    const User = mongoose.model("users", UserDetailsSchema);//tera de ser outro coiso e nao o users
    const {token, categoria} = req.body;
    try{
        const user = jwt.verify(token,JWT_SECRET);
        const user_email = user.email;
        User.findOne({email: user_email}) //find da categoria e os seus produtos
            .then((data) => {
                res.send({status: "ok", data: data});
            })
            .catch((error)=>{
                res.send({status: "error" ,data: error});
            });
    }catch(error){}
});


app.get("/produto/search", async (req, res) => { 
    const Product = mongoose.model("products", ProductDetailsSchema);

    try{
        // const page = parseInt(req.query.page) - 1 || 0;
		// const limit = parseInt(req.query.limit) || 1000;
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
// User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] })
        // const products = await Product.find({ name: { $regex: search, $options: "i" }})
        const products = await Product.find({ $or: [{ name: { $regex: search, $options: "i" } }, { brand: { $regex: search , $options: "i"} }, { categorieA: { $regex: search , $options: "i"} }, { categorieB: { $regex: search , $options: "i"} }] })
            .where("categorieB")
			.in(categorieB)
			// .skip(page * limit)
			// .limit(limit);
        
        const total = await Product.countDocuments({
            categorieB: { $in: categorieB },
            name: { $regex: search, $options: "i" },
        });

        const response = {
            error: false,
            total,
            // page: page + 1,
            // limit,
            categoria: categoriasPossiviesB,
            products,
        };

        res.status(200).json(response);
    }catch(error){
        console.log(error);
		res.status(500).json({ error: true, message: "Internal Server Error" });
    }
});

app.post("/user/encomenda", async(req, res) => {
    try{
        const Encomenda = mongoose.model("encomenda", EncomendaSchema);
        const {idConsumidor, preco, dataEncomenda, dataEnvio, prazoCancelamento, estadoEncomenda} = req.body;

        await Encomenda.create({
            idConsumidor,
            preco,
            dataEncomenda,
            dataEnvio,
            prazoCancelamento,
            estadoEncomenda,
        });
        res.send({ status: "ok" });
        
    }catch (error) {
        res.send({ status: "error", error: error })
    }
})

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});

app.get('/getProdutos', (req, res) => {
    const { q } = req.query;
    console.log(q)


    const keys = ["primeiroNome"]
    
    res.json("ola")
});