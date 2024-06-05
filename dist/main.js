const apiManager = new APIManager()
const render = new Renderer()

let currentPage = ""
let page = 1
const multiInput = document.querySelector('multi-input');
let searchedIngredients

const getRecipes = (ingredients = []) => {
    const ingredient = ingredients.length ? ingredients[0] : SEARCHED_INGREDIENT.val()
    const gluten = IS_GLUTEN_FREE.prop(CHECKED);
    const dairy = IS_DAIRY_FREE.prop(CHECKED);

    apiManager.getAllData(ingredient, page, gluten, dairy, getCheckedCategories(), ingredients.slice(1)).then(function (data) {
        render.renderRecipes(data.recipes)
        updatePaginationButtons(data.totalPages);

    }).catch(function (error) {
        console.error(error.responseJSON.error)
        render.renderError()
    })
}

$(NEXT_BTN).on("click", function () {
    currentPage = "search"
    page++
    getRecipes(searchedIngredients)
    updatePaginationButtons()
})

$(PREV_BTN).on("click", function () {
    currentPage = "search"
    if (page > 1) {
        page--
        getRecipes(searchedIngredients)
        updatePaginationButtons()
    }
})
function updatePaginationButtons(totalPages) {
    const minPages = 1

    $(NEXT_BTN).prop("disabled", page >= totalPages);
    $(PREV_BTN).prop("disabled", page <= minPages);
}

$(SEARCH_BTN).on("click", function () {
    currentPage = "search"
    getRecipes(multiInput.getValues())
})

$(MULTI_SEARCH_BTN).on("click", function () {
    currentPage = "search"
    page = 1
    searchedIngredients = multiInput.getValues()
    getRecipes(multiInput.getValues());
})

RECIPES_LIST.on("click", '.imageid', function () {
    const ingID = $(this).closest(".card").find("li:first").text()
    alert("The First Ingredient for this Recipe is: " + ingID)
})

const getCheckedCategories = () => {
    const checkedCategories = []

    for (let category of CATEGORIES) {
        if ($("#" + category).prop(CHECKED))
            checkedCategories.push(category)
    }
    return checkedCategories
}

const getFavRecipes = () => {
    apiManager.getFavRecipes()
        .then(function (data) {
            console.log(data)
            render.renderRecipes(data)
        })
}

const markedRecipes = []

RECIPES_LIST.on("click", ".bookmarkIcon", function () {
    const recipeId = $(this).data('id');

    if ($(this).data('check')) {
        console.log(currentPage)
        if (currentPage == "favorite") {
            $(this).closest(".card").remove();
        }
        $(this).data('check', false)
        $(this).removeClass('favorite')
        apiManager.deleteFavRecipes(recipeId)
    }
    else {
        $(this).data('check', true)
        $(this).addClass('favorite')
        apiManager.postFavRecipes(recipeId)
    }
    console.log(markedRecipes)
    return markedRecipes;
});


$("#favoritebtn").on("click", function () {
    currentPage = "favorite"
    getFavRecipes()
})
