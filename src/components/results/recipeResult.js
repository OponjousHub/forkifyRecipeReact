import { useContext } from "react";
import RecipeContext from "../../store/recipeContext";
import Pagination from "./pagination";
import { RESULT_PER_PAGE } from "../utility/config";
import Spiner from "../utility/spiner";
import classes from "./recipeResult.module.css";

const RecipeResult = ({ onLoading }) => {
  const { recipeResults, currPage, onSelectRecipe, selectedRecipe, error } =
    useContext(RecipeContext);
  const allResults = recipeResults;
  const page = currPage;

  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;
  const resultPerPage = allResults.slice(start, end);

  console.log(onLoading);
  console.log(error);
  let content;
  if (onLoading && !error) {
    content = (
      <div className={classes.result_container}>
        <Spiner />
        <div className={classes.copyright}>
          <p>
            © Copyright by Jonas Schmedtmann. Use for learning or your
            portfolio. Don't use to teach. Don't claim as your own.
          </p>
        </div>
      </div>
    );
  } else if (recipeResults.length !== 0 && onLoading && error !== "") {
    content = (
      <div className={classes.result_container}>
        <div className={classes.copyright}>
          <p>
            © Copyright by Jonas Schmedtmann. Use for learning or your
            portfolio. Don't use to teach. Don't claim as your own.
          </p>
        </div>
      </div>
    );
  } else {
    content = (
      <div className={classes.result_container}>
        {onLoading ? (
          <Spiner />
        ) : (
          <ul className={classes.ul_list}>
            {resultPerPage.map((recipe) => {
              let cssClass = "";
              if (recipe.id === selectedRecipe.selectedRecipeId) {
                cssClass = classes.recipe_list_active;
              } else {
                cssClass = classes.recipe_list;
              }

              return (
                <li
                  key={recipe.id}
                  className={cssClass}
                  onClick={() => onSelectRecipe(recipe)}
                >
                  <div className={classes.recipe_detail_box}>
                    <div className={classes.recipe_list_image}>
                      <img src={recipe.image} alt="" />
                    </div>
                    <div className={classes.result_text_container}>
                      <p className={classes.recipe_title}>{recipe.title}</p>
                      <div className={classes.recipe_owner}>
                        <p>{recipe.publisher}</p>
                        <ion-icon name="person-outline"></ion-icon>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
        <div>{recipeResults && <Pagination />}</div>
        <div className={classes.copyright}>
          <p>
            © Copyright by Jonas Schmedtmann. Use for learning or your
            portfolio. Don't use to teach. Don't claim as your own.
          </p>
        </div>
      </div>
    );
  }
  return content;
};
export default RecipeResult;
