import { useState } from "react";
import { RESULT_PER_PAGE } from "../utility/config";

import classes from "./pagination.module.css";

const Pagination = (props) => {
  const [curPage, setCurPage] = useState(1);
  const allRecipes = props.numRecipe.length;
  const numPage = allRecipes / RESULT_PER_PAGE;
  const numPages = Math.ceil(numPage);
  props.onCalcNumPages(curPage);

  const rightPaginationHandler = () => {
    const updatedCurPage = curPage + 1;
    setCurPage(updatedCurPage);
    props.onCalcNumPages(curPage);
  };
  const leftPaginationHandler = () => {
    const updatedCurPage = curPage - 1;
    setCurPage(updatedCurPage);
    props.onCalcNumPages(curPage);
  };

  //Page 1 and there are other pages
  if (curPage === 1 && numPages > 1) {
    return (
      // <>
      //   <div className={classes.pagination_box}>
      <button
        onClick={rightPaginationHandler}
        className={classes.btn_inline_right}
      >
        <span>{`Page ${curPage + 1}`}</span>
        <ion-icon name="arrow-forward-outline"></ion-icon>
      </button>
      //   </div>
      // </>
    );
  }

  // Other page
  if (curPage < numPages) {
    return (
      <>
        {/* <div className={classes.pagination_box}> */}
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
        {/* </div> */}
      </>
    );
  }

  // Last page
  if (curPage === numPages && numPages > 1) {
    return (
      <>
        {/* <div className={classes.pagination_box}> */}
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
