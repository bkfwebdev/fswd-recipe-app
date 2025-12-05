import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRecipes, getPopularRecipes } from '../api/recipes'
import { useAuth } from '../contexts/useAuth'
import { Header } from '../components/Header'
import RecipeList from '../components/RecipeList'
import CreateRecipe from '../components/CreateRecipe'
import RecipeFilter from '../components/RecipeFilter'

export default function Recipes() {
  const [token] = useAuth()
  const [sortBy, setSortBy] = useState('createdAt-desc')
  const [showPopular, setShowPopular] = useState(false)

  // Parse sortBy into field and order
  const [sortField, sortOrder] = sortBy.split('-')

  const { data: allRecipes, isLoading: isLoadingAll, error: errorAll } = useQuery({
    queryKey: ['recipes', sortField, sortOrder],
    queryFn: () => getRecipes({ sortBy: sortField, sortOrder: sortOrder }),
    enabled: !showPopular,
  })

  const { data: popularRecipes, isLoading: isLoadingPopular, error: errorPopular } = useQuery({
    queryKey: ['recipes', 'popular'],
    queryFn: () => getPopularRecipes(20),
    enabled: showPopular,
  })

  const recipes = showPopular ? popularRecipes : allRecipes
  const isLoading = showPopular ? isLoadingPopular : isLoadingAll
  const error = showPopular ? errorPopular : errorAll

  if (isLoading) return <div>Loading recipes...</div>
  if (error) return <div>Error loading recipes: {error.message}</div>

  return (
    <div className="recipes-page">
      <Header />
      <h1>Recipe Collection</h1>
      
      {token && <CreateRecipe token={token} />}
      
      <RecipeFilter 
        sortBy={sortBy}
        setSortBy={setSortBy}
        showPopular={showPopular}
        setShowPopular={setShowPopular}
      />
      
      {recipes && recipes.length > 0 ? (
        <>
          {showPopular && <h2>🔥 Most Popular Recipes</h2>}
          <RecipeList recipes={recipes} />
        </>
      ) : (
        <p>No recipes yet. {token ? "Create the first one!" : "Log in to create recipes!"}</p>
      )}
    </div>
  )
}
