const cheerio = require('cheerio');
const request = require("request");


let onionTwo
var links = []

request.get("http://theonion.com", (error, response, body) => {
    if (!error && response.statusCode == 200) {
        const $ = cheerio.load(body);

        const heading = $(".js_entry-link")

        // console.log(heading.text()) //title

        // console.log(heading)
        // fs.writeFile(path.resolve("./assets/test.js"), heading, (err) => { //removed stringify from list
        //     if (err) console.log(err);
        // })

        const url = $(".js_entry-title").children();

        url.each( (index, value) => {
            var link = $(value).attr('href'); //link 
            links.push({"links": link});
        })
        console.log(links)

        // const excerpt = $(".long-excerpt")
        // console.log(excerpt.children().text()) // summary
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

//.js_entry-link .text(); = headline
//.js_entry-link = link
//.childOf(.long-excerpt) = summary || .childOf(.excerpt)