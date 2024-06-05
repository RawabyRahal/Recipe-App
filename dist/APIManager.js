class APIManager {
   constructor() {
      // this.data = {}
   }

   getAllData(ingredient, page, gluten, dairy, categories, ingredients) {
      // console.log({ingredient, page, gluten, dairy, categories, ingredients})
      return $.get(`/recipes/${ingredient}?page=${page}&dairy=${dairy}&gluten=${gluten}&categories=${JSON.stringify(categories)}&ingredients=${JSON.stringify(ingredients)}`)
   }

   getFavRecipes() {
      return $.get(`/favorite`)
   }

   postFavRecipes(id) {
      return $.post(`/favorite/${id}`)
   }

   deleteFavRecipes(id) {
      return $.ajax({
         url: `/favorite/${id}`,
         type: "DELETE"
      })
   }
}