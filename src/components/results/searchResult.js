import { Fragment } from "react";
import image from "../../img/food1.jpg";
import image2 from "../../img/food2.jpg";
import image3 from "../../img/food.jpg";
import classes from "./searchResult.module.css";

const SearchResult = (props) => {
  return (
    <Fragment>
      <div className={classes.result_container}>
        <ul>
          {dummyFood.map((recipe) => (
            <li key={recipe.id} className={classes.result_list}>
              <div className={classes.recipe_list}>
                <div className={classes.recipe_list_image}>
                  <img src={recipe.img} alt="" />
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

        <p className={classes.copyright}>
          © Copyright by Oponjous Johanes. Rebuilt from vanilla javascript to
          React. Don't claim as your own.
        </p>
      </div>
    </Fragment>
  );
};

export default SearchResult;
