import "regenerator-runtime/runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
    },
};

export async function loadRecipe(id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);

        const { recipe } = data.data;
        state.recipe = {
            cookingTime: recipe.cooking_time,
            id: recipe.id,
            imageUrl: recipe.image_url,
            ingredients: recipe.ingredients,
            publisher: recipe.publisher,
            servings: recipe.servings,
            sourceUrl: recipe.source_url,
            title: recipe.title,
        };
    } catch (error) {
        throw error;
    }
}

export async function loadSearchResults(query) {
    try {
        state.search.query = query;

        const data = await getJSON(`${API_URL}?search=${query}`);

        const { recipes } = data.data;
        state.search.results = recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                imageUrl: recipe.image_url,
            };
        });
    } catch (error) {
        throw error;
    }
}
