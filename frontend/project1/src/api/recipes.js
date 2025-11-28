export const getRecipes = async (queryParams) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/recipes?` +
      new URLSearchParams(queryParams),
  )
  return await res.json()
}

export const getRecipeById = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${id}`)
  return await res.json()
}

export const createRecipe = async (token, recipe) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  })
  return await res.json()
}

export const updateRecipe = async (token, id, recipe) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(recipe),
  })
  return await res.json()
}

export const deleteRecipe = async (token, id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/recipes/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.status === 204
}
