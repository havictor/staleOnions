const cheerio = require('cheerio');
const request = require("request");
const mongoose = require('mongoose');

//const MONGODB_URI = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines");

const db = require("../models");
var Article = require("../models/article");

let links = [];
let titles = [];
let summaries = [];
let articles = [];

module.exports = function(app) {
    app.get("/scrape", function (req, res) {
        request.get("http://theonion.com", (error, response, body) => {
            if (!error && response.statusCode == 200) {
                // let articles = [];

                const $ = cheerio.load(body);
        
                const heading = $(".js_entry-title")
        
                heading.each( (index, value) => {
                    var title = $(value).text();
                    titles.push(title);
                })
                // console.log(titles) //titles
        
                const url = $(".js_entry-title").children();
        
                url.each( (index, value) => {
                    var link = $(value).attr('href');
                    links.push(link);
                })
                // console.log(links) //links
        
                const excerpt = $(".excerpt")
                
                excerpt.each( (index, value) => {
                    var summary =  $(value).children().text()
                    summaries.push(summary)
                });
                // console.log(summaries) // summary
        
                // console.log(links.length);
                // console.log(titles.length);
                // console.log(summaries.length);
        
                for (i = 0; i < 19; i++) {
                    var article = {
                        title: titles[i],
                        link: links[i],
                        summary: summaries[i],
                        //comment: ""
                    }
                    articles.push(article);
                }
                res.send(articles)
            }
        });
    })

    app.post("/api/articles/save/", function (req, res) { //is id necessary?
        const MONGODB_URI = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines");

        var article = new Article(req.body)
        db.Article.create(req.body)
        .then(function(article) {
          console.log(article);
        })
        .catch(function(err) {
          return res.json(err);
        });
    })
    
    app.put("/api/articles/:id", function (req, res) { //add comments
    
    })
    
    app.get("/api/articles/:id", function (req, res) { //retrieve article/comments
    
    })
    
    app.delete("/api/articles/:id", function (req, res) { //delete saving article & comments
    
    })

    //html
    app.get("/articles", function (req, res) {
        //code to pull from db

        res.render("articles", {})
    })

    app.get("/*", function (req, res) {
        res.render("home", {
            newlyScrapedArticles: articles
        })
    })
}
