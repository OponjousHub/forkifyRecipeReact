import { createContext, useState } from "react";

const BookmarkContext = createContext({
  onGetSelectedRecipe: () => {},
  onBookrecipe: () => {},
  onRemoveBookmark: () => {},
  onAddUploadToBookmark: () => {},
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
  };
  const handleBookmarkUpload = (uploadedRecipe) => {
    setBookmarks((prevState) => {
      const existingRecipe = bookmark.find(
        (booked) => booked.title === uploadedRecipe.title
      );
      if (existingRecipe) {
        return [...prevState];
      } else {
        return [
          {
            id: uploadedRecipe.id,
            publisher: uploadedRecipe.publisher,
            ingredients: uploadedRecipe.ingredients,
            url: uploadedRecipe.url,
            image: uploadedRecipe.image,
            title: uploadedRecipe.title,
            servings: uploadedRecipe.servings,
            cookingTime: uploadedRecipe.cookingTime,
            // key: uploadedRecipe.key,
          },
          ...prevState,
        ];
      }
    });
  };

  const handleRemoveBookmark = () => {
    setBookmarks(() => {
      const remainingBookmark = bookmark.filter(
        (book) => book.id !== selectedRecipe.id
      );
      return [...remainingBookmark];
    });
  };

  const bookmarkCTX = {
    onGetSelectedRecipe: handleSelectedRecipe,
    selectedRecipe,
    onBookrecipe: handleBookmarks,
    bookmark,
    onRemoveBookmark: handleRemoveBookmark,
    onAddUploadToBookmark: handleBookmarkUpload,
  };
  return (
    <BookmarkContext.Provider value={bookmarkCTX}>
      {children}
    </BookmarkContext.Provider>
  );
};
