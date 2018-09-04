const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();

const port = process.env.PORT || 3030;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static("public"))

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(port, function() {
    console.log(`Listening on port ${port}`)
})

require("./routes/api.js")(app);
