import mongoose from 'mongoose'
import { describe, expect, test, beforeEach } from '@jest/globals'
import {
  createRecipe,
  listAllRecipes,
  listRecipesByAuthor,
} from '../services/recipes.js'
import { Recipe } from '../db/models/recipe.js'

const sampleRecipes = [
  {
    title: 'Sample Recipe 1',
    author: 'Joe Doe',
    ingredientList: 'Some ingredients go here!!!!',
    imageURL: 'http://someUrl1.com',
  },
  {
    title: 'Sample Recipe 2',
    author: 'Jay Smith',
    ingredientList: 'Some ingredients go here again!!!!',
    imageURL: 'http://someUrl2.com',
  },
  {
    title: 'Sample Recipe 3',
    author: 'John Brown',
    ingredientList: 'Some ingredients go here again with ingredients!!!!',
    imageURL: 'http://someUrl3.com',
  },
  { title: 'Sample Recipe 4 only title and nothing else' },
]

// Before each  ===================================================================
// To be executed to create items for the database =================================
let createdSampleRecipes = []

beforeEach(async () => {
  await Recipe.deleteMany({})

  createdSampleRecipes = []

  for (const recipe of sampleRecipes) {
    const createdRecipe = new Recipe(recipe)

    createdSampleRecipes.push(await createdRecipe.save())
  }
})

// Tests for Recipe application ===============================================
// =============================================================================
describe('Creating recipes', () => {
  // Test for all the parameters set ============================================
  test('With all the parameters succeed', async () => {
    const recipe = {
      title: 'A Test Recipe',
      author: 'John Doe',
      ingredientList: 'Some ingredients go here!!!!',
      imageURL: 'http://someUrl.com',
    }

    const createdRecipe = await createRecipe(recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundRecipe = await Recipe.findById(createdRecipe._id)
    expect(foundRecipe).toEqual(expect.objectContaining(recipe))
    expect(foundRecipe.createdAt).toBeInstanceOf(Date)
    expect(foundRecipe.updatedAt).toBeInstanceOf(Date)
  })

  // Test without the title information =====================================
  test('Without title should fail', async () => {
    const recipe = {
      author: 'John Doe',
      ingredientList: 'Some additional ingredients go here!!!!',
      imageURL: 'http://someUrl.com',
    }
    try {
      await createRecipe(recipe)
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  // Test with minimum parameters ===========================================
  test('With minimal parameters should succeed', async () => {
    const recipe = {
      title: 'Only a simple title',
    }

    const createdRecipe = await createRecipe(recipe)
    expect(createdRecipe._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})

// Tests for listing recipes ==================================================
describe('Listing recipes', () => {
  test('Should return all recipes', async () => {
    const recipes = await listAllRecipes()
    expect(recipes.length).toEqual(createdSampleRecipes.length)
  })
  test('Should return all recipes sorted by creation date in descending order', async () => {
    const recipes = await listAllRecipes()
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => b.createdAt - a.createdAt,
    )
    expect(recipes.map((recipe) => recipe.createdAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.createdAt),
    )
  })
  test('Should take into account the sorting options', async () => {
    const recipes = await listAllRecipes({
      sortBy: 'updatedAt',
      sortOrder: 'ascending',
    })
    const sortedSampleRecipes = createdSampleRecipes.sort(
      (a, b) => a.updatedAt - b.updatedAt,
    )
    expect(recipes.map((recipe) => recipe.updatedAt)).toEqual(
      sortedSampleRecipes.map((recipe) => recipe.updatedAt),
    )
  })
  test('Should be able to filter recipes by the author', async () => {
    const recipes = await listRecipesByAuthor('Joe Doe')
    expect(recipes.length).toBe(1)
  })
})
