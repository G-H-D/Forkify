////////////////////////////////////////////////////////////////////////////////////////////////
//Es el almacen de datos (state).                                                             //
//Guarda: receta actual, resultados de busqueda, bookmarks y, configuracion                   // 
//Contiene funciones que fetch --> obtiene datos de la API, transforman los datos, los guardan//
//en state y, gestionan persistencia en localStorage                                          //
////////////////////////////////////////////////////////////////////////////////////////////////

import { API_URL } from './config.js'; 
import { getJSON } from './helper.js'; //importa la funcion getJSON()
import { RES_PER_PAGE } from './config.js'; //importa cuantos resultados mostrar por pagina

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
    const data = await getJSON(`${API_URL}${id}`);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    const { recipe } = data.data; // desestructuración del objeto recipe

    //asignamos los datos al state
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

  } catch (err) {
    throw err; //esta linea propaga el error hacia arriba para que el controlador pueda capturar y mostrar el mensaje
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });

  } catch (err) {
    console.log(`${err} 💥💥💥💥`);
    throw err; // Propaga el error al controlador
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};