import { useRef } from "react";
import classes from "./header.module.css";

// API key  a279b720-e157-4a3a-9725-ebe1bb21da1f

const SearchRecipe = (props) => {
  const searchinputRef = useRef();

  const searchRecipeHandler = async (event) => {
    try {
      event.preventDefault();
      const query = searchinputRef.current.value;
      props.onSearchQueryHeader(query);
    } catch (error) {
      throw new Error(`unable to fetch`);
    }
  };

  return (
    <>
      <form onSubmit={searchRecipeHandler} className={classes.search}>
        <input
          className={classes.input}
          type="text"
          placeholder="Search over 1,000,000 recipes..."
          ref={searchinputRef}
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
