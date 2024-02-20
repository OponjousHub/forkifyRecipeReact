import { useState, useContext, useRef } from "react";
import SearchRecipe from "./searchRecipe";
import RecipeContext from "../../store/recipeContext";
import BookmarkContext from "../../store/bookmarkContext";
import { Warning } from "@phosphor-icons/react";
import classes from "./header.module.css";
import styles from "../results/recipeResult.module.css";
import image from "../../img/logo.png";

const Header = ({ onLoad, onShowModal }) => {
  const { bookmark, selectedRecipe } = useContext(BookmarkContext);
  const { onSelectRecipe } = useContext(RecipeContext);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const dialog = useRef();

  const handleShowBookmark = () => {
    setShowBookmarks(true);
  };
  const handleHideBookmark = () => {
    setShowBookmarks(false);
  };

  let bookmarkContent;
  if (showBookmarks && bookmark.length > 0) {
    bookmarkContent = (
      <div className={classes.inner}>
        <ul className={`${styles.ul_list} ${classes.bookmarks_ul}`}>
          {bookmark.map((recipe) => {
            let cssClass = "";
            if (recipe.id === selectedRecipe.selectedRecipeId) {
              cssClass = styles.recipe_list_active;
            } else {
              cssClass = styles.recipe_list;
            }

            return (
              <li
                key={recipe.id}
                className={cssClass}
                onClick={() => onSelectRecipe(recipe)}
              >
                <div className={styles.recipe_detail_box}>
                  <div className={styles.recipe_list_image}>
                    <img src={recipe.image} alt="" />
                  </div>
                  <div className={styles.result_text_container}>
                    <p className={styles.recipe_title}>{recipe.title}</p>
                    <div className={styles.recipe_owner}>
                      <p>{recipe.publisher}</p>
                      <ion-icon name="person-outline"></ion-icon>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else if (showBookmarks && bookmark.length === 0) {
    bookmarkContent = (
      <div className={classes.inner}>
        <div className={classes.warning_box}>
          <Warning className={classes.warning} />
          <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
        </div>
      </div>
    );
  } else {
    bookmarkContent = null;
  }

  return (
    <>
      <header className={classes.header_container}>
        <img className={classes.logo} src={image} alt="forkify logo" />
        <SearchRecipe onLoading={onLoad} />
        <div className={classes.add}>
          <p className={classes.add_recipe} onClick={() => onShowModal(true)}>
            <ion-icon className={classes.icon} name="create-outline"></ion-icon>
            <span>ADD RECIPE</span>
          </p>
          <p
            className={classes.show_bookmark}
            onMouseOver={handleShowBookmark}
            onMouseOut={handleHideBookmark}
          >
            <ion-icon
              className={classes.icon}
              name="bookmarks-outline"
            ></ion-icon>
            <span>BOOKMARK</span>

            {bookmarkContent}
          </p>
        </div>
      </header>
    </>
  );
};

export default Header;
