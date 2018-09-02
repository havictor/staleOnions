var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var commentSchema = new Schema({
  title: String,
  body: String
});

var Comments = mongoose.model("note", commentSchema);

module.exports = Comments;
