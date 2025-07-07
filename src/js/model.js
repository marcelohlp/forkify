import "regenerator-runtime/runtime";
import { API_URL } from "./config.js";
import { getJSON } from "./helpers.js";

export const state = {
    recipe: {},
};

export async function loadRecipe(id) {
    try {
        const data = await getJSON(`${API_URL}/${id}`);

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
        console.error(error);
    }
}
