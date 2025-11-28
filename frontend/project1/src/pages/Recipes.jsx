import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes'
import { useAuth } from '../contexts/useAuth'
import { Header } from '../components/Header'
import RecipeList from '../components/RecipeList'
import CreateRecipe from '../components/CreateRecipe'

export default function Recipes() {
  const [token] = useAuth()

  const { data: recipes, isLoading, error } = useQuery({
    queryKey: ['recipes'],
    queryFn: () => getRecipes({}),
  })

  if (isLoading) return <div>Loading recipes...</div>
  if (error) return <div>Error loading recipes: {error.message}</div>

  return (
    <div className="recipes-page">
      <Header />
      <h1>Recipe Collection</h1>
      
      {token && <CreateRecipe token={token} />}
      
      {recipes && recipes.length > 0 ? (
        <RecipeList recipes={recipes} />
      ) : (
        <p>No recipes yet. {token ? "Create the first one!" : "Log in to create recipes!"}</p>
      )}
    </div>
  )
}
