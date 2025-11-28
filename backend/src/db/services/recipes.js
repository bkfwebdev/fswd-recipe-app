import { Recipe } from '../models/recipe.js'

function applyOptions(query, options) {
  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder === 'asc' ? 1 : -1
  return query.sort({ [sortBy]: sortOrder }).populate('author')
}

export async function listAllRecipes(options = {}) {
  const query = Recipe.find({})
  return await applyOptions(query, options)
}

export async function listRecipesByAuthor(author, options = {}) {
  const query = Recipe.find({ author })
  return await applyOptions(query, options)
}

export async function listRecipesByCategory(category, options = {}) {
  const query = Recipe.find({ categories: category })
  return await applyOptions(query, options)
}

export async function getRecipeById(id) {
  return await Recipe.findById(id).populate('author')
}

export async function createRecipe(author, recipe) {
  return await Recipe.create({ ...recipe, author })
}

export async function updateRecipe(author, recipeId, updates) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author },
    { $set: updates },
    { new: true }
  ).populate('author')
}

export async function deleteRecipe(author, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author })
}
