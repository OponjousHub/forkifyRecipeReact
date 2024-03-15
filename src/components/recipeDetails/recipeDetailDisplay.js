import { useContext } from "react";
import RecipeContext from "../../store/recipeContext";
import Ingredients from "./ingredients";
import { User, BookmarkSimple } from "@phosphor-icons/react";
import classes from "./recipeDetails.module.css";

function RecipeDatailDisplay({
  recipe,
  onIncreaseServing,
  onDecreaseServing,
  bookmarkIcon,
  onAddBookmark,
  onRemoveBookmark,
}) {
  const { displayUploaded } = useContext(RecipeContext);
  const loadedRecipe = displayUploaded.state ? displayUploaded.value : recipe;
  console.log(loadedRecipe);
  console.log(displayUploaded);

  return (
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
              onClick={onDecreaseServing}
              name="remove-circle-outline"
            ></ion-icon>
            <ion-icon
              onClick={onIncreaseServing}
              name="add-circle-outline"
            ></ion-icon>
          </div>
        </div>
        <div className={classes.add_bookmark}>
          <User size={32} />
          {bookmarkIcon ? (
            <BookmarkSimple
              size={64}
              weight="fill"
              className={classes.my_bookmark}
              onClick={onRemoveBookmark}
            />
          ) : (
            <BookmarkSimple
              size={64}
              className={classes.my_bookmark}
              onClick={onAddBookmark}
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

export default RecipeDatailDisplay;
