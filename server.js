var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var path = require("path");

var app = express();

var port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static("./public"));
app.use("/public", express.static("public"))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Mongoose


// //const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
// //Mongoose

app.listen(port, function() {
    console.log(`Listening on port ${port}`)
})

require("./routes/api.js")(app);
//require("./routes/html.js")(app);



