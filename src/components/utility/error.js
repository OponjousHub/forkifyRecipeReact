import classes from "../recipeDetails/recipeDetails.module.css";

const Error = (props) => {
  return (
    <>
      <main className={classes.main_error}>
        <h1>An Error has occured!</h1>
        <p>{props}</p>
        <button
          className={classes.btn}
          // onClick={handleClose}
        >
          <span>Okey</span>
        </button>
      </main>
    </>
  );
};

export default Error;
