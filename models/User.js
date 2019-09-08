const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    firstname: {
        type: String, 
        require: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    nationality: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model("user", UserSchema);
