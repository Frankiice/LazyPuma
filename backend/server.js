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
const JWT_SECRET = "aisfnoiqnfnqnfqfinqfw+qofmwkginanpgangspaiag"
const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

app.post("/user/registar", async(req, res) => {
    const UserDetailsSchema = new mongoose.Schema(
        {
        email: String,
        type: String,
        fullname: String,
        nickname: String,
        phone: String,
        morada: String,
        nif: Number,
        password: String,
        },
        {
            collection: "users"
        }
    );
    
    const User = mongoose.model("users", UserDetailsSchema);
    //const usersCollection = connection.useDb("lazypuma").collection("users");
    const {type, fullname, nickname, morada, nif, email, phone, password} = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    
    try {
         await User.create({
             email,
             type,
             fullname,
             nickname,
             phone,
             morada, 
             nif,
             password: encryptedPassword,
          });
          res.send({ status: "ok" });
    }catch (error) {
         res.send({ status: "error" })
    }
})


app.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email})
    if(!user){
        return res.json({error:"User Not found"})
    }
    if(await bcrypt.compare(password,user.password)){
        const token = jwt.sing({}, JWT_SECRET)
        if(res.status(201)){
            return res.json({status:"ok", data: token})
        }else{
            return res.json({error:"error"})
        }
    }
    return res.json({status:"error", error: "Invalid Password"})
});

app.post("/user", async (req, res) => { //este seria para aceder as infos do user
    const {token} = req.body
    try{
        const user = jwt.verify(token,JWT_SECRET)
        const user_email = user.email;
        User.findOne({email:user_email})
            .then((data) => {
                res.send({status: "ok", data:data});
            })
            .catch((error)=>{
                res.send({status: "error" ,data:error})
            });
    }catch(error){}
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