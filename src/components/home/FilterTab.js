import React from "react";
import classes from "./FilterTab.module.css";
import ProductFilter from "../product/ProductFilter";

const FilterTab = () => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div className={classes.filter} onClick={handleClick}>
      <div className={classes.filterContent}>
        <ProductFilter />
      </div>
    </div>
  );
};

export default FilterTab;
