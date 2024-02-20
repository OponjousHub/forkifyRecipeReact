import { forwardRef } from "react";
import { Warning } from "@phosphor-icons/react";

import classes from "../recipeDetails/recipeDetails.module.css";

const ErrorModal = forwardRef(function ErrorModal({ eror }, ref) {
  return (
    <dialog ref={ref} className={classes.main_error}>
      <div className={classes.error_box}>
        <Warning className={classes.warning} />
        <h2 className={classes.error_head}>An error has occurd!</h2>
      </div>
      <div className={classes.form_btn_error}>
        <p className={classes.error_text}>{eror}</p>
        <form method="dialog">
          <button className={`${classes.error_btn} ${classes.btn}`}>
            <span>Okey</span>
          </button>
        </form>
      </div>
    </dialog>
  );
});
export default ErrorModal;
