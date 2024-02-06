import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { productAction } from "../../store/productSlice";
import Loader from "../home/Loader";
import classes from "./Product.module.css";
import ProductList from "./ProductList";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");
  const products = useSelector((state) => state.product.products);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      productAction.storeProducts({
        products: data,
      })
    );
  }, [dispatch, data]);

  return (
    <section>
      {isLoading && <Loader />}
      <ToastContainer />
      <div className={`container ${classes.product}`}>
        <div id="products" className={classes.content}>
          <ProductList product={products} />
        </div>
      </div>
    </section>
  );
};

export default Product;
