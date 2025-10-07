import { CreateRecipe } from './components/CreateRecipe.jsx'
import { RecipeList } from './components/RecipeList.jsx'
import { RecipeFilter } from './components/RecipeFilter.jsx'
import { RecipeSorting } from './components/RecipeSorting.jsx'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from './api/recipes.js'

import { useState } from 'react'

export function Blog() {
  const [author, setAuthor] = useState('')

  const [sortBy, setSortBy] = useState('createdAt')

  const [sortOrder, setSortOrder] = useState('descending')

  const recipesQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
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
      <RecipeFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  )
}
