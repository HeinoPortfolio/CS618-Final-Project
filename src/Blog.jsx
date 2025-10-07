import { CreateRecipe } from './components/CreateRecipe.jsx'
import { RecipeList } from './components/RecipeList.jsx'
import { RecipeFilter } from './components/RecipeFilter.jsx'
import { RecipeSorting } from './components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from './api/recipes.js'

export function Blog() {
  const recipesQuery = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes(),
  })

  // Extract the data from the query ========
  const recipes = recipesQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
      <h1>Welcome to the Recipe Blog! </h1>
      <CreateRecipe />
      <br />
      <hr />
      Filter By:
      <RecipeFilter field='author' />
      <br />
      <RecipeSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  )
}
