import { useContext } from "react";
import SearchRecipe from "./searchRecipe";
import ProgressContext from "../../store/progressContext";
import image from "../../img/logo.png";
import classes from "./header.module.css";

function HeaderContent({
  bookmarkContent,
  onShowBookmark,
  onHideBookmark,
  onLoad,
}) {
  const userProgressCTX = useContext(ProgressContext);
  const handleAddRecipe = () => {
    userProgressCTX.onDisplayForm();
  };

  return (
    <header className={classes.header_container}>
      <img className={classes.logo} src={image} alt="forkify logo" />
      <SearchRecipe onLoading={onLoad} />
      <div className={classes.add}>
        <p className={classes.add_recipe} onClick={handleAddRecipe}>
          <ion-icon className={classes.icon} name="create-outline"></ion-icon>
          <span>ADD RECIPE</span>
        </p>
        <p
          className={classes.show_bookmark}
          onMouseOver={onShowBookmark}
          onMouseOut={onHideBookmark}
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
  );
}

export default HeaderContent;
