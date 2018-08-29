const cheerio = require('cheerio');
const request = require("request");


var onionTwo

request.get("http://theonion.com", (error, response, body) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);
    }
});


var path = require("path");
var fs = require("fs");

module.exports = function(app) {
    app.get("/scrape", function (req, res) {
        // fs.writeFile(path.resolve("./assets/test.js"), JSON.stringify(onionTwo), (err) => { //removed stringify from list
        //     if (err) console.log(err);
        // })
    })

    app.post("/api/articles/save", function (req, res) {

    })
    
    app.put("/api/articles/:id", function (req, res) {
    
    })
    
    app.get("/api/artiles/:id", function (req, res) {
    
    })
    
    app.delete("/api/articles/:id", function (req, res) {
    
    })

}
    