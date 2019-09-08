const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");



// @route       POST /api/proifle/experience
// @desc        Create / Update experience for current profile (Tested)
// @access      Private
route.post("/", [auth,
    check("company", "Company is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
    const {company, title, location, from, to, status, current, description} = req.body;

    const experience = {}
    experience.company = company;
    experience.title = title;
    experience.from = from;
    experience.status = status;
    if (location) experience.location = location;
    if (to) experience.to = to;
    if (current) experience.current = current;
    if (description) experience.description = description;
    
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        profile.experience.unshift(experience);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})


// @route       POST /api/proifle/experience/:id
// @desc        Update experience for current profile (Tested)
// @access      Private
route.post("/:id", [auth,
    check("company", "Company is required").not().isEmpty(),
    check("title", "Title is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
    const {company, title, location, from, to, status, current, description} = req.body;

    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        const index = profile.experience.map(exp => exp._id).indexOf(req.params.id);
        if (index < 0){
            return res.status(400).json({errors: [{msg: "Experience not found"}]})
        }
        profile.experience[index].company = company;
        profile.experience[index].title = title;
        profile.experience[index].location = location;
        profile.experience[index].from = from;
        profile.experience[index].to = to;
        profile.experience[index].status = status;
        profile.experience[index].current = current;
        profile.experience[index].description = description;
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})

// @route       DELETE /api/proifle/experience/:id
// @desc        Delete experience for current profile (Tested)
// @access      Private
route.delete("/:id", auth, async (req, res) => {
  
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        const index = profile.experience.map(exp => exp._id).indexOf(req.params.id);
        if (index < 0){
            return res.status(400).json({errors: [{msg: "Experience not found"}]})
        }
        profile.experience.splice(index, 1);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})





module.exports = route;