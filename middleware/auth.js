const jwt = require("jsonwebtoken");
const config = require("config");


const auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token){
        return res.status(401).json({errors: [{msg: "No token"}]});
    }

    try {
        jwt.verify(token, config.get("secret"), (err, decode) => {
            if (err) throw err;
            req.user = decode.user;
            next();
        })
    } catch (error) {
        console.error(error.message);
        res.status(401).json({errors : [{msg: "Token not valid"}]})
    }

}

module.exports = auth;