const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    id: Schema.ObjectId,
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    summary: {
        type: String,
    },
    comment: {
        type: String
    }   
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article