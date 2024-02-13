import { RecipeContextProvider } from "./store/recipeContext";
import { BookmarkContextProvider } from "./store/bookmarkContext";
import Header from "./components/header/header";
import "./App.css";
import RecipeResult from "./components/results/recipeResult";
import RecipeDatail from "./components/recipeDetails/recipeDetails";
import { useState } from "react";
import classes from "./app.module.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoading = (load) => {
    setIsLoading(load);
  };
  return (
    <BookmarkContextProvider>
      <RecipeContextProvider>
        <div className={classes.app_container}>
          <Header onLoad={handleLoading} />
          <div className={classes.recipe_container}>
            <RecipeResult onLoading={isLoading} />
            <RecipeDatail />
          </div>
        </div>
      </RecipeContextProvider>
    </BookmarkContextProvider>
  );
}

export default App;
