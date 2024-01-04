import React, { useEffect, useState } from "react";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { filterAction } from "../../store/filterSlice";
import Pagination from "../Pagination";
import classes from "./ProductList.module.css";

const ProductList = () => {
  const [grid, setGrid] = useState(true);
  const [sort, setSort] = useState("latest");
  const products = useSelector((state) => state.product.products);
  const filteredProduct = useSelector((state) => state.filter.filteredProduct);

  // Pagination state
  const [currentPage, setcurrentPage] = useState(1);
  const [productPerPage] = useState(9);

  // Get Current Products
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = filteredProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(filterAction.filterBySort({ products, sort }));
  }, [dispatch, products, sort]);

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

        <div className={classes.sort}>
          <h4>Sort by:</h4>
          <select
            name="category"
            id="product"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
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
