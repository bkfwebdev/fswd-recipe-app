import { Link } from 'react-router-dom'

export default function Notification({ recipe, onClose }) {
  return (
    <div className="notification-popup">
      <div className="notification-content">
        <button className="notification-close" onClick={onClose}>×</button>
        <h3>🎉 New Recipe Added!</h3>
        <p className="notification-title">{recipe.title}</p>
        {recipe.author && (
          <p className="notification-author">by {recipe.author.username || 'Unknown'}</p>
        )}
        <Link to={`/recipes/${recipe.id}`} className="notification-link" onClick={onClose}>
          View Recipe →
        </Link>
      </div>
    </div>
  )
}
