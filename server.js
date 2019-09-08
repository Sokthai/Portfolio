const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");



connectDB();
app.use(express.json({extended: false}));


app.use("/api/users", require("./routers/api/users"));
app.use("/api/login", require("./routers/api/login"));
app.use("/api/profile", require("./routers/api/profile"));
app.use("/api/profile/course", require("./routers/api/course"));
app.use("/api/profile/internship", require("./routers/api/internship"));
app.use("/api/profile/experience", require("./routers/api/experience"));
app.use("/api/profile/education", require("./routers/api/education"));
app.use("/api/profile/project", require("./routers/api/project"));
app.use("/api/profile/github", require("./routers/api/github"));


//set static for production
if (process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



const PORT = process.env.PORT || 2000;
app.listen(PORT, (req, res, error) => console.log(`server start on port ${PORT}`))