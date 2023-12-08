import { Fragment } from "react";
import classes from "../results/recipeResult.module.css";
import { NavLink } from "react-router-dom";

const Bookmarks = (props) => {
  const bookmarks = props.loadBookmark;
  console.log(bookmarks);

  const clickRecipeHandler = () => {
    props.onShowRecipe();
  };

  return (
    <Fragment>
      <div
        className={`${classes.result_container} ${classes.bookmark_container}`}
      >
        <ul className={classes.list}>
          {bookmarks.map((recipe) => (
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
                    <img src={recipe.image} alt={recipe.image} />
                  </div>
                  <div
                    className={`${classes.result_text_container} ${classes.bookmarktext_box}`}
                  >
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

export default Bookmarks;
