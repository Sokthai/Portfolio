const express = require("express");
const route = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

// @router  POST api/login
// @desc    Login User (Tested)
// @access  Public
route.post("/", [
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    const {email, password} = req.body;


    try {
        const user = await User.findOne({email});
        
        if (!user){
            return res.status(400).json({errors : [{msg: "User not found"}]});
        }
        
        const verify = await bcrypt.compare(password, user.password);
        if (!verify){
            return res.status(400).json({errors : [{msg: "Wrong password"}]});
        }
        console.log(user);
        const payload = {
            user: {id: user.id}
        }
        jwt.sign(payload, 
            config.get('secret'), 
            {expiresIn : 1800}, 
            (err, token) => {
                if (err) throw err;
                res.status(200).json({token})
            })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }


})

module.exports = route;