import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAction } from "../../store/filterSlice";
import classes from "./ProductFilter.module.css";
import { toggleAction } from "../../store/toggleSlice";

const ProductFilter = () => {
  const [sort, setSort] = useState("latest");
  const [price, setPrice] = useState("0");
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleAction.toggleOpen({ toggle: false }));
  };

  const allPrice = [...new Set(products.map((product) => product.price))];

  useEffect(() => {
    dispatch(filterAction.filterByPrice({ products, price }));
  }, [dispatch, products, price]);

  const clearFiltersHandler = (e) => {
    e.preventDefault();
    setSort("latest");
    setPrice("0");
    toggle();
  };

  const applyFiltersHandler = (e) => {
    e.preventDefault();
    dispatch(filterAction.filterBySort({ products, sort }));
    toggle();
  };

  return (
    <div className={classes.productFilter}>
      <form>
        <div className={classes.filterBrand}>
          <div className={classes.priceFilter}>
            <h4>Price: </h4>
            <p>{`$${price.toLocaleString()}`}</p>
            <div className={classes.filterPrice}>
              <input
                type="range"
                name="price"
                min="0"
                max={Math.max(...allPrice)}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={classes.filterInput}
              />
            </div>
          </div>

          <div className={classes.sortFilter}>
            <h4>Sort by:</h4>
            <select
              name="category"
              id="product"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
              className={classes.filterSearch}
            >
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
            </select>
          </div>

          <br />
          <div className={classes.buttonContainer}>
            <button
              onClick={clearFiltersHandler}
              className={classes.filterButton}
            >
              Cancel
            </button>
            <button
              onClick={applyFiltersHandler}
              className={classes.filterButton}
            >
              Apply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
