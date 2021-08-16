const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, required: true},
    text: {type: String, required: true},
    likesCount: {type: Number, required: true},
}, {
    timestamps: true,
})

const Article = mongoose.model('article', articleSchema)

module.exports = Article