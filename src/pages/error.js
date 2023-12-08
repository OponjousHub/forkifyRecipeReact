import { Link } from "react-router-dom";
import classes from "../components/recipeDetails/recipeDetails.module.css";

const ErrorPage = () => {
  return (
    <>
      <main className={classes.main_error}>
        <h1>An Error has occured!</h1>
        <p>could not found this page.</p>
        <Link to="">
          <button className={classes.btn}>
            <span>&lArr;Back to Site</span>
          </button>
        </Link>
      </main>
    </>
  );
};

export default ErrorPage;
