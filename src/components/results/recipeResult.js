import { useContext, Fragment } from "react";
import RecipeContext from "../../store/recipeContext";
import Pagination from "./pagination";
import { RESULT_PER_PAGE } from "../utility/config";
import classes from "./recipeResult.module.css";

const RecipeResult = () => {
  const { recipeResults, currPage, onSelectRecipe } = useContext(RecipeContext);
  const allResults = recipeResults;
  const page = currPage;
  console.log(allResults);
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;
  const resultPerPage = allResults.slice(start, end);

  return (
    <Fragment>
      <div className={classes.result_container}>
        <ul className={classes.list}>
          {resultPerPage.map((recipe) => (
            <li
              key={recipe.id}
              className={classes.result_list}
              onClick={() => onSelectRecipe(recipe)}
            >
              <div className={classes.recipe_list}>
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
          ))}
        </ul>
        <div>{recipeResults && <Pagination />}</div>
        <div className={classes.copyright}>
          <p>
            © Copyright by Jonas Schmedtmann. Use for learning or your
            portfolio. Don't use to teach. Don't claim as your own.
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default RecipeResult;
