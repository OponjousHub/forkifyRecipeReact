import { Fragment } from "react";
import { RESULT_PER_PAGE } from "../utility/config";
import classes from "./recipeResult.module.css";
import { NavLink } from "react-router-dom";

const RecipeResult = (props) => {
  const allResults = props.loadResult;
  const page = props.curPage;
  console.log(allResults);
  const start = (page - 1) * RESULT_PER_PAGE;
  const end = page * RESULT_PER_PAGE;
  const resultPerPage = allResults.slice(start, end);

  const clickRecipeHandler = () => {
    props.onShowRecipe();
  };

  return (
    <Fragment>
      <div className={classes.result_container}>
        <ul className={classes.list}>
          {resultPerPage.map((recipe) => (
            <li
              key={recipe.id}
              className={classes.result_list}
              onClick={clickRecipeHandler}
            >
              <NavLink
                to={`${recipe.id}`}
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
                end
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
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default RecipeResult;
