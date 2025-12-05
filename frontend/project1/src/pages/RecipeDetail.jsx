import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getRecipeById } from '../api/recipes'
import { Header } from '../components/Header'
import LikeButton from '../components/LikeButton'

export default function RecipeDetail() {
  const { id } = useParams()

  const { data: recipe, isLoading, error } = useQuery({
    queryKey: ['recipe', id],
    queryFn: () => getRecipeById(id),
  })

  if (isLoading) return <div>Loading recipe...</div>
  if (error) return <div>Error loading recipe: {error.message}</div>
  if (!recipe) return <div>Recipe not found</div>

  return (
    <div className="recipe-detail-page">
      <Header />
      <Link to="/" className="back-link">← Back to Recipes</Link>
      
      <div className="recipe-detail">
        {recipe.imageUrl && (
          <img src={recipe.imageUrl} alt={recipe.title} className="recipe-detail-image" />
        )}
        
        <div className="recipe-header">
          <h1>{recipe.title}</h1>
          <LikeButton recipe={recipe} />
        </div>
        
        <div className="recipe-meta-detail">
          {recipe.prepTime && <span>⏱️ Prep Time: {recipe.prepTime} min</span>}
          {recipe.cookTime && <span>🍳 Cook Time: {recipe.cookTime} min</span>}
          {recipe.servings && <span>🍽️ Servings: {recipe.servings}</span>}
          {recipe.difficulty && <span>📊 Difficulty: {recipe.difficulty}</span>}
        </div>

        {recipe.categories && recipe.categories.length > 0 && (
          <div className="recipe-categories">
            {recipe.categories.map((cat, idx) => (
              <span key={idx} className="category-tag">{cat}</span>
            ))}
          </div>
        )}

        <div className="recipe-description-detail">
          <h2>Description</h2>
          <p>{recipe.description}</p>
        </div>

        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx}>
                <strong>{ing.amount}</strong> {ing.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="recipe-instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((instruction, idx) => (
              <li key={idx}>{instruction}</li>
            ))}
          </ol>
        </div>

        {recipe.author && (
          <div className="recipe-author">
            <small>Created by: {recipe.author.username || 'Unknown'}</small>
          </div>
        )}
      </div>
    </div>
  )
}
