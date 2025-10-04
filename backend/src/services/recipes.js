import { Recipe } from '../db/models/recipe.js'

export async function createRecipe({
  title,
  author,
  ingredientList,
  imageURL,
}) {
  const recipe = new Recipe({ title, author, ingredientList, imageURL })

  return await recipe.save()
}
// List all the recipes =======================================================
// It is a helper/common functionality ========================================
async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}

// List all the recipes =======================================================
export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

// List recipes by an author ==================================================
export async function listRecipesByAuthor(author, options) {
  return await listRecipes({ author }, options)
}

// Get the recipe by the recipe ID ============================================
// Will use the Mongoose feature (findById)to find the recipe by the ID =======
export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId)
}

// Update the recipe given a recipe ID ========================================
export async function updateRecipe(
  recipeId,
  { title, author, ingredientList, imageURL },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId },
    { $set: { title, author, ingredientList, imageURL } },
    { new: true },
  )
}

// Delete a post given a recipe ID ============================================
export async function deleteRecipe(recipeId) {
  return await Recipe.deleteOne({ _id: recipeId })
}
