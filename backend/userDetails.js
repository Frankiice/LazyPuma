const mongoose = require('mongoose');

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

//mongoose.model("users", UserDetailsSchema)