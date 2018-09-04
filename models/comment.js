var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  title: String,
  body: String
});

var Comments = mongoose.model("Note", CommentSchema);

module.exports = Comments;
