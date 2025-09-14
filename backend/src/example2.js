// Used to test the schema for storing the recipe information

import { initDatabase } from './db/init.js'
import { Recipe } from './db/models/recipe.js'

// Initialize the database
await initDatabase()

const recipe = new Recipe({
  title: 'Chocolate Pudding',
  author: 'Yolanda Cardinale',
  ingredientList: ['1lbs of choc', '1 cup of sugar'],
  imageURL: 'htpp:nnnnbnbnb',
})

await recipe.save()

const recipes = await Recipe.find()

console.log(recipes)
