import { useState } from "react";
import { RecipeContextProvider } from "./store/recipeContext";
import { BookmarkContextProvider } from "./store/bookmarkContext";
import { ProgressContextProvider } from "./store/progressContext";
import Header from "./components/header/header";
import RecipeResult from "./components/results/recipeResult";
import RecipeDatail from "./components/recipeDetails/recipeDetails";
import SpinerModal from "./components/utility/spinnerModal";
// import AddRecipeForm from "./components/header/addRecipeForm";

import UploadErrorModal from "./components/utility/uploadErrorModal";
import classes from "./app.module.css";
import "./App.css";
import AddRecipeModal from "./components/utility/addRecipeModal";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (load) => {
    setIsLoading(load);
  };

  return (
    <ProgressContextProvider>
      <BookmarkContextProvider>
        <RecipeContextProvider>
          <div className={classes.app_container}>
            <Header onLoad={handleLoading} />
            <div className={classes.recipe_container}>
              <RecipeResult
                onLoading={isLoading}
                className={classes.result_layout}
              />
              <RecipeDatail className={classes.details_layout} />
            </div>
            {/* <SpinerModal /> */}
            {/* <UploadErrorModal /> */}
            <AddRecipeModal />
          </div>
        </RecipeContextProvider>
      </BookmarkContextProvider>
    </ProgressContextProvider>
  );
}

export default App;
