import mongoose, { Schema } from 'mongoose'

const recipeSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    description: { type: String, required: true },
    ingredients: [{ 
      name: { type: String, required: true },
      amount: { type: String, required: true }
    }],
    instructions: [{ type: String, required: true }],
    prepTime: { type: Number }, // in minutes
    cookTime: { type: Number }, // in minutes
    servings: { type: Number },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    categories: [String], // e.g., ['dinner', 'vegetarian', 'italian']
    imageUrl: String,
    likes: [{ type: Schema.Types.ObjectId, ref: 'user' }], // Array of user IDs who liked this recipe
  },
  { timestamps: true },
)

// Virtual field to get like count
recipeSchema.virtual('likeCount').get(function() {
  return this.likes.length
})

// Ensure virtuals are included when converting to JSON
recipeSchema.set('toJSON', { virtuals: true })
recipeSchema.set('toObject', { virtuals: true })

export const Recipe = mongoose.model('recipe', recipeSchema)
