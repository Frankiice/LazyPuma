const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})
// FALTA RECEBER O JSON DO FRONTEND COM UMA ROUTE
// insert from express into DB
/*
const userData = {
    "email": "Gabriel@teste.com",
      "type": "Consumidor",
      "fullname": "Lazy Puma",
      "nickname": "gabriel",
      "phone": "000-000-000",
      "morada": "Lisbon",
      "nif": 123456789,
      "password": "admin"
}
const usersCollection = connection.useDb("lazypuma").collection("users");
usersCollection.insertOne(userData, (err, result) => {
    if (err) {
    console.error(err);
    return res.status(500).send(err);
    }
    console.log(`${result.insertedCount} documents inserted into the collection`);
    //res.send('Data inserted successfully!');
});
*/

app.listen(port, () => {
console.log(`Server is running on port: ${port}`);
});

app.get('/getProdutos', (req, res) => {
    const { q } = req.query;
    console.log(q)


    const keys = ["primeiroNome"]
    
    res.json("ola")
});