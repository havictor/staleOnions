const mongoose = require("mongoose");
const MONGODB_URI = mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines");


module.exports = {
  

  Article: require("./article"),
  Comment: require("./comment")
  };
  