import { createContext } from "react";
import ProgressContext from "../../store/progressContext";
import Modals from "./modals";
import { Spinner } from "@phosphor-icons/react";
import classes from "../results/recipeResult.module.css";

const SpinnerModal = () => {
  // const userProgressCTX = createContext(ProgressContext);
  // console.log(userProgressCTX.progress);
  return (
    <div
    // open={userProgressCTX.progress === "spinner"}
    >
      <div className={classes.spiner}>
        <Spinner />
      </div>
    </div>
  );
};
export default SpinnerModal;
