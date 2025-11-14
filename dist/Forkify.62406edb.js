const recipeContainer = document.querySelector('.recipe');
const timeout = function(s) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};
// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////
async function showRecipe() {
    try {
        const resp = await fetch('https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886');
        const data = await resp.json();
        console.log(`respuesta: `, resp);
        console.log(`data: `, data);
    } catch (error) {
        console.error(error);
    }
}
showRecipe(); // const recipe = {
 // id: recipe.id,
 // title: recipe.title,
 // publisher: recipe.publisher,
 // sourceUrl: recipe.source_url,
 // image: recipe.image_url,
 // servings: recipe.servings,
 // cookTime: recipe.cooking_time,
 // ingredients: recipe.ingredients,
 // };

//# sourceMappingURL=Forkify.62406edb.js.map
