import * as model from './model.js';
import recipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultViews.js';
import paginationView from './views/paginationView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

async function controlRecipes() {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return; // 💡 Si no hay id, salimos de la función
    recipeView.renderSpinner();

    await model.loadRecipe(id); //llamamos a la funcion del modelo
    recipeView.render(model.state.recipe); //ya no se necesita const {recipe} = model.state; porque se accede directamente desde model.state.recipe 

  }
  catch (error) {
    renderError();
  }

};

function init() {
  recipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults); // nuevo suscriptor
  paginationView.addHandlerClick(controlPagination);
}

const controlSearchResults = async function () {
  try {
    const query = SearchView.getQuery(); // obtiene texto del input. Aqui se instancia la funcion searchView.getQuery

    if (!query) return; // si está vacío, se detiene

    ResultsView.renderSpinner();

    await model.loadSearchResults(query); // espera resultados
    ResultsView.render(model.getSearchResultsPage());
    paginationView.render(model.state.search); //renderizar botones de paginacion

  } catch (err) {
    ResultsView.renderError();
  }
};

const controlPagination = function (goToPage) {
  ResultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

init();