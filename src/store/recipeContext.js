import { createContext, useState } from "react";

const RecipeContext = createContext({
  recipe: () => {},
  onCurrPage: () => {},
  onSelectRecipe: () => {},
  onLoading: () => {},
  onShowError: () => {},
  onDisplayUpload: () => {},
  onAddUploaded: () => {},

  // currPage: currPage,
});

export default RecipeContext;

export const RecipeContextProvider = ({ children }) => {
  const [recipeResults, setRecipeResults] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState("");
  const [displayUploaded, setDisplayUploaded] = useState({
    state: false,
    value: "",
  });
  const [selectedRecipe, setSelectedRecipe] = useState({
    selectedState: false,
    selectedRecipeId: null,
    recipe: null,
  });

  const handleRecipeResults = (recipes) => {
    setRecipeResults(recipes);
  };
  const handleAddUploadedToResult = (uploadedRecipe) => {
    setRecipeResults((prevState) => {
      const existingRecipe = recipeResults.find(
        (booked) => booked.title === uploadedRecipe.title
      );
      if (existingRecipe) {
        return [...prevState];
      } else {
        return [
          {
            id: uploadedRecipe.id,
            publisher: uploadedRecipe.publisher,
            // ingredients: uploadedRecipe.ingredients,
            // url: uploadedRecipe.url,
            image: uploadedRecipe.image,
            title: uploadedRecipe.title,
            // servings: uploadedRecipe.servings,
            // cookingTime: uploadedRecipe.cookingTime,
            key: uploadedRecipe.key,
          },
          ...prevState,
        ];
      }
    });
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

    setDisplayUploaded({
      state: false,
      value: "",
    });
  };

  const loading = (loadingState) => {
    setIsLoading(loadingState);
  };

  const handleError = (err) => {
    setError(err);
  };
  const handleDisplayUpload = (recipeData) => {
    setDisplayUploaded({
      state: true,
      value: recipeData,
    });
  };
  console.log(displayUploaded.value);

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
    onDisplayUpload: handleDisplayUpload,
    displayUploaded,
    onAddUploaded: handleAddUploadedToResult,
  };

  return (
    <RecipeContext.Provider value={recipeCTXval}>
      {children}
    </RecipeContext.Provider>
  );
};
