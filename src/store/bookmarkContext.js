import { createContext, useState } from "react";

const BookmarkContext = createContext({
  onGetSelectedRecipe: () => {},
  onBookrecipe: () => {},
});

export default BookmarkContext;

export const BookmarkContextProvider = ({ children }) => {
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const handleSelectedRecipe = (recipeData) => {
    setSelectedRecipe(recipeData);
  };

  const handleBookmarks = () => {
    setBookmarks((prevState) => {
      const existingRecipe = bookmarks.find(
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
    console.log(selectedRecipe.id);
    const removedRecipe = bookmarks.filter(
      (book) => book.id !== selectedRecipe.id
    );
    console.log(removedRecipe);
    setBookmarks((prevState) => {
      return [...prevState, { removedRecipe }];
    });
  };

  const bookmarkCTX = {
    onGetSelectedRecipe: handleSelectedRecipe,
    selectedRecipe,
    onBookrecipe: handleBookmarks,
    bookmarks,
    onRemoveBookmark: handleRemoveBookmark,
  };
  return (
    <BookmarkContext.Provider value={bookmarkCTX}>
      {children}
    </BookmarkContext.Provider>
  );
};
