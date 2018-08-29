module.exports = function(app) {
        
    app.get("/", function (req, res) {
        res.render("index", {})
    })

    app.get("/articles", function (req, res) {
        res.render("articles", {})
    })
}

//.js_entry-link .text(); = headline
//.js_entry-link = link
//.childOf(.long-excerpt) = summary
