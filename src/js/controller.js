import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

function init() {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmarks(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClickButton(controlPagination);
}

async function controlRecipes() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();

        resultsView.update(model.getSearchResultsPage());
        bookmarksView.update(model.state.bookmarks);

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

function controlBookmarks() {
    bookmarksView.render(model.state.bookmarks);
}

function controlAddBookmark() {
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else model.deleteBookmark(model.state.recipe.id);
    recipeView.update(model.state.recipe);
    bookmarksView.render(model.state.bookmarks);
}

init();
