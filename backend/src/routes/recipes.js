// Routes for the recipe blog ================================================
import {
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByTag,
  createRecipe,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
} from '../services/recipes.js'

//

export function recipesRoutes(app) {
  app.get('/api/v1/recipes', async (req, res) => {
    const { sortBy, sortOrder, author, tags } = req.query
    const options = { sortBy, sortOrder }

    try {
      if (author && tags) {
        return res
          .status(400)
          .json({ error: 'Query by either author or tag, not both' })
      } else if (author) {
        return res.json(await listRecipesByAuthor(author, options))
      } else if (tags) {
        return res.json(await listRecipesByTag(tags, options))
      } else {
        return res.json(await listAllRecipes(options))
      }
    } catch (err) {
      console.error('Error listing recipes', err)
      return res.status(500).end()
    }
  }) // end list recipes
  app.get('/api/v1/recipes/:id', async (req, res) => {
    const { id } = req.params

    try {
      const recipe = await getRecipeById(id)

      if (recipe === null) return res.status(404).end()
      return res.json(recipe)
    } catch (err) {
      console.error('Error getting recipe', err)
    }
  }) // end get recipe by ID
  app.post('/api/v1/recipes', async (req, res) => {
    try {
      const recipe = await createRecipe(req.body)
      return res.json(recipe)
    } catch (err) {
      console.error('Error creating post', err)
      return res.status(500).end()
    }
  }) // end create recipe
  app.patch('/api/v1/recipes/:id', async (req, res) => {
    try {
      const recipe = await updateRecipe(req.params.id, req.body)
      return res.json(recipe)
    } catch (err) {
      console.error('Error updating recipe', err)
      return res.status(500).end()
    }
  }) // end update post
  app.delete('/api/v1/recipes/:id', async (req, res) => {
    try {
      const { deletedCount } = await deleteRecipe(req.params.id)
      if (deletedCount === 0) return res.sendStatus(404)
      return res.status(204).end()
    } catch (err) {
      console.error('Error deleting recipe', err)
      return res.status(500).end()
    }
  }) // end delete a recipe
}
