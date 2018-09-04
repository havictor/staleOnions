const cheerio = require('cheerio');
const request = require("request");
const mongoose = require("mongoose");

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
        
                for (i = 0; i < 19; i++) {
                    var article = {
                        title: titles[i],
                        link: links[i],
                        summary: summaries[i],
                    }
                    articles.push(article);
                }
                res.send(true)
            }
        });
    })

    app.post("/api/articles/save/", function (req, res) {
        Article.create(req.body)
        .then(function(article) {
          console.log(article);
        })
        .catch(function(err) {
          return res.json(err);
        });
    })
    
    app.put("/api/articles/comments/:id", function (req, res) { //add comments
        mongoose.model("Article").update({_id: req.params.id}, {"comment": req.body.comment}, function(error) {
            res.send(true);
        })
    })
    
    app.get("/api/articles/comments/:id", function (req, res) { //retrieve article/comments
        mongoose.model("Article").find({_id: req.params.id}, function (err, article) {
            res.send(article)
        });
    })
    
    app.delete("/api/articles/:id", function (req, res) { //delete saving article & comments
        mongoose.model("Article").remove({_id: req.params.id}, function(err, article) {
            if (err) {
                res.send(err)
            }
            res.send(true)
        })
    })

    //html
    app.get("/articles", function (req, res) {
        mongoose.model("Article").find(function (err, articles) {
            res.render("articles", {
                savedArticle: articles
            })
        })
    })

    app.get("/*", function (req, res) {
        res.render("home", {
            newlyScrapedArticles: articles
        })
    })
}
