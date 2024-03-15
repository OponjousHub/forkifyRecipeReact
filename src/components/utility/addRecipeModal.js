import { useState, useContext, useEffect } from "react";
import RecipeContext from "../../store/recipeContext";
import ProgressContext from "../../store/progressContext";
import Spiner from "./spiner";
import Modals from "./modals";
import imaage from "./photoe.jpg";
import SuccessModal from "./successModal";
import UploadErrorModal from "./uploadErrorModal";
import { uploadRecipeUrl } from "./http";
import classes from "../header/addRecipeForm.module.css";
import BookmarkContext from "../../store/bookmarkContext";

export default function AddRecipeModal() {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { onDisplayUpload, onAddUploaded } = useContext(RecipeContext);
  const userProgressCTX = useContext(ProgressContext);
  const { onAddUploadToBookmark } = useContext(BookmarkContext);

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
        setIsLoading(true);
        const ingredients = Object.entries(data)
          .filter((entry) => entry[0].startsWith("ing") && entry[1] !== "")
          .map((entry) => {
            const ingArr = entry[1].replaceAll(" ", "").split(",");

            const [qauntity, unit, description] = ingArr;
            return { qauntity: qauntity ? +qauntity : null, unit, description };
          });
        const recipeUpload = {
          publisher: data.publisher,
          source_url: data.url,
          image_url: imaage,
          title: data.title,
          servings: +data.servings,
          cooking_time: +data.prepTime,
          ingredients,
        };

        const recData = await uploadRecipeUrl(recipeUpload);

        const { recipe } = recData.data;
        const transformedRecipe = {
          publisher: recipe.publisher,
          ingredients: recipe.ingredients,
          url: recipe.source_url,
          image: recipe.image_url,
          title: recipe.title,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
          ...(recipe.key && {
            key: recipe.key,
          }),
        };
        onAddUploaded(transformedRecipe);
        onDisplayUpload(transformedRecipe);
        onAddUploadToBookmark(transformedRecipe);
        setIsLoading(false);
        if (recData.status === "success") {
          userProgressCTX.showSuccess();
        }
        console.log(recData);
        console.log(recData.status);
        console.log(transformedRecipe);
      } catch (err) {
        userProgressCTX.showError(err.message);
      }

      setIsValid(false);
    };
    uploadRecipe();
  };
  useEffect(() => {
    if (isLoading) userProgressCTX.showSpinner();
  }, [isLoading]);

  const handleHideForm = () => {
    userProgressCTX.hideForm();
  };
  const handleCancelForm = () => {
    userProgressCTX.cancel();
  };

  console.log(userProgressCTX.progress);
  console.log(userProgressCTX.value);

  let content;

  if (userProgressCTX.progress === "form") {
    content = (
      <form onSubmit={submitHandler} className={classes.form}>
        <div>
          <p className={classes.form_header}>RECIPE DATA</p>

          <div className={classes.form_data}>
            <div className={classes.control}>
              <label htmlFor="name">Title</label>
              <input
                defaultValue={"Pizzaro pizza De best"}
                type="text"
                name="title"
                id="name"
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="street">Url</label>
              <input
                defaultValue={"www://pizaro.com"}
                type="text"
                name="url"
                id="street"
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="postal">Image Url</label>
              <input
                defaultValue={
                  "https://www.istockphoto.com/photo/pizza-gm1184193004-333238984"
                }
                type="text"
                name="image"
                id="postal"
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="publisher">Publisher</label>
              <input
                defaultValue={"Oponjous Delicacy"}
                type="text"
                name="publisher"
                id="publisher"
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="time">Prep Time</label>
              <input defaultValue={45} type="text" name="prepTime" id="time" />
            </div>
            <div className={classes.control}>
              <label htmlFor="serving">Servings</label>
              <input
                defaultValue={4}
                type="text"
                name="servings"
                id="serving"
              />
            </div>
          </div>
        </div>
        <div>
          <p className={classes.form_header}>INGREDIENTS</p>

          <div className={classes.form_data}>
            <div className={classes.control}>
              <label htmlFor="ingredient1">Ingredient 1</label>
              <input
                defaultValue={"1,spoon,sugar"}
                type="text"
                name="ing1"
                id="ingredient1"
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient2">Ingredient 2</label>
              <input
                defaultValue={"2,cups,red  oil"}
                type="text"
                name="ing2"
                id="Ingredient2"
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient3">Ingredient 3</label>
              <input
                defaultValue={"3,litres,water"}
                type="text"
                name="ing3"
                id="Ingredient3"
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient4">Ingredient 4</label>
              <input
                defaultValue={"5,kg,beaf"}
                type="text"
                name="ing4"
                id="Ingredient4"
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient5">Ingredient 5</label>
              <input
                defaultValue={"7,cubes,maggi"}
                type="text"
                name="ing5"
                id="Ingredient5"
              />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient6">Ingredient 6</label>
              <input
                defaultValue={"1,gram,cocoa nut oil"}
                type="text"
                name="ing6"
                id="Ingredient6"
              />
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <button className={classes.submit}>
            <ion-icon name="cloud-upload-outline"></ion-icon>
            <span>Upload</span>
          </button>
        </div>

        <div className={classes.close}>
          <button onClick={handleCancelForm} type="button">
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>
      </form>
    );
  } else if (userProgressCTX.progress === "spinner") {
    content = (
      <div className={classes.uploadSpiner}>
        <Spiner />;
      </div>
    );
  } else if (userProgressCTX.progress === "success") {
    content = <SuccessModal hideSuccess={handleHideForm} />;
  } else if (userProgressCTX.value) {
    content = (
      <UploadErrorModal
        error={userProgressCTX.value}
        hideForm={handleHideForm}
      />
    );
  }

  console.log(userProgressCTX.showForm);

  return <Modals open={userProgressCTX.showForm}>{content}</Modals>;
}
