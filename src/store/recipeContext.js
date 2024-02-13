import { createContext, useState } from "react";

const RecipeContext = createContext({
  recipe: () => {},
  onCurrPage: () => {},
  onSelectRecipe: () => {},
  onLoading: () => {},
  onShowError: () => {},

  // currPage: currPage,
});

export default RecipeContext;

export const RecipeContextProvider = ({ children }) => {
  const [recipeResults, setRecipeResults] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");
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

  const loading = (loadingState) => {
    setIsLoading(loadingState);
  };

  const handleError = (err) => {
    setError(err);
  };

  const recipeCTXval = {
    recipe: handleRecipeResults,
    recipeResults,
    onCurrPage: handlePage,
    currPage,
    onSelectRecipe: handleSelectedRecipe,
    selectedRecipe,
    onLoading: loading,
    isLoading,
    onShowError: handleError,
    error,
  };

  return (
    <RecipeContext.Provider value={recipeCTXval}>
      {children}
    </RecipeContext.Provider>
  );
};
