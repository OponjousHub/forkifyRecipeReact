import { Fragment, useState, useEffect, useCallback } from "react";
import Header from "../components/header/header";
import RecipeResult from "../components/results/recipeResult";
import RecipeDatail from "../components/recipeDetails/recipeDetails";
import Pagination from "../components/results/pagination";
import Spiner from "../components/utility/spiner";
import classes from "./layout.module.css";

const Layout = () => {
  const [fetchedRecipe, setFetchedRecipe] = useState([]);
  const [renderRecipe, setRenderRecipe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState();
  const [page, setPage] = useState(null);

  const CalcNumPagesHandler = (page) => {
    setPage(page);
  };

  const showRecipeHandler = () => {
    setRenderRecipe(true);
  };

  const showBookmarkHandler = (bookState) => {
    setShowBookmarks(bookState);
    console.log(showBookmarks);
  };

  const recipeQueryHandler = useCallback(async (query) => {
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
      setFetchedRecipe(transformedRecipe);

      setIsLoading(false);
    } catch (err) {
      alert(err);
    }
  }, []);

  return (
    <Fragment>
      <div className={classes.layout_container}>
        <div className={classes.layer_header}>
          <Header
            onFetchRecipe={recipeQueryHandler}
            onShowBookmark={showBookmarkHandler}
          />
        </div>
        <div className={classes.layer_sidebar}>
          {isLoading ? (
            <Spiner />
          ) : (
            <>
              <RecipeResult
                loadResult={fetchedRecipe}
                curPage={page}
                onShowRecipe={showRecipeHandler}
              />
              <Pagination
                numRecipe={fetchedRecipe}
                onCalcNumPages={CalcNumPagesHandler}
              />
            </>
          )}
          <p className={classes.copyright}>
            © Copyright by Oponjous Johanes. Rebuilt from vanilla javascript to
            React. Don't claim as your own.
          </p>
        </div>
        <div className={classes.layer_view}>
          <div className={classes.bookmarkView}>
            <div className={classes.bookmarkView_text}>
              <ion-icon name="alert-circle-outline"></ion-icon>
              <span>
                No bookmarks yet. Find a nice recipe and bookmark it :)
              </span>
            </div>
          </div>
          {renderRecipe ? (
            <RecipeDatail onPassBookmarkState={showBookmarks} />
          ) : (
            <p className={classes.initial_mssg}>
              {" "}
              Start by searching for a recipe or an ingredient. Have fun!
            </p>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
