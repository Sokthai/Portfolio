const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");



// @router  POST api/profile/course
// @desc    Create course for current user  (Tested)
// @access  Private
route.post("/", [auth,
    check("name", "name is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { name, school, term, from, to, grade, icon, description, instructor, courseId } = req.body;

    const course = {};
    course.name = name;
    course.from = from;
    if (school) course.school = school;
    if (term) course.term = term;
    if (to) course.to = to;
    if (grade) course.grade = grade;
    if (icon) course.icon = icon;
    if (description) course.description = description;
    if (instructor) course.instructor = instructor;
    if (courseId) course.courseId = courseId;

  
    try {
        let profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        profile.course.unshift(course);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})


// @router  POST api/profile/course/:id
// @desc    Update course for current user  (Tested)
// @access  Private
route.post("/:id", [auth,
    check("name", "name is required").not().isEmpty(),
    check("from", "From date is required").not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }
    const { name, school, term, from, to, grade, icon, description, instructor, courseId } = req.body;

    const course = {};
    course.name = name;
    course.from = from;
    if (school) course.school = school;
    if (term) course.term = term;
    if (to) course.to = to;
    if (grade) course.grade = grade;
    if (icon) course.icon = icon;
    if (description) course.description = description;
    if (instructor) course.instructor = instructor;
    if (courseId) course.courseId = courseId;

  
    try {
        let profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        const index = profile.course.map(cs => cs._id).indexOf(req.params.id);

        profile.course[index].name = name;
        profile.course[index].from = from;
        profile.course[index].school = school;
        profile.course[index].term = term;
        profile.course[index].grade = grade;
        profile.course[index].to = to;
        profile.course[index].icon = icon;
        profile.course[index].description = description;
        profile.course[index].instructor = instructor;
        profile.course[index].courseId = courseId;

        await profile.save();
        res.status(200).json(profile);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})



// @route       DELETE /api/proifle/course/:id
// @desc        Delete course for current profile (Tested)
// @access      Private
route.delete("/:id", auth, async (req, res) => {
  
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        const index = profile.course.map(intern => intern._id).indexOf(req.params.id);
        if (index < 0){
            return res.status(400).json({errors: [{msg: "Education not found"}]})
        }
        profile.course.splice(index, 1);
        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})





module.exports = route;