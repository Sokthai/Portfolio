const express = require("express");
const route = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const Project = require("../../models/Project");

// @route       CREATE /api/proifle/project/
// @desc        Create project for current profile 
// @access      Private
route.post("/", [auth,
    check("name", "company is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {name, course, code, icon, time, description} = req.body;

        const project = {}
        project.user = req.user.id;
        project.course = null;


        const newProject = {};
        newProject.name = name;
        if (course) newProject.course = course;
        if (code) newProject.code = code;
        if (icon) newProject.icon = icon;
        if (time) newProject.time = time;
        if (description) newProject.description = description;

        project.project = [newProject]

        
        try {
            let existProject = await Project.findOne({user: req.user.id, course: null});
            // if (existProject) {
            //     existProject = await Project.findOneAndUpdate({user: req.user.id}, {$set: project}, {new: true});
            //     console.log("project updated")
            //     return res.status(200).json(existProject);
            // }

            if (existProject){
                existProject.project.unshift(newProject);
                await existProject.save();
                return res.status(200).json(existProject);
            }
            existProject = new Project(project);
            await existProject.save();
            
            console.log("project created")
            res.status(200).json(newProject);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({errors: [{msg: "Server Error"}]});
        }
})


// @route       CREATE /api/proifle/project/:id
// @desc        Create project for current profile by courseId (Tested)
// @access      Private
route.post("/:id", [auth,
    check("name", "company is required").not().isEmpty(),
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {name, course, code, icon, time, description} = req.body;

        const project = {}
        project.user = req.user.id;
        project.course = req.params.id;


        const newProject = {};
        newProject.name = name;
        if (course) newProject.course = course;
        if (code) newProject.code = code;
        if (icon) newProject.icon = icon;
        if (time) newProject.time = time;
        if (description) newProject.description = description;

        project.project = [newProject]

        
        try {
            let existProject = await Project.findOne({user: req.user.id, course: req.params.id});
            
            if (existProject){
                existProject.project.unshift(newProject);
                await existProject.save();
                return res.status(200).json(existProject);
            }

            existProject = new Project(project);
            await existProject.save();
            res.status(200).json(existProject);
        } catch (error) {
            console.error(error.message);
            res.status(500).json({errors: [{msg: "Server Error"}]});
        }
})



// @route       GET /api/proifle/project
// @desc        Get all projects from current user
// @access      Public
route.get("/", auth, async (req, res) => {
    console.log(req.user.id);
    try {
        let projects = await Project.find({user: req.user.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        if (!projects){
            return res.status(400).json({ errors: [{msg: "Project not found"}] });
        }
        res.status(200).json(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})




// @route       GET /api/proifle/project
// @desc        Get all projects from all users
// @access      Public
route.get("/all", async (req, res) => {
    try {
        let projects = await Project.find().populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        if (!projects){
            return res.status(400).json({ errors: [{msg: "Project not found"}] });
        }
        res.status(200).json(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})


// @route       GET /api/proifle/project/:id
// @desc        Get all projects for a user 
// @access      Private
route.get("/:id", auth, async (req, res) => {
    try {
        let projects = await Project.find({user: req.params.id}).populate("user", ["firstname", "lastname", "phone", "nationality","email",  "avatar"]);
        if (!projects){
            return res.status(400).json({ errors: [{msg: "Project not found"}] });
        }
        res.status(200).json(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})


// @route       DELETE /api/proifle/project/:id
// @desc        Delete all projects belong to a course by course id and current user
// @access      Private
route.delete("/:id", auth, async (req, res) => {
    try {
        let projects = await Project.findOneAndRemove({user: req.user.id, course: req.params.id});
        if (!projects){
            return res.status(400).json({ errors: [{msg: "Project not found"}] });
        }
        res.status(200).json({msg: "Projects deleted"});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})

// @route       DELETE /api/proifle/project/:id
// @desc        Delete all for a user by user id
// @access      Private
route.delete("/", auth, async (req, res) => {
    try {
        let projects = await Project.remove({user: req.user.id});
        if (!projects){
            return res.status(400).json({ errors: [{msg: "Project not found"}] });
        }
        res.status(200).json({msg: `${projects.deletedCount} Projects deleted`});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})


// @route       PUT /api/proifle/project/
// @desc        Update project for current profile by courseID and projectId
// @access      Private
route.put("/:courseId/:projectId", [auth,
    check("name", "company is required").not().isEmpty(),
    ], async (req, res) => {
        updateProject(req.body, req, res);
})



// @route       PUT /api/proifle/project/
// @desc        Update project for current profile by projectId
// @access      Private
route.put("/:projectId", [auth,
    check("name", "company is required").not().isEmpty(),
    ], async (req, res) => {
       
        updateProject(req.body, req, res);
})


const updateProject = async (object, req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, course, code, icon, time, description} = object;

   
    const courseId = (req.params.courseId)? req.params.courseId : null;
    const newProject = {};
    newProject.name = name;
    if (course) newProject.course = course;
    if (code) newProject.code = code;
    if (icon) newProject.icon = icon;
    if (time) newProject.time = time;
    if (description) newProject.description = description;
    
    try {
        let existProject = await Project.findOne({user: req.user.id, course: courseId});
        if (!existProject){
            return res.status(400).json({errors : [{msg: "course not found"}]})
        }
        const index = existProject.project.map(project => project._id).indexOf(req.params.projectId);
        if (index < 0){
            return res.status(400).json({errors : [{msg: "Project not found"}]})

        }
        existProject.project[index] = newProject;
        await existProject.save();
        
        console.log("project updated")
        res.status(200).json(newProject);
    } catch (error) {
        console.error(error.message);
        if (error.kind == "ObjectId"){
            return res.status(400).json({ msg: 'Profile not found server error' });
        }
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
}


module.exports = route;