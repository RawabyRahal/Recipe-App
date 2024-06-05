
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const recipesAPI = require('./routes/recipesAPI')
const favoriteRecipesAPI = require('./routes/favAPI')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.use('/recipes', recipesAPI)
app.use('/', favoriteRecipesAPI)


const port = 8585
app.listen(port, function () {
    console.log(`Server running on port: ${port}`)
})