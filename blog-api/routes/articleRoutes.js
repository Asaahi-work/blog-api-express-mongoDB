const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const Article = require('models/arcticleModel')
const { isAuth } = require('../utils')
const articleRouter = express.Router()

//get all articles
articleRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    const data = await Article.find({})
    res.status(200).send(data)
}))

//create article
articleRouter.post('/new', isAuth, expressAsyncHandler(async (req, res) => {
    const {title, category} = req.body

    if(title.length > 200) {
        res.status(401).send({message: 'max 200chrs.'})
    }

    if(category.length > 100) {
        res.status(401).send({message: 'max 200chrs.'})
    }

    const article = new Article({
        title: req.body.title,
        category: req.body.category,
        user: req.user._id,
        date: req.body.date,
        text: req.body.text,
        likesCount: req.body.likesCount
    })

    const createdArticle = await article.save()

    res.status(201).send({
       article: createdArticle
    })
}))

//update article
articleRouter.put('/update/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id)

    if(article) {
        article.title = req.body.title,
        article.category = req.body.category,
        article.text = req.body.text

        const updatedArticle = await article.save()
        res.send({message: 'Article has been updated.', article: updatedArticle})
    } else {
        res.status(404).send({message: 'Article not found.'})
    }
}))

//delete article
articleRouter.delete('/delete/:id', isAuth, expressAsyncHandler(async (req, res) => {
    const article = await Article.findById(req.params.id)

    if(article) {
        const deletedArticle = await article.remove()
        res.send({message: 'Article has been deleted', article: deletedArticle})
    } else {
        res.status(404).send({message: 'Article not found.'})
    }

}))

module.exports = articleRouter