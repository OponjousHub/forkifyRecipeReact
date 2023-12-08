import Modal from "../../pages/modal";
import classes from "./addRecipeForm.module.css";

const AddRecipeForm = () => {
  return (
    <Modal>
      <form className={classes.form}>
        <div>
          <p className={classes.form_header}>RECIPE DATA</p>

          <div className={classes.form_data}>
            <div className={classes.control}>
              <label htmlFor="name">Title</label>
              <input type="text" id="name" />
            </div>
            <div className={classes.control}>
              <label htmlFor="street">Url</label>
              <input type="text" id="street" />
            </div>
            <div className={classes.control}>
              <label htmlFor="postal">Image Url</label>
              <input type="text" id="postal" />
            </div>
            <div className={classes.control}>
              <label htmlFor="city">Publisher</label>
              <input type="text" id="city" />
            </div>
            <div className={classes.control}>
              <label htmlFor="city">Prep Time</label>
              <input type="text" id="city" />
            </div>
            <div className={classes.control}>
              <label htmlFor="city">Servings</label>
              <input type="text" id="city" />
            </div>
          </div>
        </div>
        <div>
          <p className={classes.form_header}>INGREDIENTS</p>

          <div className={classes.form_data}>
            <div className={classes.control}>
              <label htmlFor="Ingredient1">Ingredient 1</label>
              <input type="text" id="name" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient2">Ingredient 2</label>
              <input type="text" id="street" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient3">Ingredient 3</label>
              <input type="text" id="postal" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient4">Ingredient 4</label>
              <input type="text" id="city" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient5">Ingredient 5</label>
              <input type="text" id="city" />
            </div>
            <div className={classes.control}>
              <label htmlFor="Ingredient6">Ingredient 6</label>
              <input type="text" id="city" />
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
          <ion-icon name="close-outline"></ion-icon>
        </div>
      </form>
    </Modal>
  );
};

export default AddRecipeForm;
