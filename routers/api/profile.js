const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @router  POST api/profile/
// @desc    Get all profile from current user (Tested)
// @access  Private
route.post("/", [auth,
    check("status", "Status is required").not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const {
        company,
        title,
        location,
        status,
        bio,
        githubusername,
        speakingLanguage,
        programmingLanguage,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
        other
    } = req.body;

    const profile = {};
    profile.user = req.user.id;
    if (company) profile.company = company;
    if (title) profile.title = title;
    if (location) profile.location = location;
    if (status) profile.status = status;
    if (bio) profile.bio = bio;
    if (githubusername) profile.githubusername = githubusername;

    const skills = {}
    if (speakingLanguage) {
        skills.speakingLanguage = speakingLanguage.split(",").map(skill => skill.trim());
    }
    if (programmingLanguage) {
        skills.programmingLanguage = programmingLanguage.split(",").map(skill => skill.trim());
    }
    profile.skills = skills;

    const social = {};
    if (facebook) social.facebook = facebook;
    if (youtube) social.youtube = youtube;
    if (twitter) social.twitter = twitter;
    if (linkedin) social.linkedin = linkedin;
    if (instagram) social.youtube = instagram;
    if (other) social.other = other;
    profile.social = social;

    try {

        let existProfile = await Profile.findOne({user: req.user.id});
        if (existProfile){
            existProfile = await Profile.findOneAndUpdate({user: req.user.id}, {$set: profile}, {new: true});
            console.log("profile updated");
            return res.status(200).json(profile);
        }
        const newProfile = new Profile(profile);
        await newProfile.save();
        console.log("profile created");
        res.status(200).json(newProfile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})


// @route       GET /api/proifle
// @desc        Get current user profile (Tested)
// @access      Private
route.get("/", auth, async (req, res) => {
    console.log(req.user.id);
    try {
        
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);    
        if (!profile){
            return res.status(400).json({errors : [{msg: "Profile not found"}]});
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})


// @route       GET /api/proifle
// @desc        Get all profiles (Tested)
// @access      Public
route.get("/all", async (req, res) => {
    try {
        const profile = await Profile.find().populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);    
        if (!profile){
            return res.status(400).json({msg: "Profile not found"});
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})


// @route       GET /api/proifle/user/:id
// @desc        Get profile by user id  (Tested)
// @access      Public
route.get("/user/:id", async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);    
        if (!profile){
            return res.status(400).json({errors : [{msg: "Profile not found"}]});
        }
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})

// @route       DELETE /api/proifle
// @desc        Get current profile (Tested)
// @access      Private
route.delete("/", auth, async (req, res) => {
    try {
        await Profile.findOneAndRemove({user: req.user.id});
        await User.findByIdAndRemove(req.user.id);
        res.status(200).json({msg: "User Deleted"})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})









module.exports = route;