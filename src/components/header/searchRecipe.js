import { useContext, useRef, useState, memo } from "react";
import RecipeContext from "../../store/recipeContext";
import ErrorModal from "../utility/errorModal";
import classes from "./header.module.css";

// API key  a279b720-e157-4a3a-9725-ebe1bb21da1f

const SearchRecipe = memo(function SearchRecipe({ onLoading }) {
  const [hasError, setHasError] = useState({
    error: "",
    errState: false,
  });
  const searchinputRef = useRef();
  const dialog = useRef();

  const recipeCTXval = useContext(RecipeContext);

  const searchRecipeHandler = (event) => {
    event.preventDefault();
    const query = searchinputRef.current.value;

    event.target.reset();
    const fetchRecipes = async () => {
      try {
        onLoading(true);
        const response = await fetch(
          // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=a279b720-e157-4a3a-9725-ebe1bb21da1f "
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=a279b720-e157-4a3a-9725-ebe1bb21da1f`
        );
        const data = await response.json();
        if (
          // !response.ok ||
          data.data.recipes.length === 0
        )
          throw new Error(
            `Could not find any ${query} recipe! Please try another recipe.`
          );
        console.log(data.data);
        let { recipes } = data.data;
        const transformedRecipe = recipes.map((rec) => {
          return {
            id: rec.id,
            image: rec.image_url,
            title: rec.title,
            publisher: rec.publisher,
          };
        });
        recipeCTXval.recipe(transformedRecipe);
        onLoading(false);
      } catch (err) {
        // recipeCTXval.onShowError(err);
        setHasError({
          error: err.message,
          errState: true,
        });
        onLoading(false);
        dialog.current.showModal();
      }
    };
    fetchRecipes(query);
  };

  return (
    <>
      <ErrorModal
        ref={dialog}
        eror={hasError.errState ? hasError.error : null}
      />
      <form onSubmit={searchRecipeHandler} className={classes.search}>
        <input
          className={classes.input}
          type="text"
          placeholder="Search over 1,000,000 recipes..."
          ref={searchinputRef}
          required
        />
        <button className={classes.btn}>
          <ion-icon
            className={classes.searchicon}
            name="search-outline"
          ></ion-icon>
          <span>SEARCH</span>
        </button>
      </form>
    </>
  );
});

export default SearchRecipe;
