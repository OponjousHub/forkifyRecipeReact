import { Spinner } from "@phosphor-icons/react";
import classes from "../results/recipeResult.module.css";

const Spiner = () => {
  return (
    <div className={classes.spiner}>
      <Spinner />
    </div>
  );
};
export default Spiner;
