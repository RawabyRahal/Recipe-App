// TODO - consts for backend
// like array

// const RECIPE_API = `https://recipes-goodness-elevation.herokuapp.com/recipes/ingredient/`
const RECIPE_API = `https://www.themealdb.com/api/json/v1/1/search.php?s=`

const DAIRY_INGREDIENTS = [
    "Cream", "Cheese", "Milk", "Butter", "Creme", "Ricotta", "Mozzarella", "Custard", "Cream Cheese"
]
const GLUTEN_FREE_INGREDIENTS = [
    "Flour", "Bread", "spaghetti", "Biscuits", "Beer"
]

const AREA_TO_COUNTRY_MAPPING = {
    'italian': 'Italy',
    'jamaican': 'Jamaica',
    'french': 'France',
    'british': 'United Kingdom',
    'american': 'United States',
    'thai': 'Thailand',
    'irish': 'Ireland',
    'chinese': 'China',
    'mexican': 'Mexico',
    'canadian': 'Canada',
    'indian': 'India',
};

const COUNTRY_CODES = {
    'italian': 'it',
    'jamaican': 'jm',
    'french': 'fr',
    'british': 'gb',
    'american': 'us',
    'thai': 'th',
    'irish': 'ie',
    'chinese': 'cn',
    'mexican': 'mx',
    'canadian': 'ca',
    'indian': 'in',
};

const categories = [
    "Vegetarian", "Chicken", "Miscellaneous", "Beef", "Seafood", "Pork", "Dessert"
]

module.exports.DAIRY_INGREDIENTS = DAIRY_INGREDIENTS
module.exports.GLUTEN_FREE_INGREDIENTS = GLUTEN_FREE_INGREDIENTS
module.exports.AREA_TO_COUNTRY_MAPPING = AREA_TO_COUNTRY_MAPPING
module.exports.COUNTRY_CODES = COUNTRY_CODES
module.exports.RECIPE_API = RECIPE_API
module.exports.categories = categories