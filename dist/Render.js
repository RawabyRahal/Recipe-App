const source = RECIPES_TEMPLATE.html()
const templateRecipes = Handlebars.compile(source)

const sourceCategories = CATEGORIES_TEMPLATE.html()
const templateCategories = Handlebars.compile(sourceCategories)

const sourceMultiInput = MULTI_INPUT_TEMPLATE.html();
const templateIngredients = Handlebars.compile(sourceMultiInput);

Handlebars.registerHelper('times', function(n, block) {
    var html = "";
    let litStarClass = 'style="color: orange;"';
    for(let i = 1; i <= 5; ++i) {
        if(i > n) {
            litStarClass = 'style="color: grey;"';
        }
        html += `<i class="fa-solid fa-star" ${litStarClass}></i>`;
    }
    return html
});


class Renderer {
    constructor() {
        this.renderCategories()
        this.renderMultiInput();
    }

    renderRecipes = function (data) {
        RECIPES_LIST.empty()
        let newHtml = templateRecipes({ recipes: data })
        RECIPES_LIST.append(newHtml)
    }

    renderError = function () {
        RECIPES_LIST.empty()
        RECIPES_LIST.append("<div class='notfound' style='color: red; text-align:center'>The searched ingredient could not be found.</div>");
    }

    renderCategories = function () {
        let newHtml = templateCategories({ CATEGORIES })
        CATEGORIES_LIST.append(newHtml)
    }

    renderMultiInput = function () {
        let newHtml = templateIngredients({ INGREDIENTS_LIST })
        INGREDIENTS.append(newHtml)
    }
}

