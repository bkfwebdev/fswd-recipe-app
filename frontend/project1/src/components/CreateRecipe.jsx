import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRecipe } from '../api/recipes'

export default function CreateRecipe({ token }) {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }])
  const [instructions, setInstructions] = useState([''])
  const [prepTime, setPrepTime] = useState('')
  const [cookTime, setCookTime] = useState('')
  const [servings, setServings] = useState('')
  const [difficulty, setDifficulty] = useState('medium')
  const [categories, setCategories] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  const mutation = useMutation({
    mutationFn: (recipe) => createRecipe(token, recipe),
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes'])
      // Reset form
      setTitle('')
      setDescription('')
      setIngredients([{ name: '', amount: '' }])
      setInstructions([''])
      setPrepTime('')
      setCookTime('')
      setServings('')
      setDifficulty('medium')
      setCategories('')
      setImageUrl('')
    },
  })

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }])
  }

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients]
    newIngredients[index][field] = value
    setIngredients(newIngredients)
  }

  const handleAddInstruction = () => {
    setInstructions([...instructions, ''])
  }

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions]
    newInstructions[index] = value
    setInstructions(newInstructions)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const recipe = {
      title,
      description,
      ingredients: ingredients.filter(ing => ing.name && ing.amount),
      instructions: instructions.filter(inst => inst.trim()),
      prepTime: prepTime ? parseInt(prepTime) : undefined,
      cookTime: cookTime ? parseInt(cookTime) : undefined,
      servings: servings ? parseInt(servings) : undefined,
      difficulty,
      categories: categories ? categories.split(',').map(c => c.trim()) : [],
      imageUrl: imageUrl || undefined,
    }
    mutation.mutate(recipe)
  }

  return (
    <form onSubmit={handleSubmit} className="create-recipe-form">
      <h2>Create New Recipe</h2>
      
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <div className="ingredients-section">
        <h3>Ingredients</h3>
        {ingredients.map((ing, idx) => (
          <div key={idx} className="ingredient-row">
            <input
              type="text"
              placeholder="Ingredient name"
              value={ing.name}
              onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Amount"
              value={ing.amount}
              onChange={(e) => handleIngredientChange(idx, 'amount', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>+ Add Ingredient</button>
      </div>

      <div className="instructions-section">
        <h3>Instructions</h3>
        {instructions.map((inst, idx) => (
          <textarea
            key={idx}
            placeholder={`Step ${idx + 1}`}
            value={inst}
            onChange={(e) => handleInstructionChange(idx, e.target.value)}
          />
        ))}
        <button type="button" onClick={handleAddInstruction}>+ Add Step</button>
      </div>

      <div className="recipe-details">
        <input
          type="number"
          placeholder="Prep Time (minutes)"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Cook Time (minutes)"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Servings"
          value={servings}
          onChange={(e) => setServings(e.target.value)}
        />
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <input
        type="text"
        placeholder="Categories (comma-separated, e.g., dinner, vegetarian, italian)"
        value={categories}
        onChange={(e) => setCategories(e.target.value)}
      />

      <input
        type="url"
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create Recipe'}
      </button>
    </form>
  )
}
