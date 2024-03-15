import { useState, useContext } from "react";
import RecipeContext from "../../store/recipeContext";
import BookmarkContext from "../../store/bookmarkContext";
import HeaderContent from "./headerContent";
import { Warning } from "@phosphor-icons/react";
import classes from "./header.module.css";
import styles from "../results/recipeResult.module.css";

const Header = ({ onLoad }) => {
  const { bookmark, selectedRecipe } = useContext(BookmarkContext);
  const { onSelectRecipe } = useContext(RecipeContext);
  const [showBookmarks, setShowBookmarks] = useState(false);

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
   
      <HeaderContent
        bookmarkContent={bookmarkContent}
        onShowBookmark={handleShowBookmark}
        onHideBookmark={handleHideBookmark}
        onLoad={onLoad}
      />
    </>
  );
};

export default Header;
