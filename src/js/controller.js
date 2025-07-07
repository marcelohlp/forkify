import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
    return new Promise(function (_, reject) {
        setTimeout(function () {
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s * 1000);
    });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

/**/

async function controlRecipes() {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();

        await model.loadRecipe(id);

        recipeView.render(model.state.recipe);
    } catch (error) {
        console.log(error);
        alert(error);
    }
}

// showRecipe("5ed6604591c37cdc054bc886");

["hashchange", "load"].forEach((event) => window.addEventListener(event, controlRecipes));
