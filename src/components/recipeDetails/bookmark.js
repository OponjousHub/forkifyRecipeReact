import { Fragment } from "react";
import classes from "../results/recipeResult.module.css";

const Bookmarks = (props) => {
  return (
    <Fragment>
      <div
        className={`${classes.result_container} ${classes.bookmark_container}`}
      >
        <ul className={classes.list}>
          {bookmarks.map((recipe) => (
            // <li
            //   key={recipe.id}
            //   className={classes.result_list}
            //   onClick={clickRecipeHandler}
            // >
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
            // </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default Bookmarks;
