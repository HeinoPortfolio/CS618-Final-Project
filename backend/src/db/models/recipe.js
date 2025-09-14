// Model for the recipe for the final project
// For inclusion in the models folder under backend/src

import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: String,
    ingredientList: [String],
    imageURL: String,
  },
  { timestamps: true },
)

export const Recipe = mongoose.model('recipe', recipeSchema)
