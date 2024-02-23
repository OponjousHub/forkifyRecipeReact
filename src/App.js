import { useState } from "react";
import { RecipeContextProvider } from "./store/recipeContext";
import { BookmarkContextProvider } from "./store/bookmarkContext";
import Header from "./components/header/header";
import RecipeResult from "./components/results/recipeResult";
import RecipeDatail from "./components/recipeDetails/recipeDetails";
import AddRecipeForm from "./components/header/addRecipeForm";
// import Modal from "./components/utility/modal";
import classes from "./app.module.css";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  // const [showModal, setShowModal] = useState(false);

  const handleLoading = (load) => {
    setIsLoading(load);
  };

  // const handleAddForm = (showState) => {
  //   setShowModal(showState);
  //   console.log("clicked");
  //   // dialog.current.showModal();
  // };
  // console.log(showModal);
  return (
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
            {/* <AddRecipeForm /> */}
          </div>
        </div>
      </RecipeContextProvider>
    </BookmarkContextProvider>
  );
}

export default App;
