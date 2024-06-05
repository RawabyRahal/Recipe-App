const consts = require('../consts');
const { faker } = require('@faker-js/faker');
const axios = require('axios');

const areaToCountryMapping = consts.AREA_TO_COUNTRY_MAPPING
const countryCodes = consts.COUNTRY_CODES

const favoriteRecipes = {}

function addFavRecipe(id) {
    favoriteRecipes[id] = true
}

function getFavRecipe() {

    const promises = []
    let favRecipesTitle
    let favRecipes
    // Object.keys => list of keys as a list
    for (let fav of Object.keys(favoriteRecipes)) {
        promises.push(axios.get(`https://recipes-goodness-elevation.herokuapp.com/recipes/id/${fav}`)
            .then(function (response) {

                // data => recipe obj
                favRecipes = response.data
                favRecipesTitle = response.data.title
                console.log(favRecipesTitle)

                return response.data
            })
        )
    }
    const giphyPromise = axios.get(`https://api.giphy.com/v1/gifs/search?api_key=ajZFNBnAjLpEAIaJkhqVhTwdqPDPDELc&q=${favRecipesTitle}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
    console.log(favRecipesTitle)

    console.log("**************************************************")

    // for each ID request it returns one recipe => one Promise
    return Promise.all(promises.concat(giphyPromise)).then(function (response) {

        // let recipes = response.data.results
        // console.log(response)
        let recipes = response.slice(0, -1)
        let gif = response.pop()

        return createRecipes(recipes, gif)
    })
}

function deleteFavRecipe(id) {
    delete favoriteRecipes[id]
}

const filterData = (recipes, filteredIngredients) => {
    return recipes.filter(recipe => !recipe.ingredients
        .find(ingredient => filteredIngredients.includes(ingredient)))
}

const filterRecipesByCategory = (recipes, categories) => {
    return recipes.filter(recipe => categories.includes(recipe.strCategory));
}

const filterRecipesByIngredinets = (recipes, ingredients) => {
    console.log(ingredients)
    for (let i = 0; i < ingredients.length; i++) {
        recipes = recipes.filter(recipe => recipe.ingredients.includes(ingredients[i]))
    }
    return recipes
}

// const createRecipes = (data, gif) => {

//     const dataMap = data.map(item => ({
//         idMeal: item.idMeal,
//         ingredients: item.ingredients,
//         title: item.title,
//         // thumbnail: item.thumbnail,
//         gif: gif.data.data[7].embed_url,
//         href: item.href,
//         category: item.strCategory,
//         area: areaToCountryMapping[item.strArea.toLowerCase()],
//         countryCode: countryCodes[item.strArea.toLowerCase()],
//         chefName: faker.name.firstName() + " " + faker.name.lastName(),
//         rating: faker.number.int({ min: 1, max: 5 }),
//         instruction: item.strInstructions,
//         favorite: favoriteRecipes[item.idMeal] !== undefined
//     }));

//     return dataMap
// }

const createRecipes = (data, gif) => {
    const dataMap = data.map(item => ({
        idMeal: item.idMeal,
        ingredients: [
            item.strIngredient1,
            item.strIngredient2,
            item.strIngredient3,
            item.strIngredient4,
            item.strIngredient5,
            item.strIngredient6,
            item.strIngredient7,
            item.strIngredient8,
            item.strIngredient9,
            item.strIngredient10,
            item.strIngredient11,
            item.strIngredient12,
            item.strIngredient13,
            item.strIngredient14,
            item.strIngredient15,
            item.strIngredient16,
            item.strIngredient17,
            item.strIngredient18,
            item.strIngredient19,
            item.strIngredient20
        ].filter(ingredient => ingredient !== null && ingredient !== ''),
        title: item.strMeal,
        gif: gif.data.data[7].embed_url,
        category: item.strCategory,
        area: areaToCountryMapping[item.strArea.toLowerCase()],
        countryCode: countryCodes[item.strArea.toLowerCase()],
        chefName: faker.name.firstName() + " " + faker.name.lastName(),
        rating: faker.datatype.number({ min: 1, max: 5 }),
        instruction: item.strInstructions,
        href: item.strYoutube,
        favorite: favoriteRecipes[item.idMeal] !== undefined
    }));

    return dataMap;
}

module.exports = {
    createRecipes,
    filterData,
    filterRecipesByCategory,
    filterRecipesByIngredinets,
    addFavRecipe,
    getFavRecipe,
    deleteFavRecipe
}