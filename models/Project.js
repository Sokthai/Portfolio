const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course"
    },
    project: [{
        name: {
            type: String,
            required: true
        },
        course: {
            type: String,
        },
        code: {
            type: String
        },
        icon: {
            type: String
        },
        time: {
            type: Date
        },
        description: {
            type: String
        },
        date: {
            type: Date,
            default: new Date
        }
    }]
    
})

module.exports = Project = mongoose.model("project", ProjectSchema);


