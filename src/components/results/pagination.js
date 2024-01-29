import { useState, useContext } from "react";
import { RESULT_PER_PAGE } from "../utility/config";
import RecipeContext from "../../store/recipeContext";

import classes from "./pagination.module.css";

const Pagination = (props) => {
  const { onCurrPage, recipeResults, currPage } = useContext(RecipeContext);
  const allRecipes = recipeResults.length;
  const numPage = allRecipes / RESULT_PER_PAGE;
  const numPages = Math.ceil(numPage);
  const curPage = currPage;

  const rightPaginationHandler = () => {
    const updatedCurPage = curPage + 1;
    onCurrPage(updatedCurPage);
  };
  const leftPaginationHandler = () => {
    const updatedCurPage = curPage - 1;
    onCurrPage(updatedCurPage);
  };

  if (curPage === 1 && numPages > 1) {
    return (
      <button
        onClick={rightPaginationHandler}
        className={classes.btn_inline_right}
      >
        <span>{`Page ${curPage + 1}`}</span>
        <ion-icon name="arrow-forward-outline"></ion-icon>
      </button>
    );
  }

  // Other page
  if (curPage < numPages) {
    return (
      <>
        <button
          onClick={leftPaginationHandler}
          className={classes.btn_inline_left}
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
          <span>{`Page ${curPage - 1}`}</span>
        </button>

        <button
          onClick={rightPaginationHandler}
          className={classes.btn_inline_right}
        >
          <span>{`Page ${curPage + 1}`}</span>

          <ion-icon name="arrow-forward-outline"></ion-icon>
        </button>
      </>
    );
  }

  // Last page
  if (curPage === numPages && numPages > 1) {
    return (
      <>
        <button
          onClick={leftPaginationHandler}
          className={classes.btn_inline_left}
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
          <span>{`Page ${curPage - 1}`}</span>
        </button>
      </>
    );
  }

  // Page 1, and there are no other page
  return "";
};

export default Pagination;
