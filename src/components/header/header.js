import SearchRecipe from "./searchRecipe";
import classes from "./header.module.css";
import image from "../../img/logo.png";

const Header = (props) => {
  // const [hoverBookmarks, setHoverBookmarks] = useState();

  // const queryHeaderHandler = (query) => {
  //   props.onFetchRecipe(query);
  // };
  // const showBookmarksHandler = () => {
  //   setHoverBookmarks(true);
  // };
  // const hideBookmarksHandler = () => {
  //   setHoverBookmarks(false);
  // };
  // useEffect(() => {
  //   props.onShowBookmark(hoverBookmarks);
  //   console.log(hoverBookmarks);
  // }, [showBookmarksHandler]);
  return (
    <header className={classes.header_container}>
      <img className={classes.logo} src={image} alt="forkify logo" />
      <SearchRecipe />
      <div className={classes.add}>
        <p className={classes.add_recipe}>
          <ion-icon className={classes.icon} name="create-outline"></ion-icon>
          <span>ADD RECIPE</span>
        </p>
        <p
          className={classes.show_bookmark}
          // onMouseOver={showBookmarksHandler}
          // onMouseOut={hideBookmarksHandler}
        >
          <ion-icon
            className={classes.icon}
            name="bookmarks-outline"
          ></ion-icon>
          <span>BOOKMARK</span>
        </p>
      </div>
    </header>
  );
};

export default Header;
