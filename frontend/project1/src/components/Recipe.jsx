import { Link } from 'react-router-dom'

export default function Recipe({ recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className="recipe-card-link">
      <div className="recipe-card">
        {recipe.imageUrl && (
          <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
        )}
        <h3>{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        <div className="recipe-meta">
          {recipe.prepTime && <span>⏱️ Prep: {recipe.prepTime} min</span>}
          {recipe.cookTime && <span>🍳 Cook: {recipe.cookTime} min</span>}
          {recipe.servings && <span>🍽️ Serves: {recipe.servings}</span>}
          {recipe.difficulty && <span>📊 {recipe.difficulty}</span>}
        </div>
        {recipe.categories && recipe.categories.length > 0 && (
          <div className="recipe-categories">
            {recipe.categories.map((cat, idx) => (
              <span key={idx} className="category-tag">{cat}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
