import React from "react";
import classes from "./FilterTab.module.css";
import ProductFilter from "../components/product/ProductFilter";

const FilterTab = ({ setIsFilterOpen }) => {
  const handleSetIsFilterOpen = (value) => {
    setIsFilterOpen(value);
  };

  return (
    <div className={classes.filter}>
      <div className={classes.filterContent}>
        <ProductFilter setIsFilterOpen={handleSetIsFilterOpen} />
      </div>
    </div>
  );
};

export default FilterTab;
