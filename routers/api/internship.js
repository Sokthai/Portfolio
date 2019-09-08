const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");


// @route       CREATE /api/proifle/internship/
// @desc        Create internship for current profile 
// @access      Private
route.post("/", [auth,
    check("company", "company is required").not().isEmpty(),
    check("title", "title is required").not().isEmpty(),
    check("status", "status is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {company, title, location, from, to, status, current, description, logo} = req.body;
       
        const internship = {}
        
        internship.company = company;
        
        internship.title = title;
        internship.status = status;
        internship.from = from;
        internship.logo = logo;
        if (location) internship.location = location;
        if (to) internship.to = to;
        if (current) internship.current = current;
        if (description) internship.description = description;

        
        try {
            
            const profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
            console.log("internship");
            profile.internship.unshift(internship);
            await profile.save();
            res.status(200).json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({errors: [{msg: "Server Error"}]});
        }
})


// @route       UPDATE /api/proifle/internship/:id
// @desc        Update internship for current profile 
// @access      Private
route.post("/:id", [auth,
    check("company", "company is required").not().isEmpty(),
    check("title", "title is required").not().isEmpty(),
    check("status", "status is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {company, title, location, from, to, status, current, description, logo} = req.body;



        try {
            const profile = await Profile.findOne({user: req.user.id}).populate("usre", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
            const index = profile.internship.map(intern => intern._id).indexOf(req.params.id);
            
            profile.internship[index].company = company;
            profile.internship[index].title = title;
            profile.internship[index].status = status;
            profile.internship[index].from = from;
            profile.internship[index].location = location;
            profile.internship[index].to = to;
            profile.internship[index].current = current;
            profile.internship[index].logo = logo;
            profile.internship[index].description = description;
            await profile.save();
            res.status(200).json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({errors: [{msg: "Server Error"}]});
        }
})



// @route       DELETE /api/proifle/internship/:id
// @desc        Delete internship for current profile (Tested)
// @access      Private
route.delete("/:id", auth, async (req, res) => {
  
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        const index = profile.internship.map(intern => intern._id).indexOf(req.params.id);
        if (index < 0){
            return res.status(400).json({errors: [{msg: "Education not found"}]})
        }
        profile.internship.splice(index, 1);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})

module.exports = route;