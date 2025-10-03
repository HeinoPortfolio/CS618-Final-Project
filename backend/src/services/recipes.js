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
