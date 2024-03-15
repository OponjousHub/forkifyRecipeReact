import { useContext, useState, useEffect, useRef } from "react";
import RecipeContext from "../../store/recipeContext";
import BookmarkContext from "../../store/bookmarkContext";
import RecipeDatailDisplay from "./recipeDetailDisplay";
import { Smiley } from "@phosphor-icons/react";
import classes from "./recipeDetails.module.css";
import Spiner from "../utility/spiner";
import ErrorModal from "../utility/errorModal";
import { fetchRecipeUrl } from "../utility/http";

const RecipeDatail = () => {
  const [loadedRecipe, setLoadedRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkIcon, setBookmarkIcon] = useState(false);
  const [hasError, setHasError] = useState({
    error: "",
    errState: false,
  });
  const { selectedRecipe } = useContext(RecipeContext);
  const { onGetSelectedRecipe, onBookrecipe, bookmark, onRemoveBookmark } =
    useContext(BookmarkContext);
  const id = selectedRecipe.selectedRecipeId;
  const dialog = useRef();

  const handleBookmarkClick = () => {
    onBookrecipe();
    setBookmarkIcon(true);
  };

  const handleRemoveBookmark = () => {
    onRemoveBookmark();
    console.log(selectedRecipe.selectedRecipeId);
    setBookmarkIcon(false);
  };

  useEffect(() => {
    const loadRecipe = async (id) => {
      try {
        setIsLoading(true);
        bookmark.find((book) => book.id === id)
          ? setBookmarkIcon(true)
          : setBookmarkIcon(false);

        const recipeData = await fetchRecipeUrl(id);
        const { recipe } = recipeData.data;
        const rec = {
          id: recipe.id,
          publisher: recipe.publisher,
          ingredients: recipe.ingredients,
          url: recipe.source_url,
          image: recipe.image_url,
          title: recipe.title,
          servings: +recipe.servings,
          cookingTime: +recipe.cooking_time,
        };
        setLoadedRecipe(rec);
        onGetSelectedRecipe(rec);
        setIsLoading(false);
        console.log(rec);
        return rec;
      } catch (err) {
        setHasError({
          error: err.message,
          errState: true,
        });
        setIsLoading(false);
      }
    };
    loadRecipe(id);
  }, [id]);

  const handleIncreaseServing = () => {
    setLoadedRecipe((prevState) => {
      const updatedServing = loadedRecipe.servings + 1;
      return {
        ...prevState,
        servings: updatedServing,
      };
    });
  };
  const handleDecreaseServing = () => {
    setLoadedRecipe((prevState) => {
      const updatedServing = loadedRecipe.servings - 1;
      return {
        ...prevState,
        servings: updatedServing > 0 ? updatedServing : 1,
      };
    });
  };

  let content = "";

  if (selectedRecipe.selectedState === false) {
    content = (
      <div className={classes.no_recipe_container}>
        <div className={classes.no_recipe_box}>
          <p className={classes.no_recipe_icon}>
            <Smiley size={32} />
          </p>
          <div className={classes.no_recipe}>
            <p>Start by searching for a recipe or an ingredient. Have fun!</p>
          </div>
        </div>
      </div>
    );
  } else if (isLoading) {
    return (content = <Spiner />);
  } else {
    <ErrorModal
      ref={dialog}
      eror={hasError.errState ? hasError.error : null}
    />;
    content = (
      <RecipeDatailDisplay
        recipe={loadedRecipe}
        onDecreaseServing={handleDecreaseServing}
        onIncreaseServing={handleIncreaseServing}
        bookmarkIcon={bookmarkIcon}
        onAddBookmark={handleBookmarkClick}
        onRemoveBookmark={handleRemoveBookmark}
      />
    );
  }

  return content;
};

export default RecipeDatail;
