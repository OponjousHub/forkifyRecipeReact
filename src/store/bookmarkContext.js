import { createContext, useState } from "react";

const BookmarkContext = createContext({
  onGetSelectedRecipe: () => {},
  onBookrecipe: () => {},
  onRemoveBookmark: () => {},
});

export default BookmarkContext;

export const BookmarkContextProvider = ({ children }) => {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarked"));

  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [bookmark, setBookmarks] = useState(bookmarks || []);
  localStorage.setItem("bookmarked", JSON.stringify(bookmark));

  const handleSelectedRecipe = (recipeData) => {
    setSelectedRecipe(recipeData);
  };

  const handleBookmarks = () => {
    setBookmarks((prevState) => {
      const existingRecipe = bookmark.find(
        (booked) => booked.id === selectedRecipe.id
      );
      if (existingRecipe) {
        return [...prevState];
      } else {
        return [
          ...prevState,
          {
            id: selectedRecipe.id,
            publisher: selectedRecipe.publisher,
            ingredients: selectedRecipe.ingredients,
            url: selectedRecipe.url,
            image: selectedRecipe.image,
            title: selectedRecipe.title,
            servings: selectedRecipe.servings,
            cookingTime: selectedRecipe.cookingTime,
          },
        ];
      }
    });
    console.log(selectedRecipe.id);
  };

  const handleRemoveBookmark = () => {
    console.log(bookmark);
    console.log(selectedRecipe.id);

    setBookmarks((prevState) => {
      // const existingBookmark = bookmark;
      const remainingBookmark = bookmark.filter(
        (book) => book.id !== selectedRecipe.id
      );
      console.log(remainingBookmark);
      return [...remainingBookmark];
    });
  };
  console.log(bookmark);

  const bookmarkCTX = {
    onGetSelectedRecipe: handleSelectedRecipe,
    selectedRecipe,
    onBookrecipe: handleBookmarks,
    bookmark,
    onRemoveBookmark: handleRemoveBookmark,
  };
  return (
    <BookmarkContext.Provider value={bookmarkCTX}>
      {children}
    </BookmarkContext.Provider>
  );
};
