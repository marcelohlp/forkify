import "regenerator-runtime/runtime";
import { API_URL } from "./config.js";
import { KEY } from "./config.js";
import { RESULTS_PER_PAGE } from "./config.js";
import { AJAX } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RESULTS_PER_PAGE,
    },
    bookmarks: [],
};

function init() {
    const storage = localStorage.getItem("bookmarks");

    if (storage) state.bookmarks = JSON.parse(storage);
}

export async function loadRecipe(id) {
    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

        state.recipe = createRecipeObject(data);

        if (state.bookmarks.some((bookmark) => bookmark.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;
    } catch (error) {
        throw error;
    }
}

export async function loadSearchResults(query) {
    try {
        state.search.query = query;

        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

        const { recipes } = data.data;
        state.search.results = recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                imageUrl: recipe.image_url,
                ...(recipe.key && { key: recipe.key }),
            };
        });
        state.search.page = 1;
    } catch (error) {
        throw error;
    }
}

export function getSearchResultsPage(page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;
    return state.search.results.slice(start, end);
}

export function updateServings(newServings = state.recipe.servings) {
    state.recipe.ingredients.forEach((ingredient) => {
        ingredient.quantity = ingredient.quantity * (newServings / state.recipe.servings);
    });
    state.recipe.servings = newServings;
}

export function addBookmark(recipe) {
    state.bookmarks.push(recipe);
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persitBookmarks();
}

export function deleteBookmark(id) {
    const index = state.bookmarks.findIndex((element) => element.id === id);
    state.bookmarks.splice(index, 1);
    if (id === state.recipe.id) state.recipe.bookmarked = false;

    persitBookmarks();
}

function persitBookmarks() {
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export async function uploadRecipe(newRecipe) {
    try {
        const ingredients = Object.entries(newRecipe)
            .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
            .map((ingredient) => {
                const ingredientArray = ingredient[1].split(",").map((element) => element.trim());
                if (ingredientArray.length !== 3) throw new Error("Wrong ingredient format! Please use the correct format.");

                const [quantity, unit, description] = ingredientArray;
                return { quantity: quantity ? +quantity : null, unit, description };
            });

        const recipe = {
            cooking_time: newRecipe.cookingTime,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            servings: newRecipe.servings,
            source_url: newRecipe.sourceUrl,
            title: newRecipe.title,
            ingredients,
        };

        const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

        state.recipe = createRecipeObject(data);
        addBookmark(state.recipe);
    } catch (error) {
        throw error;
    }
}

function createRecipeObject(data) {
    const { recipe } = data.data;
    return {
        cookingTime: recipe.cooking_time,
        id: recipe.id,
        imageUrl: recipe.image_url ? recipe.image_url : recipe.image,
        ingredients: recipe.ingredients,
        publisher: recipe.publisher,
        servings: recipe.servings,
        sourceUrl: recipe.source_url,
        title: recipe.title,
        ...(recipe.key && { key: recipe.key }),
    };
}

/*{title: 'TEST', sourceUrl: 'TEST', image: 'TEST', publisher: 'TEST', cookingTime: '23', …}
cookingTime
: 
"23"
image
: 
"TEST"
ingredient-1
: 
"0.5,kg,Rice"
ingredient-2
: 
"1,,Avocado"
ingredient-3
: 
",,salt"
ingredient-4
: 
""
ingredient-5
: 
""
ingredient-6
: 
""
publisher
: 
"TEST"
servings
: 
"23"
sourceUrl
: 
"TEST"
title
: 
"TEST"
[[Prototype]]
: 
Object*/

init();
