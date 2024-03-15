import { createContext } from "react";
import ProgressContext from "../../store/progressContext";
import { Warning } from "@phosphor-icons/react";
import classes from "../recipeDetails/recipeDetails.module.css";

function UploadErrorModal({ error, hideForm }) {
  const userProgressCTX = createContext(ProgressContext);

  const handleCloseError = () => {
    hideForm();
  };
  return (
    <div className={classes.main_error}>
      <div className={classes.error_box}>
        <Warning className={classes.warning} />
        <h2 className={classes.error_head}>An error has occured!</h2>
      </div>
      <div className={classes.form_btn_error}>
        <p className={classes.error_text}>{error}</p>
        <p>
          <button
            onClick={handleCloseError}
            className={`${classes.error_btn} ${classes.btn}`}
          >
            <span>Okey</span>
          </button>
        </p>
      </div>
    </div>
  );
}

export default UploadErrorModal;
