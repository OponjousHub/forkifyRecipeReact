import { KEY } from "./config";

export const fetchRecipeUrl = async (id) => {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}/?key=<a279b720-e157-4a3a-9725-ebe1bb21da1f>`
  );
  if (!response.ok)
    throw new Error(
      `Could not fetch this recipe! please check your internet connection. Status: ${response.status}`
    );

  const recipeData = await response.json();
  return recipeData;
};

const timeOut = () => {
  setTimeout(() => {}, [5 * 1000]);
};

export const uploadRecipeUrl = async function uploadRecipeUrl(recipe) {
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/?key=${KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    }
  );
  // const res = await Promise.race([response, timeOut()]);
  if (!response.ok)
    throw new Error(
      `Could not upload this recipe! please check your internet connection. Status: ${response.status}`
    );

  const recipeData = await response.json();
  return recipeData;
};
