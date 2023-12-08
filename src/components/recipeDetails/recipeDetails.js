import { Fragment, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Ingredients from "./ingredients";
import Spiner from "../utility/spiner";
import Bookmarks from "./bookmark";
import { UserIcon } from "@heroicons/react/24/outline";
import { Bookmark, BookmarkSimple, Warning } from "@phosphor-icons/react";
import classes from "./recipeDetails.module.css";
import { render } from "react-dom";

const RecipeDatail = (props) => {
  const [loadedRecipe, setLoadedRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarked, setBookmarked] = useState([]);
  const params = useParams();
  const id = params.recipeId;
  const showBookmark = props.onPassBookmarkState;
  console.log(showBookmark);

  const onToggleBookmarkHandler = () => {
    !isBookmarked ? setIsBookmarked(true) : setIsBookmarked(false);

    if (!isBookmarked) {
      setBookmarked((prevBook) => [...prevBook, loadedRecipe]);
    }
    console.log("clicked bookmarked");
    console.log(loadedRecipe);
    console.log(bookmarked);

    if (isBookmarked) {
      setBookmarked(
        bookmarked.filter((bookMk) => {
          return bookMk.id !== id;
        })
      );
    }
  };

  useEffect(() => {
    const loadRecipe = async (id) => {
      try {
        setIsBookmarked(bookmarked.some((hasBooked) => hasBooked.id === id));

        setIsLoading(true);
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes/${id}/?key=<a279b720-e157-4a3a-9725-ebe1bb21da1f>`
        );
        if (!response.ok)
          throw new Error(
            `Could not fetch this recipe! please try again. Status: ${response.status}`
          );

        const recipeData = await response.json();
        const { recipe } = recipeData.data;
        const rec = {
          id: recipe.id,
          publisher: recipe.publisher,
          ingredients: recipe.ingredients,
          url: recipe.source_url,
          image: recipe.image_url,
          title: recipe.title,
          servings: recipe.servings,
          cookingTime: recipe.cooking_time,
        };
        setLoadedRecipe(rec);
        setIsLoading(false);
        console.log(rec);
        return rec;
      } catch (err) {
        alert(err);
      }
    };
    loadRecipe(id);
  }, [id, setIsBookmarked]);
  console.log(bookmarked);
  return (
    <Fragment>
      {isLoading ? (
        <Spiner />
      ) : (
        <div className={classes.recipeDetailContainer}>
          {
            showBookmark && bookmarked.length < 1 && (
              <div className={classes.bookmark}>
                <div className={classes.bookmark_inner}>
                  <span>
                    <Warning size={32} />
                  </span>
                  <p>
                    No bookmarks yet. Find a nice <br />
                    recipe and bookmark it :)
                  </p>
                </div>
              </div>
            )
            // : (
            // )
          }
          {showBookmark && bookmarked.length > 0 && (
            <div className={classes.bookmark}>
              <Bookmarks
                loadBookmark={bookmarked}
                onPersistBookmk={showBookmark}
              />
            </div>
          )}

          <figure className={classes.fig}>
            <img
              src={loadedRecipe.image}
              alt={loadedRecipe.title}
              className={classes.images}
            />
            <h1 className={classes.title}>
              <span>{loadedRecipe.title}</span>
            </h1>
          </figure>

          <div className={classes.servings}>
            <div className={classes.duration}>
              <ion-icon name="time-outline"></ion-icon>
              <p>{loadedRecipe.cookingTime}</p>
            </div>
            <div className={classes.per_person}>
              <div className={classes.person_serv}>
                <ion-icon name="people-outline"></ion-icon>
                <p>{loadedRecipe.servings} servings</p>
              </div>
              <div className={classes.adjust_servings}>
                <ion-icon name="remove-circle-outline"></ion-icon>
                <ion-icon name="add-circle-outline"></ion-icon>
              </div>
            </div>
            <div
              className={classes.add_bookmark}
              onClick={onToggleBookmarkHandler}
            >
              <UserIcon className={classes.my_recipe} />
              {isBookmarked ? (
                <BookmarkSimple
                  size={64}
                  weight="fill"
                  className={classes.my_bookmark}
                />
              ) : (
                <BookmarkSimple
                  size={64}
                  // weight="fill"
                  className={classes.my_bookmark}
                />
              )}
            </div>
          </div>
          <div className={classes.ingredient}>
            <Ingredients onLoadRecipe={loadedRecipe} />
          </div>
          <div className={classes.how_to_cook}>
            <div className={classes.how_to_cook_inner}>
              <h2>How to cook</h2>
              <p>
                This recipe was carefully designed and tested by Oponjous Man.
                Please check out directions at their website.
              </p>
              <Link to={loadedRecipe.url}>
                <button className={classes.btn}>
                  <span>DIRECTIONS &rArr;</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default RecipeDatail;
