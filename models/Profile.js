const mongoose = require("mongoose");
const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    company: {
        type: String,
    },
    title: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    githubusernam: {
        type: String
    },
    skills: {
        speakingLanguage : {
            type:[String],
            required: true
        },
        programmingLanguage : {
            type: [String],
            required: true
        }
    },
    education: [
        {
            school: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true
            },
            degree: {
                type: String
            },
            major: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            grade: {
                type: String
            },
            description: {
                type: String
            }
        }
    ],
    experience: [
        {
            company: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true
            }, 
            to: {
                type: Date
            },
            status : {
                type: String,
                required: true
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    internship: [{
        company: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        location: {
            type: String,
        },
        from: {
            type: Date,
            required: true
        }, 
        to: {
            type: Date
        },
        status : {
            type: String,
            required: true
        },
        current: {
            type: Boolean,
            default: false
        },
        description: {
            type: String
        },
        logo: {
            type: String
        }
        
    }],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        other: {
            type: String
        }
    },
    course: [{
        name: {
            type: String,
            required: true
        },
        school: {
            type: String
        },
        term: {
            type: String
        },
        instructor: {
            type: String
        },
        courseId: {
            type: String
        },
        from: {
            type: String,
            required: true
        },
        to: {
            type: String
        },
        grade: {
            type: String
        },
        icon: {
            type: String
        },
        description: {
            type: String
        },
        date: {
            type: Date, 
            default: new Date
        }
    }],
    date: {
        type: Date,
        default: new Date
    }

})

module.exports = Profile = mongoose.model("profile", ProfileSchema);
