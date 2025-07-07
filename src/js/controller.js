import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

function init() {
    recipeView.addHandlerRender(controlRecipes);
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

init();
