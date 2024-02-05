import React, { useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { FaFilter } from "react-icons/fa";
import Pagination from "../home/Pagination";
import classes from "./ProductList.module.css";
import FilterTab from "../home/FilterTab";
import { toggleAction } from "../../store/toggleSlice";

const ProductList = () => {
  const [grid, setGrid] = useState(true);
  const products = useSelector((state) => state.product.products);
  const filteredProduct = useSelector((state) => state.filter.filteredProduct);
  const istoggleOpen = useSelector((state) => state.toggle.isToggle);
  const dispatch = useDispatch();

  const toggleNav = () => {
    dispatch(toggleAction.toggleOpen({ toggle: true }));
  };

  const [currentPage, setcurrentPage] = useState(1);
  const [productPerPage] = useState(9);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <section className={classes.productList} id="products">
      <div className={classes.productTop}>
        <div className={classes.productListIcons}>
          <GridViewIcon
            sx={{ color: "#F05941", font: "22" }}
            onClick={() => setGrid(true)}
          />
          <ViewListIcon
            sx={{
              backgroundColor: "#0F0F0F",
              color: "#fff",
              font: "22",
            }}
            onClick={() => setGrid(false)}
          />
          <span>
            <b>{filteredProduct.length}</b> Products found
          </span>
        </div>

        <div className={classes.sort} onClick={toggleNav}>
          <div className={classes.filter}>
            <FaFilter /> <span>Filter</span>
          </div>
          {istoggleOpen ? <FilterTab /> : ""}
        </div>
      </div>
      <div className={classes.listGrid}>
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {currentProducts.map((product) => {
              return (
                <div key={product.id}>
                  <ProductItem {...product} grid={grid} product={product} />
                </div>
              );
            })}
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setcurrentPage}
        productPerPage={productPerPage}
        totalProducts={filteredProduct.length}
      />
    </section>
  );
};

export default ProductList;
