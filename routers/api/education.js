const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");

// @route       CREATE /api/proifle/education/
// @desc        Create education for current profile (Tested)
// @access      Private
route.post("/", [auth,
    check("school", "School is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    check("major", "major is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {school, status, major, from, degree, to, current, description} = req.body;

        const education = {}
        education.school = school;
        education.status = status;
        education.major = major;
        education.from = from;
        if (degree) education.degree = degree;
        if (to) education.to = to;
        if (current) education.current = current;
        if (description) education.description = description;


        try {
            const profile = await Profile.findOne({user: req.user.id}).populate("usre", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
            profile.education.unshift(education);
            await profile.save();
            res.status(200).json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({errors: [{msg: "Server Error"}]});
        }
})


// @route       UPDATE /api/proifle/education/:id
// @desc        Update education for current profile (Tested)
// @access      Private
route.post("/:id", [auth,
    check("school", "School is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    check("major", "major is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {school, status, major, from, degree, to, current, description} = req.body;
     

        try {
            const profile = await Profile.findOne({user: req.user.id}).populate("usre", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
            const index = profile.education.map(edu => edu._id).indexOf(req.params.id);
            if (index < 0){
                return res.status(400).json({errors: [{msg: "Education not found"}]})
            }
            profile.education[index].school = school;
            profile.education[index].status = status;
            profile.education[index].major = major;
            profile.education[index].from = from;
            profile.education[index].degree = degree;
            profile.education[index].to = to;
            profile.education[index].current = current;
            profile.education[index].description = description;
            await profile.save();
            res.status(200).json(profile);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({errors: [{msg: "Server Error"}]});
        }
})

// @route       DELETE /api/proifle/education/:id
// @desc        Delete education for current profile (Tested)
// @access      Private
route.delete("/:id", auth, async (req, res) => {
  
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        const index = profile.education.map(edu => edu._id).indexOf(req.params.id);
        if (index < 0){
            return res.status(400).json({errors: [{msg: "Education not found"}]})
        }
        profile.education.splice(index, 1);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})

module.exports = route;