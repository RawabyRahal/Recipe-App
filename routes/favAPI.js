const express = require('express')
const router = express.Router()

const {
    addFavRecipe,
    getFavRecipe,
    deleteFavRecipe
} = require('./recipes')


router.post("/favorite/:mealId", (req, res) => {
    let id = req.params.mealId
    addFavRecipe(id)
    res.end()
})
router.delete("/favorite/:mealId", (req, res) => {
    let id = req.params.mealId
    deleteFavRecipe(id)
    res.end()
})

router.get("/favorite", (req, res) => {
    getFavRecipe().then(recipes => res.send(recipes))
})

module.exports = router