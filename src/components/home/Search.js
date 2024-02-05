import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import classes from "./Search.module.css";
import { filterAction } from "../../store/filterSlice";
import { useDispatch, useSelector } from "react-redux";

const Search = (props) => {
  const [category, setCategory] = useState("All");
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const handleSelectChange = (e) => {
    setCategory(e.target.value);
  };

  const allCategory = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    dispatch(filterAction.filterByCategory({ products, category }));
  }, [dispatch, products, category]);

  return (
    <section className={classes.search}>
      <div className={classes.searchForm}>
        <SearchIcon className={classes.icon} />
        <input
          placeholder="Search product"
          aria-describedby="searchProduct"
          value={props.search}
          onChange={props.onChange}
          type="text"
          className={`${classes.searchInput}`}
        />

        <select
          onChange={handleSelectChange}
          className={classes.categoryDropdown}
        >
          {allCategory.map((cat) => {
            return (
              <option
                key={cat}
                className={`${category === cat ? `active` : null}`}
                value={cat}
              >
                {cat}
              </option>
            );
          })}
        </select>
      </div>
    </section>
  );
};

export default Search;
