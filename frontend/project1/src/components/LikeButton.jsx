import { useMutation, useQueryClient } from '@tanstack/react-query'
import { likeRecipe, unlikeRecipe } from '../api/recipes'
import { useAuth } from '../contexts/useAuth'
import { jwtDecode } from 'jwt-decode'

export default function LikeButton({ recipe }) {
  const [token] = useAuth()
  const queryClient = useQueryClient()
  
  // Check if current user has liked this recipe
  const userId = token ? jwtDecode(token).sub : null
  const isLiked = recipe.likes && userId ? recipe.likes.includes(userId) : false
  const likeCount = recipe.likeCount || (recipe.likes ? recipe.likes.length : 0)

  const likeMutation = useMutation({
    mutationFn: () => likeRecipe(token, recipe._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes'])
      queryClient.invalidateQueries(['recipe', recipe._id])
    },
  })

  const unlikeMutation = useMutation({
    mutationFn: () => unlikeRecipe(token, recipe._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['recipes'])
      queryClient.invalidateQueries(['recipe', recipe._id])
    },
  })

  const handleClick = (e) => {
    e.preventDefault() // Prevent navigation if inside a link
    e.stopPropagation()
    
    if (!token) {
      alert('Please log in to like recipes!')
      return
    }

    if (isLiked) {
      unlikeMutation.mutate()
    } else {
      likeMutation.mutate()
    }
  }

  return (
    <button 
      className={`like-button ${isLiked ? 'liked' : ''}`}
      onClick={handleClick}
      disabled={likeMutation.isPending || unlikeMutation.isPending}
    >
      {isLiked ? '❤️' : '🤍'} {likeCount}
    </button>
  )
}
