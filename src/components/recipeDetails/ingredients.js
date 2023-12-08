import { Fragment } from "react";
import classes from "./ingredients.module.css";

const Ingredients = (props) => {
  const recipe = props.onLoadRecipe;
  const id = props.onLoadRecipe.id;
  console.log(recipe.ingredients);
  return (
    <Fragment>
      <h2 className={classes.ingredient_title}>RECIPE INGREDIENTS</h2>
      <div className={classes.list_box}>
        {/* <ul className={classes.ing_list}>
          {recipe.ingredients.map((ing) => {
            return (
              <div className={classes.ing_side_box}>
                <li className={classes.ingredient}>
                  <ion-icon name="checkmark-outline"></ion-icon>
                  <div>
                    <span>{ing.quantity}</span>
                    <span>{ing.unit}</span>
                  </div>
                  <span>{ing.description}</span>
                </li>
              </div>
            );
          })}
        </ul> */}
      </div>
    </Fragment>
  );
};

export default Ingredients;
