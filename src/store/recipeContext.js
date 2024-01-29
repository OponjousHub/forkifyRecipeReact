import { createContext, useState } from "react";

const RecipeContext = createContext({
  recipe: () => {},
  onCurrPage: () => {},
  onSelectRecipe: () => {},
  // currPage: currPage,
});

export default RecipeContext;

export const RecipeContextProvider = ({ children }) => {
  const [recipeResults, setRecipeResults] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [selectedRecipe, setSelectedRecipe] = useState({
    selectedState: false,
    selectedRecipeId: null,
    recipe: null,
  });

  const handleRecipeResults = (recipes) => {
    setRecipeResults(recipes);
  };

  const handlePage = (page) => {
    setCurrPage(page);
  };

  const handleSelectedRecipe = (recipe) => {
    setSelectedRecipe({
      selectedState: true,
      selectedRecipeId: recipe.id,
      recipe,
    });
  };

  const recipeCTXval = {
    recipe: handleRecipeResults,
    recipeResults,
    onCurrPage: handlePage,
    currPage,
    onSelectRecipe: handleSelectedRecipe,
    selectedRecipe,
  };

  return (
    <RecipeContext.Provider value={recipeCTXval}>
      {children}
    </RecipeContext.Provider>
  );
};
