import React, { useState } from "react";
import classes from "./Pagination.module.css";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productPerPage,
  totalProducts,
}) => {
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pageNumbers = [];
  const totalPages = totalProducts / productPerPage;

  const paginateHandler = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginateNextHandler = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrevHandler = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }
  return (
    <ul className={classes.pagination}>
      <li
        onClick={paginatePrevHandler}
        className={`${currentPage === pageNumbers[0] ? classes.hidden : null} ${
          classes.next
        }`}
      >
        Prev
      </li>
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginateHandler(number)}
              className={`${currentPage === number ? classes.active : null}`}
            >
              {number}
            </li>
          );
        }
        return null;
      })}
      <li
        onClick={paginateNextHandler}
        className={`${
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? classes.hidden
            : null
        } ${classes.next}`}
      >
        Next
      </li>
      <p>
        <b className={classes.paginationPage}> {`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
