// import
const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articleRoutes')
const userRouter = require('./routes/userRoutes')

//app config
const app = express()
const port = 8000

app.use(express.json())

const connectionUrl = 'mongodb://localhost/blog1'

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

// routes
app.get('/', (req, res) => {
    res.status(200).send('Endoint works.')
})

app.use('/api/user/', userRouter)
app.use('/api/article/', articleRouter)

//middlewares
app.use((err, req, res, next) => {
    res.status(500).send({message: err.message})
})

//listener
app.listen(port, () => console.log(`Server has been started on port ${port}...`))