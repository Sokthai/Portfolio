const express = require("express");
const app = express();
const connectDB = require("./config/db");



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

const PORT = process.env.PORT || 2000;
app.listen(PORT, (req, res, error) => {
    console.log(`Server start on port localhost:${PORT}`)
})