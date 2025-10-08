// To Create a new recipe = ============================================
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecipe } from '../api/recipes.js'

import { useAuth } from '../contexts/AuthContext.jsx'

export function CreateRecipe() {
  const [title, setTitle] = useState('')
  //const [author, setAuthor] = useState('')
  const [ingredientList, setIngredientList] = useState('')
  const [imageURL, setImageURL] = useState('')

  // Get the authentication context ===========================================
  const [token] = useAuth()

  // Create the query client ==================================================
  const queryClient = useQueryClient()

  // Create the Recipe mutation ===============================================
  const createRecipeMutation = useMutation({
    mutationFn: () => createRecipe(token, { title, ingredientList, imageURL }),
    onSuccess: () => queryClient.invalidateQueries(['recipes']),
  })

  // External function to handle form submission ==============================
  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipeMutation.mutate()
  }

  // If there is no token ask to create an account
  if (!token) return <div>Please login to create a new recipe.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>
          <b> Recipe Title:</b>{' '}
        </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />

      <br />
      <div>
        <label htmlFor='create-imageURL'>
          {' '}
          <b> URL for image: </b>
        </label>
        <input
          type='text'
          name='create-imageURL'
          id='create-imageURL'
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor='recibe-box'>
        <b> Enter the recipe below: </b>
      </label>
      <br />
      <br />
      <textarea
        id='comment-box'
        name='recipe-area'
        rows='20'
        cols='60'
        value={ingredientList}
        onChange={(e) => setIngredientList(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={
          createRecipeMutation.isPending
            ? 'Creating the recipe...'
            : 'Create a new recipe'
        }
        disabled={!title}
      />
      {createRecipeMutation.isSuccess ? (
        <>
          <br />
          <br />
          Recipe created successfully!
        </>
      ) : null}
    </form>
  )
}
