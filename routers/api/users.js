const express = require("express");
const route = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
const nodemailer = require("nodemailer");


// @router      POST api/users
// @desc        Create / register a new user
// @access      Public 

route.post("/", [
    check("firstname", "Please enter your first name").not().isEmpty(),
    check("lastname", "Please enter your last name").not().isEmpty(),
    check("email", "Please enter your email").isEmail(),
    check("password", "Please enter your password").isLength({min: 6})
    ],async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {firstname, lastname, dob, gender, email, password} = req.body;
        
        let user = await User.findOne({email});
        if (user){
            return res.status(400).json({errors : [{msg: "User already exist"}]});
        }
        
        const salt = await bcrypt.genSalt(config.get("salt"));
        const avatar = await gravatar.url(email, {s: '200', r: 'pg', d:'mm'});
        user = new User({
            firstname,
            lastname,
            dob,
            gender,
            email,
            password,
            avatar
        })
        user.password = await bcrypt.hash(password, salt);
        await user.save();

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
        // res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})

// @route       PUT api/users
// @desc        Update user  (Tested)
// access       Private
route.put("/", [auth, 
    check("firstname", "Please enter your first name").not().isEmpty(),
    check("lastname", "Please enter your last name").not().isEmpty(),
    check("email", "Please enter your email").not().isEmpty(),
    ],async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    
    try {
        const {firstname, lastname, dob, gender, email} = req.body;
        const userInfo = await User.findById(req.user.id);
        if (!userInfo){
            return res.status(400).json({errors : [{msg: "User not found"}]});
        }
        const {password} = userInfo; //update everything except password
        const avatar = await gravatar.url(email, {s: '200', r: 'pg', d:'mm'});
        const updateUser = {
            firstname, lastname, dob, gender, email, password, avatar
        }
        const user = await User.findByIdAndUpdate(req.user.id, {$set: updateUser}, {new: true});

        res.status(200).json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors : [{msg: "Server Error"}]});
    }
}) 

// @route       Delete api/users
// @desc        Delete login user (Tested)
// @access      Private
route.delete("/", auth, async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user.id);
        res.status(200).json({msg: "User Deleted"});

        //will need to delete profile , course, project, internship, github later
    } catch (error) {
        console.log(error.message);
        res.status(500).json({errors : [{msg: "Server Error"}]})
    }
    
})

// @route       Put /api/users/password
// @desc        Update password 
// @access      Private
route.put("/password", [auth, 
    check("oldPassword", "Old password is required").not().isEmpty(),
    check("newPassword", "New password is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
    
        const {oldPassword, newPassword} = req.body;
    try {
        let user = await User.findById(req.user.id);
        if (!user){
            return res.status(400).json({errors : [{msg : "User not found"}]});
        }

        const verify = await bcrypt.compare(oldPassword, user.password);

        if (!verify){
            return res.status(400).json({errror: [{msg: "Incorrect old password"}]});
        }
        const salt = await bcrypt.genSalt(config.get("salt"));
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})


// @route       POST api/user/forget
// @desc        Reset password (send reset password link)
// @access      Public
route.post("/user/forget",[
    check("email", "Email is required").not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {email} = req.body;
    

        try {
           console.log(email);
            let user = await User.findOne({email}).select("-password");
            if (!user){//if email is not exist in the database
                return res.status(400).json({errors: [{ msg: 'Email is not exist' }] })
            }
    
            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                user: 'sokthaitang@gmail.com',
                pass: config.get("google2stepPassword")// this is google 2stepfactore password, follow all instruction. when select app, choose "other/Custom name" and type "http://localhsot:1000" because we work on localhost and click generate
                }
            });
    
            let link = `http://localhost:2000/resetpassword/${user._id}`;
            
            let mailOptions = {
                from: 'sokthaitang@gmail.com',
                to: email,
                subject: '<PP Expense> Reset password',
                text: 'Reset your password',
                html: `<p>Please click the link below to reset password</p><br/><p>${link}</p>`
            };
         
    
            await transporter.sendMail(mailOptions);
    
            let expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 1);
    
            const reset = new Password({
                user: user._id,
                expireDate: expireDate,
                valid: true
            });
            await reset.save();
            res.status(200).json({ errors: [{ msg: `Please check your email to reset password` }] })
          } catch (error) {
            console.error(error.message);
            res.status(500).json({ errors: [{ msg: 'Server Error' }] });
          }
          
})


module.exports = route;