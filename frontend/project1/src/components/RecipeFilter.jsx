export default function RecipeFilter({ sortBy, setSortBy, showPopular, setShowPopular }) {
  return (
    <div className="recipe-filter">
      <div className="filter-group">
        <label>View:</label>
        <button 
          className={!showPopular ? 'active' : ''}
          onClick={() => setShowPopular(false)}
        >
          All Recipes
        </button>
        <button 
          className={showPopular ? 'active' : ''}
          onClick={() => setShowPopular(true)}
        >
          🔥 Popular
        </button>
      </div>
      
      {!showPopular && (
        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="createdAt-desc">Newest First</option>
            <option value="createdAt-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      )}
    </div>
  )
}
