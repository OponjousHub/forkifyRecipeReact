export const fetchRecipeUrl = async (id) => {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}/?key=<a279b720-e157-4a3a-9725-ebe1bb21da1f>`
  );
  if (!response.ok)
    throw new Error(
      `Could not fetch this recipe! please try again. Status: ${response.status}`
    );

  const recipeData = await response.json();
  return recipeData;
};
