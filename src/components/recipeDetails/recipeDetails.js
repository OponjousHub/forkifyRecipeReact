import { useContext, useState, useEffect, useRef } from "react";
import RecipeContext from "../../store/recipeContext";
import BookmarkContext from "../../store/bookmarkContext";
import { Smiley, User, BookmarkSimple } from "@phosphor-icons/react";
import classes from "./recipeDetails.module.css";
import Spiner from "../utility/spiner";
import Ingredients from "./ingredients";
import ErrorModal from "../utility/errorModal";
import { fetchRecipeUrl } from "../utility/http";
// import Error from "../utility/error";

const RecipeDatail = () => {
  const [loadedRecipe, setLoadedRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState({
    error: "",
    errState: false,
  });
  const [bookmarkIcon, setBookmarkIcon] = useState(false);
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
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
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
        // console.error(err.message);
        // dialog.current.showModal();
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
  }
  // else if (error) {
  //   return (content = <Error />);
  // }
  else {
    <ErrorModal
      ref={dialog}
      eror={hasError.errState ? hasError.error : null}
    />;
    content = (
      <div>
        <figure className={classes.fig}>
          <img
            src={loadedRecipe.image}
            alt={loadedRecipe.title}
            className={classes.images}
          />
          <h1 className={classes.title}>
            <span>{loadedRecipe.title}</span>
          </h1>
        </figure>

        <div className={classes.servings}>
          <div className={classes.duration}>
            <ion-icon name="time-outline"></ion-icon>
            <p>{loadedRecipe.cookingTime}</p>
          </div>
          <div className={classes.per_person}>
            <div className={classes.person_serv}>
              <ion-icon name="people-outline"></ion-icon>
              <p>{loadedRecipe.servings} servings</p>
            </div>
            <div className={classes.adjust_servings}>
              <ion-icon
                onClick={handleDecreaseServing}
                name="remove-circle-outline"
              ></ion-icon>
              <ion-icon
                onClick={handleIncreaseServing}
                name="add-circle-outline"
              ></ion-icon>
            </div>
          </div>
          <div
            className={classes.add_bookmark}
            // onClick={onToggleBookmarkHandler}
          >
            {/* <UserIcon className={classes.my_recipe} /> */}
            <User size={32} />
            {/* {boomarkIcon} */}
            {bookmarkIcon ? (
              <BookmarkSimple
                size={64}
                weight="fill"
                className={classes.my_bookmark}
                onClick={handleRemoveBookmark}
              />
            ) : (
              <BookmarkSimple
                size={64}
                // weight="fill"
                className={classes.my_bookmark}
                onClick={handleBookmarkClick}
              />
            )}
          </div>
        </div>

        <div className={classes.ingredient}>
          {loadedRecipe.ingredients && (
            <Ingredients onLoadRecipe={loadedRecipe} />
          )}
        </div>
        <div className={classes.how_to_cook}>
          <div className={classes.how_to_cook_inner}>
            <h2>How to cook</h2>
            <p>
              This recipe was carefully designed and tested by Oponjous Man.
              Please check out directions at their website.
            </p>
            <div>
              <button className={classes.btn}>
                <span>DIRECTIONS &rArr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default RecipeDatail;
