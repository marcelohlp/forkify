import "regenerator-runtime/runtime";

export const state = {
    recipe: {},
};

export async function loadRecipe(id) {
    try {
        const response = await fetch(`https://forkify-api.jonas.io/api/v2/recipes/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(`${data.message} (${response.status})`);

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
        alert(error);
    }
}
