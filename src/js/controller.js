import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
    module.hot.accept();
}

function init() {
    recipeView.addHandlerRender(controlRecipes);
    searchView.addHandlerSearch(controlSearchResults);
}

async function controlRecipes() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();

        await model.loadRecipe(id);

        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
    }
}

async function controlSearchResults() {
    try {
        resultsView.renderSpinner();

        const query = searchView.getQuery();
        if (!query) return;

        await model.loadSearchResults(query);

        resultsView.render(model.state.search.results);
    } catch (error) {
        recipeView.renderError();
    }
}

init();
