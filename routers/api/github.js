const express = require("express");
const route = express.Router();
const request = require("request");
// const auth = require("../../middleware/auth");
const config = require("config");

// @route    GET api/profile/github/:username
// @desc     Get github account
// @access   Private
route.get("/:username",  async (req, res) =>{
    try {
        const options = {
            uri: `https://api.github.com/users/${
              req.params.username
            }/repos?per_page=50&sort=created:asc&client_id=${config.get(
              'githubClientId'
            )}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
          }; 
          
          request(options, (error, response, body) => {
            if (error) console.error(error);
      
            if (response.statusCode !== 200) {
              return res.status(404).json({ msg: 'No Github profile found' });
            }
      
            res.json(JSON.parse(body));
        });
    } catch (error) {
        console.error(error.message);
        if (error.kind == "ObjectId"){
            return res.status(400).json({ msg: 'github not found server error' });
        }
        res.status(500).json({errors: [{msg: "Server Error"}]});
    }
})




module.exports = route;