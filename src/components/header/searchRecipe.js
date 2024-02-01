import { useContext, useRef, useState } from "react";
import RecipeContext from "../../store/recipeContext";
import classes from "./header.module.css";

// API key  a279b720-e157-4a3a-9725-ebe1bb21da1f

const SearchRecipe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchinputRef = useRef();

  const recipeCTXval = useContext(RecipeContext);

  const searchRecipeHandler = (event) => {
    event.preventDefault();
    const query = searchinputRef.current.value;
    // const validQuery = query && query.value;
    // try {
    //   event.preventDefault();
    //   const query = searchinputRef.current.value;
    //   props.onSearchQueryHeader(query);
    // } catch (error) {
    //   throw new Error(`unable to fetch`);
    // }
    event.target.reset();

    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          // "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=a279b720-e157-4a3a-9725-ebe1bb21da1f "
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=a279b720-e157-4a3a-9725-ebe1bb21da1f`
        );
        const data = await response.json();
        if (!response.ok)
          throw new Error(`${data.message} Status: ${data.status}`);
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
        // setFetchedRecipe(transformedRecipe);

        setIsLoading(false);
        recipeCTXval.onLoading(isLoading);
      } catch (err) {
        //  alert(err);
      }
    };
    fetchRecipes(query);
  };

  return (
    <>
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
};

export default SearchRecipe;
