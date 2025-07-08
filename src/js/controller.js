import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

if (module.hot) {
    module.hot.accept();
}

function init() {
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClickButton(controlPagination);
}

async function controlRecipes() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();

        resultsView.update(model.getSearchResultsPage());

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

        resultsView.render(model.getSearchResultsPage());
        paginationView.render(model.state.search);
    } catch (error) {
        recipeView.renderError();
    }
}

function controlPagination(goToPage) {
    resultsView.render(model.getSearchResultsPage(goToPage));
    paginationView.render(model.state.search);
}

function controlServings(newServings) {
    model.updateServings(newServings);
    recipeView.update(model.state.recipe);
}

init();
