import { createContext } from "react";
import ProgressContext from "../../store/progressContext";
import { Warning } from "@phosphor-icons/react";
import classes from "../recipeDetails/recipeDetails.module.css";

const SuccessModal = ({ hideSuccess }) => {
  const userProgressCTX = createContext(ProgressContext);

  const handleSuccess = () => {
    hideSuccess();
  };

  return (
    <div className={classes.main_error}>
      <div className={classes.error_box}>
        <Warning className={classes.warning} />
        <h2 className={classes.error_head}>Success</h2>
      </div>
      <div className={classes.form_btn_error}>
        <p className={classes.error_text}>
          {"The recipe was successfully uploaded!"}
        </p>
        <button
          onClick={handleSuccess}
          className={`${classes.error_btn} ${classes.btn}`}
        >
          <span>Okey</span>
        </button>
      </div>
    </div>
  );
};
export default SuccessModal;
