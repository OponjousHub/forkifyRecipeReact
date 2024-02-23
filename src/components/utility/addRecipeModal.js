import { forwardRef, useState } from "react";
import classes from "../header/addRecipeForm.module.css";

export default forwardRef(function AddRecipeModal({ _ }, ref) {
  const [inputData, setInputData] = useState("");
  const [isValid, setIsValid] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const enteredValuesIsValid =
      data.title !== "" &&
      data.url !== "" &&
      data.image !== "" &&
      data.prepTime !== "" &&
      data.publisher !== "" &&
      data.servings !== "" &&
      data.ing1 !== "" &&
      data.ing2 !== "" &&
      data.ing3 !== "" &&
      data.ing4 !== "" &&
      data.ing5 !== "" &&
      data.ing6 !== "";

    if (!enteredValuesIsValid) {
      setIsValid(true);
      console.log("Invalid inputs");
      return;
    }
    const uploadRecipe = async () => {
      try {
        const ingrdients = Object.entries(data)
          .filter((entry) => entry[0].startsWith("ing") && entry[1] !== "")
          .map((entry) => {
            const ingArr = entry[1].replaceAll(" ", "").split(",");
            // if (ingArr.length !== 3)
            //   throw new Error(
            //     "Wrong ingredient format! Please use the correct format :)"
            //   );
            const [qauntity, unit, description] = ingArr;
            return { qauntity: qauntity ? +qauntity : null, unit, description };
          });
        console.log(data);
        console.log(ingrdients);
        const recipe = {
          publisher: data.publisher,
          source_url: data.url,
          image_url: data.image,
          title: data.title,
          servings: +data.servings,
          cooking_time: +data.prepTime,
          ingredients: ingrdients,
        };
        console.log(recipe);
      } catch (err) {
        console.error(err.message);
      }

      setIsValid(false);
    };
    uploadRecipe();

    event.target.reset();
  };

  return (
    <dialog ref={ref} className={classes.addform_container}>
      {isValid ? (
        <p className={classes.isvalid}>
          Please enter a valid value in all inputs
        </p>
      ) : (
        ""
      )}
      <form onSubmit={submitHandler} className={classes.form} method="dialog">
        <div>
          <p className={classes.form_header}>RECIPE DATA</p>

          <div className={classes.form_data}>
            <div className={classes.control}>
              <label htmlFor="name">Title</label>
              <input type="text" name="title" id="name" />
            </div>
            <div className={classes.control}>
              <label htmlFor="street">Url</label>
              <input type="text" name="url" id="street" />
            </div>
            <div className={classes.control}>
              <label htmlFor="postal">Image Url</label>
              <input type="text" name="image" id="postal" />
            </div>
            <div className={classes.control}>
              <label htmlFor="publisher">Publisher</label>
              <input type="text" name="publisher" id="publisher" />
            </div>
            <div className={classes.control}>
              <label htmlFor="time">Prep Time</label>
              <input type="text" name="prepTime" id="time" />
            </div>
            <div className={classes.control}>
              <label htmlFor="serving">Servings</label>
              <input type="text" name="serving" id="serving" />
            </div>
          </div>
        </div>
        <div>
          <p className={classes.form_header}>INGREDIENTS</p>

          <div className={classes.form_data}>
            <div className={classes.control}>
              <label htmlFor="ingredient1">Ingredient 1</label>
              <input type="text" name="ing1" id="ingredient1" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient2">Ingredient 2</label>
              <input type="text" name="ing2" id="Ingredient2" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient3">Ingredient 3</label>
              <input type="text" name="ing3" id="Ingredient3" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient4">Ingredient 4</label>
              <input type="text" name="ing4" id="Ingredient4" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient5">Ingredient 5</label>
              <input type="text" name="ing5" id="Ingredient5" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient6">Ingredient 6</label>
              <input type="text" name="ing6" id="Ingredient6" />
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <button className={classes.submit}>
            <ion-icon name="cloud-upload-outline"></ion-icon>
            <span>Upload</span>
          </button>
        </div>
      </form>
      <form method="dialog">
        <div className={classes.close}>
          <button>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
      </form>
    </dialog>
  );
});

// const Backdrop = () => {
//   return <div className={classes.backdrop}></div>;
// };
// const ModalOverlay = (props) => {
//   return (
//     <div className={classes.modal}>
//       <div className={classes.content}>{props.children}</div>
//     </div>
//   );
// };
// const potalElement = document.getElementById("overlays");

// const Modal = (props) => {
//   return (
//     <Fragment>
//       {ReactDOM.createPortal(<Backdrop />, potalElement)}
//       {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>)}
//     </Fragment>
//   );
// };
