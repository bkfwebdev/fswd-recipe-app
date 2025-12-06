import { Link } from 'react-router-dom'

export default function Notification({ recipe, onClose }) {
  return (
    <div className="notification-overlay" onClick={onClose}>
      <div className="notification-modal" onClick={(e) => e.stopPropagation()}>
        <button className="notification-close" onClick={onClose}>×</button>
        <div className="notification-icon">🎉</div>
        <h2>New Recipe Added!</h2>
        <p className="notification-recipe-title">{recipe.title}</p>
        {recipe.author && (
          <p className="notification-author">by {recipe.author.username || 'Unknown'}</p>
        )}
        <div className="notification-actions">
          <Link 
            to={`/recipes/${recipe.id}`} 
            className="notification-view-btn" 
            onClick={onClose}
          >
            View Recipe
          </Link>
          <button className="notification-dismiss-btn" onClick={onClose}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  )
}
