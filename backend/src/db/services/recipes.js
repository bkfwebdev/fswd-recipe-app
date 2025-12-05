import { Recipe } from '../models/recipe.js'
import { emitNewRecipe } from '../../socket.js'

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
  const newRecipe = await Recipe.create({ ...recipe, author, likes: [] })
  const populatedRecipe = await Recipe.findById(newRecipe._id).populate('author')
  
  // Emit real-time notification
  emitNewRecipe(populatedRecipe)
  
  return populatedRecipe
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

// Like a recipe
export async function likeRecipe(userId, recipeId) {
  return await Recipe.findByIdAndUpdate(
    recipeId,
    { $addToSet: { likes: userId } }, // $addToSet prevents duplicates
    { new: true }
  ).populate('author')
}

// Unlike a recipe
export async function unlikeRecipe(userId, recipeId) {
  return await Recipe.findByIdAndUpdate(
    recipeId,
    { $pull: { likes: userId } },
    { new: true }
  ).populate('author')
}

// Get most popular recipes
export async function getMostPopularRecipes(limit = 10) {
  return await Recipe.aggregate([
    {
      $addFields: {
        likeCount: { $size: '$likes' }
      }
    },
    {
      $sort: { likeCount: -1 }
    },
    {
      $limit: limit
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author'
      }
    },
    {
      $unwind: '$author'
    }
  ])
}
